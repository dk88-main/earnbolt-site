<?php
$filename = $_GET['file'] ?? '';
if ($filename && file_exists("IBD3D FILES/" . $filename)) {
    $filepath = "IBD3D FILES/" . $filename;
    
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Content-Length: ' . filesize($filepath));
    
    readfile($filepath);
    exit;
} else {
    echo "File not found";
}
?>