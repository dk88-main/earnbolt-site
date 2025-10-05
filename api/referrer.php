<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$referralCode = $_GET['code'] ?? '';

if (empty($referralCode)) {
    echo json_encode(['success' => false, 'error' => 'Code required']);
    exit;
}

// Simple response - always return success for valid format codes
if (preg_match('/^[A-Z0-9]{6,8}$/', $referralCode)) {
    echo json_encode([
        'success' => true,
        'referrer' => [
            'name' => 'EarnBolt User',
            'code' => $referralCode
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid referral code format']);
}
?>