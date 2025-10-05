# EarnBolt Referral System Setup

## 1. Firebase Configuration

Edit `/api/config.php` and replace with your Firebase project details:

```php
define('FIREBASE_API_KEY', 'your-actual-web-api-key');
define('FIREBASE_PROJECT_ID', 'your-actual-project-id');
```

## 2. Get Firebase Credentials

1. Go to Firebase Console → Project Settings
2. Copy **Web API Key** 
3. Copy **Project ID**
4. Update `config.php` with these values

## 3. Test the System

1. Upload all files to `earnbolt.in`
2. Test URL: `earnbolt.in/invite/REALCODE` (use actual referral code from your app)
3. Should show referrer's name from Firebase database

## 4. How It Works

- `earnbolt.in/invite/ABC123` → Shows referral page
- JavaScript stores referral code in localStorage
- When user downloads app and signs up, code is automatically applied
- Both users get rewards when first withdrawal is completed

## Files Structure
```
website/
├── api/
│   ├── config.php (Firebase credentials)
│   └── referrer.php (API endpoint)
├── invite/
│   └── index.html (Referral landing page)
├── .htaccess (URL routing)
└── js/script.js (Referral detection)
```