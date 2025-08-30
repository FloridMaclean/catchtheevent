# 🚀 **IMMEDIATE DEPLOYMENT CHECKLIST**

## ⚡ **READY TO DEPLOY - FOLLOW THESE STEPS**

### **📋 Pre-Deployment Checklist**
- [ ] VPS purchased on Hostinger
- [ ] Domain `rangtaali.catchtheevent.com` configured
- [ ] DNS A record pointing to VPS IP
- [ ] GitHub repository ready
- [ ] Environment variables prepared

### **🔧 VPS Setup (5 minutes)**
```bash
ssh root@your-vps-ip
apt update && apt upgrade -y
apt install -y curl wget git unzip nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
npm install -g pm2
```

### **📁 Application Deployment (10 minutes)**
```bash
mkdir -p /var/www/catchtheevent
cd /var/www/catchtheevent
git clone https://github.com/your-username/catchtheevent.git .
npm install
npm run build
```

### **⚙️ Environment Setup (5 minutes)**
```bash
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
NEXT_PUBLIC_BASE_URL=https://catchtheevent.com
```

### **🚀 Start Application (2 minutes)**
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### **🌐 Nginx Setup (5 minutes)**
```bash
cp nginx.conf /etc/nginx/sites-available/catchtheevent
ln -s /etc/nginx/sites-available/catchtheevent /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### **🔒 SSL Certificate (5 minutes)**
```bash
systemctl stop nginx
certbot certonly --standalone -d rangtaali.catchtheevent.com -d www.rangtaali.catchtheevent.com
systemctl start nginx
certbot renew --dry-run
```

### **✅ Final Test (3 minutes)**
```bash
pm2 status
curl -I https://rangtaali.catchtheevent.com
pm2 logs catchtheevent
```

---

## 🎯 **POST-DEPLOYMENT VERIFICATION**

### **✅ Functionality Tests**
- [ ] Visit https://rangtaali.catchtheevent.com
- [ ] Test ticket selection
- [ ] Test payment processing
- [ ] Test admin login (admin@panghatentertainment.com / Ambe100)
- [ ] Test newsletter subscription
- [ ] Test discount codes
- [ ] Verify email sending
- [ ] Check database connections

### **✅ Performance Tests**
- [ ] Page load speed < 3 seconds
- [ ] Mobile responsiveness
- [ ] SSL certificate working
- [ ] SEO meta tags present
- [ ] Structured data valid
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt working at /robots.txt

### **✅ Security Tests**
- [ ] HTTPS redirect working
- [ ] Security headers present
- [ ] Admin routes protected
- [ ] API rate limiting active
- [ ] Input validation working
- [ ] XSS protection enabled

---

## 🚨 **TROUBLESHOOTING**

### **Common Issues:**
1. **App not starting**: `pm2 logs catchtheevent`
2. **Nginx errors**: `nginx -t && systemctl status nginx`
3. **SSL issues**: `certbot certificates`
4. **Permission issues**: `chown -R $USER:$USER /var/www/catchtheevent`

### **Monitoring Commands:**
```bash
pm2 status          # Check app status
pm2 monit           # Monitor resources
pm2 logs catchtheevent  # View logs
systemctl status nginx  # Check web server
```

---

## 🎉 **SUCCESS!**

**Your website is live at: https://rangtaali.catchtheevent.com**

**Admin access: https://rangtaali.catchtheevent.com/admin/login**
- Username: admin@panghatentertainment.com
- Password: Ambe100

**Total deployment time: ~30 minutes**

---

## 📞 **NEED HELP?**

1. Check logs: `pm2 logs catchtheevent`
2. Restart app: `pm2 restart catchtheevent`
3. Check Nginx: `systemctl status nginx`
4. Test connectivity: `curl -I https://rangtaali.catchtheevent.com`

**Your Catch The Event website is now ready for production!** 🚀
