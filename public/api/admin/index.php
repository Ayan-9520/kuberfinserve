<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require dirname(__DIR__) . '/bootstrap.php';

$error = '';

if (isset($_GET['logout'])) {
    unset($_SESSION['kuberfinserve_admin']);
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $user = trim((string) ($_POST['username'] ?? ''));
    $pass = (string) ($_POST['password'] ?? '');
    $cfgUser = (string) ($config['admin_username'] ?? 'admin');
    $cfgPass = (string) ($config['admin_password'] ?? '');

    if ($user === $cfgUser && $pass !== '' && hash_equals($cfgPass, $pass)) {
        $_SESSION['kuberfinserve_admin'] = true;
        header('Location: index.php');
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
  <title>Admin Login — KuberFinserve Leads</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #f5faf8; margin: 0; min-height: 100vh; display: grid; place-items: center; }
    .card { background: #fff; padding: 2rem; border-radius: 12px; width: min(100%, 360px); box-shadow: 0 8px 30px rgba(36,94,78,.12); }
    h1 { font-size: 1.25rem; color: #245e4e; margin: 0 0 1rem; }
    label { display: block; font-size: 0.8rem; color: #555; margin-bottom: 0.25rem; }
    input { width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem; }
    button { width: 100%; padding: 0.75rem; background: #29b68d; color: #fff; border: 0; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .err { color: #c00; font-size: 0.85rem; margin-bottom: 0.75rem; }
  </style>
</head>
<body>
  <form class="card" method="post">
    <h1>Leads Admin</h1>
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

// Update status
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['status'], $_POST['lead_id'])) {
    $id = (int) $_POST['lead_id'];
    $status = $_POST['status'];
    if (in_array($status, ['new', 'contacted', 'closed'], true) && $id > 0) {
        try {
            $pdo = api_db($config);
            $stmt = $pdo->prepare('UPDATE leads SET status = :status WHERE id = :id');
            $stmt->execute(['status' => $status, 'id' => $id]);
        } catch (Throwable $e) {
            error_log('[admin] ' . $e->getMessage());
        }
    }
    header('Location: index.php');
    exit;
}

$page = max(1, (int) ($_GET['page'] ?? 1));
$perPage = 25;
$offset = ($page - 1) * $perPage;
$filter = api_str($_GET['q'] ?? null, 100);

$leads = [];
$total = 0;

try {
    $pdo = api_db($config);
    $where = '';
    $params = [];
    if ($filter) {
        $where = ' WHERE full_name LIKE :q OR phone LIKE :q OR email LIKE :q OR loan_type LIKE :q OR partner_id LIKE :q OR external_lead_id LIKE :q OR crm_channel LIKE :q ';
        $params['q'] = '%' . $filter . '%';
    }
    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM leads{$where}");
    $countStmt->execute($params);
    $total = (int) $countStmt->fetchColumn();

    $sql = "SELECT * FROM leads{$where} ORDER BY id DESC LIMIT {$perPage} OFFSET {$offset}";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $leads = $stmt->fetchAll();
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
  <title>Leads — KuberFinserve Admin</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; background: #f5faf8; color: #333; }
    header { background: #245e4e; color: #fff; padding: 1rem 1.5rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; }
    header a { color: #d4f5e8; }
    main { padding: 1rem 1.5rem 2rem; max-width: 1400px; margin: 0 auto; }
    .stats { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
    .stat { background: #fff; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #e5e7eb; }
    .stat strong { color: #245e4e; }
    form.search { margin-bottom: 1rem; display: flex; gap: 0.5rem; }
    form.search input { flex: 1; max-width: 320px; padding: 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 8px; }
    form.search button { padding: 0.5rem 1rem; background: #29b68d; color: #fff; border: 0; border-radius: 8px; cursor: pointer; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.06); font-size: 0.85rem; }
    th, td { padding: 0.65rem 0.75rem; text-align: left; border-bottom: 1px solid #eee; vertical-align: top; }
    th { background: #245e4e; color: #fff; font-weight: 600; }
    tr:hover td { background: #f9fffc; }
    .badge { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.7rem; font-weight: 600; }
    .badge-new { background: #d4f5e8; color: #245e4e; }
    .badge-contacted { background: #fef3c7; color: #92400e; }
    .badge-closed { background: #e5e7eb; color: #374151; }
  select { font-size: 0.75rem; padding: 0.2rem; }
    .pager { margin-top: 1rem; display: flex; gap: 0.5rem; align-items: center; }
    .pager a { padding: 0.4rem 0.75rem; background: #fff; border: 1px solid #ddd; border-radius: 6px; text-decoration: none; color: #245e4e; }
    .details { font-size: 0.75rem; color: #666; max-width: 200px; }
  </style>
</head>
<body>
  <header>
    <div><strong>KuberFinserve — Lead Management</strong></div>
    <div>
      <a href="partners.php">Partners</a>
      &nbsp;|&nbsp;
      <a href="?logout=1">Logout</a>
      &nbsp;|&nbsp;
      <a href="export.php">Export CSV</a>
    </div>
  </header>
  <main>
    <?php if (!empty($error)): ?>
      <p style="color:#c00"><?= admin_h($error) ?></p>
    <?php endif; ?>
    <div class="stats">
      <div class="stat">Total leads: <strong><?= (int) $total ?></strong></div>
      <div class="stat">Page <strong><?= $page ?></strong> / <?= $totalPages ?></div>
    </div>
    <form class="search" method="get">
      <input name="q" value="<?= admin_h($filter ?? '') ?>" placeholder="Search name, phone, email, loan, partner ID…" />
      <button type="submit">Search</button>
      <?php if ($filter): ?><a href="index.php">Clear</a><?php endif; ?>
    </form>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Name</th>
          <th>Contact</th>
          <th>CRM</th>
          <th>Loan / Product</th>
          <th>Details</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <?php if ($leads === []): ?>
          <tr><td colspan="8">No leads yet.</td></tr>
        <?php else: ?>
          <?php foreach ($leads as $row): ?>
            <tr>
              <td>
                #<?= (int) $row['id'] ?><br />
                <small><?= admin_h($row['external_lead_id'] ?? '—') ?></small>
              </td>
              <td><?= admin_h($row['created_at']) ?></td>
              <td><?= admin_h($row['full_name'] ?? '—') ?></td>
              <td>
                <?= admin_h($row['phone']) ?><br />
                <small><?= admin_h($row['email']) ?></small>
              </td>
              <td class="details">
                <strong><?= admin_h($row['crm_channel'] ?? 'website') ?></strong><br />
                Partner: <?= admin_h($row['partner_id'] ?? '—') ?><br />
                <small><?= admin_h($row['form_variant'] ?? '') ?></small>
              </td>
              <td>
                <strong><?= admin_h($row['loan_type'] ?? '—') ?></strong><br />
                <small><?= admin_h($row['form_type']) ?> · <?= admin_h($row['source'] ?? '') ?></small>
              </td>
              <td class="details">
                City: <?= admin_h($row['city'] ?? '—') ?><br />
                Income: <?= admin_h($row['monthly_income'] ?? '—') ?><br />
                Amount: <?= admin_h($row['loan_amount'] ?? '—') ?><br />
                <?php if ($row['message']): ?>Msg: <?= admin_h(mb_substr($row['message'], 0, 80)) ?><?php endif; ?>
              </td>
              <td>
                <span class="badge badge-<?= admin_h($row['status']) ?>"><?= admin_h($row['status']) ?></span>
                <form method="post" style="margin-top:0.35rem">
                  <input type="hidden" name="lead_id" value="<?= (int) $row['id'] ?>" />
                  <select name="status" onchange="this.form.submit()">
                    <option value="new" <?= $row['status'] === 'new' ? 'selected' : '' ?>>new</option>
                    <option value="contacted" <?= $row['status'] === 'contacted' ? 'selected' : '' ?>>contacted</option>
                    <option value="closed" <?= $row['status'] === 'closed' ? 'selected' : '' ?>>closed</option>
                  </select>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
    <div class="pager">
      <?php if ($page > 1): ?><a href="?page=<?= $page - 1 ?>&q=<?= urlencode($filter ?? '') ?>">← Prev</a><?php endif; ?>
      <?php if ($page < $totalPages): ?><a href="?page=<?= $page + 1 ?>&q=<?= urlencode($filter ?? '') ?>">Next →</a><?php endif; ?>
    </div>
  </main>
</body>
</html>
