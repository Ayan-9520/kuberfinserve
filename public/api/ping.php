<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';
require __DIR__ . '/mailer.php';
require __DIR__ . '/kuberone_bridge.php';

api_handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    api_json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
}

$config = api_load_config();

try {
    $pdo = api_db($config);
    $count = (int) $pdo->query('SELECT COUNT(*) FROM leads')->fetchColumn();

    api_json_response([
        'ok' => true,
        'message' => 'Database connected.',
        'database' => $config['db_name'] ?? '',
        'leads_count' => $count,
        'leads_email' => $config['leads_email'] ?? '',
        'site_email' => $config['site_email'] ?? '',
        'smtp_configured' => api_smtp_configured($config),
        'smtp_host' => $config['smtp_host'] ?? '',
        'smtp_user' => $config['smtp_user'] ?? '',
        'kuberone_bridge_enabled' => !empty($config['kuberone_bridge_enabled']),
        'kuberone_api_base' => $config['kuberone_api_base'] ?? '',
        'kuberone_api_base_normalized' => api_kuberone_normalize_base((string) ($config['kuberone_api_base'] ?? '')),
        'kuberone_api_key_set' => trim((string) ($config['kuberone_api_key'] ?? '')) !== '',
    ]);
} catch (Throwable $e) {
    api_json_response([
        'ok' => false,
        'error' => 'Database connection failed.',
    ], 500);
}
