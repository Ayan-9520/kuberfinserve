<?php
/**
 * Upload with your site build (cPanel / shared hosting).
 * Sends form leads to loanleads@kuberfinserve.com via PHP mail().
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

$to = 'loanleads@kuberfinserve.com';
$subject = isset($data['subject']) ? $data['subject'] : 'New lead — KuberFinserve';
$message = isset($data['message']) ? $data['message'] : print_r($data, true);
$replyTo = isset($data['replyTo']) ? $data['replyTo'] : (isset($data['reply_to']) ? $data['reply_to'] : '');

$from = 'noreply@kuberfinserve.com';
$headers = "From: KuberFinserve <{$from}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: {$replyTo}\r\n";
}

$sent = @mail($to, $subject, $message, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Server mail() failed. Use Web3Forms or SMTP API.']);
}
