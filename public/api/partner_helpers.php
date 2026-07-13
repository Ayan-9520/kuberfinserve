<?php

declare(strict_types=1);

require_once __DIR__ . '/jwt.php';

function api_partner_hash_password(string $password): string
{
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}

function api_partner_verify_password(string $password, string $hash): bool
{
    if ($hash === '') {
        return false;
    }

    return password_verify($password, $hash);
}

function api_partner_generate_id(PDO $pdo): string
{
    $year = date('Y');
    $prefix = 'KF' . $year;

    $stmt = $pdo->prepare(
        'SELECT partner_id FROM partners WHERE partner_id LIKE :prefix ORDER BY partner_id DESC LIMIT 1',
    );
    $stmt->execute(['prefix' => $prefix . '%']);
    $last = $stmt->fetchColumn();

    $seq = 1;
    if (is_string($last) && preg_match('/KF\d{4}(\d{5})$/', $last, $m)) {
        $seq = (int) $m[1] + 1;
    }

    return $prefix . str_pad((string) $seq, 5, '0', STR_PAD_LEFT);
}

function api_partner_generate_temp_password(): string
{
    $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    $len = strlen($chars);
    $pass = '';
    for ($i = 0; $i < 10; $i++) {
        $pass .= $chars[random_int(0, $len - 1)];
    }

    return $pass;
}

function api_partner_generate_otp(): string
{
    return (string) random_int(100000, 999999);
}

function api_partner_log_audit(
    PDO $pdo,
    int $partnerRowId,
    string $action,
    ?string $oldStatus,
    ?string $newStatus,
    ?string $performedBy,
    ?string $notes = null,
): void {
    $stmt = $pdo->prepare(
        'INSERT INTO partner_audit_log (partner_row_id, action, old_status, new_status, performed_by, notes, ip_address)
         VALUES (:pid, :action, :old_status, :new_status, :performed_by, :notes, :ip)',
    );
    $stmt->execute([
        'pid' => $partnerRowId,
        'action' => $action,
        'old_status' => $oldStatus,
        'new_status' => $newStatus,
        'performed_by' => $performedBy,
        'notes' => $notes,
        'ip' => api_client_ip(),
    ]);
}

function api_partner_find_by_identifier(PDO $pdo, string $identifier): ?array
{
    $id = trim($identifier);
    if ($id === '') {
        return null;
    }

    $stmt = $pdo->prepare(
        'SELECT * FROM partners WHERE partner_id = :id OR email = :email OR phone = :phone LIMIT 1',
    );
    $phone = api_normalize_phone($id);
    $stmt->execute([
        'id' => $id,
        'email' => strtolower($id),
        'phone' => $phone ?? $id,
    ]);

    $row = $stmt->fetch();
    return $row ?: null;
}

function api_partner_status_message(string $status): string
{
    return match ($status) {
        'pending' => 'Your partner application is pending approval. Our verification team will contact you soon.',
        'rejected' => 'Your partner application was not approved. Please contact support for details.',
        'suspended' => 'Your partner account has been suspended. Please contact support.',
        default => 'You are not authorized to login.',
    };
}

function api_partner_issue_jwt(array $partner, array $config): string
{
    $secret = (string) ($config['jwt_secret'] ?? '');
    if ($secret === '') {
        throw new RuntimeException('JWT secret not configured');
    }

    $ttlHours = max(1, (int) ($config['jwt_ttl_hours'] ?? 72));

    return api_jwt_encode([
        'sub' => $partner['partner_id'],
        'pid' => (int) $partner['id'],
        'email' => $partner['email'],
        'name' => $partner['full_name'],
        'role' => 'partner',
    ], $secret, $ttlHours * 3600);
}

function api_partner_public_row(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'partner_id' => $row['partner_id'],
        'full_name' => $row['full_name'],
        'email' => $row['email'],
        'phone' => $row['phone'],
        'city' => $row['city'],
        'state' => $row['state'],
        'business_type' => $row['business_type'],
        'status' => $row['status'],
        'created_at' => $row['created_at'],
    ];
}
