<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';
require __DIR__ . '/lead_service.php';

api_handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    api_json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
}

$config = api_load_config();

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    api_json_response(['ok' => false, 'error' => 'Invalid JSON body'], 400);
}

try {
    $pdo = api_db($config);
    $result = api_process_lead($pdo, $config, $data, 'website');

    if (!$result['ok']) {
        api_json_response(['ok' => false, 'error' => $result['error'] ?? 'Could not save lead'], 422);
    }

    $response = [
        'ok' => true,
        'id' => $result['id'] ?? 0,
        'duplicate' => (bool) ($result['duplicate'] ?? false),
        'saved' => $result['saved'] ?? 'database',
    ];

    if (!empty($result['lead'])) {
        $response['lead'] = $result['lead'];
    }
    if (!empty($result['message'])) {
        $response['message'] = $result['message'];
    }
    if (!empty($result['emails'])) {
        $response['emails'] = $result['emails'];
    }

    api_json_response($response);
} catch (Throwable $e) {
    error_log('[save-lead] ' . $e->getMessage());

    api_json_response([
        'ok' => false,
        'error' => 'Could not save lead. Check database config and leads table.',
    ], 500);
}
