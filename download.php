<?php
$file = $_GET['f'] ?? '';
if ($file && file_exists("IBD3D/" . $file)) {
    $filepath = "IBD3D/" . $file;
    
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($file) . '"');
    header('Content-Length: ' . filesize($filepath));
    
    readfile($filepath);
    exit;
}
?>