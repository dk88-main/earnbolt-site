<?php
// Get referral code from URL path
$requestUri = $_SERVER['REQUEST_URI'];
$pathParts = explode('/', trim($requestUri, '/'));
$referralCode = '';

// Find referral code in URL
foreach ($pathParts as $index => $part) {
    if ($part === 'invite' && isset($pathParts[$index + 1])) {
        $referralCode = strtoupper($pathParts[$index + 1]);
        break;
    }
}

// If no code found, redirect to homepage
if (empty($referralCode)) {
    header('Location: /');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join EarnBolt - Invited by Friend</title>
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .invite-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0F1419 0%, #1B2631 50%, #0F1419 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .invite-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 25px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .invite-logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #FFD700, #FFA000);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        }
        .invite-title {
            color: #FFD700;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .invite-subtitle {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            margin-bottom: 30px;
        }
        .referrer-info {
            background: rgba(76, 175, 80, 0.2);
            border: 1px solid rgba(76, 175, 80, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .referrer-name {
            color: #4CAF50;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .referral-code {
            color: #FFD700;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 3px;
            margin: 10px 0;
        }
        .bonus-info {
            background: rgba(255, 215, 0, 0.2);
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .bonus-amount {
            color: #FFD700;
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .download-section {
            margin-top: 30px;
        }
        .download-btn {
            display: inline-flex;
            align-items: center;
            background: linear-gradient(45deg, #4CAF50, #2E7D32);
            color: white;
            padding: 15px 30px;
            border-radius: 15px;
            text-decoration: none;
            font-weight: bold;
            margin: 10px;
            transition: transform 0.3s ease;
            box-shadow: 0 10px 25px rgba(76, 175, 80, 0.3);
        }
        .download-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(76, 175, 80, 0.4);
        }
        .download-btn i {
            font-size: 24px;
            margin-right: 10px;
        }
        .steps {
            text-align: left;
            margin-top: 30px;
        }
        .step {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }
        .step-number {
            background: #4CAF50;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
        }
    </style>
</head>
<body>
    <div class="invite-container">
        <div class="invite-card">
            <div class="invite-logo">
                <i class="fas fa-bolt" style="color: white; font-size: 40px;"></i>
            </div>
            
            <h1 class="invite-title">You're Invited!</h1>
            <p class="invite-subtitle">Join EarnBolt and start earning money today</p>
            
            <div class="referrer-info">
                <div class="referrer-name" id="referrer-name">Friend</div>
                <div style="color: rgba(255,255,255,0.7); font-size: 14px;">invited you to join EarnBolt</div>
                <div class="referral-code"><?php echo htmlspecialchars($referralCode); ?></div>
            </div>
            
            <div class="bonus-info">
                <div class="bonus-amount">🎁 300 COINS</div>
                <div style="color: rgba(255,255,255,0.8);">Bonus when you complete your first withdrawal</div>
            </div>
            
            <div class="download-section">
                <h3 style="color: white; margin-bottom: 20px;">Download EarnBolt Now</h3>
                <a href="https://play.google.com/store/apps/details?id=com.earnbolt.app" class="download-btn">
                    <i class="fab fa-google-play"></i>
                    <div>
                        <div>Get it on</div>
                        <div style="font-size: 18px;">Google Play</div>
                    </div>
                </a>
                <a href="https://apps.apple.com/app/earnbolt/id123456789" class="download-btn">
                    <i class="fab fa-apple"></i>
                    <div>
                        <div>Download on the</div>
                        <div style="font-size: 18px;">App Store</div>
                    </div>
                </a>
            </div>
            
            <div class="steps">
                <h4 style="color: white; margin-bottom: 15px;">How it works:</h4>
                <div class="step">
                    <div class="step-number">1</div>
                    <div style="color: rgba(255,255,255,0.8);">Download & install EarnBolt app</div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div style="color: rgba(255,255,255,0.8);">Sign up with Google (referral auto-applied)</div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div style="color: rgba(255,255,255,0.8);">Complete your first withdrawal to get bonus</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Store referral code
        const referralCode = '<?php echo htmlspecialchars($referralCode); ?>';
        if (referralCode) {
            localStorage.setItem('referralCode', referralCode);
            localStorage.setItem('referralTimestamp', Date.now().toString());
            console.log('Referral code stored:', referralCode);
        }

        // Fetch referrer details
        async function fetchReferrerDetails() {
            try {
                const response = await fetch(`../api/referrer.php?code=${referralCode}`);
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('referrer-name').textContent = data.referrer.name;
                }
            } catch (error) {
                console.log('Could not fetch referrer details');
            }
        }

        fetchReferrerDetails();
    </script>
</body>
</html>