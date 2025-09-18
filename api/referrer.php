<?php
require_once 'config.php';

header('Content-Type: application/json');
$allowedOrigins = ['https://earnbolt.in', 'https://www.earnbolt.in'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

$referralCode = filter_input(INPUT_GET, 'code', FILTER_SANITIZE_STRING);

if (empty($referralCode) || !preg_match('/^[A-Z0-9]{6}$/', $referralCode)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid code format']);
    return;
}

// Firebase Realtime Database query with sanitized input
$url = FIREBASE_URL . '/users.json?orderBy="referralCode"&equalTo="' . urlencode($referralCode) . '"';

if (defined('FIREBASE_SECRET') && FIREBASE_SECRET) {
    $url .= '&auth=' . urlencode(FIREBASE_SECRET);
}

$context = stream_context_create([
    'http' => [
        'timeout' => 10,
        'method' => 'GET'
    ]
]);

$response = @file_get_contents($url, false, $context);
if ($response === false) {
    http_response_code(503);
    echo json_encode(['success' => false, 'error' => 'Service unavailable']);
    return;
}

$data = json_decode($response, true);

if ($data && !empty($data)) {
    $user = array_values($data)[0];
    echo json_encode([
        'success' => true,
        'referrer' => [
            'name' => htmlspecialchars($user['displayName'] ?? 'EarnBolt User', ENT_QUOTES, 'UTF-8'),
            'code' => htmlspecialchars($referralCode, ENT_QUOTES, 'UTF-8'),
            'avatar' => filter_var($user['photoURL'] ?? null, FILTER_VALIDATE_URL) ?: null
        ]
    ]);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'Invalid referral code']);
}
?>