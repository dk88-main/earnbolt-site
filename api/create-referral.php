<?php
// Auto-create referral pages when new users sign up
// Call this from your Firebase Cloud Function

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);
$referralCode = $input['referralCode'] ?? $_GET['code'] ?? '';
$userName = $input['userName'] ?? $_GET['name'] ?? 'EarnBolt User';

if (empty($referralCode)) {
    echo json_encode(['success' => false, 'error' => 'Referral code required']);
    exit;
}

$referralCode = strtoupper($referralCode);
$filename = "../invite/{$referralCode}.html";

$content = '<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=index.html?code=' . $referralCode . '">
    <script>window.location.href = "index.html?code=' . $referralCode . '";</script>
    <title>Join EarnBolt - Invited by ' . htmlspecialchars($userName) . '</title>
</head>
<body>
    <p>Redirecting to your invitation...</p>
</body>
</html>';

if (file_put_contents($filename, $content)) {
    echo json_encode([
        'success' => true, 
        'url' => "https://earnbolt.in/invite/{$referralCode}",
        'file' => $filename
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to create referral page']);
}
?>