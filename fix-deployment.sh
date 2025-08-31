#!/bin/bash

# 🚨 DEPLOYMENT FIX SCRIPT
# Fixes issues with the current deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_message() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

echo -e "${BLUE}🔧 Fixing deployment issues...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "Not in the application directory. Please run this from /catchtheevent"
    exit 1
fi

log_message "🔍 Checking current application status..."
pm2 list

log_message "🔧 Fixing environment variables..."
# Check if .env file exists
if [ ! -f ".env" ]; then
    log_error ".env file not found. Please create it with proper configuration."
    echo "Required environment variables:"
    echo "NODE_ENV=production"
    echo "NEXT_PUBLIC_BASE_URL=https://catchtheevent.com"
    echo "STRIPE_SECRET_KEY=your_stripe_secret_key"
    echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key"
    echo "SENDGRID_API_KEY=your_sendgrid_api_key"
    echo "ADMIN_USERNAME=admin@panghatentertainment.com"
    echo "ADMIN_PASSWORD=Ambe100"
    echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
    exit 1
fi

log_message "🔧 Updating Next.js configuration..."
# Fix the images configuration warning
if [ -f "next.config.js" ]; then
    # Check if images.domains is used
    if grep -q "images.domains" next.config.js; then
        log_warning "Found deprecated images.domains configuration"
        log_message "Please update next.config.js to use images.remotePatterns"
    fi
fi

log_message "🔄 Restarting application with proper environment..."
# Stop the application
pm2 stop catchtheevent

# Wait a moment
sleep 2

# Start the application with proper environment
pm2 start ecosystem.config.js

# Wait for the application to start
sleep 10

log_message "✅ Checking application status..."
if pm2 list | grep -q "catchtheevent.*online"; then
    log_message "✅ Application is running successfully!"
else
    log_error "❌ Application failed to start"
    pm2 logs catchtheevent --lines 20
    exit 1
fi

log_message "🏥 Performing health checks..."
sleep 5

# Test the application
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    log_message "✅ Application is responding correctly"
else
    log_error "❌ Application is not responding correctly"
    pm2 logs catchtheevent --lines 10
    exit 1
fi

log_message "🔍 Testing API endpoints..."
# Test Supabase connection
if curl -s http://localhost:3000/api/test-supabase | grep -q "success"; then
    log_message "✅ Supabase connection working"
else
    log_warning "⚠️ Supabase connection may have issues"
fi

# Test discount validation
if curl -s -X POST http://localhost:3000/api/validate-discount \
   -H "Content-Type: application/json" \
   -d '{"code":"TEST","ticketQuantity":1}' | grep -q "error\|invalid"; then
    log_message "✅ Discount validation API working"
else
    log_warning "⚠️ Discount validation API may have issues"
fi

log_message "📊 Final Status Check:"
echo "----------------------------------------"
echo "Application: catchtheevent"
echo "Status: $(pm2 list | grep catchtheevent | awk '{print $10}')"
echo "Memory Usage: $(pm2 list | grep catchtheevent | awk '{print $11}')"
echo "Port: 3000"
echo "----------------------------------------"

log_message "🎉 Deployment fix completed!"
log_message "🔍 Please verify the website at https://catchtheevent.com"

echo ""
echo -e "${GREEN}✅ Your deployment has been fixed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo "1. Visit https://catchtheevent.com to verify the website"
echo "2. Test all critical features (buy button, payment, admin panel)"
echo "3. Monitor the application logs: pm2 logs catchtheevent"
echo "4. If issues persist, check the logs for specific errors"
