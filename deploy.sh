#!/bin/bash

# Deployment Script for Rangtaali Hamilton 2025
# This script helps deploy the application to your VPS

echo "🚀 Starting deployment for Rangtaali Hamilton 2025..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_NAME="rangtaali-hamilton-2025"
DOMAIN="rangtaali.catchtheevent.com"
MAIN_DOMAIN="catchtheevent.com"

echo -e "${BLUE}📋 Deployment Configuration:${NC}"
echo -e "  Repository: ${GREEN}$REPO_NAME${NC}"
echo -e "  Domain: ${GREEN}$DOMAIN${NC}"
echo -e "  Main Domain: ${GREEN}$MAIN_DOMAIN${NC}"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Git repository not found. Please initialize git first.${NC}"
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  You're not on the main branch. Current branch: $CURRENT_BRANCH${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Add all changes
echo -e "${BLUE}📦 Adding changes to git...${NC}"
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit.${NC}"
else
    # Commit changes
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "🚀 Deploy Rangtaali Hamilton 2025 - Production ready

- Added phone number field to customer information
- Optimized modal layout and removed white space
- Updated SEO and structured data
- Enhanced cross-device compatibility
- Fixed hydration issues
- Updated payment processing
- Production deployment configuration"

    # Push to remote
    echo -e "${BLUE}📤 Pushing to remote repository...${NC}"
    git push origin main
fi

echo -e "${GREEN}✅ Local deployment preparation complete!${NC}"
echo
echo -e "${BLUE}📋 Next Steps for VPS Deployment:${NC}"
echo
echo -e "${YELLOW}1. SSH into your VPS server${NC}"
echo -e "   ssh user@your-vps-ip"
echo
echo -e "${YELLOW}2. Clone the repository${NC}"
echo -e "   git clone https://github.com/yourusername/$REPO_NAME.git"
echo -e "   cd $REPO_NAME"
echo
echo -e "${YELLOW}3. Install dependencies${NC}"
echo -e "   npm install"
echo
echo -e "${YELLOW}4. Create production environment file${NC}"
echo -e "   cp env.example .env.production"
echo -e "   nano .env.production  # Edit with your production values"
echo
echo -e "${YELLOW}5. Build the application${NC}"
echo -e "   npm run build"
echo
echo -e "${YELLOW}6. Set up Nginx configuration${NC}"
echo -e "   sudo nano /etc/nginx/sites-available/$DOMAIN"
echo
echo -e "${YELLOW}7. Enable the site${NC}"
echo -e "   sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
echo -e "   sudo nginx -t"
echo -e "   sudo systemctl reload nginx"
echo
echo -e "${YELLOW}8. Set up SSL certificate${NC}"
echo -e "   sudo certbot --nginx -d $DOMAIN"
echo
echo -e "${YELLOW}9. Start the application${NC}"
echo -e "   npm start  # or use PM2: pm2 start npm --name 'rangtaali' -- start"
echo
echo -e "${GREEN}🎉 Your application will be available at: https://$DOMAIN${NC}"
echo
echo -e "${BLUE}📝 Important Notes:${NC}"
echo -e "  • Make sure your DNS points $DOMAIN to your VPS IP"
echo -e "  • Update your Stripe and SendGrid keys in .env.production"
echo -e "  • Consider using PM2 for process management"
echo -e "  • Set up automatic deployments with GitHub Actions"
