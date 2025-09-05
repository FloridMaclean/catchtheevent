#!/bin/bash

# Catch The Event - Hostinger VPS Deployment Script
# Quick deployment for production

set -e

echo "🚀 Starting Catch The Event deployment to Hostinger VPS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="catchtheevent.com"
APP_DIR="/var/www/catchtheevent"
NGINX_DIR="/etc/nginx/sites-available"
PM2_LOG_DIR="/var/log/pm2"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Update system packages
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
print_status "Installing required packages..."
apt install -y nginx nodejs npm certbot python3-certbot-nginx ufw fail2ban htop

# Create application directory
print_status "Creating application directory..."
mkdir -p $APP_DIR
mkdir -p $PM2_LOG_DIR

# Install PM2 globally
print_status "Installing PM2..."
npm install -g pm2

# Copy application files
print_status "Copying application files..."
cp -r . $APP_DIR/
cd $APP_DIR

# Install dependencies
print_status "Installing dependencies..."
rm -f package-lock.json
npm install --production

# Build the application
print_status "Building application..."
npm run build

# Set up environment variables
print_status "Setting up environment variables..."
cat > $APP_DIR/.env.production << EOF
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@$DOMAIN
ADMIN_EMAIL=admin@$DOMAIN
EOF

# Configure Nginx
print_status "Configuring Nginx..."
cp nginx.conf $NGINX_DIR/$DOMAIN
ln -sf $NGINX_DIR/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Start and enable services
print_status "Starting services..."
systemctl start nginx
systemctl enable nginx
systemctl start fail2ban
systemctl enable fail2ban

# Configure firewall
print_status "Configuring firewall..."
ufw --force enable
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 'Nginx Full'

# Start application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# Set up SSL certificate
print_status "Setting up SSL certificate..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Set up log rotation
print_status "Setting up log rotation..."
cat > /etc/logrotate.d/catchtheevent << EOF
$PM2_LOG_DIR/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Set up monitoring
print_status "Setting up monitoring..."
cat > /etc/cron.d/catchtheevent-monitor << EOF
# Catch The Event Health Check
*/5 * * * * root curl -f http://localhost:3000/api/health || pm2 restart catchtheevent
EOF

# Set proper permissions
print_status "Setting permissions..."
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR

# Create backup script
print_status "Creating backup script..."
cat > /usr/local/bin/backup-catchtheevent.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/catchtheevent"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup application
tar -czf $BACKUP_DIR/app_$DATE.tar.gz -C /var/www catchtheevent

# Keep only last 7 days of backups
find $BACKUP_DIR -name "app_*.tar.gz" -mtime +7 -delete

echo "Backup completed: app_$DATE.tar.gz"
EOF

chmod +x /usr/local/bin/backup-catchtheevent.sh

# Set up daily backups
echo "0 2 * * * root /usr/local/bin/backup-catchtheevent.sh" >> /etc/crontab

print_status "Deployment completed successfully! 🎉"
print_status "Your website is now live at: https://$DOMAIN"
print_status "PM2 Status: pm2 status"
print_status "Nginx Status: systemctl status nginx"
print_status "Logs: pm2 logs catchtheevent"

echo ""
print_warning "Don't forget to:"
print_warning "1. Update environment variables in $APP_DIR/.env.production"
print_warning "2. Configure your domain DNS to point to this server"
print_warning "3. Test the website functionality"
print_warning "4. Set up monitoring alerts"
