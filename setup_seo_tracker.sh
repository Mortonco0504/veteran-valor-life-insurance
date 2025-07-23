#!/bin/bash

echo "🚀 Setting up SEO Tracker for Veteran Valor Life Insurance"
echo "=================================================="

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv seo_env

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source seo_env/bin/activate

# Install requirements
echo "📥 Installing dependencies..."
pip install -r requirements.txt

echo "✅ Setup complete!"
echo ""
echo "🎯 To run the SEO tracker:"
echo "   source seo_env/bin/activate"
echo "   python3 seo_checker.py"
echo ""
echo "🌐 To view the SEO dashboard:"
echo "   Open seo-tracker.html in your web browser"
echo ""
echo "📊 The tracker will generate:"
echo "   - JSON reports with timestamps"
echo "   - CSV tracking data"
echo "   - Real-time SEO metrics" 