# 🚀 Quick Deployment Guide - Rangtaali Event Website

## 📦 What You Have

✅ **Deployment Package**: `rangtaali-deployment.tar.gz` (ready to upload)
✅ **Production Build**: Optimized and tested
✅ **SSL-Ready**: Nginx configuration with HTTPS support
✅ **Process Manager**: PM2 for reliable app management

## 🎯 Immediate Next Steps

### 1. Prepare Your VPS Server
```bash
# SSH into your VPS
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y
```

### 2. Upload and Deploy
```bash
# Upload the deployment package (from your local machine)
scp rangtaali-deployment.tar.gz user@your-server-ip:/home/user/

# On your VPS server
cd /home/user
tar -xzf rangtaali-deployment.tar.gz
chmod +x deploy.sh
./deploy.sh
```

### 3. Configure Environment Variables
```bash
# Copy and edit environment file
cp env.production.template .env.local
nano .env.local

# Add your actual values:
# - Stripe live keys
# - SendGrid API key
# - Email configuration
```

### 4. Set Up SSL Certificate
```bash
# Install SSL certificate
sudo certbot --nginx -d catchtheevent.com -d www.catchtheevent.com
```

### 5. Test Everything
- [ ] Visit https://catchtheevent.com
- [ ] Test ticket selection
- [ ] Test payment with Stripe test card
- [ ] Verify email delivery
- [ ] Check mobile responsiveness

## 🔧 Essential Commands

```bash
# Check app status
pm2 status
pm2 logs rangtaali-event

# Restart app
pm2 restart rangtaali-event

# Monitor resources
pm2 monit

# Check Nginx
sudo systemctl status nginx
sudo nginx -t
```

## 🆘 Need Help?

1. **Check logs**: `pm2 logs rangtaali-event`
2. **Restart everything**: `pm2 restart all && sudo systemctl restart nginx`
3. **Check SSL**: `sudo certbot certificates`
4. **Monitor resources**: `htop`

## 🎉 Success!

Once deployed, your website will be live at:
**https://catchtheevent.com**

---

**📋 Full deployment checklist is in**: `deployment/DEPLOYMENT_CHECKLIST.md` 