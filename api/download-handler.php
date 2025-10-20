<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// File storage configuration
$FILE_STORAGE = [
    // Animal Plugins
    'bee_plugin' => [
        'path' => '../files/plugins/ANIMAL_PLUGINS/PLUGIN FILES/Bee_PLUGIN',
        'name' => 'Bee_PLUGIN',
        'type' => 'application/octet-stream',
        'size' => 2500000
    ],
    'godzilla_plugin' => [
        'path' => '../files/plugins/ANIMAL_PLUGINS/PLUGIN FILES/GodZilla_PLUGIN',
        'name' => 'GodZilla_PLUGIN',
        'type' => 'application/octet-stream',
        'size' => 5200000
    ],
    'deer_plugin' => [
        'path' => '../files/plugins/ANIMAL_PLUGINS/PLUGIN FILES/Deer_PLUGIN',
        'name' => 'Deer_PLUGIN',
        'type' => 'application/octet-stream',
        'size' => 3100000
    ],
    
    // Vehicle Plugins
    'invisible_car' => [
        'path' => '../files/plugins/VEHICLE PLUGINS/PLUGIN FILES/InvisibleCar_PLUGIN',
        'name' => 'InvisibleCar_PLUGIN',
        'type' => 'application/octet-stream',
        'size' => 1800000
    ],
    'kgf_bike' => [
        'path' => '../files/plugins/VEHICLE PLUGINS/PLUGIN FILES/KGF_Bike_PLUGIN',
        'name' => 'KGF_Bike_PLUGIN',
        'type' => 'application/octet-stream',
        'size' => 4200000
    ],
    
    // Mission Plugins
    'mission1_mod' => [
        'path' => '../files/plugins/MISSION PLUGINS/PLUGIN FILES/Mission1_MOD.json',
        'name' => 'Mission1_MOD.json',
        'type' => 'application/json',
        'size' => 850000
    ],
    'mission2_mod' => [
        'path' => '../files/plugins/MISSION PLUGINS/PLUGIN FILES/Mission2_MOD.json',
        'name' => 'Mission2_MOD.json',
        'type' => 'application/json',
        'size' => 920000
    ],
    
    // RGS Load Files
    'buggy_car' => [
        'path' => '../files/plugins/RGS LOAD FILES/LOAD FILES/Buggy.glb',
        'name' => 'Buggy.glb',
        'type' => 'model/gltf-binary',
        'size' => 15200000
    ],
    'bujji_car' => [
        'path' => '../files/plugins/RGS LOAD FILES/LOAD FILES/bujji.glb',
        'name' => 'bujji.glb',
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
        echo json_encode(['error' => 'File does not exist: ' . $filePath]);
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