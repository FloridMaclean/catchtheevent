# 🚀 **QUICK DEPLOYMENT GUIDE - HOSTINGER VPS**

## ⚡ **FAST DEPLOYMENT STEPS**

### **1. VPS Setup (5 minutes)**
```bash
# Connect to your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y curl wget git unzip nginx certbot python3-certbot-nginx

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2
```

### **2. Application Deployment (10 minutes)**
```bash
# Create application directory
mkdir -p /var/www/catchtheevent
cd /var/www/catchtheevent

# Clone repository
git clone https://github.com/your-username/catchtheevent.git .

# Install dependencies
npm install

# Build application
npm run build
```

### **3. Environment Setup (5 minutes)**
```bash
# Create production environment file
nano .env.production
```

**Add these variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_USERNAME=admin@panghatentertainment.com
ADMIN_PASSWORD=Ambe100
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://rangtaali.catchtheevent.com
```

### **4. PM2 Setup (2 minutes)**
```bash
# Start application with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

### **5. Nginx Configuration (5 minutes)**
```bash
# Copy Nginx configuration
cp nginx.conf /etc/nginx/sites-available/catchtheevent

# Enable site
ln -s /etc/nginx/sites-available/catchtheevent /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Test and reload
nginx -t
systemctl reload nginx
```

### **6. SSL Certificate (5 minutes)**
```bash
# Stop Nginx temporarily
systemctl stop nginx

# Obtain SSL certificate
certbot certonly --standalone -d rangtaali.catchtheevent.com -d www.rangtaali.catchtheevent.com

# Start Nginx
systemctl start nginx

# Test auto-renewal
certbot renew --dry-run
```

### **7. Final Test (3 minutes)**
```bash
# Check application status
pm2 status

# Test website
curl -I https://rangtaali.catchtheevent.com

# Check logs
pm2 logs catchtheevent
```

---

## 🎯 **DEPLOYMENT CHECKLIST**

### **✅ Pre-Deployment**
- [ ] VPS purchased and running
- [ ] Domain DNS configured
- [ ] GitHub repository ready
- [ ] Environment variables prepared
- [ ] Database configured

### **✅ Post-Deployment**
- [ ] Website loads correctly
- [ ] SSL certificate working
- [ ] Admin login accessible
- [ ] Payment processing works
- [ ] Email sending functional
- [ ] Database connections working

---

## 🚨 **TROUBLESHOOTING**

### **Common Issues:**

**1. Application not starting:**
```bash
pm2 logs catchtheevent
pm2 restart catchtheevent
```

**2. Nginx errors:**
```bash
nginx -t
systemctl status nginx
```

**3. SSL certificate issues:**
```bash
certbot certificates
certbot renew
```

**4. Permission issues:**
```bash
chown -R $USER:$USER /var/www/catchtheevent
chmod -R 755 /var/www/catchtheevent
```

---

## 📞 **SUPPORT**

If you encounter issues:
1. Check PM2 logs: `pm2 logs catchtheevent`
2. Check Nginx logs: `tail -f /var/log/nginx/error.log`
3. Verify configuration: `nginx -t`
4. Test connectivity: `curl -I https://rangtaali.catchtheevent.com`

---

## 🎉 **SUCCESS!**

Your Catch The Event website is now live at:
**https://rangtaali.catchtheevent.com**

**Total deployment time: ~30 minutes** 