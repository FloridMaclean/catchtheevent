#!/bin/bash

# 🚀 SAFE DEPLOYMENT SCRIPT FOR CATCHTHEEVENT.COM
# This script safely updates your live website with zero downtime

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="catchtheevent"
APP_DIR="/var/www/catchtheevent"
BACKUP_DIR="/var/backups"
STAGING_DIR="/var/www/catchtheevent-staging"

echo -e "${BLUE}🚀 Starting safe deployment for catchtheevent.com...${NC}"

# Function to log messages
log_message() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   log_error "This script should not be run as root"
   exit 1
fi

# Check if application directory exists
if [ ! -d "$APP_DIR" ]; then
    log_error "Application directory $APP_DIR does not exist"
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create timestamp for backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

log_message "📦 Creating backup of current version..."
if [ -d "$APP_DIR" ]; then
    tar -czf "$BACKUP_DIR/catchtheevent_backup_$TIMESTAMP.tar.gz" -C "$APP_DIR" .
    log_message "✅ Backup created: catchtheevent_backup_$TIMESTAMP.tar.gz"
fi

log_message "🔍 Checking current application status..."
if pm2 list | grep -q "$APP_NAME.*online"; then
    log_message "✅ Current application is running"
else
    log_warning "⚠️ Current application is not running"
fi

log_message "📥 Creating staging environment..."
if [ -d "$STAGING_DIR" ]; then
    rm -rf "$STAGING_DIR"
fi

mkdir -p "$STAGING_DIR"
cd "$STAGING_DIR"

log_message "📥 Cloning latest code from GitHub..."
git clone https://github.com/FloridMaclean/catchtheevent.git .

log_message "📦 Installing dependencies..."
npm ci --production

log_message "🔨 Building application..."
npm run build

log_message "⏹️ Stopping current application..."
pm2 stop "$APP_NAME" || true

log_message "📁 Deploying new version..."
# Backup current application
mv "$APP_DIR" "${APP_DIR}-old"

# Move staging to production
mv "$STAGING_DIR" "$APP_DIR"

cd "$APP_DIR"

log_message "🔧 Updating environment variables..."
# Copy environment variables from backup if they exist
if [ -f "${APP_DIR}-old/.env" ]; then
    cp "${APP_DIR}-old/.env" .env
    log_message "✅ Environment variables copied from backup"
else
    log_warning "⚠️ No .env file found in backup. Please configure manually."
fi

log_message "▶️ Starting new application..."
pm2 start ecosystem.config.js

# Wait a moment for the application to start
sleep 5

log_message "✅ Checking application status..."
if pm2 list | grep -q "$APP_NAME.*online"; then
    log_message "✅ Application is running successfully!"
else
    log_error "❌ Application failed to start"
    pm2 logs "$APP_NAME" --lines 20
    exit 1
fi

log_message "🏥 Performing health checks..."
sleep 10

# Test the application
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    log_message "✅ Application is responding correctly"
else
    log_error "❌ Application is not responding correctly"
    exit 1
fi

log_message "🧹 Cleaning up old backups (keeping last 5)..."
cd "$BACKUP_DIR"
ls -t *.tar.gz | tail -n +6 | xargs -r rm

log_message "📊 Deployment Summary:"
echo "----------------------------------------"
echo "Application: $APP_NAME"
echo "Directory: $APP_DIR"
echo "Backup: catchtheevent_backup_$TIMESTAMP.tar.gz"
echo "Status: $(pm2 list | grep $APP_NAME | awk '{print $10}')"
echo "Memory Usage: $(pm2 list | grep $APP_NAME | awk '{print $11}')"
echo "----------------------------------------"

log_message "🎉 Deployment completed successfully!"
log_message "🔍 Please verify the website at https://catchtheevent.com"
log_message "📞 If issues occur, use the rollback commands in SAFE_LIVE_DEPLOYMENT_GUIDE.md"

echo ""
echo -e "${GREEN}🚀 Your live website has been successfully updated!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo "1. Visit https://catchtheevent.com to verify the website"
echo "2. Test all critical features (buy button, payment, admin panel)"
echo "3. Monitor the application logs: pm2 logs catchtheevent"
echo "4. If issues occur, follow the rollback guide"
