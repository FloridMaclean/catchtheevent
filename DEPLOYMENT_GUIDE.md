# 🚀 **VPS DEPLOYMENT GUIDE - HOSTINGER**

## 🎯 **DEPLOYMENT OVERVIEW**

This guide will help you deploy the Catch The Event website to a VPS on Hostinger with production-ready configuration, SSL certificates, and optimized performance.

---

## 📋 **PRE-DEPLOYMENT CHECKLIST**

### **✅ Code Preparation**
- [x] All SEO optimizations implemented
- [x] Environment variables configured
- [x] Database connections tested
- [x] API endpoints working
- [x] Admin functionality verified
- [x] Payment processing tested
- [x] Newsletter system operational

### **✅ VPS Requirements**
- **Operating System**: Ubuntu 20.04 LTS or higher
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: Minimum 20GB SSD
- **CPU**: 2 cores minimum
- **Bandwidth**: Unlimited (Hostinger standard)

---

## 🔧 **VPS SETUP & CONFIGURATION**

### **1. VPS Initial Setup**

#### **Connect to VPS via SSH:**
```bash
ssh root@your-vps-ip
```

#### **Update System:**
```bash
apt update && apt upgrade -y
```

#### **Install Essential Packages:**
```bash
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
```

### **2. Install Node.js 18.x**

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### **3. Install PM2 Process Manager**

```bash
npm install -g pm2
```

### **4. Install Nginx**

```bash
apt install -y nginx

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx
```

### **5. Install Certbot for SSL**

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Verify installation
certbot --version
```

---

## 📁 **APPLICATION DEPLOYMENT**

### **1. Create Application Directory**

```bash
# Create application directory
mkdir -p /var/www/catchtheevent
cd /var/www/catchtheevent

# Set proper permissions
chown -R $USER:$USER /var/www/catchtheevent
chmod -R 755 /var/www/catchtheevent
```

### **2. Clone Repository**

```bash
# Clone your repository
git clone https://github.com/your-username/catchtheevent.git .

# Install dependencies
npm install

# Build the application
npm run build
```

### **3. Environment Configuration**

```bash
# Create production environment file
nano .env.production
```

#### **Production Environment Variables:**
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# Admin Authentication
ADMIN_USERNAME=admin@panghatentertainment.com
ADMIN_PASSWORD=Ambe100

# Application
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://catchtheevent.com
```

### **4. PM2 Configuration**

```bash
# Create PM2 ecosystem file
nano ecosystem.config.js
```

#### **PM2 Ecosystem Configuration:**
```javascript
module.exports = {
  apps: [{
    name: 'catchtheevent',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/catchtheevent',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/catchtheevent-error.log',
    out_file: '/var/log/pm2/catchtheevent-out.log',
    log_file: '/var/log/pm2/catchtheevent-combined.log',
    time: true,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    autorestart: true,
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

### **5. Start Application with PM2**

```bash
# Create log directory
mkdir -p /var/log/pm2

# Start application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

---

## 🌐 **NGINX CONFIGURATION**

### **1. Create Nginx Configuration**

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/catchtheevent
```

#### **Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name rangtaali.catchtheevent.com www.rangtaali.catchtheevent.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Client max body size
    client_max_body_size 10M;
    
    # Root directory
    root /var/www/catchtheevent/.next;
    
    # Handle static files
    location /_next/static {
        alias /var/www/catchtheevent/.next/static;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle public files
    location /images {
        alias /var/www/catchtheevent/public/images;
        expires 30d;
        access_log off;
        add_header Cache-Control "public";
    }
    
    location /favicon.ico {
        alias /var/www/catchtheevent/public/favicon.ico;
        expires 30d;
        access_log off;
    }
    
    location /apple-touch-icon.png {
        alias /var/www/catchtheevent/public/apple-touch-icon.png;
        expires 30d;
        access_log off;
    }
    
    location /manifest.json {
        alias /var/www/catchtheevent/public/manifest.json;
        expires 7d;
        access_log off;
    }
    
    # Handle API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Handle admin routes
    location /admin/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Handle all other routes
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Handle Next.js routing
        try_files $uri $uri/ @fallback;
    }
    
    # Fallback for Next.js
    location @fallback {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    # Logs
    access_log /var/log/nginx/catchtheevent.access.log;
    error_log /var/log/nginx/catchtheevent.error.log;
}
```

### **2. Enable Site**

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/catchtheevent /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

---

## 🔒 **SSL CERTIFICATE SETUP**

### **1. Obtain SSL Certificate**

```bash
# Stop Nginx temporarily
systemctl stop nginx

# Obtain SSL certificate
certbot certonly --standalone -d rangtaali.catchtheevent.com -d www.rangtaali.catchtheevent.com

# Start Nginx
systemctl start nginx
```

### **2. Update Nginx for SSL**

```bash
# Update Nginx configuration for SSL
nano /etc/nginx/sites-available/catchtheevent
```

#### **SSL-Enabled Nginx Configuration:**
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name rangtaali.catchtheevent.com www.rangtaali.catchtheevent.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name rangtaali.catchtheevent.com www.rangtaali.catchtheevent.com;
    
    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/rangtaali.catchtheevent.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rangtaali.catchtheevent.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Client max body size
    client_max_body_size 10M;
    
    # Root directory
    root /var/www/catchtheevent/.next;
    
    # Handle static files
    location /_next/static {
        alias /var/www/catchtheevent/.next/static;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle public files
    location /images {
        alias /var/www/catchtheevent/public/images;
        expires 30d;
        access_log off;
        add_header Cache-Control "public";
    }
    
    location /favicon.ico {
        alias /var/www/catchtheevent/public/favicon.ico;
        expires 30d;
        access_log off;
    }
    
    location /apple-touch-icon.png {
        alias /var/www/catchtheevent/public/apple-touch-icon.png;
        expires 30d;
        access_log off;
    }
    
    location /manifest.json {
        alias /var/www/catchtheevent/public/manifest.json;
        expires 7d;
        access_log off;
    }
    
    # Handle API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Handle admin routes
    location /admin/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Handle all other routes
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Handle Next.js routing
        try_files $uri $uri/ @fallback;
    }
    
    # Fallback for Next.js
    location @fallback {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    # Logs
    access_log /var/log/nginx/catchtheevent.access.log;
    error_log /var/log/nginx/catchtheevent.error.log;
}
```

### **3. Reload Nginx**

```bash
# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

### **4. Setup Auto-Renewal**

```bash
# Test auto-renewal
certbot renew --dry-run

# Add to crontab
crontab -e

# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔄 **DEPLOYMENT AUTOMATION**

### **1. Create Deployment Script**

```bash
# Create deployment script
nano /var/www/catchtheevent/deploy.sh
```

#### **Deployment Script:**
```bash
#!/bin/bash

# Deployment script for Catch The Event
echo "🚀 Starting deployment..."

# Navigate to application directory
cd /var/www/catchtheevent

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Restart PM2 process
echo "🔄 Restarting application..."
pm2 restart catchtheevent

# Check status
echo "✅ Checking application status..."
pm2 status

echo "🎉 Deployment completed!"
```

### **2. Make Script Executable**

```bash
chmod +x /var/www/catchtheevent/deploy.sh
```

---

## 📊 **MONITORING & MAINTENANCE**

### **1. PM2 Monitoring**

```bash
# Monitor application
pm2 monit

# View logs
pm2 logs catchtheevent

# View status
pm2 status
```

### **2. Nginx Monitoring**

```bash
# View Nginx status
systemctl status nginx

# View access logs
tail -f /var/log/nginx/catchtheevent.access.log

# View error logs
tail -f /var/log/nginx/catchtheevent.error.log
```

### **3. System Monitoring**

```bash
# Monitor system resources
htop

# Monitor disk usage
df -h

# Monitor memory usage
free -h
```

---

## 🔧 **TROUBLESHOOTING**

### **Common Issues & Solutions**

#### **1. Application Not Starting**
```bash
# Check PM2 logs
pm2 logs catchtheevent

# Check application status
pm2 status

# Restart application
pm2 restart catchtheevent
```

#### **2. Nginx Issues**
```bash
# Test Nginx configuration
nginx -t

# Check Nginx status
systemctl status nginx

# Restart Nginx
systemctl restart nginx
```

#### **3. SSL Certificate Issues**
```bash
# Check certificate status
certbot certificates

# Renew certificate manually
certbot renew

# Check certificate expiration
openssl x509 -in /etc/letsencrypt/live/rangtaali.catchtheevent.com/cert.pem -text -noout | grep "Not After"
```

#### **4. Database Connection Issues**
```bash
# Check environment variables
cat /var/www/catchtheevent/.env.production

# Test database connection
curl -X GET "https://rangtaali.catchtheevent.com/api/test-supabase"
```

---

## 🚀 **POST-DEPLOYMENT CHECKLIST**

### **✅ Functionality Tests**
- [ ] Homepage loads correctly
- [ ] Ticket selection works
- [ ] Payment processing functional
- [ ] Admin login accessible
- [ ] Newsletter subscription works
- [ ] Discount codes functional
- [ ] Email sending operational
- [ ] Database connections working

### **✅ Performance Tests**
- [ ] Page load speed < 3 seconds
- [ ] Mobile responsiveness
- [ ] SSL certificate working
- [ ] SEO meta tags present
- [ ] Structured data valid
- [ ] Sitemap accessible
- [ ] Robots.txt working

### **✅ Security Tests**
- [ ] HTTPS redirect working
- [ ] Security headers present
- [ ] Admin routes protected
- [ ] API rate limiting active
- [ ] Input validation working
- [ ] XSS protection enabled

---

## 📈 **OPTIMIZATION RECOMMENDATIONS**

### **1. Performance Optimization**
- Enable Nginx caching for static files
- Implement CDN for images
- Optimize database queries
- Enable compression for all content

### **2. Security Hardening**
- Regular security updates
- Firewall configuration
- Intrusion detection
- Backup strategy

### **3. Monitoring Setup**
- Uptime monitoring
- Performance monitoring
- Error tracking
- Analytics integration

---

## 🎯 **CONCLUSION**

Your Catch The Event website is now ready for production deployment on Hostinger VPS. The configuration includes:

- ✅ **Production-ready setup** with PM2 process management
- ✅ **Nginx reverse proxy** with SSL termination
- ✅ **Let's Encrypt SSL certificates** with auto-renewal
- ✅ **Security headers** and best practices
- ✅ **Performance optimization** with gzip compression
- ✅ **Monitoring and logging** setup
- ✅ **Automated deployment** script
- ✅ **Comprehensive troubleshooting** guide

**The website is optimized for maximum performance, security, and SEO visibility!** 🚀
