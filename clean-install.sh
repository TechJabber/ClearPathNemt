#!/bin/bash

# Clear Path NEMT - Clean Install Script (npm version)
# Removes pnpm and uses npm instead

echo ""
echo "================================"
echo "Clean Install (Using npm)"
echo "================================"
echo ""
echo "This will:"
echo "1. Stop any running servers"
echo "2. Remove node_modules"
echo "3. Remove lock files"
echo "4. Uninstall pnpm"
echo "5. Reinstall with npm"
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

echo "Step 2: Removing node_modules..."
rm -rf node_modules
rm -rf packages/*/node_modules

echo "Step 3: Removing lock files..."
rm -f pnpm-lock.yaml package-lock.json

echo "Step 4: Clearing npm cache..."
npm cache clean --force

echo "Step 5: Uninstalling pnpm globally (if installed)..."
npm uninstall -g pnpm 2>/dev/null

echo ""
echo "Step 6: Installing dependencies with npm..."
echo "This will take 2-5 minutes..."
echo ""

npm install

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
    echo "Check:"
    echo "1. Internet connection"
    echo "2. Node.js installed: node --version"
    echo "3. npm updated: npm --version (should be 8+)"
    echo ""
fi
