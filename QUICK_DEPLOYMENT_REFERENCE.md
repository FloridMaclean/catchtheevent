# 🚀 QUICK DEPLOYMENT REFERENCE
## For catchtheevent.com Directory Structure

### 📁 **Your Directory Structure**
```
/var/www/
├── catchtheevent/          # Current live website
└── catchtheevent-staging/  # Staging environment
```

### 🔧 **Quick Deployment Commands**

#### **1. SSH into your VPS**
```bash
ssh root@your-vps-ip
```

#### **2. Navigate to current live site**
```bash
cd /var/www/catchtheevent
```

#### **3. Download and run deployment script**
```bash
# Download the deployment script
wget https://raw.githubusercontent.com/FloridMaclean/catchtheevent/main/safe-deploy.sh

# Make it executable
chmod +x safe-deploy.sh

# Run the deployment
./safe-deploy.sh
```

### 📋 **What the Script Does**

#### **✅ Automatic Steps:**
1. **Backup**: Creates backup of `/var/www/catchtheevent`
2. **Staging**: Sets up `/var/www/catchtheevent-staging`
3. **Deploy**: Moves staging to production
4. **Restart**: Restarts the application with PM2
5. **Verify**: Performs health checks

#### **✅ Directory Operations:**
```bash
# Before deployment
/var/www/catchtheevent/          # Live site
/var/www/catchtheevent-staging/  # New version

# During deployment
/var/www/catchtheevent-old/      # Backup of old version
/var/www/catchtheevent/          # New version (from staging)
```

### 🔍 **Manual Verification Commands**

#### **Check Application Status**
```bash
# Check PM2 processes
pm2 list

# Check application logs
pm2 logs catchtheevent

# Test website
curl -I https://catchtheevent.com
```

#### **Check Directory Structure**
```bash
# List directories
ls -la /var/www/

# Check current application
ls -la /var/www/catchtheevent/

# Check if backup exists
ls -la /var/www/catchtheevent-old/
```

### 🚨 **Emergency Rollback**

If something goes wrong:
```bash
# Stop new application
pm2 stop catchtheevent

# Restore old version
mv /var/www/catchtheevent /var/www/catchtheevent-new
mv /var/www/catchtheevent-old /var/www/catchtheevent

# Start old application
cd /var/www/catchtheevent
pm2 start ecosystem.config.js

# Verify rollback
curl -I https://catchtheevent.com
```

### 📞 **Support Information**

- **Application Name**: `catchtheevent`
- **Live Directory**: `/var/www/catchtheevent`
- **Staging Directory**: `/var/www/catchtheevent-staging`
- **Backup Directory**: `/var/backups/`
- **PM2 Configuration**: `ecosystem.config.js`

### 🎯 **Success Indicators**

✅ **Deployment Successful When:**
- `pm2 list` shows `catchtheevent` as `online`
- `curl -I https://catchtheevent.com` returns `200`
- Website loads correctly in browser
- All features work (buy button, payment, admin panel)

❌ **Rollback Required If:**
- PM2 shows `error` or `stopped` status
- Website returns error codes
- Critical features broken
- Performance issues

---

**🚀 Ready to deploy? Just run `./safe-deploy.sh` in your VPS!**
