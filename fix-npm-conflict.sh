#!/bin/bash

# Fix npm conflict on Hostinger VPS
echo "🔧 Fixing npm conflict..."

# Remove conflicting npm package
apt remove --purge npm -y

# Install npm via NodeSource (comes with Node.js)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Verify installation
echo "✅ Node.js version:"
node --version
echo "✅ npm version:"
npm --version

echo "🎉 npm conflict fixed!"
