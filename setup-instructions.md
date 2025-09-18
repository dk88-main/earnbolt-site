# EarnBolt Real Referral System Setup

## 1. Firebase Configuration

Edit `/api/config.php` with your Firebase project details:

```php
define('FIREBASE_URL', 'https://your-project-id-default-rtdb.firebaseio.com');
define('FIREBASE_PROJECT_ID', 'your-project-id');
define('FIREBASE_SECRET', 'your-database-secret-key');
define('FIREBASE_API_KEY', 'your-web-api-key');
```

## 2. Get Firebase Credentials

1. **Firebase Console → Project Settings → General**
   - Copy **Project ID**
   - Copy **Web API Key**

2. **Firebase Console → Project Settings → Service Accounts → Database Secrets**
   - Copy **Database Secret** (for Realtime Database)

3. **Update config.php** with these values

## 3. Deploy Cloud Function

```bash
cd firebase/functions
npm install axios
firebase deploy --only functions
```

## 4. How Real System Works

1. **User Signs Up** → Cloud Function auto-creates `earnbolt.in/invite/ABC123.html`
2. **User Shares** → `earnbolt.in/invite/ABC123` 
3. **Friend Visits** → API queries Firebase for real user data
4. **Shows Real Name** → From Firebase database
5. **Auto-Links** → When friend signs up in app

## 5. Manual Create Referral Page

`earnbolt.in/api/create-referral.php?code=ABC123&name=John`

## 6. Test Real System

1. Create user in Firebase with referralCode
2. Visit `earnbolt.in/invite/REALCODE`
3. Should show real user's name from database

**System now connects to real Firebase! 🚀**