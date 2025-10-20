<?php
// External file hosting URLs
$files = [
    'motupatlunpc.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/motupatlunpc.glb',
    'shinchan.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/shinchan.glb',
    'doremon.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/doremon.glb',
    'bullmen.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/bullmen.glb',
    'Buggy.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/Buggy.glb',
    'bujji.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/bujji.glb',
    'dancing_twerk.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/dancing_twerk.glb',
    'Dragon_Head.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/Dragon_Head.glb',
    'franklin.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/franklin.glb',
    'girl.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/girl.glb',
    'HoverBike.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/HoverBike.glb',
    'mcqueencar.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/mcqueencar.glb',
    'Micheal.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/Micheal.glb',
    'primo_dancing.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/primo_dancing.glb',
    'pumpkinBoy.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/pumpkinBoy.glb',
    'rollsroyce.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/rollsroyce.glb',
    'Royal_Enfield_Hunter.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/Royal_Enfield_Hunter.glb',
    'ShopingKart.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/ShopingKart.glb',
    'trevor.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/trevor.glb',
    'Truck.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/Truck.glb',
    'Tung Tung.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/Tung Tung.glb',
    'GTA5CITYIBD3D.glb' => 'https://github.com/dk88-main/earnbolt-site/raw/main/IBD3D/GTA5CITYIBD3D.glb'
];

$filename = $_GET['f'] ?? '';
if (isset($files[$filename])) {
    header('Location: ' . $files[$filename]);
    exit;
} else {
    http_response_code(404);
    echo "File not found";
}
?>