#!/bin/bash

echo "🌟 Starting TravMate v2 Frontend (React)"
echo "====================================="

# Install dependencies if needed
echo "📦 Installing Node dependencies..."
npm install

# Start React development server
echo "🚀 Starting React frontend..."
echo "🌐 Frontend running at: http://localhost:3000"
echo ""
echo "⚠️  Make sure the backend is running on http://localhost:5001"
echo "   Run './start-backend.sh' in another terminal first!"
echo ""
npm start 