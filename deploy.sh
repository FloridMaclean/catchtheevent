#!/bin/bash

# 🚀 SIMPLE DEPLOYMENT SCRIPT
# One command to deploy your website

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🚀 Starting deployment...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in the application directory${NC}"
    echo "Please run this script from /catchtheevent"
    exit 1
fi

# Step 1: Create backup
echo -e "${YELLOW}📦 Creating backup...${NC}"
BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
mkdir -p /var/backups
tar -czf "/var/backups/catchtheevent_backup_$BACKUP_DATE.tar.gz" .
echo -e "${GREEN}✅ Backup created${NC}"

# Step 2: Stop application
echo -e "${YELLOW}⏹️ Stopping application...${NC}"
pm2 stop catchtheevent || true
echo -e "${GREEN}✅ Application stopped${NC}"

# Step 3: Download latest code
echo -e "${YELLOW}📥 Downloading latest code...${NC}"
git pull origin main
echo -e "${GREEN}✅ Code updated${NC}"

# Step 4: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --omit=dev
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Step 5: Build application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build
echo -e "${GREEN}✅ Application built${NC}"

# Step 6: Start application
echo -e "${YELLOW}▶️ Starting application...${NC}"
pm2 start ecosystem.config.js
pm2 save
echo -e "${GREEN}✅ Application started${NC}"

# Step 7: Wait and verify
echo -e "${YELLOW}⏳ Waiting for application to start...${NC}"
sleep 10

# Step 8: Check status
echo -e "${YELLOW}🔍 Checking application status...${NC}"
if pm2 list | grep -q "catchtheevent.*online"; then
    echo -e "${GREEN}✅ Application is running${NC}"
else
    echo -e "${RED}❌ Application failed to start${NC}"
    pm2 logs catchtheevent --lines 10
    exit 1
fi

# Step 9: Test website
echo -e "${YELLOW}🌐 Testing website...${NC}"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo -e "${GREEN}✅ Website is responding${NC}"
else
    echo -e "${RED}❌ Website is not responding${NC}"
    exit 1
fi

# Success message
echo ""
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!${NC}"
echo ""
echo -e "${GREEN}✅ Your website is now live at: https://catchtheevent.com${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Visit https://catchtheevent.com"
echo "2. Test the 'Buy for $20' button"
echo "3. Test the admin panel: https://catchtheevent.com/admin/login"
echo "4. Check logs if needed: pm2 logs catchtheevent"
echo ""
echo -e "${YELLOW}🔄 Backup created: catchtheevent_backup_$BACKUP_DATE.tar.gz${NC}"
echo ""
