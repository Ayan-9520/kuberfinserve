<?php

declare(strict_types=1);

function api_db(array $config): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = $config['db_host'] ?? 'localhost';
    $name = $config['db_name'] ?? '';
    $user = $config['db_user'] ?? '';
    $pass = $config['db_pass'] ?? '';

    if ($name === '' || $user === '') {
        throw new RuntimeException('Database credentials missing in config.php');
    }

    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}
