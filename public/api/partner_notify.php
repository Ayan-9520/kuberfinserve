<?php

declare(strict_types=1);

require_once __DIR__ . '/mailer.php';

function api_partner_notify_admin_new(array $partner, array $config): bool
{
    $leadsEmail = $config['leads_email'] ?? 'loanleads@kuberfinserve.com';
    $site = $config['site_name'] ?? 'KuberFinserve';
    $subject = "New Partner Application — {$partner['full_name']} (#{$partner['id']})";
    $body = implode("\n", [
        "New partner registration on {$site}",
        '------------------------------',
        'Application ID: ' . $partner['id'],
        'Status: pending',
        'Submitted: ' . ($partner['created_at'] ?? date('Y-m-d H:i:s')),
        '',
        'Name: ' . ($partner['full_name'] ?? '—'),
        'Phone: ' . ($partner['phone'] ?? '—'),
        'Email: ' . ($partner['email'] ?? '—'),
        'City: ' . ($partner['city'] ?? '—'),
        'State: ' . ($partner['state'] ?? '—'),
        'Company: ' . ($partner['company_name'] ?? '—'),
        'Business type: ' . ($partner['business_type'] ?? '—'),
        'Experience: ' . ($partner['experience'] ?? '—'),
        'Message: ' . ($partner['message'] ?? '—'),
        '',
        'Review in admin: /api/admin/partners.php',
    ]);

    return api_send_mail($leadsEmail, $subject, $body, $config, $partner['email'] ?? null);
}

function api_partner_notify_registration_received(array $partner, array $config): bool
{
    $email = $partner['email'] ?? '';
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    $site = $config['site_name'] ?? 'KuberFinserve';
    $subject = 'Partner application received — ' . $site;
    $body = "Dear {$partner['full_name']},\n\n";
    $body .= "Thank you for registering as a KuberFinserve partner.\n\n";
    $body .= "Your application has been submitted successfully and is currently under review.\n";
    $body .= "Our verification team will contact you soon.\n\n";
    $body .= "Application reference: #{$partner['id']}\n\n";
    $body .= "Regards,\n{$site} Team\n";

    return api_send_mail($email, $subject, $body, $config, $config['leads_email'] ?? null);
}

function api_partner_notify_approved(
    array $partner,
    string $tempPassword,
    array $config,
): array {
    $results = ['email' => false, 'sms' => false, 'whatsapp' => false];

    $email = $partner['email'] ?? '';
    $site = $config['site_name'] ?? 'KuberFinserve';
    $platform = 'KuberOne';

    if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $subject = "Partner account approved — {$site}";
        $body = "Dear {$partner['full_name']},\n\n";
        $body .= "Congratulations! Your partner application has been approved.\n\n";
        $body .= "Partner ID: {$partner['partner_id']}\n";
        $body .= "Temporary password: {$tempPassword}\n\n";
        $body .= "Please login at https://kuberfinserve.com/partner-login and change your password after first login.\n";
        $body .= "Download the {$platform} mobile app for full partner access.\n\n";
        $body .= "Regards,\n{$site} Team\n";
        $results['email'] = api_send_mail($email, $subject, $body, $config, $config['leads_email'] ?? null);
    }

    $smsMessage = "KuberFinserve: Partner approved. ID: {$partner['partner_id']}. Temp password: {$tempPassword}. Login at kuberfinserve.com/partner-login";
    $results['sms'] = api_partner_send_sms($partner['phone'] ?? '', $smsMessage, $config);

    $waMessage = "Your KuberFinserve partner account is approved.\nPartner ID: {$partner['partner_id']}\nTemporary password: {$tempPassword}\nLogin: https://kuberfinserve.com/partner-login";
    $results['whatsapp'] = api_partner_send_whatsapp($partner['phone'] ?? '', $waMessage, $config);

    return $results;
}

function api_partner_send_sms(string $phone, string $message, array $config): bool
{
    if (empty($config['sms_enabled'])) {
        error_log('[partner-sms-placeholder] To +' . $phone . ': ' . $message);
        return true;
    }

    $url = trim((string) ($config['sms_api_url'] ?? ''));
    $key = trim((string) ($config['sms_api_key'] ?? ''));
    if ($url === '' || $key === '') {
        error_log('[partner-sms] SMS enabled but api_url/api_key missing');
        return false;
    }

    // Placeholder HTTP integration — customize per SMS provider
    $payload = json_encode(['to' => $phone, 'message' => $message, 'api_key' => $key]);
    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 15,
        ],
    ]);
    $result = @file_get_contents($url, false, $ctx);

    return $result !== false;
}

function api_partner_send_whatsapp(string $phone, string $message, array $config): bool
{
    if (empty($config['whatsapp_enabled'])) {
        error_log('[partner-whatsapp-placeholder] To +' . $phone . ': ' . $message);
        return true;
    }

    $url = trim((string) ($config['whatsapp_api_url'] ?? ''));
    $key = trim((string) ($config['whatsapp_api_key'] ?? ''));
    if ($url === '' || $key === '') {
        error_log('[partner-whatsapp] WhatsApp enabled but api_url/api_key missing');
        return false;
    }

    $payload = json_encode(['to' => $phone, 'message' => $message, 'api_key' => $key]);
    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 15,
        ],
    ]);
    $result = @file_get_contents($url, false, $ctx);

    return $result !== false;
}

function api_partner_send_otp_sms(string $phone, string $otp, array $config): bool
{
    return api_partner_send_sms(
        $phone,
        "KuberFinserve: Your login OTP is {$otp}. Valid for 10 minutes. Do not share.",
        $config,
    );
}
