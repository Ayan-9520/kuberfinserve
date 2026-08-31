<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/kuberone_bridge.php';

api_handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    api_json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
}

$config = api_load_config();
$base = api_kuberone_normalize_base((string) ($config['kuberone_api_base'] ?? ''));
$keySet = trim((string) ($config['kuberone_api_key'] ?? '')) !== '';

if (!api_kuberone_enabled($config)) {
    api_json_response([
        'ok' => false,
        'error' => 'Bridge is not configured.',
        'kuberone_bridge_enabled' => !empty($config['kuberone_bridge_enabled']),
        'kuberone_api_base' => $base,
        'kuberone_api_key_set' => $keySet,
    ], 500);
}

$result = api_kuberone_request($config, 'GET', '/api/v1/public/website/health', []);

api_json_response([
    'ok' => (bool) ($result['ok'] ?? false),
    'message' => ($result['ok'] ?? false) ? 'Bridge connection successful.' : 'Bridge connection failed.',
    'kuberone_api_base' => $base,
    'kuberone_api_key_set' => $keySet,
    'http_status' => $result['status'] ?? null,
    'body' => $result['body'] ?? null,
], ($result['ok'] ?? false) ? 200 : 502);
