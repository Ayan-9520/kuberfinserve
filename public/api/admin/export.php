<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
admin_require_login();

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="kuberfinserve-leads-' . date('Y-m-d') . '.csv"');

$out = fopen('php://output', 'w');
fprintf($out, chr(0xef) . chr(0xbb) . chr(0xbf));

try {
    $pdo = api_db($config);
    $stmt = $pdo->query('SELECT * FROM leads ORDER BY id DESC');
    $first = true;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if ($first) {
            fputcsv($out, array_keys($row));
            $first = false;
        }
        fputcsv($out, $row);
    }
} catch (Throwable $e) {
    fputcsv($out, ['error', $e->getMessage()]);
}

fclose($out);
exit;
