<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$referralCode = $_GET['code'] ?? '';

if (empty($referralCode)) {
    echo json_encode(['success' => false, 'error' => 'Code required']);
    exit;
}

// Firebase Realtime Database query
$url = FIREBASE_URL . '/users.json?orderBy="referralCode"&equalTo="' . $referralCode . '"';

if (defined('FIREBASE_SECRET') && FIREBASE_SECRET) {
    $url .= '&auth=' . FIREBASE_SECRET;
}

$response = @file_get_contents($url);
$data = json_decode($response, true);

if ($data && !empty($data)) {
    $user = array_values($data)[0];
    echo json_encode([
        'success' => true,
        'referrer' => [
            'name' => $user['displayName'] ?? 'EarnBolt User',
            'code' => $referralCode,
            'avatar' => $user['photoURL'] ?? null
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid referral code']);
}
?>