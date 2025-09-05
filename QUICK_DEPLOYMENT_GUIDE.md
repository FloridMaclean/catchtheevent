# ⚡ Quick Hostinger VPS Deployment

## 🚀 One-Command Deployment

### Step 1: Upload Files to VPS
```bash
# Upload your project to Hostinger VPS
scp -r . root@your-vps-ip:/tmp/catchtheevent/
```

### Step 2: Deploy
```bash
# SSH into your VPS
ssh root@your-vps-ip

# Run deployment script
cd /tmp/catchtheevent
chmod +x deploy.sh
sudo ./deploy.sh
```

### Step 3: Configure Environment
```bash
# Edit production environment
nano /var/www/catchtheevent/.env.production

# Update these critical values:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_key
SENDGRID_API_KEY=your_key
```

### Step 4: Verify
```bash
# Check status
pm2 status
systemctl status nginx

# Test website
curl -I https://catchtheevent.com
```

## ✅ What the Script Does

- ✅ Installs Node.js, Nginx, PM2, SSL
- ✅ Sets up firewall and security
- ✅ Configures reverse proxy
- ✅ Enables SSL with Let's Encrypt
- ✅ Sets up automatic backups
- ✅ Configures monitoring
- ✅ Optimizes performance

## 🎯 Your Website is Live!

**URL**: https://catchtheevent.com
**Admin**: https://catchtheevent.com/admin
**Status**: `pm2 status`

## 🔧 Quick Commands

```bash
# Restart app
pm2 restart catchtheevent

# View logs
pm2 logs catchtheevent

# Check resources
htop

# Update app
cd /var/www/catchtheevent
git pull
npm ci
npm run build
pm2 restart catchtheevent
```

## 🚨 Emergency

```bash
# If something breaks
pm2 logs catchtheevent
pm2 restart catchtheevent
systemctl restart nginx
```

**That's it! Your website is production-ready! 🎉**
