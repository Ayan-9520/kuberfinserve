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

if (!empty($data['_gotcha']) || !empty($data['website'])) {
    api_json_response(['ok' => true, 'id' => 0]);
}

$fields = isset($data['fields']) && is_array($data['fields']) ? $data['fields'] : $data;

$fullName = api_str($fields['full_name'] ?? $fields['fullName'] ?? $fields['name'] ?? null, 150);
$phone = api_normalize_phone(api_str($fields['phone'] ?? null, 20));
$email = strtolower(api_str($fields['email'] ?? null, 150) ?? '');
$city = api_str($fields['city'] ?? null, 100);
$state = api_str($fields['state'] ?? null, 100);
$companyName = api_str($fields['company_name'] ?? $fields['companyName'] ?? null, 150);
$businessType = api_str($fields['business_type'] ?? $fields['businessType'] ?? $fields['role'] ?? null, 80);
$experience = api_str($fields['experience'] ?? null, 80);
$message = api_str($fields['message'] ?? null, 5000);
$source = api_str($data['source'] ?? null, 120);
$pageUrl = api_str($data['page_url'] ?? $fields['page_url'] ?? $fields['pageUrl'] ?? null, 500);

if (!$fullName || mb_strlen($fullName) < 2) {
    api_json_response(['ok' => false, 'error' => 'Full name is required'], 422);
}
if (!$phone) {
    api_json_response(['ok' => false, 'error' => 'Valid 10-digit Indian mobile number required'], 422);
}
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    api_json_response(['ok' => false, 'error' => 'Valid email required'], 422);
}
if (!$city) {
    api_json_response(['ok' => false, 'error' => 'City is required'], 422);
}
if (!$state) {
    api_json_response(['ok' => false, 'error' => 'State is required'], 422);
}
if (!$businessType) {
    api_json_response(['ok' => false, 'error' => 'Business type is required'], 422);
}

try {
    $pdo = api_db($config);

    $dup = $pdo->prepare('SELECT id, status FROM partners WHERE phone = :phone OR email = :email LIMIT 1');
    $dup->execute(['phone' => $phone, 'email' => $email]);
    $existing = $dup->fetch();

    if ($existing) {
        if ($existing['status'] === 'pending') {
            api_json_response([
                'ok' => false,
                'error' => 'An application with this email or mobile is already pending review.',
            ], 409);
        }
        if ($existing['status'] === 'approved') {
            api_json_response([
                'ok' => false,
                'error' => 'This email or mobile is already registered as an approved partner.',
            ], 409);
        }
        api_json_response([
            'ok' => false,
            'error' => 'This email or mobile was used in a previous application. Please contact support.',
        ], 409);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO partners (
            full_name, phone, email, city, state, company_name, business_type,
            experience, message, status, source, page_url, ip_address, user_agent
        ) VALUES (
            :full_name, :phone, :email, :city, :state, :company_name, :business_type,
            :experience, :message, :status, :source, :page_url, :ip_address, :user_agent
        )',
    );

    $stmt->execute([
        'full_name' => $fullName,
        'phone' => $phone,
        'email' => $email,
        'city' => $city,
        'state' => $state,
        'company_name' => $companyName,
        'business_type' => $businessType,
        'experience' => $experience,
        'message' => $message,
        'status' => 'pending',
        'source' => $source,
        'page_url' => $pageUrl,
        'ip_address' => api_client_ip(),
        'user_agent' => api_str($_SERVER['HTTP_USER_AGENT'] ?? null, 255),
    ]);

    $partnerId = (int) $pdo->lastInsertId();

    api_partner_log_audit($pdo, $partnerId, 'registered', null, 'pending', 'system', 'Partner registration submitted');

    $partner = [
        'id' => $partnerId,
        'full_name' => $fullName,
        'phone' => $phone,
        'email' => $email,
        'city' => $city,
        'state' => $state,
        'company_name' => $companyName,
        'business_type' => $businessType,
        'experience' => $experience,
        'message' => $message,
        'created_at' => date('Y-m-d H:i:s'),
    ];

    $adminSent = api_partner_notify_admin_new($partner, $config);
    $userSent = api_partner_notify_registration_received($partner, $config);

    $kuberone = api_kuberone_sync_partner($config, array_merge($partner, [
        'page_url' => $pageUrl,
        'source' => $source,
    ]));

    api_json_response([
        'ok' => true,
        'id' => $partnerId,
        'status' => 'pending',
        'message' => 'Application submitted successfully. Our verification team will contact you soon.',
        'notifications' => [
            'admin_email' => $adminSent,
            'user_email' => $userSent,
        ],
        'kuberone' => [
            'synced' => (bool) ($kuberone['ok'] ?? false),
            'skipped' => (bool) ($kuberone['skipped'] ?? false),
            'duplicate' => (bool) ($kuberone['duplicate'] ?? false),
            'error' => $kuberone['error'] ?? null,
        ],
    ]);
} catch (Throwable $e) {
    error_log('[save-partner] ' . $e->getMessage());
    api_json_response(['ok' => false, 'error' => 'Could not save partner application. Please try again later.'], 500);
}
