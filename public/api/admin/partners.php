<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require dirname(__DIR__) . '/bootstrap.php';
require dirname(__DIR__) . '/partner_helpers.php';
require dirname(__DIR__) . '/partner_notify.php';

$error = '';

if (isset($_GET['logout'])) {
    unset($_SESSION['kuberfinserve_admin']);
    header('Location: partners.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $user = trim((string) ($_POST['username'] ?? ''));
    $pass = (string) ($_POST['password'] ?? '');
    $cfgUser = (string) ($config['admin_username'] ?? 'admin');
    $cfgPass = (string) ($config['admin_password'] ?? '');

    if ($user === $cfgUser && $pass !== '' && hash_equals($cfgPass, $pass)) {
        $_SESSION['kuberfinserve_admin'] = true;
        header('Location: partners.php');
        exit;
    }
    $error = 'Invalid username or password';
}

if (!admin_is_logged_in()) {
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Partner Admin — KuberFinserve</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #071a1f; margin: 0; min-height: 100vh; display: grid; place-items: center; color: #fff; }
    .card { background: #102b2e; padding: 2rem; border-radius: 12px; width: min(100%, 360px); border: 1px solid #1a3d42; }
    h1 { font-size: 1.25rem; color: #22d3a6; margin: 0 0 1rem; }
    label { display: block; font-size: 0.8rem; color: #8b9aab; margin-bottom: 0.25rem; }
    input { width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #1a3d42; border-radius: 8px; margin-bottom: 1rem; background: #071a1f; color: #fff; }
    button { width: 100%; padding: 0.75rem; background: #22d3a6; color: #071a1f; border: 0; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .err { color: #f87171; font-size: 0.85rem; margin-bottom: 0.75rem; }
  </style>
</head>
<body>
  <form class="card" method="post">
    <h1>Partner Admin</h1>
    <?php if ($error): ?><p class="err"><?= admin_h($error) ?></p><?php endif; ?>
    <label>Username</label>
    <input name="username" required autocomplete="username" />
    <label>Password</label>
    <input type="password" name="password" required autocomplete="current-password" />
    <button type="submit" name="login" value="1">Login</button>
  </form>
</body>
</html>
    <?php
    exit;
}

admin_require_login();

$flash = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'], $_POST['partner_row_id'])) {
    $rowId = (int) $_POST['partner_row_id'];
    $action = (string) $_POST['action'];
    $adminUser = (string) ($config['admin_username'] ?? 'admin');

    if ($rowId > 0 && in_array($action, ['approve', 'reject', 'suspend'], true)) {
        try {
            $pdo = api_db($config);
            $pdo->beginTransaction();

            $stmt = $pdo->prepare('SELECT * FROM partners WHERE id = :id FOR UPDATE');
            $stmt->execute(['id' => $rowId]);
            $partner = $stmt->fetch();

            if ($partner) {
                $oldStatus = (string) $partner['status'];
                $tempPassword = null;
                $notifications = null;

                if ($action === 'approve') {
                    if ($oldStatus !== 'approved') {
                        $generatedId = $partner['partner_id'] ?: api_partner_generate_id($pdo);
                        $tempPassword = api_partner_generate_temp_password();
                        $passwordHash = api_partner_hash_password($tempPassword);

                        $upd = $pdo->prepare(
                            'UPDATE partners SET
                                partner_id = :partner_id,
                                password_hash = :password_hash,
                                must_change_password = 1,
                                status = :status,
                                approved_at = NOW(),
                                approved_by = :by,
                                rejected_at = NULL,
                                rejected_by = NULL,
                                suspended_at = NULL,
                                suspended_by = NULL
                             WHERE id = :id',
                        );
                        $upd->execute([
                            'partner_id' => $generatedId,
                            'password_hash' => $passwordHash,
                            'status' => 'approved',
                            'by' => $adminUser,
                            'id' => $rowId,
                        ]);

                        $partner['partner_id'] = $generatedId;
                        $partner['status'] = 'approved';
                        $notifications = api_partner_notify_approved($partner, $tempPassword, $config);

                        api_partner_log_audit(
                            $pdo,
                            $rowId,
                            'approved',
                            $oldStatus,
                            'approved',
                            $adminUser,
                            'Partner ID ' . $generatedId . ' issued. Notifications: ' . json_encode($notifications),
                        );
                        $flash = "Partner #{$rowId} approved. ID: {$generatedId}";
                    }
                } elseif ($action === 'reject') {
                    $upd = $pdo->prepare(
                        'UPDATE partners SET status = :status, rejected_at = NOW(), rejected_by = :by WHERE id = :id',
                    );
                    $upd->execute(['status' => 'rejected', 'by' => $adminUser, 'id' => $rowId]);
                    api_partner_notify_rejected($partner, $config);
                    api_partner_log_audit($pdo, $rowId, 'rejected', $oldStatus, 'rejected', $adminUser, null);
                    $flash = "Partner #{$rowId} rejected.";
                } elseif ($action === 'suspend') {
                    $upd = $pdo->prepare(
                        'UPDATE partners SET status = :status, suspended_at = NOW(), suspended_by = :by WHERE id = :id',
                    );
                    $upd->execute(['status' => 'suspended', 'by' => $adminUser, 'id' => $rowId]);
                    api_partner_log_audit($pdo, $rowId, 'suspended', $oldStatus, 'suspended', $adminUser, null);
                    $flash = "Partner #{$rowId} suspended.";
                }
            }

            $pdo->commit();
        } catch (Throwable $e) {
            if (isset($pdo) && $pdo->inTransaction()) {
                $pdo->rollBack();
            }
            error_log('[admin/partners] ' . $e->getMessage());
            $flash = 'Action failed: ' . $e->getMessage();
        }
    }

    header('Location: partners.php?flash=' . urlencode($flash));
    exit;
}

$flash = api_str($_GET['flash'] ?? null, 500) ?? '';
$filterStatus = api_str($_GET['status'] ?? null, 20);
$filterQ = api_str($_GET['q'] ?? null, 100);
$page = max(1, (int) ($_GET['page'] ?? 1));
$perPage = 25;
$offset = ($page - 1) * $perPage;

$partners = [];
$audit = [];
$total = 0;

try {
    $pdo = api_db($config);
    $where = [];
    $params = [];

    if ($filterStatus && in_array($filterStatus, ['pending', 'approved', 'rejected', 'suspended'], true)) {
        $where[] = 'status = :status';
        $params['status'] = $filterStatus;
    }
    if ($filterQ) {
        $where[] = '(full_name LIKE :q OR phone LIKE :q OR email LIKE :q OR partner_id LIKE :q)';
        $params['q'] = '%' . $filterQ . '%';
    }

    $whereSql = $where === [] ? '' : ' WHERE ' . implode(' AND ', $where);

    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM partners{$whereSql}");
    $countStmt->execute($params);
    $total = (int) $countStmt->fetchColumn();

    $sql = "SELECT * FROM partners{$whereSql} ORDER BY id DESC LIMIT {$perPage} OFFSET {$offset}";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $partners = $stmt->fetchAll();

    $auditStmt = $pdo->query(
        'SELECT a.*, p.full_name, p.partner_id AS public_partner_id
         FROM partner_audit_log a
         LEFT JOIN partners p ON p.id = a.partner_row_id
         ORDER BY a.id DESC LIMIT 30',
    );
    $audit = $auditStmt->fetchAll();
} catch (Throwable $e) {
    $error = 'Database error: ' . $e->getMessage();
}

$totalPages = max(1, (int) ceil($total / $perPage));
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Partners — KuberFinserve Admin</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; background: #f5faf8; color: #333; }
    header { background: #071a1f; color: #fff; padding: 1rem 1.5rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; }
    header a { color: #22d3a6; }
    main { padding: 1rem 1.5rem 2rem; max-width: 1400px; margin: 0 auto; }
    .flash { background: #d4f5e8; color: #0a4f42; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; }
    .stats { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
    .stat { background: #fff; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #e5e7eb; }
    form.filters { margin-bottom: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
    form.filters input, form.filters select { padding: 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 8px; }
    form.filters button { padding: 0.5rem 1rem; background: #22d3a6; color: #071a1f; border: 0; border-radius: 8px; cursor: pointer; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.06); font-size: 0.85rem; margin-bottom: 2rem; }
    th, td { padding: 0.65rem 0.75rem; text-align: left; border-bottom: 1px solid #eee; vertical-align: top; }
    th { background: #071a1f; color: #fff; font-weight: 600; }
    .badge { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
    .badge-pending { background: #fef3c7; color: #92400e; }
    .badge-approved { background: #d4f5e8; color: #0a4f42; }
    .badge-rejected { background: #fee2e2; color: #991b1b; }
    .badge-suspended { background: #e5e7eb; color: #374151; }
    .actions { display: flex; gap: 0.35rem; flex-wrap: wrap; }
    .actions button { font-size: 0.7rem; padding: 0.35rem 0.6rem; border: 0; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .btn-approve { background: #22d3a6; color: #071a1f; }
    .btn-reject { background: #fee2e2; color: #991b1b; }
    .btn-suspend { background: #e5e7eb; color: #374151; }
    h2 { font-size: 1.1rem; color: #071a1f; margin: 1.5rem 0 0.75rem; }
    .pager a { padding: 0.4rem 0.75rem; background: #fff; border: 1px solid #ddd; border-radius: 6px; text-decoration: none; color: #0a4f42; margin-right: 0.5rem; }
  </style>
</head>
<body>
  <header>
    <div><strong>KuberFinserve — Partner Admin</strong></div>
    <div>
      <a href="index.php">Leads</a>
      &nbsp;|&nbsp;
      <a href="?logout=1">Logout</a>
    </div>
  </header>
  <main>
    <?php if ($flash): ?><div class="flash"><?= admin_h($flash) ?></div><?php endif; ?>
    <?php if ($error): ?><p style="color:#c00"><?= admin_h($error) ?></p><?php endif; ?>

    <div class="stats">
      <div class="stat">Total: <strong><?= (int) $total ?></strong></div>
      <div class="stat">Page <strong><?= $page ?></strong> / <?= $totalPages ?></div>
    </div>

    <form class="filters" method="get">
      <select name="status">
        <option value="">All statuses</option>
        <?php foreach (['pending', 'approved', 'rejected', 'suspended'] as $s): ?>
          <option value="<?= $s ?>" <?= $filterStatus === $s ? 'selected' : '' ?>><?= $s ?></option>
        <?php endforeach; ?>
      </select>
      <input name="q" value="<?= admin_h($filterQ ?? '') ?>" placeholder="Search name, phone, email, partner ID…" />
      <button type="submit">Filter</button>
      <?php if ($filterStatus || $filterQ): ?><a href="partners.php">Clear</a><?php endif; ?>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Applicant</th>
          <th>Contact</th>
          <th>Location / Business</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if ($partners === []): ?>
          <tr><td colspan="7">No partner applications yet.</td></tr>
        <?php else: ?>
          <?php foreach ($partners as $row): ?>
            <tr>
              <td>#<?= (int) $row['id'] ?><br /><small><?= admin_h($row['partner_id'] ?? '—') ?></small></td>
              <td><?= admin_h($row['created_at']) ?></td>
              <td><?= admin_h($row['full_name']) ?></td>
              <td><?= admin_h($row['phone']) ?><br /><small><?= admin_h($row['email']) ?></small></td>
              <td>
                <?= admin_h($row['city'] ?? '—') ?>, <?= admin_h($row['state'] ?? '—') ?><br />
                <small><?= admin_h($row['business_type'] ?? '—') ?></small>
              </td>
              <td><span class="badge badge-<?= admin_h($row['status']) ?>"><?= admin_h($row['status']) ?></span></td>
              <td>
                <div class="actions">
                  <?php if ($row['status'] === 'pending'): ?>
                    <form method="post" onsubmit="return confirm('Approve this partner? Credentials will be sent by email/SMS.');">
                      <input type="hidden" name="partner_row_id" value="<?= (int) $row['id'] ?>" />
                      <input type="hidden" name="action" value="approve" />
                      <button type="submit" class="btn-approve">Approve</button>
                    </form>
                    <form method="post" onsubmit="return confirm('Reject this application?');">
                      <input type="hidden" name="partner_row_id" value="<?= (int) $row['id'] ?>" />
                      <input type="hidden" name="action" value="reject" />
                      <button type="submit" class="btn-reject">Reject</button>
                    </form>
                  <?php endif; ?>
                  <?php if ($row['status'] === 'approved'): ?>
                    <form method="post" onsubmit="return confirm('Suspend this partner?');">
                      <input type="hidden" name="partner_row_id" value="<?= (int) $row['id'] ?>" />
                      <input type="hidden" name="action" value="suspend" />
                      <button type="submit" class="btn-suspend">Suspend</button>
                    </form>
                  <?php endif; ?>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>

    <div class="pager">
      <?php if ($page > 1): ?>
        <a href="?page=<?= $page - 1 ?>&status=<?= urlencode($filterStatus ?? '') ?>&q=<?= urlencode($filterQ ?? '') ?>">← Prev</a>
      <?php endif; ?>
      <?php if ($page < $totalPages): ?>
        <a href="?page=<?= $page + 1 ?>&status=<?= urlencode($filterStatus ?? '') ?>&q=<?= urlencode($filterQ ?? '') ?>">Next →</a>
      <?php endif; ?>
    </div>

    <h2>Recent audit log</h2>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Partner</th>
          <th>Action</th>
          <th>Status change</th>
          <th>By</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <?php if ($audit === []): ?>
          <tr><td colspan="6">No audit entries yet.</td></tr>
        <?php else: ?>
          <?php foreach ($audit as $log): ?>
            <tr>
              <td><?= admin_h($log['created_at']) ?></td>
              <td><?= admin_h($log['full_name'] ?? '—') ?> <small>(<?= admin_h($log['public_partner_id'] ?? '#' . $log['partner_row_id']) ?>)</small></td>
              <td><?= admin_h($log['action']) ?></td>
              <td><?= admin_h($log['old_status'] ?? '—') ?> → <?= admin_h($log['new_status'] ?? '—') ?></td>
              <td><?= admin_h($log['performed_by'] ?? '—') ?></td>
              <td><small><?= admin_h(mb_substr((string) ($log['notes'] ?? ''), 0, 120)) ?></small></td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </main>
</body>
</html>
