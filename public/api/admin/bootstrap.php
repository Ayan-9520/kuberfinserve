<?php

declare(strict_types=1);

session_start();

$configPath = dirname(__DIR__) . '/config.php';
if (!is_file($configPath)) {
    http_response_code(503);
    echo 'Create api/config.php from config.example.php first.';
    exit;
}
$config = require $configPath;

require dirname(__DIR__) . '/db.php';

function admin_is_logged_in(): bool
{
    return !empty($_SESSION['kuberfinserve_admin']);
}

function admin_require_login(): void
{
    if (!admin_is_logged_in()) {
        header('Location: index.php');
        exit;
    }
}

function admin_h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}
