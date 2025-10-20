# GTA Vice City Plugin Download System Setup

## 🎯 **How It Works:**

1. **Invisible Page**: `IBD3D.html` - Hidden download page
2. **Background Download**: Files download without interrupting user experience
3. **Direct Links**: Users paste links in browser to download

## 📁 **File Structure:**

```
earnbolt-site/
├── IBD3D.html                 # Invisible download page
├── api/download-handler.php    # Server-side download handler
├── js/download-config.js       # Download configuration
└── files/plugins/              # Plugin files storage
    ├── animals/               # Animal plugin files
    ├── vehicles/              # Vehicle plugin files
    ├── missions/              # Mission plugin files
    ├── rgs/                   # RGS load files
    ├── cities/                # City plugin files
    ├── players/               # Player plugin files
    ├── challenges/            # Challenge plugin files
    └── rgsmods/               # RGS MOD plugin files
```

## 🔗 **Download Link Format:**

```
https://your-domain.com/IBD3D.html?file=PLUGIN_KEY
```

### **Example Links:**

- **Bee Plugin**: `https://your-domain.com/IBD3D.html?file=bee`
- **GodZilla Plugin**: `https://your-domain.com/IBD3D.html?file=godzilla`
- **Mission 1**: `https://your-domain.com/IBD3D.html?file=mission1`
- **Invisible Car**: `https://your-domain.com/IBD3D.html?file=invisiblecar`

## 📋 **Setup Steps:**

### 1. **Upload Plugin Files:**
```bash
# Copy your plugin files to respective folders:
files/plugins/animals/Bee_PLUGIN.zip
files/plugins/animals/GodZilla_PLUGIN.zip
files/plugins/vehicles/InvisibleCar_PLUGIN.zip
files/plugins/missions/Mission1_MOD.json
# ... etc
```

### 2. **Update Download Handler:**
Edit `api/download-handler.php` and add your file paths:
```php
'your_plugin_key' => [
    'path' => '../files/plugins/category/YourFile.zip',
    'name' => 'YourFile.zip',
    'type' => 'application/zip',
    'size' => 1234567
]
```

### 3. **Generate Download Links:**
Use JavaScript to generate links:
```javascript
// Generate link for bee plugin
const link = generateDownloadLink('animals', 'bee');
// Result: https://your-domain.com/IBD3D.html?file=bee
```

### 4. **Share Links:**
- Users paste link in browser
- IBD3D page opens with loading animation
- File downloads automatically in background
- User redirects to main site after download

## 🎮 **Available Plugin Categories:**

1. **Animals**: bee, godzilla, deer, crocodile, eagle, etc.
2. **Vehicles**: invisiblecar, kgfbike, farmtractor, etc.
3. **Missions**: mission1, mission2, mission3, etc.
4. **Cities**: egyptcity, villagemap, zoo, etc.
5. **Players**: beast, carry, skeleton, etc.
6. **RGS Files**: buggy, bujji, doremon, etc.
7. **Challenges**: horrorghost, zombie, racetrack, etc.
8. **RGS MODs**: builddestroy, funntyaa, etc.

## 🔧 **Customization:**

### Add New Plugin:
1. Upload file to appropriate folder
2. Add entry in `download-handler.php`
3. Add key in `download-config.js`
4. Generate and share link

### Change Domain:
Update `baseUrl` in `download-config.js`:
```javascript
baseUrl: 'https://your-new-domain.com/IBD3D.html?file='
```

## 🚀 **Benefits:**

- ✅ **Invisible Process**: No interruption to user experience
- ✅ **Background Download**: Files download while user browses
- ✅ **Direct Links**: Easy to share and use
- ✅ **Progress Indication**: Users see download progress
- ✅ **Auto Redirect**: Returns to main site after download
- ✅ **Large File Support**: Handles any file size
- ✅ **Multiple Formats**: Supports ZIP, JSON, GLB files

## 📱 **Usage in Flutter App:**

In your Flutter app, generate and share these links:
```dart
String generateDownloadLink(String category, String item) {
  return 'https://your-domain.com/IBD3D.html?file=$item';
}
```

Users copy the link and paste in browser to download!