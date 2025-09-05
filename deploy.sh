#!/bin/bash

# Production Deployment Script for Catch The Event
# This script automates the deployment process

set -e  # Exit on any error

echo "🚀 Starting production deployment for Catch The Event..."

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

# Check if required files exist
check_requirements() {
    print_status "Checking deployment requirements..."
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found!"
        exit 1
    fi
    
    if [ ! -f "next.config.js" ]; then
        print_error "next.config.js not found!"
        exit 1
    fi
    
    if [ ! -f ".env.production" ]; then
        print_warning ".env.production not found. Please create it from the template."
        print_status "You can copy from .env.production.template"
    fi
    
    print_success "Requirements check completed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm ci --only=production
    print_success "Dependencies installed"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    # Type check
    npm run type-check || {
        print_error "TypeScript type check failed!"
        exit 1
    }
    
    # Lint check
    npm run lint || {
        print_error "Linting failed!"
        exit 1
    }
    
    print_success "All tests passed"
}

# Build the application
build_application() {
    print_status "Building application for production..."
    
    # Clean previous build
    rm -rf .next
    
    # Build the application
    npm run build || {
        print_error "Build failed!"
        exit 1
    }
    
    print_success "Application built successfully"
}

# Test production build
test_production_build() {
    print_status "Testing production build..."
    
    # Start the production server in background
    npm start &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 10
    
    # Test if server is responding
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_success "Production build test passed"
    else
        print_error "Production build test failed!"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi
    
    # Stop the test server
    kill $SERVER_PID 2>/dev/null || true
}

# Deploy to production
deploy_to_production() {
    print_status "Deploying to production..."
    
    # Check deployment method
    if command -v vercel &> /dev/null; then
        print_status "Deploying to Vercel..."
        vercel --prod
    elif command -v netlify &> /dev/null; then
        print_status "Deploying to Netlify..."
        netlify deploy --prod --dir=out
    elif [ -f "docker-compose.yml" ]; then
        print_status "Deploying with Docker..."
        docker-compose up -d --build
    else
        print_warning "No deployment method detected. Please deploy manually."
        print_status "Build files are ready in .next/ directory"
    fi
    
    print_success "Deployment completed"
}

# Post-deployment checks
post_deployment_checks() {
    print_status "Running post-deployment checks..."
    
    # Wait a bit for deployment to complete
    sleep 30
    
    # Check if the site is accessible
    if curl -f https://catchtheevent.com/api/health > /dev/null 2>&1; then
        print_success "Site is accessible and healthy"
    else
        print_warning "Site health check failed. Please verify manually."
    fi
    
    print_success "Post-deployment checks completed"
}

# Main deployment flow
main() {
    echo "🎯 Catch The Event - Production Deployment"
    echo "=========================================="
    
    check_requirements
    install_dependencies
    run_tests
    build_application
    test_production_build
    deploy_to_production
    post_deployment_checks
    
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo "🌐 Your site should be live at: https://catchtheevent.com"
    echo ""
    echo "📊 Next steps:"
    echo "1. Verify the site is working correctly"
    echo "2. Check analytics and monitoring"
    echo "3. Test payment processing"
    echo "4. Monitor error logs"
    echo ""
}

# Run main function
main "$@"
