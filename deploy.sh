#!/bin/bash

# 🚀 Catch The Event - Automated Deployment Script
# This script automates the deployment process for the VPS

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
LOG_DIR="/var/log/pm2"
BACKUP_DIR="/var/backups/catchtheevent"

echo -e "${BLUE}🚀 Starting Catch The Event Deployment...${NC}"

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

# Navigate to application directory
cd "$APP_DIR"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create timestamp for backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

log_message "📦 Creating backup of current version..."
if [ -d ".next" ]; then
    tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" .next package-lock.json
    log_message "✅ Backup created: backup_$TIMESTAMP.tar.gz"
fi

log_message "📥 Pulling latest changes from Git..."
git fetch origin
git reset --hard origin/main

log_message "📦 Installing dependencies..."
npm ci --production

log_message "🔨 Building application..."
npm run build

log_message "🔄 Restarting PM2 process..."
pm2 restart "$APP_NAME"

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

log_message "🧹 Cleaning up old backups (keeping last 5)..."
cd "$BACKUP_DIR"
ls -t *.tar.gz | tail -n +6 | xargs -r rm

log_message "📊 Deployment Summary:"
echo "----------------------------------------"
echo "Application: $APP_NAME"
echo "Directory: $APP_DIR"
echo "Backup: backup_$TIMESTAMP.tar.gz"
echo "Status: $(pm2 list | grep $APP_NAME | awk '{print $10}')"
echo "Memory Usage: $(pm2 list | grep $APP_NAME | awk '{print $11}')"
echo "----------------------------------------"

log_message "🎉 Deployment completed successfully!"

# Optional: Test the application
log_message "🧪 Testing application..."
if curl -s -o /dev/null -w "%{http_code}" https://rangtaali.catchtheevent.com | grep -q "200"; then
    log_message "✅ Application is responding correctly"
else
    log_warning "⚠️  Application might not be responding correctly"
fi

log_message "📈 Deployment completed at $(date)"
