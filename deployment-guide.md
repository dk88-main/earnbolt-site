# EarnBolt Website Deployment Guide

## Domain Setup: earnbolt.in

### 1. DNS Configuration
Configure your domain registrar's DNS settings:

```
Type: A Record
Name: @
Value: [Your hosting server IP]

Type: CNAME
Name: www
Value: earnbolt.in
```

### 2. GitHub Pages Setup (if using)
1. Upload all website files to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set custom domain to `earnbolt.in`
4. CNAME file is already included

### 3. Hosting Options

#### Option A: GitHub Pages
- Free hosting
- Automatic SSL certificate
- Easy deployment from repository

#### Option B: Netlify
- Drag and drop deployment
- Custom domain support
- Automatic HTTPS

#### Option C: Traditional Web Hosting
- Upload files to public_html folder
- Configure domain in hosting panel
- Enable SSL certificate

### 4. File Structure
```
website/
├── index.html
├── help-center.html
├── contact-us.html
├── privacy-policy.html
├── terms-of-service.html
├── CNAME
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── (add your images here)
```

### 5. SSL Certificate
Ensure HTTPS is enabled for security and SEO benefits.

### 6. Testing
After deployment, test all pages:
- https://earnbolt.in
- https://www.earnbolt.in
- All internal links and forms