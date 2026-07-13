<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/mailer.php';

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

$fields = isset($data['fields']) && is_array($data['fields']) ? $data['fields'] : $data;
$userEmail = api_str($data['userEmail'] ?? $fields['email'] ?? null, 150);
$userName = api_str(
    $data['userName'] ?? $fields['full_name'] ?? $fields['fullName'] ?? $fields['name'] ?? null,
    150,
);
$userOnly = !empty($data['userConfirmationOnly']);

$results = ['admin' => false, 'user' => false];

if (!$userOnly) {
    $leadsEmail = $config['leads_email'] ?? 'loanleads@kuberfinserve.com';
    $subject = api_str($data['subject'] ?? null, 200) ?? ('New lead — ' . ($config['site_name'] ?? 'KuberFinserve'));
    $message = api_str($data['message'] ?? null, 20000) ?? 'New lead submitted.';
    $replyTo = api_str($data['replyTo'] ?? $data['reply_to'] ?? null, 150);

    $results['admin'] = api_send_mail($leadsEmail, $subject, $message, $config, $replyTo);
}

if ($userEmail && filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    $lead = [
        'full_name' => $userName,
        'email' => $userEmail,
        'phone' => api_str($fields['phone'] ?? null, 20),
        'loan_type' => api_str($fields['loan_type'] ?? $fields['loanType'] ?? null, 120),
        'loan_amount' => api_str($fields['loan_amount'] ?? $fields['loanAmount'] ?? null, 50),
    ];
    $results['user'] = api_send_user_confirmation($lead, $config);
}

if (!$results['admin'] && !$results['user']) {
    api_json_response([
        'ok' => false,
        'error' => api_smtp_configured($config)
            ? 'Could not send email via SMTP.'
            : 'SMTP not configured in api/config.php — customer emails need SMTP.',
        'emails' => $results,
    ], 500);
}

api_json_response([
    'ok' => true,
    'emails' => $results,
]);
