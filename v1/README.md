# TravMate v1 - Streamlit Version

🌟 **AI-Powered Travel Planning Application using Streamlit**

## 📖 Overview

TravMate v1 is a Streamlit-based web application that leverages AI agents to create personalized travel itineraries. It features a beautiful travel-themed interface and uses CrewAI agents to provide comprehensive trip planning.

## ✨ Features

- **Modern Travel Interface**: Beautiful CSS styling with travel-themed design
- **AI-Powered Planning**: Multiple specialized AI agents for different aspects of trip planning
- **Interactive Form**: User-friendly input form with date pickers, budget selection, and interest checkboxes
- **Real-time Results**: Live trip planning with progress indicators
- **Downloadable Itineraries**: Export your travel plans as text files
- **Responsive Design**: Works beautifully on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- OpenAI API key
- Required Python packages (see requirements.txt)

### Installation

1. Navigate to the v1 directory:
   ```bash
   cd v1
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your OpenAI API key:
   ```bash
   # Create a .env file in the v1 directory
   echo "OPENAI_API_KEY=your_api_key_here" > .env
   ```

4. Run the Streamlit app:
   ```bash
   streamlit run main.py
   ```

5. Open your browser to `http://localhost:8501`

## 🤖 AI Agents

The application uses multiple specialized AI agents:

- **Trip Planner Agent**: Main planning coordinator
- **City Expert Agent**: Local destination knowledge
- **Local Guide Agent**: Cultural insights and recommendations

## 📁 File Structure

```
v1/
├── main.py              # Main Streamlit application
├── trip_agents.py       # AI agents and tasks definition
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## 🎯 How to Use

1. **Enter Destination**: Type where you want to travel
2. **Select Dates**: Pick your departure and return dates
3. **Choose Travelers**: Number of people traveling
4. **Set Budget**: Budget, Mid-range, or Luxury
5. **Pick Trip Type**: Adventure, Relaxation, Cultural, etc.
6. **Select Interests**: Beaches, Mountains, Food, History, etc.
7. **Add Preferences**: Any special requirements
8. **Generate Plan**: Click the magic button and wait for AI magic!

## 🛠️ Customization

- Modify `trip_agents.py` to add new agents or change agent behavior
- Update `main.py` to modify the UI or add new features
- Customize CSS in the `st.markdown()` sections for styling changes

## 📝 Dependencies

- streamlit
- crewai
- langchain-openai
- python-dotenv

## 🐛 Troubleshooting

- **API Key Issues**: Make sure your OpenAI API key is correctly set in the .env file
- **Import Errors**: Ensure all dependencies are installed with `pip install -r requirements.txt`
- **Port Conflicts**: If port 8501 is busy, Streamlit will automatically use the next available port

## 🔄 Version History

- **v1.0**: Initial Streamlit implementation with AI agents
- **v1.1**: Enhanced UI with modern travel theme
- **v1.2**: Added proper error handling and user feedback

## 📞 Support

For issues or questions about the Streamlit version, please check the troubleshooting section or refer to the main project documentation.

---

**Note**: This is the Streamlit version (v1) of TravMate. For the React version, see the v2 folder. 