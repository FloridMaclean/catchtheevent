#!/bin/bash

# 🔧 DEPENDENCY UPDATE SCRIPT
# Updates deprecated dependencies to fix npm warnings

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

echo -e "${BLUE}🔧 Updating deprecated dependencies...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "Not in the application directory. Please run this from the project root."
    exit 1
fi

log_message "📦 Checking current dependencies..."
npm list --depth=0

log_message "🔧 Updating ESLint and related packages..."
# Update ESLint to latest version
npm install --save-dev eslint@latest

# Update ESLint configuration packages
npm install --save-dev @eslint/config-array@latest
npm install --save-dev @eslint/object-schema@latest

log_message "🔧 Updating utility packages..."
# Update rimraf to latest version
npm install --save-dev rimraf@latest

# Update glob to latest version
npm install --save-dev glob@latest

log_message "🔧 Updating other deprecated packages..."
# Update inflight if it's a direct dependency
npm install --save-dev inflight@latest

log_message "🧹 Cleaning up..."
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

log_message "📦 Reinstalling dependencies..."
# Reinstall all dependencies
npm install

log_message "✅ Checking for remaining warnings..."
# Check if warnings are resolved
npm install --omit=dev 2>&1 | grep -E "(warn|WARN)" || log_message "✅ No warnings found!"

log_message "🔍 Testing build..."
# Test if the application still builds correctly
npm run build

log_message "🎉 Dependency update completed!"
log_message "📋 Summary:"
echo "----------------------------------------"
echo "✅ ESLint updated to latest version"
echo "✅ Configuration packages updated"
echo "✅ Utility packages updated"
echo "✅ Dependencies cleaned and reinstalled"
echo "✅ Build tested successfully"
echo "----------------------------------------"

echo ""
echo -e "${GREEN}✅ Your dependencies have been updated!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo "1. Test the application locally: npm run dev"
echo "2. Commit the updated package.json and package-lock.json"
echo "3. Deploy the updated version to production"
