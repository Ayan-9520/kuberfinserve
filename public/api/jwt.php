<?php

declare(strict_types=1);

function api_jwt_encode(array $payload, string $secret, int $ttlSeconds = 259200): string
{
    $header = ['alg' => 'HS256', 'typ' => 'JWT'];
    $now = time();
    $payload = array_merge($payload, [
        'iat' => $now,
        'exp' => $now + $ttlSeconds,
    ]);

    $segments = [
        api_jwt_base64url(json_encode($header, JSON_UNESCAPED_UNICODE)),
        api_jwt_base64url(json_encode($payload, JSON_UNESCAPED_UNICODE)),
    ];
    $signingInput = implode('.', $segments);
    $signature = hash_hmac('sha256', $signingInput, $secret, true);
    $segments[] = api_jwt_base64url($signature);

    return implode('.', $segments);
}

function api_jwt_decode(string $token, string $secret): ?array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }

    [$headerB64, $payloadB64, $sigB64] = $parts;
    $signingInput = $headerB64 . '.' . $payloadB64;
    $expected = api_jwt_base64url(hash_hmac('sha256', $signingInput, $secret, true));

    if (!hash_equals($expected, $sigB64)) {
        return null;
    }

    $payloadJson = api_jwt_base64url_decode($payloadB64);
    $payload = json_decode($payloadJson, true);
    if (!is_array($payload)) {
        return null;
    }

    if (!empty($payload['exp']) && time() >= (int) $payload['exp']) {
        return null;
    }

    return $payload;
}

function api_jwt_base64url(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function api_jwt_base64url_decode(string $data): string
{
    $remainder = strlen($data) % 4;
    if ($remainder > 0) {
        $data .= str_repeat('=', 4 - $remainder);
    }

    $decoded = base64_decode(strtr($data, '-_', '+/'), true);
    return $decoded === false ? '' : $decoded;
}

function api_jwt_bearer_token(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if ($header === '' && function_exists('getallheaders')) {
        foreach (getallheaders() as $key => $value) {
            if (strcasecmp($key, 'Authorization') === 0) {
                $header = $value;
                break;
            }
        }
    }

    if (preg_match('/^Bearer\s+(\S+)$/i', trim($header), $m)) {
        return $m[1];
    }

    return null;
}
