# 🚀 SAFE LIVE DEPLOYMENT GUIDE
## Updating catchtheevent.com on Hostinger VPS

### ⚠️ **CRITICAL: LIVE WEBSITE UPDATE**
This guide will help you safely update your **live** `catchtheevent.com` website with the advanced version while maintaining zero downtime.

---

## 📋 **PRE-DEPLOYMENT CHECKLIST**

### ✅ **Local Development Status**
- [x] Application running locally on `http://localhost:3000`
- [x] All features tested and working
- [x] Security audit completed
- [x] All code committed to GitHub
- [x] No sensitive data in codebase

### 🔍 **Current Live Website Assessment**
- [ ] **Domain**: `catchtheevent.com` (Hostinger)
- [ ] **VPS**: Hostinger VPS
- [ ] **Current Version**: Live website running
- [ ] **Backup**: Create full backup before deployment

---

## 🛡️ **SAFE DEPLOYMENT STRATEGY**

### **Phase 1: Pre-Deployment Safety Measures**

#### **1.1 Create Complete Backup**
```bash
# SSH into your VPS
ssh root@your-vps-ip

# Navigate to current application directory
cd /var/www/catchtheevent

# Create timestamped backup
BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
tar -czf "/var/backups/catchtheevent_backup_$BACKUP_DATE.tar.gz" .

# Backup environment variables
cp .env .env.backup_$BACKUP_DATE
```

#### **1.2 Document Current Configuration**
```bash
# Check current PM2 processes
pm2 list

# Check current Nginx configuration
nginx -t
cat /etc/nginx/sites-available/catchtheevent.com

# Check current environment variables
cat .env

# Check current SSL certificates
ls -la /etc/letsencrypt/live/catchtheevent.com/
```

#### **1.3 Verify Current Live Status**
```bash
# Test current website
curl -I https://catchtheevent.com

# Check current application logs
pm2 logs catchtheevent --lines 50

# Check Nginx error logs
tail -f /var/log/nginx/error.log
```

### **Phase 2: Staging Deployment**

#### **2.1 Create Staging Environment**
```bash
# Create staging directory
mkdir -p /var/www/catchtheevent-staging
cd /var/www/catchtheevent-staging

# Clone the latest code
git clone https://github.com/FloridMaclean/catchtheevent.git .

# Install dependencies
npm ci --production

# Build the application
npm run build

# Test the build locally on staging (different port)
PORT=3001 NODE_ENV=production npm start
```

#### **2.2 Test Staging Environment**
```bash
# Test staging on different port (e.g., 3001)
curl -I http://localhost:3001

# Test all critical endpoints
curl -s http://localhost:3001/api/test-supabase | jq '.'
curl -s http://localhost:3001/admin/login | head -5
```

### **Phase 3: Zero-Downtime Deployment**

#### **3.1 Prepare New Environment**
```bash
# Stop current application
pm2 stop catchtheevent

# Backup current application
mv /var/www/catchtheevent /var/www/catchtheevent-old

# Deploy new version
mv /var/www/catchtheevent-staging /var/www/catchtheevent
cd /var/www/catchtheevent

# Update environment variables
cp .env.backup_* .env
# Edit .env with new configuration
nano .env
```

#### **3.2 Update Environment Variables**
```bash
# Required environment variables for production
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://catchtheevent.com
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@catchtheevent.com
SENDGRID_FROM_NAME=Catch The Event
ADMIN_USERNAME=admin@panghatentertainment.com
ADMIN_PASSWORD=Ambe100
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### **3.3 Deploy New Application**
```bash
# Install production dependencies
npm ci --production

# Build the application
npm run build

# Start the application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Check application status
pm2 list
pm2 logs catchtheevent --lines 20
```

#### **3.4 Update Nginx Configuration**
```bash
# Update Nginx configuration for new domain
sudo nano /etc/nginx/sites-available/catchtheevent.com

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### **Phase 4: Post-Deployment Verification**

#### **4.1 Health Checks**
```bash
# Test main website
curl -I https://catchtheevent.com

# Test critical API endpoints
curl -s https://catchtheevent.com/api/test-supabase | jq '.'
curl -s https://catchtheevent.com/api/validate-discount -X POST -H "Content-Type: application/json" -d '{"code":"TEST","ticketQuantity":1}' | jq '.'

# Test admin access
curl -I https://catchtheevent.com/admin/login

# Test SSL certificate
openssl s_client -connect catchtheevent.com:443 -servername catchtheevent.com
```

#### **4.2 Functionality Tests**
- [ ] **Homepage**: Loads correctly
- [ ] **Buy Button**: Opens ticket selector
- [ ] **Ticket Selection**: All ticket types work
- [ ] **Discount Codes**: Validation works
- [ ] **Payment Flow**: Stripe integration works
- [ ] **Newsletter**: Subscription works
- [ ] **Admin Panel**: Login and dashboard work
- [ ] **Email Sending**: Confirmations sent

#### **4.3 Performance Tests**
```bash
# Test page load speed
curl -w "@curl-format.txt" -o /dev/null -s https://catchtheevent.com

# Check application performance
pm2 monit

# Monitor error logs
tail -f /var/log/nginx/error.log
pm2 logs catchtheevent --lines 100
```

### **Phase 5: Rollback Plan**

#### **5.1 If Issues Occur**
```bash
# Stop new application
pm2 stop catchtheevent

# Restore old version
mv /var/www/catchtheevent /var/www/catchtheevent-new
mv /var/www/catchtheevent-old /var/www/catchtheevent

# Restore old environment
cd /var/www/catchtheevent
cp .env.backup_* .env

# Start old application
pm2 start ecosystem.config.js

# Verify rollback
curl -I https://catchtheevent.com
```

#### **5.2 Emergency Contacts**
- **Hostinger Support**: For VPS issues
- **Domain Provider**: For DNS issues
- **Stripe Support**: For payment issues
- **SendGrid Support**: For email issues

---

## 🔧 **DEPLOYMENT COMMANDS SUMMARY**

### **Quick Deployment Script**
```bash
#!/bin/bash
# Safe deployment script for catchtheevent.com

set -e  # Exit on any error

echo "🚀 Starting safe deployment for catchtheevent.com..."

# 1. Create backup
echo "📦 Creating backup..."
BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
tar -czf "/var/backups/catchtheevent_backup_$BACKUP_DATE.tar.gz" /var/www/catchtheevent

# 2. Stop current application
echo "⏹️ Stopping current application..."
pm2 stop catchtheevent

# 3. Deploy new version
echo "📥 Deploying new version..."
cd /var/www/catchtheevent
git pull origin main
npm ci --production
npm run build

# 4. Start new application
echo "▶️ Starting new application..."
pm2 start ecosystem.config.js
pm2 save

# 5. Health check
echo "🏥 Performing health check..."
sleep 10
curl -I https://catchtheevent.com

echo "✅ Deployment completed successfully!"
```

---

## 📞 **DEPLOYMENT SUPPORT**

### **Before Deployment**
1. **Test locally**: Ensure everything works on `localhost:3000`
2. **Backup everything**: Create complete backup of current live site
3. **Document current state**: Note current configuration and settings

### **During Deployment**
1. **Follow phases**: Execute deployment in order
2. **Monitor logs**: Watch for errors during deployment
3. **Test incrementally**: Verify each step before proceeding

### **After Deployment**
1. **Verify functionality**: Test all critical features
2. **Monitor performance**: Check for any performance issues
3. **Keep backup**: Don't delete old backup immediately

---

## 🎯 **SUCCESS CRITERIA**

### **✅ Deployment Successful When:**
- [ ] Website loads at `https://catchtheevent.com`
- [ ] All features work correctly
- [ ] No errors in application logs
- [ ] SSL certificate is valid
- [ ] Performance is acceptable
- [ ] Admin panel is accessible
- [ ] Payment processing works
- [ ] Email sending works

### **❌ Rollback Required If:**
- [ ] Website doesn't load
- [ ] Critical features broken
- [ ] Security vulnerabilities detected
- [ ] Performance significantly degraded
- [ ] Payment processing fails
- [ ] Email system fails

---

**🚀 Ready to deploy? Follow this guide step-by-step for a safe, zero-downtime deployment!**
