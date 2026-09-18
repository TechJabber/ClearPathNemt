#!/bin/bash

# Clear Path NEMT - Stop Development Servers
# Bash Script

echo ""
echo "================================"
echo "Clear Path NEMT - Stopping Dev"
echo "================================"
echo ""

# Kill any Node processes
pkill -f "node" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Stopped all dev servers"
else
    echo "No dev servers found running"
fi

echo ""
echo "All servers stopped successfully!"
echo ""
echo "To start again, run: ./start-dev.sh"
echo ""
