<?php

declare(strict_types=1);

/**
 * KuberOne Admin → Hostinger MySQL status sync.
 * Called when a partner is approved/rejected in kuberone.online/partners.
 *
 * POST /api/partner-status-sync.php
 * Header: X-Website-Api-Key: (same as kuberone_api_key in config.php)
 */
require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';
require __DIR__ . '/partner_helpers.php';
require __DIR__ . '/partner_notify.php';

api_handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    api_json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
}

$config = api_load_config();
$apiKey = trim((string) ($config['kuberone_api_key'] ?? ''));
$provided = trim((string) ($_SERVER['HTTP_X_WEBSITE_API_KEY'] ?? ''));

if ($apiKey === '' || $provided === '' || !hash_equals($apiKey, $provided)) {
    api_json_response(['ok' => false, 'error' => 'Unauthorized'], 401);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    api_json_response(['ok' => false, 'error' => 'Invalid JSON body'], 400);
}

$status = strtolower(api_str($data['status'] ?? null, 20) ?? '');
if (!in_array($status, ['approved', 'rejected', 'suspended'], true)) {
    api_json_response(['ok' => false, 'error' => 'status must be approved, rejected, or suspended'], 422);
}

$partnerCode = api_str($data['partner_code'] ?? $data['partner_id'] ?? null, 40);
$email = strtolower(api_str($data['email'] ?? null, 150) ?? '');
$phone = api_normalize_phone(api_str($data['phone'] ?? null, 20));
$notify = !empty($data['notify']);

if (!$partnerCode && !$email && !$phone) {
    api_json_response(['ok' => false, 'error' => 'partner_code, email, or phone required'], 422);
}

try {
    $pdo = api_db($config);

    $partner = null;
    if ($partnerCode) {
        $stmt = $pdo->prepare('SELECT * FROM partners WHERE partner_id = :code LIMIT 1');
        $stmt->execute(['code' => $partnerCode]);
        $partner = $stmt->fetch() ?: null;
    }
    if (!$partner && $email !== '') {
        $stmt = $pdo->prepare('SELECT * FROM partners WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $partner = $stmt->fetch() ?: null;
    }
    if (!$partner && $phone) {
        $stmt = $pdo->prepare('SELECT * FROM partners WHERE phone = :phone LIMIT 1');
        $stmt->execute(['phone' => $phone]);
        $partner = $stmt->fetch() ?: null;
    }

    if (!$partner) {
        api_json_response(['ok' => true, 'synced' => false, 'message' => 'Partner not found on website DB (skipped).']);
    }

    $rowId = (int) $partner['id'];
    $oldStatus = (string) $partner['status'];
    if ($oldStatus === $status) {
        api_json_response([
            'ok' => true,
            'synced' => true,
            'message' => 'Already ' . $status,
            'partner_row_id' => $rowId,
        ]);
    }

    $pdo->beginTransaction();
    $tempPassword = null;
    $notifications = null;

    if ($status === 'approved') {
        $generatedId = $partner['partner_id'] ?: ($partnerCode ?: api_partner_generate_id($pdo));
        $tempPassword = api_partner_generate_temp_password();
        $passwordHash = api_partner_hash_password($tempPassword);

        $upd = $pdo->prepare(
            'UPDATE partners SET
                partner_id = :partner_id,
                password_hash = :password_hash,
                must_change_password = 1,
                status = :status,
                approved_at = NOW(),
                approved_by = :by,
                rejected_at = NULL,
                rejected_by = NULL,
                suspended_at = NULL,
                suspended_by = NULL
             WHERE id = :id',
        );
        $upd->execute([
            'partner_id' => $generatedId,
            'password_hash' => $passwordHash,
            'status' => 'approved',
            'by' => 'kuberone-admin',
            'id' => $rowId,
        ]);

        $partner['partner_id'] = $generatedId;
        $partner['status'] = 'approved';

        if ($notify) {
            $notifications = api_partner_notify_approved($partner, $tempPassword, $config);
        }

        api_partner_log_audit(
            $pdo,
            $rowId,
            'approved',
            $oldStatus,
            'approved',
            'kuberone-admin',
            'Synced from KuberOne Admin' . ($notifications ? '. Notifications: ' . json_encode($notifications) : ''),
        );
    } elseif ($status === 'rejected') {
        $upd = $pdo->prepare(
            'UPDATE partners SET status = :status, rejected_at = NOW(), rejected_by = :by WHERE id = :id',
        );
        $upd->execute(['status' => 'rejected', 'by' => 'kuberone-admin', 'id' => $rowId]);
        if ($notify) {
            api_partner_notify_rejected($partner, $config);
        }
        api_partner_log_audit($pdo, $rowId, 'rejected', $oldStatus, 'rejected', 'kuberone-admin', 'Synced from KuberOne Admin');
    } else {
        $upd = $pdo->prepare(
            'UPDATE partners SET status = :status, suspended_at = NOW(), suspended_by = :by WHERE id = :id',
        );
        $upd->execute(['status' => 'suspended', 'by' => 'kuberone-admin', 'id' => $rowId]);
        api_partner_log_audit($pdo, $rowId, 'suspended', $oldStatus, 'suspended', 'kuberone-admin', 'Synced from KuberOne Admin');
    }

    $pdo->commit();

    api_json_response([
        'ok' => true,
        'synced' => true,
        'partner_row_id' => $rowId,
        'old_status' => $oldStatus,
        'new_status' => $status,
        'partner_code' => $partner['partner_id'] ?? $partnerCode,
        'notified' => (bool) $notifications,
    ]);
} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('[partner-status-sync] ' . $e->getMessage());
    api_json_response(['ok' => false, 'error' => 'Sync failed'], 500);
}
