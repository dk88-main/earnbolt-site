<?php
// External file hosting - use any cloud storage
$files = [
    'motupatlunpc.glb' => 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_1',
    'shinchan.glb' => 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_2',
    'doremon.glb' => 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_3',
    // Add more files here with their Google Drive/Dropbox/OneDrive links
];

$filename = $_GET['file'] ?? '';
if (isset($files[$filename])) {
    header('Location: ' . $files[$filename]);
    exit;
} else {
    // Show IBD3D page if no file specified
    include 'IBD3D.html';
}
?>