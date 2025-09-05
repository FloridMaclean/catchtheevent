#!/bin/bash

# Quick fix for deployment issues
echo "🔧 Fixing deployment issues..."

# Remove old lock file and reinstall
rm -f package-lock.json
npm install

# Build the application
npm run build

echo "✅ Deployment issues fixed!"
echo "Now you can run: sudo ./deploy.sh"
