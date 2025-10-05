<?php
// Generate static referral pages for each user
// Run this script when new users sign up

$referralCode = $_GET['code'] ?? '';

if (empty($referralCode)) {
    echo "Usage: generate-referral.php?code=ABC123";
    exit;
}

$referralCode = strtoupper($referralCode);
$filename = "invite/{$referralCode}.html";

$content = '<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=index.html?code=' . $referralCode . '">
    <script>window.location.href = "index.html?code=' . $referralCode . '";</script>
</head>
<body>
    <p>Redirecting...</p>
</body>
</html>';

if (file_put_contents($filename, $content)) {
    echo "✅ Created: earnbolt.in/invite/{$referralCode}";
} else {
    echo "❌ Failed to create referral page";
}
?>