# 🚀 Production Deployment Guide

## **✅ Pre-Deployment Checklist**

### **1. Code Quality:**
- ✅ **TypeScript errors fixed** - `updateUser` import added
- ✅ **Build successful** - All pages compile correctly
- ✅ **Event-specific features** working
- ✅ **Aishwarya.png background** integrated
- ✅ **Dynamic email templates** implemented

### **2. Environment Variables:**
Ensure these are set in your VPS `.env.production`:
```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# SendGrid
SENDGRID_API_KEY=SG...

# Admin Authentication
ADMIN_USERNAME=admin@panghatentertainment.com
ADMIN_PASSWORD=Ambe100

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Base URL
NEXT_PUBLIC_BASE_URL=https://catchtheevent.com
```

## **🖥️ VPS Deployment Steps**

### **Step 1: SSH to VPS**
```bash
ssh root@your-vps-ip
cd /catchtheevent-staging
```

### **Step 2: Pull Latest Changes**
```bash
git pull origin main
```

### **Step 3: Install Dependencies**
```bash
npm ci --omit=dev --legacy-peer-deps
```

### **Step 4: Build Application**
```bash
npm run build
```

### **Step 5: Restart Application**
```bash
pm2 restart catchtheevent
```

### **Step 6: Verify Deployment**
```bash
# Check if app is running
pm2 status

# Check logs for errors
pm2 logs catchtheevent --lines 50

# Test the application
curl -I https://catchtheevent.com
curl -I https://catchtheevent.com/meet&greetAishwaryaMajmudar
```

## **🔧 Troubleshooting**

### **If Build Fails:**
```bash
# Clear cache and node_modules
rm -rf .next node_modules package-lock.json
npm ci --omit=dev --legacy-peer-deps
npm run build
```

### **If PM2 Fails:**
```bash
# Check PM2 status
pm2 status

# Restart PM2
pm2 restart catchtheevent

# If still failing, check logs
pm2 logs catchtheevent
```

### **If Nginx Issues:**
```bash
# Check Nginx status
systemctl status nginx

# Check Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

## **📋 Post-Deployment Verification**

### **1. Test Main Pages:**
- ✅ `https://catchtheevent.com/` - Rangtaali event
- ✅ `https://catchtheevent.com/meet&greetAishwaryaMajmudar` - Meet & Greet event
- ✅ `https://catchtheevent.com/admin/` - Admin dashboard

### **2. Test Features:**
- ✅ **Ticket Selection** - Both events
- ✅ **Payment Processing** - Stripe integration
- ✅ **Discount Codes** - Regular and AMBE100
- ✅ **Email Sending** - Event-specific templates
- ✅ **Newsletter Subscription** - Database storage
- ✅ **Admin Dashboard** - Real-time updates

### **3. Test Database:**
- ✅ **User Creation** - Ticket buyers
- ✅ **Purchase Records** - Ticket purchases
- ✅ **Newsletter Subscriptions** - Email storage
- ✅ **Discount Code Usage** - Tracking

## **🎯 Production URLs**

### **Live Events:**
- **Rangtaali Hamilton 2025**: `https://catchtheevent.com/`
- **Meet & Greet Aishwarya**: `https://catchtheevent.com/meet&greetAishwaryaMajmudar`

### **Admin Access:**
- **Admin Login**: `https://catchtheevent.com/admin/login`
- **Ticket Sales**: `https://catchtheevent.com/admin/ticket-sales`
- **Discount Codes**: `https://catchtheevent.com/admin/discount-codes`

### **Admin Credentials:**
- **Username**: `admin@panghatentertainment.com`
- **Password**: `Ambe100`

## **🚨 Emergency Rollback**

If deployment fails, rollback to previous version:
```bash
# Check git history
git log --oneline -5

# Rollback to previous commit
git reset --hard HEAD~1

# Reinstall and restart
npm ci --omit=dev --legacy-peer-deps
npm run build
pm2 restart catchtheevent
```

## **📞 Support**

If you encounter issues:
1. Check PM2 logs: `pm2 logs catchtheevent`
2. Check Nginx logs: `tail -f /var/log/nginx/error.log`
3. Check application logs: `tail -f /var/log/catchtheevent.log`

---

**🎉 Ready for Production Deployment!**

