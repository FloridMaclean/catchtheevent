#!/bin/bash

# Catch The Event - Production Deployment Script
# For Hostinger VPS deployment

set -e

echo "🚀 Starting Catch The Event deployment..."

# Configuration
APP_NAME="catchtheevent"
APP_DIR="/var/www/catchtheevent"
BACKUP_DIR="/var/backups/catchtheevent"
REPO_URL="https://github.com/yourusername/catchtheevent.git"  # Update with your GitHub repo
BRANCH="main"

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

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Create backup
print_status "Creating backup..."
if [ -d "$APP_DIR" ]; then
    BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    cp -r "$APP_DIR" "$BACKUP_DIR/$BACKUP_NAME"
    print_status "Backup created: $BACKUP_DIR/$BACKUP_NAME"
fi

# Create app directory if it doesn't exist
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# Clone or update repository
if [ -d ".git" ]; then
    print_status "Updating repository..."
    git fetch origin
    git reset --hard origin/$BRANCH
    git clean -fd
else
    print_status "Cloning repository..."
    git clone -b $BRANCH $REPO_URL .
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci --production

# Build the application
print_status "Building application..."
npm run build

# Set proper permissions
print_status "Setting permissions..."
chown -R www-data:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"

# Restart PM2 process
print_status "Restarting application..."
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Reload nginx
print_status "Reloading nginx..."
nginx -t && systemctl reload nginx

# Health check
print_status "Performing health check..."
sleep 5
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_status "✅ Application is running successfully!"
else
    print_error "❌ Application health check failed!"
    exit 1
fi

print_status "🎉 Deployment completed successfully!"
print_status "Your application is now live at: https://catchtheevent.com"
