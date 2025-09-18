<?php
// Firebase Configuration
// Replace these with your actual Firebase project details

define('FIREBASE_URL', 'https://your-project-id.firebaseio.com');
define('FIREBASE_SECRET', 'your-firebase-secret-key');

// Alternative: Use Firebase REST API with Web API Key
define('FIREBASE_API_KEY', 'your-web-api-key');
define('FIREBASE_PROJECT_ID', 'your-project-id');

// Firestore REST API endpoint
define('FIRESTORE_URL', 'https://firestore.googleapis.com/v1/projects/' . FIREBASE_PROJECT_ID . '/databases/(default)/documents');
?>