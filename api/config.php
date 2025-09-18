<?php
// Firebase Configuration - Use environment variables for security

// Get these from Firebase Console > Project Settings > General
if (!isset($_ENV['FIREBASE_URL']) || !isset($_ENV['FIREBASE_PROJECT_ID'])) {
    throw new Exception('Required Firebase environment variables not set');
}
define('FIREBASE_URL', $_ENV['FIREBASE_URL']);
define('FIREBASE_PROJECT_ID', $_ENV['FIREBASE_PROJECT_ID']);

// Get from Firebase Console > Project Settings > Service Accounts > Database Secrets
define('FIREBASE_SECRET', $_ENV['FIREBASE_SECRET'] ?? '');

// Get from Firebase Console > Project Settings > General > Web API Key
define('FIREBASE_API_KEY', $_ENV['FIREBASE_API_KEY'] ?? '');
?>