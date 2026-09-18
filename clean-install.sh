#!/bin/bash

# Clear Path NEMT - Clean Install Script
# Fixes pnpm registry issues

echo ""
echo "================================"
echo "Clean Install & Setup"
echo "================================"
echo ""
echo "This will:"
echo "1. Clear pnpm cache"
echo "2. Remove node_modules"
echo "3. Remove lock files"
echo "4. Reinstall everything fresh"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Step 1: Stopping any running servers..."
pkill -f "node" 2>/dev/null
sleep 2

echo "Step 2: Clearing pnpm cache..."
pnpm store prune

echo "Step 3: Removing lock file..."
rm -f pnpm-lock.yaml

echo "Step 4: Removing node_modules..."
rm -rf node_modules
rm -rf packages/*/node_modules

echo "Step 5: Clearing npm cache..."
npm cache clean --force

echo ""
echo "Step 6: Resetting pnpm config to default registry..."
pnpm config set registry https://registry.npmjs.org/

echo ""
echo "Step 7: Installing dependencies..."
echo "This will take a few minutes..."
echo ""

pnpm install --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation successful!"
    echo ""
    echo "Next steps:"
    echo "1. Run: ./start-dev.sh"
    echo "2. Visit: http://localhost:3000"
    echo ""
else
    echo ""
    echo "❌ Installation failed"
    echo ""
    echo "Try these alternatives:"
    echo "1. npm install (use npm instead of pnpm)"
    echo "2. Check your internet connection"
    echo "3. Check https://registry.npmjs.org is accessible"
    echo ""
fi
