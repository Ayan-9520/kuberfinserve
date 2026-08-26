<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';
require __DIR__ . '/partner_helpers.php';
require __DIR__ . '/partner_notify.php';
require __DIR__ . '/kuberone_bridge.php';

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

$mode = strtolower(api_str($data['mode'] ?? 'password', 20) ?? 'password');
$identifier = api_str($data['identifier'] ?? $data['email'] ?? $data['partner_id'] ?? null, 150);
$password = (string) ($data['password'] ?? '');
$otp = api_str($data['otp'] ?? null, 10);

if (!$identifier) {
    api_json_response(['ok' => false, 'error' => 'Mobile, email, or Partner Code is required'], 422);
}

// KuberOne OTP path (DSA-aligned) when enabled — accepts mobile / email / Partner Code
if (
    !empty($config['kuberone_partner_auth_enabled'])
    && in_array($mode, ['otp_request', 'otp'], true)
) {
    $kAuth = api_kuberone_partner_otp($config, $mode, $identifier, $otp);
    if (!empty($kAuth['skipped'])) {
        // fall through to Hostinger partner auth
    } elseif (!$kAuth['ok']) {
        api_json_response(['ok' => false, 'error' => $kAuth['error'] ?? 'KuberOne login failed'], 401);
    } elseif ($mode === 'otp_request') {
        api_json_response([
            'ok' => true,
            'message' => $kAuth['message'] ?? 'OTP sent.',
            'otp_sent' => true,
            'phone_hint' => $kAuth['phone_hint'] ?? null,
            'auth_via' => 'kuberone',
        ]);
    } else {
        api_json_response([
            'ok' => true,
            'token' => $kAuth['token'],
            'refresh_token' => $kAuth['refresh_token'] ?? null,
            'partner' => $kAuth['partner'],
            'must_change_password' => (bool) ($kAuth['must_change_password'] ?? false),
            'auth_via' => 'kuberone',
        ]);
    }
}

try {
    $pdo = api_db($config);
    $partner = api_partner_find_by_identifier($pdo, $identifier);

    if (!$partner) {
        api_json_response(['ok' => false, 'error' => 'Invalid credentials'], 401);
    }

    $partnerRowId = (int) $partner['id'];
    $status = (string) $partner['status'];

    if ($status !== 'approved') {
        api_partner_log_audit(
            $pdo,
            $partnerRowId,
            'login_failed',
            $status,
            $status,
            $identifier,
            'Login blocked — status not approved',
        );
        api_json_response(['ok' => false, 'error' => api_partner_status_message($status)], 403);
    }

    if ($mode === 'otp_request') {
        $otpCode = api_partner_generate_otp();
        $otpHash = api_partner_hash_password($otpCode);
        $expires = date('Y-m-d H:i:s', time() + 600);

        $upd = $pdo->prepare(
            'UPDATE partners SET otp_hash = :hash, otp_expires_at = :exp WHERE id = :id',
        );
        $upd->execute(['hash' => $otpHash, 'exp' => $expires, 'id' => $partnerRowId]);

        api_partner_send_otp_sms($partner['phone'], $otpCode, $config);

        api_json_response([
            'ok' => true,
            'message' => 'OTP sent to your registered mobile number.',
            'otp_sent' => true,
        ]);
    }

    if ($mode === 'otp') {
        if (!$otp) {
            api_json_response(['ok' => false, 'error' => 'OTP is required'], 422);
        }

        $otpHash = $partner['otp_hash'] ?? '';
        $otpExp = $partner['otp_expires_at'] ?? null;

        if (!$otpHash || !$otpExp || strtotime((string) $otpExp) < time()) {
            api_json_response(['ok' => false, 'error' => 'OTP expired. Please request a new one.'], 401);
        }

        if (!api_partner_verify_password($otp, (string) $otpHash)) {
            api_partner_log_audit($pdo, $partnerRowId, 'login_failed', $status, $status, $identifier, 'Invalid OTP');
            api_json_response(['ok' => false, 'error' => 'Invalid OTP'], 401);
        }

        $clr = $pdo->prepare('UPDATE partners SET otp_hash = NULL, otp_expires_at = NULL WHERE id = :id');
        $clr->execute(['id' => $partnerRowId]);

        $token = api_partner_issue_jwt($partner, $config);
        api_partner_log_audit($pdo, $partnerRowId, 'login_success', $status, $status, $identifier, 'OTP login');

        api_json_response([
            'ok' => true,
            'token' => $token,
            'partner' => api_partner_public_row($partner),
            'must_change_password' => (bool) $partner['must_change_password'],
        ]);
    }

    // Password login (default)
    if ($password === '') {
        api_json_response(['ok' => false, 'error' => 'Password is required'], 422);
    }

    $hash = (string) ($partner['password_hash'] ?? '');
    if (!$hash || !api_partner_verify_password($password, $hash)) {
        api_partner_log_audit(
            $pdo,
            $partnerRowId,
            'login_failed',
            $status,
            $status,
            $identifier,
            'Invalid password',
        );
        api_json_response(['ok' => false, 'error' => 'Invalid credentials'], 401);
    }

    $token = api_partner_issue_jwt($partner, $config);
    api_partner_log_audit($pdo, $partnerRowId, 'login_success', $status, $status, $identifier, 'Password login');

    api_json_response([
        'ok' => true,
        'token' => $token,
        'partner' => api_partner_public_row($partner),
        'must_change_password' => (bool) $partner['must_change_password'],
    ]);
} catch (Throwable $e) {
    error_log('[partner-login] ' . $e->getMessage());
    api_json_response(['ok' => false, 'error' => 'Login failed. Please try again later.'], 500);
}
