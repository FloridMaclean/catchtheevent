# 🚀 SIMPLE DEPLOYMENT GUIDE
## Deploy to catchtheevent.com - Step by Step

### 📋 **PRE-REQUISITES**
- ✅ Your VPS is running
- ✅ Domain `catchtheevent.com` is pointing to your VPS
- ✅ You have SSH access to your VPS

---

## 🔧 **STEP 1: SSH INTO YOUR VPS**

```bash
ssh root@your-vps-ip
```

---

## 📁 **STEP 2: NAVIGATE TO YOUR WEBSITE**

```bash
cd /catchtheevent
```

---

## 💾 **STEP 3: BACKUP CURRENT WEBSITE**

```bash
# Create backup with timestamp
BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
tar -czf "/var/backups/catchtheevent_backup_$BACKUP_DATE.tar.gz" .

echo "✅ Backup created: catchtheevent_backup_$BACKUP_DATE.tar.gz"
```

---

## 📥 **STEP 4: DOWNLOAD LATEST CODE**

```bash
# Stop current application
pm2 stop catchtheevent

# Download latest code
git pull origin main

echo "✅ Latest code downloaded"
```

---

## 📦 **STEP 5: INSTALL DEPENDENCIES**

```bash
# Install production dependencies
npm ci --omit=dev

echo "✅ Dependencies installed"
```

---

## 🔨 **STEP 6: BUILD THE APPLICATION**

```bash
# Build the application
npm run build

echo "✅ Application built successfully"
```

---

## 🔧 **STEP 7: CHECK ENVIRONMENT VARIABLES**

```bash
# Check if .env file exists
ls -la .env

# If .env doesn't exist, create it:
cat > .env << 'EOF'
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
EOF

echo "✅ Environment variables configured"
```

---

## ▶️ **STEP 8: START THE APPLICATION**

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

echo "✅ Application started"
```

---

## ✅ **STEP 9: VERIFY DEPLOYMENT**

```bash
# Check application status
pm2 list

# Check if application is responding
curl -I http://localhost:3000

# Test the website
curl -I https://catchtheevent.com

echo "✅ Deployment verification completed"
```

---

## 🔍 **STEP 10: TEST CRITICAL FEATURES**

Visit your website and test:
- [ ] **Homepage loads**: https://catchtheevent.com
- [ ] **Buy button works**: Click "Buy for $20"
- [ ] **Ticket selector opens**: Should show ticket options
- [ ] **Admin panel**: https://catchtheevent.com/admin/login
- [ ] **Payment flow**: Test with a small amount

---

## 🚨 **IF SOMETHING GOES WRONG**

### **Rollback to Previous Version:**
```bash
# Stop current application
pm2 stop catchtheevent

# Restore from backup
cd /catchtheevent
tar -xzf /var/backups/catchtheevent_backup_YYYYMMDD_HHMMSS.tar.gz

# Start old version
pm2 start ecosystem.config.js

echo "✅ Rollback completed"
```

### **Check Logs:**
```bash
# View application logs
pm2 logs catchtheevent

# View recent errors
pm2 logs catchtheevent --lines 50
```

---

## 📞 **TROUBLESHOOTING**

### **Application Won't Start:**
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill any conflicting processes
pkill -f "next-server"

# Restart application
pm2 restart catchtheevent
```

### **Website Not Loading:**
```bash
# Check Nginx status
systemctl status nginx

# Restart Nginx
systemctl restart nginx

# Check Nginx configuration
nginx -t
```

### **Environment Variables Missing:**
```bash
# Check current environment
cat .env

# If missing, copy from backup
cp .env.backup* .env
```

---

## 🎯 **SUCCESS INDICATORS**

✅ **Deployment Successful When:**
- `pm2 list` shows `catchtheevent` as `online`
- `curl -I https://catchtheevent.com` returns `200`
- Website loads in browser
- All features work correctly

❌ **Rollback Required If:**
- PM2 shows `error` or `stopped`
- Website returns error codes
- Critical features broken

---

## 📋 **QUICK COMMAND SUMMARY**

```bash
# Complete deployment in one go:
cd /catchtheevent
pm2 stop catchtheevent
git pull origin main
npm ci --omit=dev
npm run build
pm2 start ecosystem.config.js
pm2 save
curl -I https://catchtheevent.com
```

---

## 🎉 **YOU'RE DONE!**

Your advanced Catch The Event website is now live at:
**https://catchtheevent.com**

**Next Steps:**
1. Test all features thoroughly
2. Monitor the application for 24 hours
3. Keep the backup for safety

---

**📞 Need Help?**
- Check logs: `pm2 logs catchtheevent`
- Rollback: Use the backup commands above
- Contact support if issues persist
