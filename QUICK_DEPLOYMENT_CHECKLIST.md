# ⚡ Quick Deployment Checklist

## Pre-Deployment (5 minutes)
- [ ] Update `deploy.sh` with your GitHub repository URL
- [ ] Ensure all environment variables are ready
- [ ] Test build locally: `npm run build`

## VPS Setup (10 minutes)
```bash
# 1. Install dependencies
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
sudo npm install -g pm2

# 2. Get SSL certificate
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d catchtheevent.com -d www.catchtheevent.com
```

## Deploy (5 minutes)
```bash
# 1. Clone and setup
sudo git clone https://github.com/yourusername/catchtheevent.git /var/www/catchtheevent
cd /var/www/catchtheevent

# 2. Configure environment
sudo cp env.production.example .env.local
sudo nano .env.local  # Update with your values

# 3. Deploy
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

## Post-Deployment (2 minutes)
```bash
# 1. Setup nginx
sudo cp nginx.conf /etc/nginx/sites-available/catchtheevent.com
sudo ln -s /etc/nginx/sites-available/catchtheevent.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# 2. Verify
pm2 status
curl -I https://catchtheevent.com
```

## Environment Variables to Update
```bash
# Required - Update these in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret
SENDGRID_API_KEY=your_sendgrid_api_key
NEXTAUTH_SECRET=generate_random_string
ADMIN_PASSWORD=your_secure_password
```

## Quick Commands
```bash
# Deploy updates
sudo ./deploy.sh

# Check status
pm2 status
pm2 logs catchtheevent

# Restart if needed
pm2 restart catchtheevent
sudo systemctl reload nginx
```

## Total Time: ~20 minutes
✅ Ready for production deployment!
