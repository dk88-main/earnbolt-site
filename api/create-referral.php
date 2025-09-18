<?php
// Auto-create referral pages when new users sign up
// Call this from your Firebase Cloud Function

header('Content-Type: application/json');
$allowedOrigins = ['https://earnbolt.in', 'https://www.earnbolt.in'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

$input = json_decode(file_get_contents('php://input'), true);
$referralCode = $input['referralCode'] ?? $_GET['code'] ?? '';
$userName = $input['userName'] ?? $_GET['name'] ?? 'EarnBolt User';

if (empty($referralCode) || !preg_match('/^[A-Z0-9]{6}$/', $referralCode)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid referral code format']);
    return;
}

// Referral code already validated by regex, no need for additional sanitization
$userName = htmlspecialchars(trim($userName), ENT_QUOTES, 'UTF-8');

// Secure file path - prevent directory traversal
$inviteDir = realpath('../invite');
if (!$inviteDir || !is_dir($inviteDir)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Invalid directory']);
    return;
}

$filename = $inviteDir . DIRECTORY_SEPARATOR . $referralCode . '.html';

// Ensure file is within allowed directory
if (strpos(realpath(dirname($filename)), $inviteDir) !== 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid file path']);
    return;
}

$content = '<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=index.html?code=' . htmlspecialchars($referralCode, ENT_QUOTES, 'UTF-8') . '">
    <script>window.location.href = "index.html?code=' . htmlspecialchars($referralCode, ENT_QUOTES, 'UTF-8') . '";</script>
    <title>Join EarnBolt - Invited by ' . $userName . '</title>
</head>
<body>
    <p>Redirecting to your invitation...</p>
</body>
</html>';

if (file_put_contents($filename, $content, LOCK_EX)) {
    echo json_encode([
        'success' => true, 
        'url' => "https://earnbolt.in/invite/{$referralCode}"
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to create referral page']);
}
?>