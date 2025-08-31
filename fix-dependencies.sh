#!/bin/bash

# 🔧 FIX DEPENDENCIES SCRIPT
# Fixes npm dependency conflicts

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔧 Fixing dependency issues...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in the application directory${NC}"
    echo "Please run this script from /catchtheevent"
    exit 1
fi

echo -e "${YELLOW}🧹 Cleaning up old dependencies...${NC}"
# Remove old lock file and node_modules
rm -f package-lock.json
rm -rf node_modules

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
# Install dependencies
npm install --omit=dev --legacy-peer-deps

echo -e "${GREEN}✅ Dependencies fixed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Run: npm run build"
echo "2. Start the application: pm2 start ecosystem.config.js"
echo "3. Test the website"
