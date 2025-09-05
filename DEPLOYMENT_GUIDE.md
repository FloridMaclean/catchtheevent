# 🚀 Catch The Event - Hostinger VPS Deployment Guide

## Quick Deployment Steps

### 1. Prepare Your VPS
```bash
# Connect to your Hostinger VPS
ssh root@your-server-ip

# Upload your project files
scp -r . root@your-server-ip:/tmp/catchtheevent/
```

### 2. Run the Deployment Script
```bash
# On your VPS, navigate to the uploaded files
cd /tmp/catchtheevent

# Make the script executable and run it
chmod +x deploy.sh
sudo ./deploy.sh
```

### 3. Configure Environment Variables
```bash
# Edit the production environment file
nano /var/www/catchtheevent/.env.production

# Update with your actual values:
# - Stripe keys (live keys for production)
# - Supabase credentials
# - SendGrid API key
# - Domain settings
```

### 4. Verify Deployment
```bash
# Check PM2 status
pm2 status

# Check Nginx status
systemctl status nginx

# View application logs
pm2 logs catchtheevent

# Test the website
curl -I https://catchtheevent.com
```

## Post-Deployment Checklist

### ✅ Essential Tasks
- [ ] Update DNS records to point to your VPS IP
- [ ] Configure environment variables with production keys
- [ ] Test payment processing with real Stripe keys
- [ ] Verify SSL certificate is working
- [ ] Test all website functionality
- [ ] Set up monitoring and alerts

### ✅ Security Setup
- [ ] Change default SSH port (optional)
- [ ] Set up SSH key authentication
- [ ] Configure fail2ban for brute force protection
- [ ] Review firewall rules
- [ ] Set up regular security updates

### ✅ Performance Optimization
- [ ] Enable Nginx caching
- [ ] Set up CDN (Cloudflare recommended)
- [ ] Configure image optimization
- [ ] Monitor server resources
- [ ] Set up log rotation

## Monitoring Commands

```bash
# Check application status
pm2 status
pm2 logs catchtheevent

# Check server resources
htop
df -h
free -h

# Check Nginx status
systemctl status nginx
nginx -t

# Check SSL certificate
certbot certificates

# View access logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Backup and Recovery

### Automatic Backups
- Daily backups are automatically created at 2 AM
- Backups are stored in `/var/backups/catchtheevent/`
- Old backups (7+ days) are automatically deleted

### Manual Backup
```bash
# Create manual backup
/usr/local/bin/backup-catchtheevent.sh

# Restore from backup
tar -xzf /var/backups/catchtheevent/app_YYYYMMDD_HHMMSS.tar.gz -C /var/www/
```

## Troubleshooting

### Common Issues

**1. Application not starting**
```bash
pm2 logs catchtheevent
pm2 restart catchtheevent
```

**2. Nginx configuration errors**
```bash
nginx -t
systemctl reload nginx
```

**3. SSL certificate issues**
```bash
certbot renew --dry-run
certbot renew
```

**4. High memory usage**
```bash
pm2 restart catchtheevent
# Check for memory leaks in logs
```

## Performance Monitoring

### Key Metrics to Monitor
- CPU usage (should be < 80%)
- Memory usage (should be < 80%)
- Disk space (should be < 85%)
- Response time (< 2 seconds)
- Error rate (< 1%)

### Alerts Setup
Consider setting up monitoring with:
- Uptime Robot (free)
- Pingdom
- New Relic
- DataDog

## Security Best Practices

1. **Regular Updates**
   ```bash
   apt update && apt upgrade -y
   ```

2. **Firewall Configuration**
   ```bash
   ufw status
   ufw allow 22
   ufw allow 80
   ufw allow 443
   ```

3. **SSL Certificate Renewal**
   - Automatic renewal is configured
   - Check with: `certbot certificates`

4. **Backup Verification**
   - Test restore process monthly
   - Verify backup integrity

## Support and Maintenance

### Regular Maintenance Tasks
- Weekly: Check logs for errors
- Monthly: Update system packages
- Quarterly: Review security settings
- Annually: Review and update SSL certificates

### Emergency Contacts
- Hostinger Support: [Your support contact]
- Domain Registrar: [Your domain contact]
- Payment Processor: Stripe Support

---

## 🎉 Your website is now live!

**URL**: https://catchtheevent.com
**Admin Panel**: https://catchtheevent.com/admin
**Status Page**: https://catchtheevent.com/api/health

Remember to:
1. Test all functionality thoroughly
2. Set up monitoring alerts
3. Configure your domain DNS
4. Update environment variables with production keys
5. Set up regular backups

For support, check the logs first: `pm2 logs catchtheevent`
