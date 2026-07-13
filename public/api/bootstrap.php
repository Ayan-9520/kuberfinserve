<?php

declare(strict_types=1);

function api_json_response(array $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Mobile-Api-Key');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function api_handle_preflight(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        api_json_response(['ok' => true], 204);
    }
}

function api_load_config(): array
{
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) {
        api_json_response([
            'ok' => false,
            'error' => 'Server not configured. Copy api/config.example.php to api/config.php on Hostinger.',
        ], 503);
    }
    $config = require $path;
    if (!is_array($config)) {
        api_json_response(['ok' => false, 'error' => 'Invalid config.php'], 500);
    }
    return $config;
}

function api_str(mixed $value, int $max = 500): ?string
{
    if ($value === null || $value === '') {
        return null;
    }
    $s = trim((string) $value);
    if ($s === '') {
        return null;
    }
    if (mb_strlen($s) > $max) {
        $s = mb_substr($s, 0, $max);
    }
    return $s;
}

function api_client_ip(): ?string
{
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($keys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = trim(explode(',', (string) $_SERVER[$key])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return null;
}

/** Normalize Indian mobile to 10 digits (6–9 start). Returns null if invalid. */
function api_normalize_phone(?string $phone): ?string
{
    if ($phone === null || $phone === '') {
        return null;
    }

    $digits = preg_replace('/\D+/', '', $phone) ?? '';
    if ($digits === '') {
        return null;
    }

    if (strlen($digits) === 12 && str_starts_with($digits, '91')) {
        $digits = substr($digits, 2);
    }
    if (strlen($digits) === 11 && $digits[0] === '0') {
        $digits = substr($digits, 1);
    }

    if (strlen($digits) !== 10 || !preg_match('/^[6-9]\d{9}$/', $digits)) {
        return null;
    }

    return $digits;
}
