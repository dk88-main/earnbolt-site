<?php
// Simple test download
$testFile = 'files/plugins/ANIMAL_PLUGINS/PLUGIN FILES/Bee_PLUGIN';

echo "Testing file: " . $testFile . "<br>";
echo "File exists: " . (file_exists($testFile) ? "YES" : "NO") . "<br>";
echo "Full path: " . realpath($testFile) . "<br>";

if (file_exists($testFile)) {
    echo "File size: " . filesize($testFile) . " bytes<br>";
    echo "Is readable: " . (is_readable($testFile) ? "YES" : "NO") . "<br>";
}

// List directory contents
echo "<br>Directory contents:<br>";
$dir = 'files/plugins/ANIMAL_PLUGINS/PLUGIN FILES/';
if (is_dir($dir)) {
    $files = scandir($dir);
    foreach($files as $file) {
        if ($file != '.' && $file != '..') {
            echo "- " . $file . "<br>";
        }
    }
} else {
    echo "Directory does not exist: " . $dir;
}
?>