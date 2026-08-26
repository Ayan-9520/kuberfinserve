<?php
declare(strict_types=1);

/**
 * Browser handoff: /app/partner?token=… → partner.kuberone.online SSO dashboard.
 * Hash fragments cannot be set via HTTP Location, so this returns a tiny HTML redirect.
 */

$token = trim((string) ($_GET['access_token'] ?? $_GET['token'] ?? ''));
$refresh = trim((string) ($_GET['refresh_token'] ?? ''));
$partnerId = trim((string) ($_GET['partner_id'] ?? ''));
$screen = trim((string) ($_GET['screen'] ?? ''));

$portal = 'https://partner.kuberone.online/login';

if ($token === '') {
    header('Location: ' . $portal, true, 302);
    exit;
}

$params = [
    'access_token' => $token,
    'token' => $token,
];
if ($refresh !== '') {
    $params['refresh_token'] = $refresh;
}
if ($partnerId !== '') {
    $params['partner_id'] = $partnerId;
}
if ($screen !== '') {
    $params['screen'] = $screen;
}

$target = $portal . '#' . http_build_query($params);
$safe = htmlspecialchars($target, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$json = json_encode($target, JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS);

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-store');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="0;url=<?= $safe ?>" />
  <title>Opening Partner dashboard…</title>
  <script>location.replace(<?= $json ?: '""' ?>);</script>
</head>
<body style="font-family:system-ui,sans-serif;padding:2rem;text-align:center">
  <p>Opening Partner dashboard…</p>
  <p><a href="<?= $safe ?>">Continue</a></p>
</body>
</html>
