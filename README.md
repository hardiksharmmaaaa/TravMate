# 🌍 TravMate - AI Trip Planner ✈️

An interactive AI-powered trip planning application built with Streamlit and CrewAI agents.

## Features

- **Intelligent City Selection**: AI agent recommends the best cities based on your preferences
- **Hotel Recommendations**: Get personalized hotel suggestions within your budget
- **Budget Planning**: Detailed budget breakdown for your entire trip
- **Itinerary Planning**: Day-by-day itinerary with activities and timing
- **Local Insights**: Local guide information and tips for your destination
- **Export Functionality**: Download your complete trip plan as a text file

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set up OpenAI API Key
Create a `.env` file in your project directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

### 3. Run the Application
```bash
streamlit run main.py
```

## Usage

1. **Fill in Trip Preferences**: Use the sidebar to input your travel preferences:
   - Travel Type (Adventure, Relaxation, Cultural, etc.)
   - Duration (1-3 days to 1+ month)
   - Budget range
   - Interests (Food, Museums, Outdoor Activities, etc.)
   - Travel dates
   - Preferred country (optional)

2. **Plan Your Trip**: Click the "🚀 Plan My Trip" button to start the AI planning process

3. **Review Results**: View your personalized trip plan across different tabs:
   - Cities: Recommended destinations
   - Hotels: Accommodation suggestions
   - Budget: Detailed cost breakdown
   - Itinerary: Day-by-day schedule
   - Local Guide: Insights and tips

4. **Export Your Plan**: Download your complete trip plan as a text file

## AI Agents

The application uses five specialized AI agents:

- **City Selector**: Recommends the best cities based on preferences
- **Hotel Selector**: Finds suitable accommodations
- **Local Guide**: Provides destination insights and local tips
- **Budget Manager**: Creates detailed budget breakdowns
- **Itinerary Planner**: Designs day-by-day travel schedules

## Requirements

- Python 3.8+
- OpenAI API key
- Internet connection for AI agent processing

## Technologies Used

- **Streamlit**: Web application framework
- **CrewAI**: Multi-agent AI framework
- **LangChain**: AI integration
- **OpenAI GPT-3.5**: Language model for AI agents

---

Made with ❤️ using AI Agents | Powered by OpenAI & CrewAI 