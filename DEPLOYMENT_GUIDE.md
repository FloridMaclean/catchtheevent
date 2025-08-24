# 🚀 Deployment Guide for Rangtaali Hamilton 2025

## 📋 Overview
This guide will help you deploy the Rangtaali Hamilton 2025 website to your VPS server using the subdomain `rangtaali.catchtheevent.com` to avoid conflicts with your existing website.

## 🎯 Deployment Strategy
- **Domain**: `rangtaali.catchtheevent.com`
- **Main Site**: `catchtheevent.com` (remains untouched)
- **Technology Stack**: Next.js 14, Node.js, Nginx, PM2

## 📦 Prerequisites

### 1. VPS Requirements
- Ubuntu 20.04+ or CentOS 8+
- At least 1GB RAM
- 20GB+ storage
- Root or sudo access

### 2. Domain Configuration
- DNS access to `catchtheevent.com`
- Ability to create subdomain records

### 3. Required Accounts
- GitHub account
- Stripe account (for payments)
- SendGrid account (for emails)

## 🔧 Step-by-Step Deployment

### Step 1: Prepare Local Repository

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

### Step 2: DNS Configuration

Add these DNS records to your domain provider:

```
Type: A
Name: rangtaali
Value: YOUR_VPS_IP_ADDRESS
TTL: 300

Type: CNAME
Name: www.rangtaali
Value: rangtaali.catchtheevent.com
TTL: 300
```

### Step 3: VPS Server Setup

#### 3.1 SSH into your VPS
```bash
ssh user@your-vps-ip
```

#### 3.2 Update system
```bash
sudo apt update && sudo apt upgrade -y
```

#### 3.3 Install Node.js 18+
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 3.4 Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

#### 3.5 Install PM2
```bash
sudo npm install -g pm2
```

#### 3.6 Install Certbot (for SSL)
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Step 4: Application Deployment

#### 4.1 Create application directory
```bash
sudo mkdir -p /var/www/rangtaali.catchtheevent.com
sudo chown $USER:$USER /var/www/rangtaali.catchtheevent.com
```

#### 4.2 Clone repository
```bash
cd /var/www
git clone https://github.com/yourusername/rangtaali-hamilton-2025.git rangtaali.catchtheevent.com
cd rangtaali.catchtheevent.com
```

#### 4.3 Install dependencies
```bash
npm install
```

#### 4.4 Create production environment file
```bash
cp env.example .env.production
nano .env.production
```

**Required environment variables:**
```env
# Application Configuration
NEXT_PUBLIC_APP_URL=https://rangtaali.catchtheevent.com
NEXT_PUBLIC_APP_NAME=Rangtaali Hamilton 2025

# Payment Processing (Stripe)
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@catchtheevent.com
SENDGRID_FROM_NAME=Catch The Event

# Production Environment
NODE_ENV=production
NEXT_PUBLIC_DEBUG=false
```

#### 4.5 Build application
```bash
npm run build
```

### Step 5: Nginx Configuration

#### 5.1 Copy Nginx configuration
```bash
sudo cp nginx.conf /etc/nginx/sites-available/rangtaali.catchtheevent.com
```

#### 5.2 Enable site
```bash
sudo ln -s /etc/nginx/sites-available/rangtaali.catchtheevent.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: SSL Certificate

#### 6.1 Obtain SSL certificate
```bash
sudo certbot --nginx -d rangtaali.catchtheevent.com
```

#### 6.2 Set up auto-renewal
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

### Step 7: Process Management

#### 7.1 Create log directory
```bash
sudo mkdir -p /var/log/rangtaali
sudo chown $USER:$USER /var/log/rangtaali
```

#### 7.2 Start application with PM2
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

#### 7.3 Verify application is running
```bash
pm2 status
pm2 logs rangtaali-hamilton-2025
```

### Step 8: Final Verification

#### 8.1 Test the application
```bash
curl -I https://rangtaali.catchtheevent.com
```

#### 8.2 Check SSL certificate
```bash
curl -I https://rangtaali.catchtheevent.com/health
```

## 🔄 Continuous Deployment

### Option 1: Manual Deployment
```bash
cd /var/www/rangtaali.catchtheevent.com
git pull origin main
npm install
npm run build
pm2 reload rangtaali-hamilton-2025
```

### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to VPS
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/rangtaali.catchtheevent.com
          git pull origin main
          npm install
          npm run build
          pm2 reload rangtaali-hamilton-2025
```

## 🛠️ Maintenance

### Monitoring
```bash
# Check application status
pm2 status

# View logs
pm2 logs rangtaali-hamilton-2025

# Monitor resources
pm2 monit
```

### Updates
```bash
# Update dependencies
npm update

# Rebuild application
npm run build

# Restart application
pm2 reload rangtaali-hamilton-2025
```

### Backup
```bash
# Backup application
tar -czf rangtaali-backup-$(date +%Y%m%d).tar.gz /var/www/rangtaali.catchtheevent.com

# Backup environment file
cp .env.production .env.production.backup
```

## 🔒 Security Considerations

1. **Firewall Configuration**
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

2. **Regular Updates**
   ```bash
   sudo apt update && sudo apt upgrade -y
   npm audit fix
   ```

3. **SSL Certificate Renewal**
   ```bash
   sudo certbot renew
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Application not starting**
   ```bash
   pm2 logs rangtaali-hamilton-2025
   npm run build
   ```

2. **Nginx errors**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **SSL certificate issues**
   ```bash
   sudo certbot certificates
   sudo certbot renew --dry-run
   ```

4. **Port conflicts**
   ```bash
   sudo netstat -tlnp | grep :3000
   sudo lsof -i :3000
   ```

## 📞 Support

If you encounter issues:
1. Check the logs: `pm2 logs rangtaali-hamilton-2025`
2. Verify environment variables
3. Test the build locally first
4. Check DNS propagation

## 🎉 Success!

Your application should now be live at:
**https://rangtaali.catchtheevent.com**

The deployment is complete and your existing website at `catchtheevent.com` remains unaffected!
