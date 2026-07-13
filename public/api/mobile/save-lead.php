<?php

declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';
require dirname(__DIR__) . '/db.php';
require dirname(__DIR__) . '/lead_service.php';
require dirname(__DIR__) . '/jwt.php';
require dirname(__DIR__) . '/partner_helpers.php';

api_handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    api_json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
}

$config = api_load_config();

if (!api_verify_mobile_api_key($config)) {
    api_json_response(['ok' => false, 'error' => 'Unauthorized — invalid mobile API key'], 401);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    api_json_response(['ok' => false, 'error' => 'Invalid JSON body'], 400);
}

// Partner-attributed lead: accept partner_id from body or partner JWT
if (empty($data['partner_id']) && empty($data['fields']['partner_id'])) {
    $token = api_jwt_bearer_token();
    $secret = (string) ($config['jwt_secret'] ?? '');
    if ($token && $secret !== '') {
        $payload = api_jwt_decode($token, $secret);
        if ($payload && ($payload['role'] ?? '') === 'partner' && !empty($payload['sub'])) {
            $data['partner_id'] = $payload['sub'];
        }
    }
}

try {
    $pdo = api_db($config);
    $result = api_process_lead($pdo, $config, $data, 'mobile-app');

    if (!$result['ok']) {
        api_json_response(['ok' => false, 'error' => $result['error'] ?? 'Could not save lead'], 422);
    }

    api_json_response([
        'ok' => true,
        'id' => $result['id'] ?? 0,
        'duplicate' => (bool) ($result['duplicate'] ?? false),
        'lead' => $result['lead'] ?? null,
        'message' => $result['message'] ?? null,
        'saved' => $result['saved'] ?? 'database',
        'emails' => $result['emails'] ?? null,
    ]);
} catch (Throwable $e) {
    error_log('[mobile/save-lead] ' . $e->getMessage());
    api_json_response(['ok' => false, 'error' => 'Could not save lead'], 500);
}
