<?php

declare(strict_types=1);

/**
 * SMTP smoke test — open after setting config.php:
 *   https://kuberfinserve.com/api/smtp-test.php
 * Sends one test mail to leads_email. Delete after setup if you prefer.
 */

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/mailer.php';

api_handle_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    api_json_response(['ok' => false, 'error' => 'Use GET request'], 405);
}

$config = api_load_config();

if (!api_smtp_configured($config)) {
    api_json_response([
        'ok' => false,
        'error' => 'SMTP not configured. In api/config.php set smtp_host, smtp_user, smtp_pass.',
        'hint' => 'Hostinger hPanel → Emails → mailbox password = smtp_pass',
        'smtp_host' => $config['smtp_host'] ?? '',
        'smtp_user' => $config['smtp_user'] ?? '',
    ], 500);
}

$to = trim((string) ($config['leads_email'] ?? $config['smtp_user'] ?? ''));
if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    api_json_response(['ok' => false, 'error' => 'leads_email missing or invalid in config.php'], 500);
}

$subject = 'KuberFinserve SMTP test — ' . date('Y-m-d H:i:s');
$body = "SMTP test OK.\n\nHost: " . ($config['smtp_host'] ?? '') . "\nUser: " . ($config['smtp_user'] ?? '') . "\nTime: " . date('c');
$sent = api_send_mail($to, $subject, $body, $config);

api_json_response([
    'ok' => $sent,
    'message' => $sent
        ? "Test email sent to {$to}. Check inbox + spam."
        : 'SMTP send failed. Wrong smtp_pass, or try smtp_port 465 / smtp_secure ssl in config.php. Check Hostinger error logs.',
    'to' => $to,
    'smtp_host' => $config['smtp_host'] ?? '',
    'smtp_port' => $config['smtp_port'] ?? 587,
    'smtp_user' => $config['smtp_user'] ?? '',
], $sent ? 200 : 500);
