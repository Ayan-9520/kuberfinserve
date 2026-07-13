<?php
/**
 * Copy this file to config.php and fill in Hostinger MySQL details.
 * NEVER commit config.php to Git.
 */
return [
    'db_host' => 'localhost',
    'db_name' => 'u123456789_kuberfinserve',
    'db_user' => 'u123456789_kuberuser',
    'db_pass' => 'YOUR_DATABASE_PASSWORD',

  // Admin panel: /api/admin/
    'admin_username' => 'admin',
    'admin_password' => 'Change-This-Strong-Password-123!',

  // Emails — SMTP required for customer Gmail delivery (PHP mail() often fails for external inboxes)
    'leads_email' => 'loanleads@kuberfinserve.com',
    'from_email' => 'loanleads@kuberfinserve.com',
    'site_name' => 'KuberFinserve',
    'site_phone' => '+91 7982953129',

    // Hostinger mailbox SMTP (same as email account password)
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_user' => 'loanleads@kuberfinserve.com',
    'smtp_pass' => 'YOUR_EMAIL_ACCOUNT_PASSWORD',

    // Partner JWT auth (generate: bin2hex(random_bytes(32)))
    'jwt_secret' => 'CHANGE-THIS-TO-A-LONG-RANDOM-SECRET-KEY-64CHARS',
    'jwt_ttl_hours' => 72,

    // Customer mobile app — same CRM as website (POST /api/mobile/save-lead.php)
    'mobile_api_key' => 'CHANGE-THIS-MOBILE-API-KEY',

    // Notification placeholders — wire real providers later
    'sms_enabled' => false,
    'sms_api_url' => '',
    'sms_api_key' => '',
    'whatsapp_enabled' => false,
    'whatsapp_api_url' => '',
    'whatsapp_api_key' => '',

    // KuberOne Admin bridge (dual-write). Website UI stays the same.
    // Local Docker API: http://host.docker.internal:4000 OR http://127.0.0.1:4000
    // Production API: https://api.your-kuberone-domain.com
    'kuberone_bridge_enabled' => false,
    'kuberone_api_base' => 'http://127.0.0.1:4000',
    'kuberone_api_key' => '', // must match WEBSITE_INTAKE_API_KEY on KuberOne when set
    // When true, Partner Login OTP (mobile identifier) uses KuberOne auth (same as DSA app)
    'kuberone_partner_auth_enabled' => false,
];


'kuberone_bridge_enabled' => true,
'kuberone_api_base' => 'https://revenues-plymouth-dialogue-tool.trycloudflare.com',