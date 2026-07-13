<?php

declare(strict_types=1);

function api_smtp_configured(array $config): bool
{
    return !empty($config['smtp_host'])
        && !empty($config['smtp_user'])
        && !empty($config['smtp_pass']);
}

function api_smtp_read($socket): string
{
    $data = '';
    while (is_resource($socket) && !feof($socket)) {
        $line = fgets($socket, 515);
        if ($line === false) {
            break;
        }
        $data .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }

    return $data;
}

function api_smtp_write($socket, string $command): string
{
    fwrite($socket, $command . "\r\n");

    return api_smtp_read($socket);
}

function api_smtp_expect(string $response, array $codes): bool
{
    foreach ($codes as $code) {
        if (str_starts_with($response, (string) $code)) {
            return true;
        }
    }

    return false;
}

function api_send_mail_smtp(string $to, string $subject, string $body, array $config, ?string $replyTo = null): bool
{
    $host = trim((string) ($config['smtp_host'] ?? ''));
    $port = (int) ($config['smtp_port'] ?? 587);
    $secure = strtolower(trim((string) ($config['smtp_secure'] ?? 'tls')));
    $user = trim((string) ($config['smtp_user'] ?? ''));
    $pass = (string) ($config['smtp_pass'] ?? '');
    $from = trim((string) ($config['from_email'] ?? $user));
    $site = (string) ($config['site_name'] ?? 'KuberFinserve');

    if ($host === '' || $user === '' || $pass === '') {
        return false;
    }

    $remote = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $errno = 0;
    $errstr = '';
    $socket = @stream_socket_client($remote, $errno, $errstr, 30, STREAM_CLIENT_CONNECT);

    if (!$socket) {
        error_log("[mailer] SMTP connect failed: {$errstr} ({$errno})");
        return false;
    }

    stream_set_timeout($socket, 30);

    try {
        $greeting = api_smtp_read($socket);
        if (!api_smtp_expect($greeting, ['220'])) {
            error_log('[mailer] SMTP greeting failed: ' . trim($greeting));
            return false;
        }

        $ehloHost = $_SERVER['SERVER_NAME'] ?? 'localhost';
        $ehlo = api_smtp_write($socket, 'EHLO ' . $ehloHost);
        if (!api_smtp_expect($ehlo, ['250'])) {
            error_log('[mailer] SMTP EHLO failed: ' . trim($ehlo));
            return false;
        }

        if ($secure === 'tls' && $port !== 465) {
            $startTls = api_smtp_write($socket, 'STARTTLS');
            if (!api_smtp_expect($startTls, ['220'])) {
                error_log('[mailer] SMTP STARTTLS failed: ' . trim($startTls));
                return false;
            }

            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                error_log('[mailer] SMTP TLS handshake failed');
                return false;
            }

            $ehlo = api_smtp_write($socket, 'EHLO ' . $ehloHost);
            if (!api_smtp_expect($ehlo, ['250'])) {
                error_log('[mailer] SMTP EHLO after TLS failed: ' . trim($ehlo));
                return false;
            }
        }

        $auth = api_smtp_write($socket, 'AUTH LOGIN');
        if (!api_smtp_expect($auth, ['334'])) {
            error_log('[mailer] SMTP AUTH LOGIN failed: ' . trim($auth));
            return false;
        }

        $userResp = api_smtp_write($socket, base64_encode($user));
        if (!api_smtp_expect($userResp, ['334'])) {
            error_log('[mailer] SMTP username rejected: ' . trim($userResp));
            return false;
        }

        $passResp = api_smtp_write($socket, base64_encode($pass));
        if (!api_smtp_expect($passResp, ['235'])) {
            error_log('[mailer] SMTP password rejected: ' . trim($passResp));
            return false;
        }

        $mailFrom = api_smtp_write($socket, 'MAIL FROM:<' . $from . '>');
        if (!api_smtp_expect($mailFrom, ['250'])) {
            error_log('[mailer] SMTP MAIL FROM failed: ' . trim($mailFrom));
            return false;
        }

        $rcptTo = api_smtp_write($socket, 'RCPT TO:<' . $to . '>');
        if (!api_smtp_expect($rcptTo, ['250', '251'])) {
            error_log('[mailer] SMTP RCPT TO failed for ' . $to . ': ' . trim($rcptTo));
            return false;
        }

        $dataCmd = api_smtp_write($socket, 'DATA');
        if (!api_smtp_expect($dataCmd, ['354'])) {
            error_log('[mailer] SMTP DATA failed: ' . trim($dataCmd));
            return false;
        }

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $message = "From: {$site} <{$from}>\r\n";
        $message .= "To: <{$to}>\r\n";
        $message .= "Subject: {$encodedSubject}\r\n";
        if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
            $message .= "Reply-To: {$replyTo}\r\n";
        }
        $message .= "MIME-Version: 1.0\r\n";
        $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $message .= "Content-Transfer-Encoding: 8bit\r\n";
        $message .= "\r\n";
        $message .= preg_replace("/\r\n\./", "\r\n..", str_replace(["\r\n", "\r"], "\n", $body));
        $message = str_replace("\n", "\r\n", $message);
        $message .= "\r\n.\r\n";

        fwrite($socket, $message);
        $sent = api_smtp_read($socket);
        if (!api_smtp_expect($sent, ['250'])) {
            error_log('[mailer] SMTP message rejected: ' . trim($sent));
            return false;
        }

        api_smtp_write($socket, 'QUIT');
        return true;
    } finally {
        fclose($socket);
    }
}

function api_send_mail(string $to, string $subject, string $body, array $config, ?string $replyTo = null): bool
{
    if (api_smtp_configured($config)) {
        return api_send_mail_smtp($to, $subject, $body, $config, $replyTo);
    }

    $from = $config['from_email'] ?? 'noreply@kuberfinserve.com';
    $site = $config['site_name'] ?? 'KuberFinserve';

    $headers = "From: {$site} <{$from}>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: {$replyTo}\r\n";
    }

    return @mail($to, $subject, $body, $headers);
}

function api_build_admin_email_body(array $lead, array $config): string
{
    $site = $config['site_name'] ?? 'KuberFinserve';
    $lines = [
        "New lead on {$site}",
        '------------------------------',
        'Lead ID: ' . ($lead['id'] ?? '—'),
        'Form: ' . ($lead['form_type'] ?? '—'),
        'Source: ' . ($lead['source'] ?? '—'),
        'CRM channel: ' . ($lead['crm_channel'] ?? 'website'),
        'Partner ID: ' . ($lead['partner_id'] ?? '—'),
        'External lead ID: ' . ($lead['external_lead_id'] ?? '—'),
        'Form variant: ' . ($lead['form_variant'] ?? '—'),
        'Submitted: ' . ($lead['created_at'] ?? date('Y-m-d H:i:s')),
        '',
        'Name: ' . ($lead['full_name'] ?? '—'),
        'Phone: ' . ($lead['phone'] ?? '—'),
        'Email: ' . ($lead['email'] ?? '—'),
        'City: ' . ($lead['city'] ?? '—'),
        'Loan type: ' . ($lead['loan_type'] ?? '—'),
        'Loan amount: ' . ($lead['loan_amount'] ?? '—'),
        'Tenure: ' . ($lead['tenure_months'] ?? '—'),
        'Employment: ' . ($lead['employment_type'] ?? '—'),
        'Monthly income: ' . ($lead['monthly_income'] ?? '—'),
        'Company: ' . ($lead['company_name'] ?? '—'),
        'Work experience: ' . ($lead['work_experience'] ?? '—'),
        'Age: ' . ($lead['age'] ?? '—'),
        'Purpose: ' . ($lead['purpose'] ?? '—'),
        'Existing EMI: ' . ($lead['existing_emi'] ?? '—'),
        'PAN: ' . ($lead['pan'] ?? '—'),
        'Message: ' . ($lead['message'] ?? '—'),
        'Page: ' . ($lead['page_url'] ?? '—'),
    ];

    if (!empty($lead['extra_data'])) {
        $extra = is_string($lead['extra_data']) ? json_decode($lead['extra_data'], true) : $lead['extra_data'];
        if (is_array($extra) && $extra !== []) {
            $lines[] = '';
            $lines[] = 'Extra fields:';
            foreach ($extra as $k => $v) {
                $lines[] = "  {$k}: {$v}";
            }
        }
    }

    return implode("\n", $lines);
}

function api_build_user_confirmation_body(array $lead, array $config): string
{
    $site = $config['site_name'] ?? 'KuberFinserve';
    $phone = $config['site_phone'] ?? '';
    $name = $lead['full_name'] ?? 'Customer';
    $loan = $lead['loan_type'] ?? 'your enquiry';

    $body = "Dear {$name},\n\n";
    $body .= "Thank you for contacting {$site}.\n\n";
    $body .= "We have received your application for: {$loan}.\n";
    $body .= "Our team will review your details and contact you within 24 working hours.\n\n";
    $body .= "Summary:\n";
    $body .= '- Phone: ' . ($lead['phone'] ?? '—') . "\n";
    $body .= '- Email: ' . ($lead['email'] ?? '—') . "\n";
    if (!empty($lead['loan_amount'])) {
        $body .= '- Loan amount: ' . $lead['loan_amount'] . "\n";
    }
    $body .= "\n";
    if ($phone !== '') {
        $body .= "For urgent queries, call us at {$phone}.\n\n";
    }
    $body .= "Regards,\n{$site} Team\n";
    $body .= ($config['leads_email'] ?? 'loanleads@kuberfinserve.com') . "\n";

    return $body;
}

function api_send_user_confirmation(array $lead, array $config): bool
{
    $email = $lead['email'] ?? '';
    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    $leadsEmail = $config['leads_email'] ?? 'loanleads@kuberfinserve.com';
    $userSubject = 'We received your application — ' . ($config['site_name'] ?? 'KuberFinserve');
    $userBody = api_build_user_confirmation_body($lead, $config);

    return api_send_mail($email, $userSubject, $userBody, $config, $leadsEmail);
}
