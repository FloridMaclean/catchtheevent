#!/bin/bash

# Catch The Event - Deployment Script
# This script deploys the application to the VPS

set -e

echo "🚀 Starting deployment for Catch The Event..."

# Configuration
REPO_URL="https://github.com/FloridMaclean/catchtheevent.git"
DEPLOY_PATH="/var/www/catchtheevent"
BACKUP_PATH="/var/www/backups/catchtheevent"
LOG_PATH="/var/log/catchtheevent"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

# Create necessary directories
print_status "Creating necessary directories..."
sudo mkdir -p $DEPLOY_PATH
sudo mkdir -p $BACKUP_PATH
sudo mkdir -p $LOG_PATH

# Set proper permissions
print_status "Setting permissions..."
sudo chown -R $USER:$USER $DEPLOY_PATH
sudo chown -R $USER:$USER $LOG_PATH

# Backup current deployment if it exists
if [ -d "$DEPLOY_PATH/.git" ]; then
    print_status "Creating backup of current deployment..."
    BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
    sudo cp -r $DEPLOY_PATH $BACKUP_PATH/$BACKUP_NAME
    print_status "Backup created: $BACKUP_PATH/$BACKUP_NAME"
fi

# Clone or pull the repository
if [ -d "$DEPLOY_PATH/.git" ]; then
    print_status "Pulling latest changes..."
    cd $DEPLOY_PATH
    git fetch origin
    git reset --hard origin/main
else
    print_status "Cloning repository..."
    cd /var/www
    sudo rm -rf catchtheevent
    git clone $REPO_URL catchtheevent
    cd catchtheevent
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci --production

# Build the application
print_status "Building the application..."
npm run build

# Set proper permissions
print_status "Setting final permissions..."
sudo chown -R www-data:www-data $DEPLOY_PATH
sudo chmod -R 755 $DEPLOY_PATH

# Restart PM2 process
print_status "Restarting PM2 process..."
pm2 restart catchtheevent || pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Test the application
print_status "Testing application..."
sleep 5
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    print_status "Application is running successfully!"
else
    print_error "Application failed to start properly"
    exit 1
fi

# Reload Nginx configuration
print_status "Reloading Nginx configuration..."
sudo nginx -t && sudo systemctl reload nginx

print_status "Deployment completed successfully! 🎉"
print_status "Your application is now live at: https://catchtheevent.com"
