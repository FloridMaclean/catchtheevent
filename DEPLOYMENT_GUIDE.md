# 🚀 Catch The Event - VPS Deployment Guide

This guide will help you deploy your Catch The Event website to your VPS server using GitHub and your domain catchtheevent.com.

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ A VPS server with Ubuntu 20.04+ or CentOS 8+
- ✅ Root or sudo access to your VPS
- ✅ Domain catchtheevent.com pointing to your VPS IP
- ✅ GitHub repository: https://github.com/FloridMaclean/catchtheevent.git

## 🔧 VPS Server Setup

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Required Software
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Git
sudo apt install git -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

### 3. Configure Firewall
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 🌐 Domain & SSL Setup

### 1. Configure DNS
Point your domain catchtheevent.com to your VPS IP address:
- A Record: `catchtheevent.com` → `YOUR_VPS_IP`
- A Record: `www.catchtheevent.com` → `YOUR_VPS_IP`

### 2. Obtain SSL Certificate
```bash
sudo certbot --nginx -d catchtheevent.com -d www.catchtheevent.com
```

## 📁 Application Deployment

### 1. Create Application Directory
```bash
sudo mkdir -p /var/www/catchtheevent
sudo mkdir -p /var/log/catchtheevent
sudo chown -R $USER:$USER /var/www/catchtheevent
sudo chown -R $USER:$USER /var/log/catchtheevent
```

### 2. Clone Repository
```bash
cd /var/www
git clone https://github.com/FloridMaclean/catchtheevent.git
cd catchtheevent
```

### 3. Install Dependencies
```bash
npm ci --production
```

### 4. Build Application
```bash
npm run build
```

### 5. Set Permissions
```bash
sudo chown -R www-data:www-data /var/www/catchtheevent
sudo chmod -R 755 /var/www/catchtheevent
```

## ⚙️ Configuration Files

### 1. Copy Nginx Configuration
```bash
sudo cp nginx.conf /etc/nginx/sites-available/catchtheevent.com
sudo ln -s /etc/nginx/sites-available/catchtheevent.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t
sudo systemctl reload nginx
```

### 2. Setup PM2 Process Manager
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## 🔐 Environment Variables

Create a production environment file:
```bash
sudo nano /var/www/catchtheevent/.env.production
```

Add your production environment variables:
```env
# Database Configuration
DATABASE_URL="your-production-database-url"

# Authentication
NEXTAUTH_SECRET="your-production-nextauth-secret"
NEXTAUTH_URL="https://catchtheevent.com"

# Payment Processing (Stripe)
STRIPE_PUBLISHABLE_KEY="pk_live_your-stripe-publishable-key"
STRIPE_SECRET_KEY="sk_live_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-stripe-webhook-secret"

# Email Service (SendGrid)
SENDGRID_API_KEY="your-production-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@catchtheevent.com"
SENDGRID_FROM_NAME="Catch The Event"

# Application Configuration
NEXT_PUBLIC_APP_URL="https://catchtheevent.com"
NEXT_PUBLIC_APP_NAME="Catch The Event"
NEXT_PUBLIC_APP_DESCRIPTION="Premier event ticketing platform"

# Security
JWT_SECRET="your-production-jwt-secret"
ENCRYPTION_KEY="your-production-encryption-key"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="your-google-analytics-id"
NEXT_PUBLIC_GTM_ID="your-google-tag-manager-id"

# Monitoring (Optional)
SENTRY_DSN="your-production-sentry-dsn"

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
NEXT_PUBLIC_ENABLE_PWA="true"
NEXT_PUBLIC_ENABLE_OFFLINE="true"

# Rate Limiting
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW_MS="900000"

# Development
NODE_ENV="production"
NEXT_PUBLIC_DEBUG="false"
```

## 🚀 Automated Deployment

### 1. Make Deploy Script Executable
```bash
chmod +x deploy.sh
```

### 2. Run Deployment
```bash
./deploy.sh
```

## 🔄 Continuous Deployment

### 1. Setup GitHub Webhook (Optional)
For automatic deployments on code pushes, you can set up a webhook.

### 2. Manual Deployment
For manual deployments, simply run:
```bash
cd /var/www/catchtheevent
git pull origin main
npm ci --production
npm run build
pm2 restart catchtheevent
sudo systemctl reload nginx
```

## 📊 Monitoring & Maintenance

### 1. Check Application Status
```bash
pm2 status
pm2 logs catchtheevent
```

### 2. Monitor Nginx
```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 3. SSL Certificate Renewal
```bash
sudo certbot renew --dry-run
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Application not starting**
   ```bash
   pm2 logs catchtheevent
   sudo tail -f /var/log/catchtheevent/err.log
   ```

2. **Nginx configuration errors**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **Permission issues**
   ```bash
   sudo chown -R www-data:www-data /var/www/catchtheevent
   sudo chmod -R 755 /var/www/catchtheevent
   ```

4. **SSL certificate issues**
   ```bash
   sudo certbot certificates
   sudo certbot renew
   ```

## 🔒 Security Checklist

- ✅ Firewall configured
- ✅ SSL certificate installed
- ✅ Nginx security headers configured
- ✅ Environment variables secured
- ✅ PM2 process manager running
- ✅ Regular backups enabled
- ✅ Log monitoring active

## 📞 Support

If you encounter any issues during deployment:
1. Check the logs: `pm2 logs catchtheevent`
2. Verify configuration: `sudo nginx -t`
3. Test connectivity: `curl -I https://catchtheevent.com`

Your Catch The Event website should now be live at https://catchtheevent.com! 🎉
