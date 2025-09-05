# 🚀 Catch The Event - Production Deployment Guide

## Quick Deployment Steps for Hostinger VPS

### 1. Prerequisites on VPS
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install Git
sudo apt install git -y
```

### 2. SSL Certificate Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d catchtheevent.com -d www.catchtheevent.com
```

### 3. Deploy Application
```bash
# Clone repository
sudo git clone https://github.com/yourusername/catchtheevent.git /var/www/catchtheevent
cd /var/www/catchtheevent

# Copy environment variables
sudo cp env.production.example .env.local
sudo nano .env.local  # Update with your production values

# Run deployment script
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

### 4. Update Nginx Configuration
```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/catchtheevent.com
sudo ln -s /etc/nginx/sites-available/catchtheevent.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Environment Variables to Update
Update these in `.env.local` on your VPS:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `STRIPE_PUBLISHABLE_KEY` - Your live Stripe publishable key
- `STRIPE_SECRET_KEY` - Your live Stripe secret key
- `SENDGRID_API_KEY` - Your SendGrid API key
- `NEXTAUTH_SECRET` - Generate a secure random string
- `ADMIN_PASSWORD` - Set a secure admin password

### 6. GitHub Repository Setup
1. Create a new repository on GitHub
2. Push your code:
```bash
git remote add origin https://github.com/yourusername/catchtheevent.git
git add .
git commit -m "Production ready deployment"
git push -u origin main
```

### 7. Update Deployment Script
Edit `deploy.sh` and update:
- `REPO_URL` with your actual GitHub repository URL

### 8. Monitoring & Maintenance
```bash
# Check application status
pm2 status
pm2 logs catchtheevent

# Restart application
pm2 restart catchtheevent

# Check nginx status
sudo systemctl status nginx

# View nginx logs
sudo tail -f /var/log/nginx/error.log
```

### 9. Security Checklist
- ✅ SSL certificate installed
- ✅ Firewall configured (ports 80, 443, 22)
- ✅ Environment variables secured
- ✅ PM2 process manager running
- ✅ Nginx reverse proxy configured
- ✅ Rate limiting enabled
- ✅ Security headers added

### 10. Performance Optimization
- ✅ Gzip compression enabled
- ✅ Static file caching configured
- ✅ Next.js production build optimized
- ✅ Image optimization enabled

## Quick Commands Reference

```bash
# Deploy updates
sudo ./deploy.sh

# Check logs
pm2 logs catchtheevent --lines 100

# Restart services
pm2 restart catchtheevent
sudo systemctl reload nginx

# Backup before deployment
sudo cp -r /var/www/catchtheevent /var/backups/catchtheevent-backup-$(date +%Y%m%d)
```

## Support
If you encounter issues:
1. Check PM2 logs: `pm2 logs catchtheevent`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify environment variables are set correctly
4. Ensure all services are running: `pm2 status` and `sudo systemctl status nginx`
