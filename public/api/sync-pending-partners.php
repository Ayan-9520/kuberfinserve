<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';
require __DIR__ . '/partner_helpers.php';
require __DIR__ . '/kuberone_bridge.php';

$config = api_load_config();
$expectedKey = (string) ($config['maintenance_key'] ?? 'kuber-sync-pending-2026');
$providedKey = (string) ($_GET['key'] ?? '');

if ($providedKey === '' || !hash_equals($expectedKey, $providedKey)) {
    api_json_response(['ok' => false, 'error' => 'Unauthorized'], 403);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    api_json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
}

if (!api_kuberone_enabled($config)) {
    api_json_response(['ok' => false, 'error' => 'KuberOne bridge is not configured'], 503);
}

$rowId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$email = isset($_GET['email']) ? strtolower(trim((string) $_GET['email'])) : '';
$phone = preg_replace('/\D+/', '', (string) ($_GET['phone'] ?? ''));
if ($phone !== '' && strlen($phone) === 12 && str_starts_with($phone, '91')) {
    $phone = substr($phone, 2);
}

try {
    $pdo = api_db($config);

    $sql = 'SELECT * FROM partners WHERE status = :status';
    $params = ['status' => 'pending'];

    if ($rowId > 0) {
        $sql .= ' AND id = :id';
        $params['id'] = $rowId;
    }
    if ($email !== '') {
        $sql .= ' AND email = :email';
        $params['email'] = $email;
    }
    if ($phone !== '') {
        $sql .= ' AND phone = :phone';
        $params['phone'] = $phone;
    }

    $sql .= ' ORDER BY id ASC';

    $select = $pdo->prepare($sql);
    $select->execute($params);
    $rows = $select->fetchAll();

    if (!$rows) {
        api_json_response([
            'ok' => true,
            'synced' => 0,
            'message' => 'No pending applications found.',
        ]);
    }

    $results = [];
    $synced = 0;
    $failed = 0;

    foreach ($rows as $row) {
        $partnerId = (int) $row['id'];
        $payload = array_merge($row, [
            'page_url' => $row['page_url'] ?? null,
            'source' => $row['source'] ?? 'partners-landing-form',
        ]);

        $kuberone = api_kuberone_sync_partner($config, $payload);
        $partnerCode = is_string($kuberone['partnerCode'] ?? null) ? $kuberone['partnerCode'] : null;

        if ($partnerCode) {
            api_partner_save_kuberone_code($pdo, $partnerId, $partnerCode);
        }

        $entry = [
            'id' => $partnerId,
            'full_name' => $row['full_name'] ?? '',
            'phone' => $row['phone'] ?? '',
            'email' => $row['email'] ?? '',
            'synced' => (bool) ($kuberone['ok'] ?? false),
            'duplicate' => (bool) ($kuberone['duplicate'] ?? false),
            'partner_code' => $partnerCode,
            'kuberone_status' => $kuberone['partnerStatus'] ?? null,
            'error' => $kuberone['error'] ?? null,
        ];

        if ($kuberone['ok'] ?? false) {
            $synced++;
        } else {
            $failed++;
        }

        $results[] = $entry;
    }

    api_json_response([
        'ok' => $failed === 0,
        'synced' => $synced,
        'failed' => $failed,
        'total' => count($rows),
        'results' => $results,
        'message' => $failed === 0 ? 'Sync completed.' : 'Sync completed with errors.',
    ]);
} catch (Throwable $e) {
    error_log('[sync-pending-partners] ' . $e->getMessage());
    api_json_response(['ok' => false, 'error' => 'Sync failed.'], 500);
}
