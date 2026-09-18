#!/bin/bash

# Clear Path NEMT - Start Development Servers
# Bash Script (works on Mac, Linux, WSL, Git Bash)

echo ""
echo "================================"
echo "Clear Path NEMT - Dev Server"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Are you in the project root?"
    echo "Please run this script from: C:\Working\Websites\NEMT"
    read -p "Press Enter to exit"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    echo "This may take a few minutes on first run..."
    echo ""
    pnpm install
    if [ $? -ne 0 ]; then
        echo "Error: Installation failed"
        read -p "Press Enter to exit"
        exit 1
    fi
fi

echo ""
echo "Starting development servers..."
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo "API Docs: http://localhost:3001/api/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start the dev servers
pnpm dev
