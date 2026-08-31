<?php

declare(strict_types=1);


function api_kuberone_normalize_base(string $base): string
{
    $base = trim($base);
    if ($base === '') {
        return '';
    }
    // Hostinger config typos: leading space, missing scheme, admin SPA host used by mistake
    if (!preg_match('#^https?://#i', $base)) {
        $base = 'https://' . ltrim($base, '/');
    }
    return rtrim($base, '/');
}

function api_kuberone_enabled(array $config): bool
{
    if (empty($config['kuberone_bridge_enabled'])) {
        return false;
    }
    $base = api_kuberone_normalize_base((string) ($config['kuberone_api_base'] ?? ''));
    if ($base === '') {
        return false;
    }
    // Reject unedited placeholders from config.example.php
    if (stripos($base, 'YOUR-KUBERONE') !== false || stripos($base, 'example.com') !== false) {
        return false;
    }
    return true;
}

/** True when KuberOne bridge is unreachable (bad URL, tunnel down) — safe to fall back locally. */
function api_kuberone_is_transport_error(array $result): bool
{
    $err = strtolower((string) ($result['error'] ?? ''));
    if ($err === '') {
        return false;
    }
    foreach ([
        'url rejected',
        'malformed',
        'could not resolve',
        'connection refused',
        'connection timed out',
        'timed out',
        'curl failed',
        'not configured',
        'failed to connect',
        'no route to host',
        'ssl',
    ] as $needle) {
        if (str_contains($err, $needle)) {
            return true;
        }
    }
    return false;
}

/** Recursively drop null / empty-string values (Zod rejects null on optional fields). */
function api_kuberone_strip_nulls(mixed $value): mixed
{
    if (!is_array($value)) {
        return $value;
    }
    $out = [];
    foreach ($value as $k => $v) {
        if ($v === null || $v === '') {
            continue;
        }
        $out[$k] = is_array($v) ? api_kuberone_strip_nulls($v) : $v;
    }
    return $out;
}

/**
 * @return array{ok:bool, status?:int, body?:array, error?:string}
 */
function api_kuberone_request(array $config, string $method, string $path, array $payload, int $timeoutSeconds = 30): array
{
    $base = api_kuberone_normalize_base((string) ($config['kuberone_api_base'] ?? ''));
    if ($base === '') {
        return ['ok' => false, 'error' => 'kuberone_api_base not configured'];
    }

    $url = $base . $path;
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        return ['ok' => false, 'error' => 'KuberOne API URL is invalid. Check kuberone_api_base in config.php (must be https://...).'];
    }
    $headers = [
        'Content-Type: application/json',
        'Accept: application/json',
    ];
    $apiKey = trim((string) ($config['kuberone_api_key'] ?? ''));
    if ($apiKey !== '') {
        $headers[] = 'X-Website-Api-Key: ' . $apiKey;
    }

    // Strip null/empty so Zod validation on KuberOne does not fail
    $methodUpper = strtoupper($method);
    $clean = api_kuberone_strip_nulls($payload);
    $body = json_encode($clean, JSON_UNESCAPED_UNICODE);
    if ($body === false) {
        return ['ok' => false, 'error' => 'JSON encode failed'];
    }
    $sendBody = $methodUpper !== 'GET' && $methodUpper !== 'HEAD';

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        $opts = [
            CURLOPT_CUSTOMREQUEST => $methodUpper,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => max(5, $timeoutSeconds),
            CURLOPT_CONNECTTIMEOUT => 5,
        ];
        if ($sendBody) {
            $opts[CURLOPT_POSTFIELDS] = $body;
        }
        curl_setopt_array($ch, $opts);
        $raw = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);

        if ($raw === false) {
            $friendly = $err ?: 'curl failed';
            if (stripos($friendly, 'URL rejected') !== false || stripos($friendly, 'Malformed') !== false) {
                $friendly = 'KuberOne API URL is invalid. Update kuberone_api_base in config.php (include https://, no leading spaces).';
            }
            return ['ok' => false, 'error' => $friendly, 'status' => $status];
        }

        $decoded = json_decode($raw, true);
        return [
            'ok' => $status >= 200 && $status < 300,
            'status' => $status,
            'body' => is_array($decoded) ? $decoded : ['raw' => $raw],
            'error' => $status >= 200 && $status < 300 ? null : (is_array($decoded) ? ($decoded['error']['message'] ?? $decoded['message'] ?? "HTTP {$status}") : "HTTP {$status}"),
        ];
    }

    $http = [
        'method' => $methodUpper,
        'header' => implode("\r\n", $headers),
        'timeout' => 30,
        'ignore_errors' => true,
    ];
    if ($sendBody) {
        $http['content'] = $body;
    }
    $context = stream_context_create(['http' => $http]);
    $raw = @file_get_contents($url, false, $context);
    $status = 0;
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
        $status = (int) $m[1];
    }
    if ($raw === false) {
        return ['ok' => false, 'error' => 'HTTP request failed', 'status' => $status];
    }
    $decoded = json_decode($raw, true);
    return [
        'ok' => $status >= 200 && $status < 300,
        'status' => $status,
        'body' => is_array($decoded) ? $decoded : ['raw' => $raw],
        'error' => $status >= 200 && $status < 300 ? null : (is_array($decoded) ? ($decoded['error']['message'] ?? $decoded['message'] ?? "HTTP {$status}") : "HTTP {$status}"),
    ];
}

/**
 * Authenticated GET against KuberOne API.
 *
 * @return array{ok:bool, status?:int, body?:array, error?:string}
 */
function api_kuberone_request_auth_get(array $config, string $path, string $accessToken): array
{
    $base = api_kuberone_normalize_base((string) ($config['kuberone_api_base'] ?? ''));
    if ($base === '') {
        return ['ok' => false, 'error' => 'kuberone_api_base not configured'];
    }

    $url = $base . $path;
    $headers = [
        'Accept: application/json',
        'Authorization: Bearer ' . $accessToken,
    ];

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_HTTPGET => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_CONNECTTIMEOUT => 4,
        ]);
        $raw = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);
        if ($raw === false) {
            return ['ok' => false, 'error' => $err ?: 'curl failed', 'status' => $status];
        }
        $decoded = json_decode($raw, true);
        return [
            'ok' => $status >= 200 && $status < 300,
            'status' => $status,
            'body' => is_array($decoded) ? $decoded : ['raw' => $raw],
        ];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => implode("\r\n", $headers),
            'timeout' => 8,
            'ignore_errors' => true,
        ],
    ]);
    $raw = @file_get_contents($url, false, $context);
    $status = 0;
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
        $status = (int) $m[1];
    }
    if ($raw === false) {
        return ['ok' => false, 'error' => 'HTTP request failed', 'status' => $status];
    }
    $decoded = json_decode($raw, true);
    return [
        'ok' => $status >= 200 && $status < 300,
        'status' => $status,
        'body' => is_array($decoded) ? $decoded : ['raw' => $raw],
    ];
}

/**
 * After a website/mobile lead is saved locally, mirror it into KuberOne Admin.
 *
 * @return array{ok:bool, skipped?:bool, status?:int, error?:string, leadNumber?:string}
 */
function api_kuberone_sync_lead(array $config, array $data, array $localLead): array
{
    if (!api_kuberone_enabled($config)) {
        return ['ok' => true, 'skipped' => true];
    }

    $fields = isset($data['fields']) && is_array($data['fields']) ? $data['fields'] : $data;
    $payload = [
        'form_type' => $data['form_type'] ?? $data['formType'] ?? ($localLead['form_type'] ?? 'Lead'),
        'source' => $data['source'] ?? ($localLead['source'] ?? null),
        'page_url' => $data['page_url'] ?? $fields['page_url'] ?? ($localLead['page_url'] ?? null),
        'fields' => array_merge($fields, [
            'full_name' => $localLead['full_name'] ?? ($fields['full_name'] ?? null),
            'phone' => $localLead['phone'] ?? ($fields['phone'] ?? null),
            'email' => $localLead['email'] ?? ($fields['email'] ?? null),
            'loan_type' => $localLead['loan_type'] ?? ($fields['loan_type'] ?? null),
            'loan_amount' => $localLead['loan_amount'] ?? ($fields['loan_amount'] ?? null),
            'external_lead_id' => $localLead['external_lead_id'] ?? ($fields['external_lead_id'] ?? $fields['lead_id'] ?? null),
            'partner_id' => $localLead['partner_id'] ?? ($fields['partner_id'] ?? null),
            'crm_channel' => $localLead['crm_channel'] ?? ($fields['crm_channel'] ?? 'website'),
        ]),
    ];

    $result = api_kuberone_request($config, 'POST', '/api/v1/public/website/leads', $payload);
    if (!$result['ok']) {
        error_log('[kuberone-bridge] lead sync failed: ' . ($result['error'] ?? ('HTTP ' . ($result['status'] ?? 0))));
        return [
            'ok' => false,
            'status' => $result['status'] ?? 0,
            'error' => $result['error'] ?? 'KuberOne lead sync failed',
        ];
    }

    $leadNumber = $result['body']['data']['lead']['leadNumber'] ?? null;
    return ['ok' => true, 'status' => $result['status'] ?? 201, 'leadNumber' => is_string($leadNumber) ? $leadNumber : null];
}

/**
 * After a partner application is saved locally, mirror into KuberOne partners.
 *
 * @return array{ok:bool, skipped?:bool, status?:int, error?:string, duplicate?:bool}
 */
function api_kuberone_sync_partner(array $config, array $partner): array
{
    if (!api_kuberone_enabled($config)) {
        return ['ok' => true, 'skipped' => true];
    }

    $phone = preg_replace('/\D+/', '', (string) ($partner['phone'] ?? ''));
    if (strlen($phone) === 12 && substr($phone, 0, 2) === '91') {
        $phone = substr($phone, 2);
    }

    $payload = [
        'contactName' => $partner['full_name'] ?? '',
        'phone' => $phone,
        'email' => $partner['email'] ?? null,
        'businessName' => $partner['company_name']
            ?: ($partner['business_type'] ?? null)
            ?: ($partner['full_name'] ?? null),
        'partnerTypeCode' => 'DSA',
        'city' => $partner['city'] ?? null,
        'state' => $partner['state'] ?? null,
        'businessType' => $partner['business_type'] ?? null,
        'experience' => $partner['experience'] ?? null,
        'message' => $partner['message'] ?? null,
        'pageUrl' => $partner['page_url'] ?? null,
        'source' => $partner['source'] ?? 'website-become-partner',
    ];

    $result = api_kuberone_request($config, 'POST', '/api/v1/public/website/partners', $payload);
    if (!$result['ok']) {
        $msg = $result['body']['error']['message'] ?? $result['error'] ?? ('HTTP ' . ($result['status'] ?? 0));
        error_log('[kuberone-bridge] partner sync failed: ' . $msg);
        return [
            'ok' => false,
            'status' => $result['status'] ?? 0,
            'error' => is_string($msg) ? $msg : 'KuberOne partner sync failed',
        ];
    }

    $duplicate = (bool) ($result['body']['data']['duplicate'] ?? false);
    $partnerCode = $result['body']['data']['partner']['partnerCode']
        ?? $result['body']['data']['partner']['partner_code']
        ?? null;

    return [
        'ok' => true,
        'status' => $result['status'] ?? 201,
        'duplicate' => $duplicate,
        'partnerCode' => is_string($partnerCode) ? $partnerCode : null,
        'partnerStatus' => is_string($result['body']['data']['partner']['status'] ?? null)
            ? $result['body']['data']['partner']['status']
            : null,
    ];
}

/**
 * Partner OTP login via KuberOne public website partner-auth endpoint.
 * Accepts mobile, email, or Partner Code; OTP is sent to registered mobile.
 *
 * @return array{ok:bool, skipped?:bool, token?:string, refresh_token?:string|null, partner?:array, error?:string, otp_sent?:bool, message?:string, must_change_password?:bool, phone_hint?:string}
 */
function api_kuberone_partner_otp(array $config, string $mode, string $identifier, ?string $otp = null): array
{
    if (empty($config['kuberone_partner_auth_enabled']) || !api_kuberone_enabled($config)) {
        return ['ok' => false, 'skipped' => true, 'error' => 'KuberOne partner auth disabled'];
    }

    $identifier = trim($identifier);
    if ($identifier === '') {
        return ['ok' => false, 'error' => 'Mobile, email, or Partner Code is required'];
    }

    $payload = [
        'mode' => $mode,
        'identifier' => $identifier,
    ];
    if ($otp !== null && $otp !== '') {
        $payload['otp'] = $otp;
    }

    // OTP request returns after queueing email (fast). Verify may still need a bit more time.
    $timeout = $mode === 'otp_request' ? 12 : 20;
    $result = api_kuberone_request($config, 'POST', '/api/v1/public/website/partner-auth', $payload, $timeout);
    if (!$result['ok']) {
        $msg = $result['body']['error']['message'] ?? $result['error'] ?? 'KuberOne login failed';
        return [
            'ok' => false,
            'error' => is_string($msg) ? $msg : 'KuberOne login failed',
        ];
    }

    $data = $result['body']['data'] ?? [];

    if ($mode === 'otp_request') {
        return [
            'ok' => true,
            'otp_sent' => true,
            'message' => $data['message'] ?? 'OTP sent to your registered mobile number.',
            'phone_hint' => $data['phone_hint'] ?? null,
            'email_hint' => $data['email_hint'] ?? null,
            'email_sent' => (bool) ($data['email_sent'] ?? false),
            'phone_bypass_otp' => $data['phone_bypass_otp'] ?? null,
            'dev_otp' => $data['phone_bypass_otp'] ?? null,
        ];
    }

    if ($mode === 'otp') {
        $accessToken = $data['accessToken'] ?? ($data['token'] ?? null);
        if (!is_string($accessToken) || $accessToken === '') {
            return ['ok' => false, 'error' => 'KuberOne login did not return an access token'];
        }

        $partner = $data['partner'] ?? [
            'id' => 0,
            'partner_id' => null,
            'full_name' => 'Partner',
            'email' => '',
            'phone' => '',
            'city' => null,
            'state' => null,
            'business_type' => null,
            'status' => 'approved',
            'created_at' => date('c'),
        ];

        return [
            'ok' => true,
            'token' => $accessToken,
            'refresh_token' => is_string($data['refreshToken'] ?? null) ? $data['refreshToken'] : null,
            'partner' => $partner,
            'must_change_password' => (bool) ($data['must_change_password'] ?? false),
        ];
    }

    return ['ok' => false, 'error' => 'Unsupported mode'];
}

/**
 * Sync website visitor interest capture to KuberOne.
 *
 * @return array{ok:bool, skipped?:bool, duplicate?:bool, status?:int, error?:string}
 */
function api_kuberone_sync_visitor(array $config, array $data): array
{
    if (!api_kuberone_enabled($config)) {
        return ['ok' => true, 'skipped' => true];
    }

    $payload = [
        'city' => $data['city'] ?? null,
        'name' => $data['name'] ?? null,
        'phone' => $data['phone'] ?? null,
        'email' => $data['email'] ?? null,
        'page_url' => $data['page_url'] ?? null,
        'referrer' => $data['referrer'] ?? null,
        'utm_source' => $data['utm_source'] ?? null,
        'utm_medium' => $data['utm_medium'] ?? null,
        'utm_campaign' => $data['utm_campaign'] ?? null,
        'session_id' => $data['session_id'] ?? null,
        'external_visitor_id' => $data['external_visitor_id'] ?? null,
    ];

    $result = api_kuberone_request($config, 'POST', '/api/v1/public/website/visitors', $payload);
    if (!$result['ok']) {
        $msg = $result['body']['error']['message'] ?? $result['error'] ?? ('HTTP ' . ($result['status'] ?? 0));
        error_log('[kuberone-bridge] visitor sync failed: ' . (is_string($msg) ? $msg : 'failed'));
        return [
            'ok' => false,
            'status' => $result['status'] ?? 0,
            'error' => is_string($msg) ? $msg : 'KuberOne visitor sync failed',
        ];
    }

    $duplicate = (bool) ($result['body']['data']['duplicate'] ?? false);
    return ['ok' => true, 'status' => $result['status'] ?? 201, 'duplicate' => $duplicate];
}
