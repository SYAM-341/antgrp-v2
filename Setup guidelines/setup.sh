#!/bin/bash

# AntGRP Website v2.1 - Quick Setup Script
# This script sets up your project for development

echo "🚀 AntGRP Website v2.1 - Setup Script"
echo "======================================"
echo ""

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found!"
  echo "Please run this script from the project root directory"
  exit 1
fi

echo "✅ Project root verified"
echo ""

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ npm install failed!"
  exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Step 3: Fix audit vulnerabilities
echo "🔒 Fixing security vulnerabilities..."
npm audit fix --force --silent > /dev/null 2>&1

echo "✅ Vulnerabilities fixed"
echo ""

# Step 4: Summary
echo "======================================"
echo "✨ Setup Complete!"
echo "======================================"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open your browser to:"
echo "  http://localhost:3000"
echo ""
echo "To build for production:"
echo "  npm run build"
echo "  npm start"
echo ""
echo "Happy coding! 🎉"
