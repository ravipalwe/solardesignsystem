#!/bin/bash

echo "🔍 Checking setup..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node --version)"
else
    echo "❌ Node.js is NOT installed"
    echo "   Please install from: https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm is installed: $(npm --version)"
else
    echo "❌ npm is NOT installed"
    exit 1
fi

# Check if dependencies are installed
if [ -d "node_modules" ]; then
    echo "✅ Dependencies are installed"
else
    echo "⚠️  Dependencies are NOT installed"
    echo "   Run: npm install"
    exit 1
fi

echo ""
echo "✅ Setup looks good! You can now run: npm run dev"

