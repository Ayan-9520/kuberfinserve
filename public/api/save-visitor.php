<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/db.php';
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

// Honeypot
if (!empty($data['_gotcha']) || !empty($data['website'])) {
    api_json_response(['ok' => true, 'id' => 0, 'saved' => 'honeypot']);
}

$city = trim((string) ($data['city'] ?? ''));
if (strlen($city) < 2) {
    api_json_response(['ok' => false, 'error' => 'City is required'], 422);
}

$name = trim((string) ($data['name'] ?? ''));
$phoneRaw = trim((string) ($data['phone'] ?? ''));
$emailRaw = trim((string) ($data['email'] ?? ''));

$phone = null;
if ($phoneRaw !== '') {
    $digits = preg_replace('/\D+/', '', $phoneRaw) ?? '';
    if (strlen($digits) === 12 && str_starts_with($digits, '91')) {
        $digits = substr($digits, 2);
    }
    if (strlen($digits) === 11 && str_starts_with($digits, '0')) {
        $digits = substr($digits, 1);
    }
    if (!preg_match('/^[6-9]\d{9}$/', $digits)) {
        api_json_response(['ok' => false, 'error' => 'Valid 10-digit Indian mobile number required'], 422);
    }
    $phone = $digits;
}

$email = null;
if ($emailRaw !== '') {
    if (!filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
        api_json_response(['ok' => false, 'error' => 'Valid email required'], 422);
    }
    $email = strtolower($emailRaw);
}

$externalId = trim((string) ($data['external_visitor_id'] ?? ''));
if ($externalId === '') {
    try {
        $externalId = bin2hex(random_bytes(16));
    } catch (Throwable $e) {
        $externalId = uniqid('vis_', true);
    }
}

$sessionId = trim((string) ($data['session_id'] ?? ''));
$pageUrl = trim((string) ($data['page_url'] ?? ''));
$referrer = trim((string) ($data['referrer'] ?? ''));
$utmSource = trim((string) ($data['utm_source'] ?? ''));
$utmMedium = trim((string) ($data['utm_medium'] ?? ''));
$utmCampaign = trim((string) ($data['utm_campaign'] ?? ''));

$localId = 0;
$duplicate = false;

try {
    $pdo = api_db($config);

    // Ensure table exists lightly — migration should be run; this is a soft create for new deploys
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS website_visitors (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            external_visitor_id VARCHAR(64) NULL,
            city VARCHAR(100) NOT NULL,
            name VARCHAR(200) NULL,
            phone VARCHAR(15) NULL,
            email VARCHAR(255) NULL,
            page_url VARCHAR(500) NULL,
            referrer VARCHAR(500) NULL,
            utm_source VARCHAR(120) NULL,
            utm_medium VARCHAR(120) NULL,
            utm_campaign VARCHAR(120) NULL,
            session_id VARCHAR(64) NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uk_external_visitor_id (external_visitor_id),
            KEY idx_city (city),
            KEY idx_phone (phone),
            KEY idx_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
    );

    $existing = null;
    $stmt = $pdo->prepare('SELECT id FROM website_visitors WHERE external_visitor_id = ? LIMIT 1');
    $stmt->execute([$externalId]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        $duplicate = true;
        $localId = (int) $existing['id'];
        $upd = $pdo->prepare(
            'UPDATE website_visitors SET city = ?, name = COALESCE(NULLIF(?, ""), name), phone = COALESCE(NULLIF(?, ""), phone),
             email = COALESCE(NULLIF(?, ""), email), page_url = COALESCE(NULLIF(?, ""), page_url),
             referrer = COALESCE(NULLIF(?, ""), referrer), utm_source = COALESCE(NULLIF(?, ""), utm_source),
             utm_medium = COALESCE(NULLIF(?, ""), utm_medium), utm_campaign = COALESCE(NULLIF(?, ""), utm_campaign),
             session_id = COALESCE(NULLIF(?, ""), session_id) WHERE id = ?'
        );
        $upd->execute([
            $city,
            $name,
            $phone ?? '',
            $email ?? '',
            $pageUrl,
            $referrer,
            $utmSource,
            $utmMedium,
            $utmCampaign,
            $sessionId,
            $localId,
        ]);
    } else {
        $ins = $pdo->prepare(
            'INSERT INTO website_visitors
            (external_visitor_id, city, name, phone, email, page_url, referrer, utm_source, utm_medium, utm_campaign, session_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $ins->execute([
            $externalId,
            $city,
            $name !== '' ? $name : null,
            $phone,
            $email,
            $pageUrl !== '' ? $pageUrl : null,
            $referrer !== '' ? $referrer : null,
            $utmSource !== '' ? $utmSource : null,
            $utmMedium !== '' ? $utmMedium : null,
            $utmCampaign !== '' ? $utmCampaign : null,
            $sessionId !== '' ? $sessionId : null,
        ]);
        $localId = (int) $pdo->lastInsertId();
    }
} catch (Throwable $e) {
    error_log('[save-visitor] local save: ' . $e->getMessage());
    // Continue — still try KuberOne sync; local failure should not block CRM if possible
}

$kuberone = api_kuberone_sync_visitor($config, [
    'city' => $city,
    'name' => $name !== '' ? $name : null,
    'phone' => $phone,
    'email' => $email,
    'page_url' => $pageUrl !== '' ? $pageUrl : null,
    'referrer' => $referrer !== '' ? $referrer : null,
    'utm_source' => $utmSource !== '' ? $utmSource : null,
    'utm_medium' => $utmMedium !== '' ? $utmMedium : null,
    'utm_campaign' => $utmCampaign !== '' ? $utmCampaign : null,
    'session_id' => $sessionId !== '' ? $sessionId : null,
    'external_visitor_id' => $externalId,
]);

if ($localId === 0 && empty($kuberone['ok']) && empty($kuberone['skipped'])) {
    api_json_response([
        'ok' => false,
        'error' => 'Could not save visitor. Check database config and website_visitors table.',
    ], 500);
}

api_json_response([
    'ok' => true,
    'id' => $localId,
    'duplicate' => $duplicate || (bool) ($kuberone['duplicate'] ?? false),
    'saved' => $localId > 0 ? 'database' : 'kuberone',
    'kuberone' => [
        'synced' => !empty($kuberone['ok']) && empty($kuberone['skipped']),
        'skipped' => !empty($kuberone['skipped']),
        'error' => $kuberone['error'] ?? null,
    ],
]);
