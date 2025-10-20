<?php
// File mapping for IBD3D downloads
$files = [
    'GTA5CITYIBD3D.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/GTA5CITYIBD3D.glb',
    'motupatlunpc.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/motupatlunpc.glb',
    'shinchan.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/shinchan.glb',
    'doremon.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/doremon.glb',
    'bullmen.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/bullmen.glb',
    'Buggy.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/Buggy.glb',
    'bujji.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/bujji.glb',
    'dancing_twerk.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/dancing_twerk.glb',
    'Dragon_Head.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/Dragon_Head.glb',
    'franklin.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/franklin.glb',
    'girl.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/girl.glb',
    'HoverBike.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/HoverBike.glb',
    'mcqueencar.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/mcqueencar.glb',
    'Micheal.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/Micheal.glb',
    'primo_dancing.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/primo_dancing.glb',
    'pumpkinBoy.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/pumpkinBoy.glb',
    'rollsroyce.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/rollsroyce.glb',
    'Royal_Enfield_Hunter.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/Royal_Enfield_Hunter.glb',
    'ShopingKart.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/ShopingKart.glb',
    'trevor.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/trevor.glb',
    'Truck.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/Truck.glb',
    'Tung Tung.glb' => 'https://media.githubusercontent.com/media/dk88-main/earnbolt-files/main/Tung%20Tung.glb'
];

$path = $_SERVER['REQUEST_URI'];
$filename = basename($path);

if (isset($files[$filename])) {
    header('Location: ' . $files[$filename]);
    exit;
} else {
    http_response_code(404);
    echo "File not found";
}
?>