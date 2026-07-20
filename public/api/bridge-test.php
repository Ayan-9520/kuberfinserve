<?php

declare(strict_types=1);

/**
 * KuberOne bridge health — open after setting config.php:
 *   https://kuberfinserve.com/api/bridge-test.php
 * Does NOT expose the API key. Delete after setup if you prefer.
 */

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/kuberone_bridge.php';

api_handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    api_json_response(['ok' => false, 'error' => 'Use GET request'], 405);
}

$config = api_load_config();
$base = trim((string) ($config['kuberone_api_base'] ?? ''));
$keySet = trim((string) ($config['kuberone_api_key'] ?? '')) !== '';

if (!api_kuberone_enabled($config)) {
    api_json_response([
        'ok' => false,
        'error' => 'Bridge disabled or kuberone_api_base is empty/placeholder.',
        'kuberone_bridge_enabled' => !empty($config['kuberone_bridge_enabled']),
        'kuberone_api_base' => $base,
        'kuberone_api_key_set' => $keySet,
        'hint' => 'Production needs a PUBLIC HTTPS API URL (not localhost). Localhost only works when website runs on same PC (npm run dev).',
    ], 500);
}

$result = api_kuberone_request($config, 'GET', '/api/v1/public/website/health', []);

api_json_response([
    'ok' => (bool) ($result['ok'] ?? false),
    'message' => ($result['ok'] ?? false)
        ? 'KuberOne bridge OK — Admin dual-write can work.'
        : ('Bridge failed: ' . ($result['error'] ?? 'unknown') . ' — check API URL, WEBSITE_INTAKE_API_KEY match, and CORS.'),
    'kuberone_api_base' => $base,
    'kuberone_api_key_set' => $keySet,
    'http_status' => $result['status'] ?? null,
    'body' => $result['body'] ?? null,
], ($result['ok'] ?? false) ? 200 : 502);
