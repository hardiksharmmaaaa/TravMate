#!/bin/bash

echo "🌟 Starting TravMate v1 (Streamlit Version)"
echo "================================"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "Please create a .env file with your OpenAI API key:"
    echo "OPENAI_API_KEY=your_api_key_here"
    exit 1
fi

# Install dependencies if needed
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Start Streamlit app
echo "🚀 Starting Streamlit app..."
echo "🌐 The app will open at: http://localhost:8501"
echo ""
streamlit run main.py 