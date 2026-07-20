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

    // Emails — SMTP required for Gmail/outside inbox delivery
    // Admin notification inbox (can be comma-separated for multiple admins)
    'leads_email' => 'loanleads@kuberfinserve.com',
    // Website / company inbox (also gets lead + partner alerts)
    'site_email' => 'info@kuberfinserve.com',
    'from_email' => 'loanleads@kuberfinserve.com',
    'site_name' => 'KuberFinserve',
    'site_phone' => '+91 7982953129',

    // Hostinger mailbox SMTP (password = that email account's password in hPanel)
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

    // KuberOne Admin bridge (dual-write to CRM).
    // IMPORTANT:
    // - Live site (kuberfinserve.com) → PUBLIC HTTPS API only (Hostinger cannot reach your PC localhost)
    // - Local npm run dev → http://127.0.0.1:4000 (Docker KuberOne backend)
    // Examples: http://127.0.0.1:4000  |  https://api.kuberone.online  |  https://your-tunnel.ngrok.app
    'kuberone_bridge_enabled' => true,
    'kuberone_api_base' => 'https://YOUR-KUBERONE-API-DOMAIN',
    // Must match WEBSITE_INTAKE_API_KEY on KuberOne backend (.env / .env.docker) — min 16 chars
    'kuberone_api_key' => 'CHANGE-TO-MATCH-WEBSITE_INTAKE_API_KEY',
    // When true, Partner Login OTP uses KuberOne auth (same as DSA app)
    'kuberone_partner_auth_enabled' => true,
];
