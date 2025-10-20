<?php
$requestUri = $_SERVER['REQUEST_URI'];
$filename = '';

// Extract filename from URL
if (preg_match('/\/IBD3D\/(.+\.glb)/', $requestUri, $matches)) {
    $filename = $matches[1];
    $filepath = "IBD3D FILES/" . $filename;
    
    // Check if file exists and start download
    if (file_exists($filepath)) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Content-Length: ' . filesize($filepath));
        readfile($filepath);
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IBD3D - EarnBolt</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>IBD3D Access Page</h1>
        </header>
        
        <main style="padding: 2rem; text-align: center;">
            <div class="hero-content">
                <h2>Welcome to IBD3D</h2>
                <p>This is a special access page for IBD3D users.</p>
                
                <div class="features-grid" style="margin-top: 2rem;">
                    <div class="feature-card">
                        <h3>Exclusive Content</h3>
                        <p>Access to special features and content.</p>
                    </div>
                </div>
                
                <a href="index.html" class="cta-button" style="margin-top: 2rem; display: inline-block;">
                    Back to Home
                </a>
            </div>
        </main>
    </div>
</body>
</html>