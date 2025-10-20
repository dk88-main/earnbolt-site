<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// File storage configuration
$FILE_STORAGE = [
    // Animal Plugins
    'bee' => [
        'path' => '../files/plugins/animals/Bee_PLUGIN.zip',
        'name' => 'Bee_Plugin.zip',
        'type' => 'application/zip',
        'size' => 2500000
    ],
    'godzilla' => [
        'path' => '../files/plugins/animals/GodZilla_PLUGIN.zip',
        'name' => 'GodZilla_Plugin.zip',
        'type' => 'application/zip',
        'size' => 5200000
    ],
    'deer' => [
        'path' => '../files/plugins/animals/Deer_PLUGIN.zip',
        'name' => 'Deer_Plugin.zip',
        'type' => 'application/zip',
        'size' => 3100000
    ],
    
    // Vehicle Plugins
    'invisiblecar' => [
        'path' => '../files/plugins/vehicles/InvisibleCar_PLUGIN.zip',
        'name' => 'InvisibleCar_Plugin.zip',
        'type' => 'application/zip',
        'size' => 1800000
    ],
    'kgfbike' => [
        'path' => '../files/plugins/vehicles/KGF_Bike_PLUGIN.zip',
        'name' => 'KGF_Bike_Plugin.zip',
        'type' => 'application/zip',
        'size' => 4200000
    ],
    
    // Mission Plugins
    'mission1' => [
        'path' => '../files/plugins/missions/Mission1_MOD.json',
        'name' => 'Mission1_MOD.json',
        'type' => 'application/json',
        'size' => 850000
    ],
    'mission2' => [
        'path' => '../files/plugins/missions/Mission2_MOD.json',
        'name' => 'Mission2_MOD.json',
        'type' => 'application/json',
        'size' => 920000
    ],
    
    // RGS Load Files
    'buggy' => [
        'path' => '../files/plugins/rgs/Buggy.glb',
        'name' => 'Buggy.glb',
        'type' => 'model/gltf-binary',
        'size' => 15200000
    ],
    'bujji' => [
        'path' => '../files/plugins/rgs/bujji.glb',
        'name' => 'Bujji.glb',
        'type' => 'model/gltf-binary',
        'size' => 18700000
    ]
];

function downloadFile($fileKey) {
    global $FILE_STORAGE;
    
    if (!isset($FILE_STORAGE[$fileKey])) {
        http_response_code(404);
        echo json_encode(['error' => 'File not found']);
        return;
    }
    
    $file = $FILE_STORAGE[$fileKey];
    $filePath = $file['path'];
    
    if (!file_exists($filePath)) {
        http_response_code(404);
        echo json_encode(['error' => 'File does not exist on server']);
        return;
    }
    
    // Set headers for file download
    header('Content-Type: ' . $file['type']);
    header('Content-Disposition: attachment; filename="' . $file['name'] . '"');
    header('Content-Length: ' . filesize($filePath));
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: 0');
    
    // Output file
    readfile($filePath);
    exit;
}

function getFileInfo($fileKey) {
    global $FILE_STORAGE;
    
    if (!isset($FILE_STORAGE[$fileKey])) {
        http_response_code(404);
        echo json_encode(['error' => 'File not found']);
        return;
    }
    
    $file = $FILE_STORAGE[$fileKey];
    echo json_encode([
        'name' => $file['name'],
        'size' => $file['size'],
        'type' => $file['type'],
        'exists' => file_exists($file['path'])
    ]);
}

// Handle requests
$method = $_SERVER['REQUEST_METHOD'];
$fileKey = $_GET['file'] ?? '';

if (empty($fileKey)) {
    http_response_code(400);
    echo json_encode(['error' => 'File parameter required']);
    exit;
}

if ($method === 'GET') {
    $action = $_GET['action'] ?? 'download';
    
    if ($action === 'info') {
        getFileInfo($fileKey);
    } else {
        downloadFile($fileKey);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>