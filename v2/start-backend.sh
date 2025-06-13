#!/bin/bash

echo "🌟 Starting TravMate v2 Backend (Flask API)"
echo "========================================"

cd api

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found in api directory!"
    echo "Please create a .env file with your OpenAI API key:"
    echo "OPENAI_API_KEY=your_api_key_here"
    exit 1
fi

# Install dependencies if needed
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Start Flask app
echo "🚀 Starting Flask backend..."
echo "🌐 Backend API running at: http://localhost:5001"
echo ""
python app.py 