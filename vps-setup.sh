#!/bin/bash

# Catch The Event - VPS Initial Setup Script
# Run this script on your VPS to prepare it for deployment

set -e

echo "🚀 Setting up VPS for Catch The Event deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
print_status "Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
print_status "Installing Nginx..."
sudo apt install nginx -y

# Install PM2
print_status "Installing PM2..."
sudo npm install -g pm2

# Install Git
print_status "Installing Git..."
sudo apt install git -y

# Install Certbot
print_status "Installing Certbot for SSL..."
sudo apt install certbot python3-certbot-nginx -y

# Configure firewall
print_status "Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Create application directories
print_status "Creating application directories..."
sudo mkdir -p /var/www/catchtheevent
sudo mkdir -p /var/log/catchtheevent
sudo mkdir -p /var/www/backups/catchtheevent

# Set permissions
print_status "Setting directory permissions..."
sudo chown -R $USER:$USER /var/www/catchtheevent
sudo chown -R $USER:$USER /var/log/catchtheevent

# Clone repository
print_status "Cloning repository..."
cd /var/www
git clone https://github.com/FloridMaclean/catchtheevent.git
cd catchtheevent

# Install dependencies
print_status "Installing dependencies..."
npm ci --production

# Build application
print_status "Building application..."
npm run build

# Set final permissions
print_status "Setting final permissions..."
sudo chown -R www-data:www-data /var/www/catchtheevent
sudo chmod -R 755 /var/www/catchtheevent

# Copy Nginx configuration
print_status "Configuring Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/catchtheevent.com
sudo ln -s /etc/nginx/sites-available/catchtheevent.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Start PM2 process
print_status "Starting PM2 process..."
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

print_status "VPS setup completed! 🎉"
print_warning "Next steps:"
print_warning "1. Configure your domain DNS to point to this server"
print_warning "2. Run: sudo certbot --nginx -d catchtheevent.com -d www.catchtheevent.com"
print_warning "3. Create .env.production file with your production environment variables"
print_warning "4. Test your deployment: curl -I https://catchtheevent.com"
