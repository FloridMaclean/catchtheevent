#!/bin/bash

# 🚀 Production Deployment Script for Catch The Event
# Usage: ./deploy-production.sh

set -e  # Exit on any error

echo "🚀 Starting Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Checking current directory..."
pwd

# Step 1: Pull latest changes
print_status "Pulling latest changes from Git..."
git pull origin main
print_success "Git pull completed"

# Step 2: Check for changes
if git diff --quiet HEAD~1 HEAD; then
    print_warning "No new changes detected"
else
    print_success "New changes detected"
fi

# Step 3: Clean install dependencies
print_status "Installing production dependencies..."
rm -rf node_modules package-lock.json
npm ci --omit=dev --legacy-peer-deps
print_success "Dependencies installed"

# Step 4: Build application
print_status "Building application for production..."
npm run build
print_success "Build completed successfully"

# Step 5: Check PM2 status
print_status "Checking PM2 status..."
if pm2 list | grep -q "catchtheevent"; then
    print_status "Restarting PM2 process..."
    pm2 restart catchtheevent
    print_success "PM2 process restarted"
else
    print_warning "PM2 process not found. Starting new process..."
    pm2 start npm --name "catchtheevent" -- start
    print_success "PM2 process started"
fi

# Step 6: Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save
print_success "PM2 configuration saved"

# Step 7: Check application status
print_status "Checking application status..."
sleep 5  # Wait for app to start

if pm2 list | grep -q "catchtheevent.*online"; then
    print_success "Application is running successfully"
else
    print_error "Application failed to start"
    print_status "Checking PM2 logs..."
    pm2 logs catchtheevent --lines 20
    exit 1
fi

# Step 8: Test endpoints
print_status "Testing application endpoints..."

# Test main page
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    print_success "Main page is accessible"
else
    print_error "Main page is not accessible"
fi

# Test Meet & Greet page
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/meet\&greetAishwaryaMajmudar | grep -q "200"; then
    print_success "Meet & Greet page is accessible"
else
    print_error "Meet & Greet page is not accessible"
fi

# Step 9: Display final status
print_status "Deployment Summary:"
echo "----------------------------------------"
pm2 list
echo "----------------------------------------"

print_success "🎉 Production deployment completed successfully!"
print_status "Application URLs:"
echo "  - Main Event: https://catchtheevent.com/"
echo "  - Meet & Greet: https://catchtheevent.com/meet&greetAishwaryaMajmudar"
echo "  - Admin: https://catchtheevent.com/admin/"

print_status "Useful commands:"
echo "  - View logs: pm2 logs catchtheevent"
echo "  - Restart app: pm2 restart catchtheevent"
echo "  - Check status: pm2 status"

echo ""
print_success "🚀 Deployment completed! Your application is now live!"

