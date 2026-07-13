<?php

declare(strict_types=1);

/**
 * Dual-write bridge: Hostinger CRM → KuberOne Admin API.
 * Failures are logged only — local MySQL + email remain source of truth for the website.
 */

function api_kuberone_enabled(array $config): bool
{
    $base = trim((string) ($config['kuberone_api_base'] ?? ''));
    return $base !== '' && !empty($config['kuberone_bridge_enabled']);
}

/**
 * @return array{ok:bool, status?:int, body?:array, error?:string}
 */
function api_kuberone_request(array $config, string $method, string $path, array $payload): array
{
    $base = rtrim((string) ($config['kuberone_api_base'] ?? ''), '/');
    if ($base === '') {
        return ['ok' => false, 'error' => 'kuberone_api_base not configured'];
    }

    $url = $base . $path;
    $headers = [
        'Content-Type: application/json',
        'Accept: application/json',
    ];
    $apiKey = trim((string) ($config['kuberone_api_key'] ?? ''));
    if ($apiKey !== '') {
        $headers[] = 'X-Website-Api-Key: ' . $apiKey;
    }

    $body = json_encode($payload, JSON_UNESCAPED_UNICODE);
    if ($body === false) {
        return ['ok' => false, 'error' => 'JSON encode failed'];
    }

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_CUSTOMREQUEST => strtoupper($method),
            CURLOPT_POSTFIELDS => $body,
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
            'method' => strtoupper($method),
            'header' => implode("\r\n", $headers),
            'content' => $body,
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
 * Authenticated GET against KuberOne API.
 *
 * @return array{ok:bool, status?:int, body?:array, error?:string}
 */
function api_kuberone_request_auth_get(array $config, string $path, string $accessToken): array
{
    $base = rtrim((string) ($config['kuberone_api_base'] ?? ''), '/');
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
        'businessName' => $partner['company_name'] ?? null,
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
    return ['ok' => true, 'status' => $result['status'] ?? 201, 'duplicate' => $duplicate];
}

/**
 * Optional partner OTP login via KuberOne (aligned with DSA app auth).
 * Hostinger password login remains unchanged.
 *
 * @return array{ok:bool, skipped?:bool, token?:string, partner?:array, error?:string, otp_sent?:bool, message?:string, must_change_password?:bool}
 */
function api_kuberone_partner_otp(array $config, string $mode, string $phone, ?string $otp = null): array
{
    if (empty($config['kuberone_partner_auth_enabled']) || !api_kuberone_enabled($config)) {
        return ['ok' => false, 'skipped' => true, 'error' => 'KuberOne partner auth disabled'];
    }

    $digits = preg_replace('/\D+/', '', $phone);
    if (strlen($digits) === 12 && substr($digits, 0, 2) === '91') {
        $digits = substr($digits, 2);
    }
    if (!preg_match('/^[6-9]\d{9}$/', $digits)) {
        return ['ok' => false, 'error' => 'Valid 10-digit mobile required for KuberOne OTP'];
    }

    if ($mode === 'otp_request') {
        $result = api_kuberone_request($config, 'POST', '/api/v1/auth/send-otp', [
            'phone' => $digits,
            'purpose' => 'LOGIN',
        ]);
        if (!$result['ok']) {
            return [
                'ok' => false,
                'error' => $result['body']['error']['message'] ?? $result['error'] ?? 'Could not send OTP',
            ];
        }
        return [
            'ok' => true,
            'otp_sent' => true,
            'message' => 'OTP sent via KuberOne. Use the code on your registered mobile.',
        ];
    }

    if ($mode === 'otp') {
        $result = api_kuberone_request($config, 'POST', '/api/v1/auth/login', [
            'loginType' => 'partner',
            'phone' => $digits,
            'otp' => $otp,
            'device' => [
                'deviceId' => 'kuberfinserve-web',
                'platform' => 'WEB',
                'appVersion' => 'website',
            ],
        ]);
        if (!$result['ok']) {
            return [
                'ok' => false,
                'error' => $result['body']['error']['message'] ?? $result['error'] ?? 'OTP login failed',
            ];
        }

        $data = $result['body']['data'] ?? [];
        $accessToken = $data['accessToken'] ?? ($data['tokens']['accessToken'] ?? null);
        if (!is_string($accessToken) || $accessToken === '') {
            return ['ok' => false, 'error' => 'KuberOne login did not return an access token'];
        }

        $me = api_kuberone_request_auth_get($config, '/api/v1/auth/me', $accessToken);
        $user = $me['body']['data'] ?? [];

        return [
            'ok' => true,
            'token' => $accessToken,
            'partner' => [
                'id' => 0,
                'partner_id' => $user['partnerId'] ?? ($user['partnerCode'] ?? null),
                'full_name' => $user['name'] ?? ($user['fullName'] ?? ($user['contactName'] ?? 'Partner')),
                'email' => $user['email'] ?? '',
                'phone' => $digits,
                'city' => null,
                'state' => null,
                'business_type' => null,
                'status' => 'approved',
                'created_at' => date('c'),
            ],
            'must_change_password' => false,
        ];
    }

    return ['ok' => false, 'error' => 'Unsupported mode'];
}
