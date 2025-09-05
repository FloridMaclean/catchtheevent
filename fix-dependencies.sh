#!/bin/bash

# Quick fix for dependency issues on VPS
echo "🔧 Fixing dependency issues..."

# Remove old lock file and node_modules
rm -f package-lock.json
rm -rf node_modules

# Install dependencies fresh
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Dependencies fixed and application built successfully!"
