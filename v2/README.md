# 🌍 TravMate - AI Travel Planner ✈️

🌟 **Intelligent AI-Powered Travel Planning Application**

TravMate is an AI-powered travel planning application that creates personalized itineraries using advanced AI agents. This repository contains two versions of the application showcasing different UI technologies.

## 📁 Project Structure

```
TravMate/
├── v1/                 # Streamlit Version
│   ├── main.py         # Streamlit app
│   ├── trip_agents.py  # AI agents & tasks
│   ├── requirements.txt
│   └── README.md
├── v2/                 # React Version  
│   ├── src/            # React components
│   ├── api/            # Flask backend
│   ├── package.json
│   └── README_React.md
└── README.md           # This file
```

## 🚀 Quick Start

### Choose Your Version

#### **Version 1 - Streamlit** (Simple & Fast)
Perfect for quick demos and development

```bash
cd v1
pip install -r requirements.txt
echo "OPENAI_API_KEY=your_key_here" > .env
streamlit run main.py
```
🌐 **Access**: http://localhost:8501

#### **Version 2 - React** (Modern & Professional)
Full-featured web application with modern UI

```bash
# Backend (Terminal 1)
cd v2/api
pip install -r requirements.txt
echo "OPENAI_API_KEY=your_key_here" > .env
python app.py

# Frontend (Terminal 2)
cd v2
npm install
npm start
```
🌐 **Access**: http://localhost:3000

## 🆚 Version Comparison

| Feature | v1 (Streamlit) | v2 (React) |
|---------|----------------|------------|
| **Setup Time** | ⚡ 2 minutes | 🔧 5 minutes |
| **UI Design** | 🎨 Good | ✨ Excellent |
| **Performance** | 🚀 Fast | 🚀 Very Fast |
| **Customization** | 📝 Limited | 🎯 Extensive |
| **Mobile Support** | 📱 Basic | 📱 Excellent |
| **Animations** | ❌ None | ✅ Smooth |
| **Production Ready** | 🔨 Demo | 🏢 Yes |

## 🤖 AI Features (Both Versions)

- **Smart City Selection**: AI recommends destinations based on preferences
- **Hotel Recommendations**: Personalized accommodation suggestions
- **Budget Planning**: Detailed cost breakdowns
- **Itinerary Generation**: Day-by-day travel schedules
- **Local Insights**: Cultural tips and hidden gems

## 🎯 Use Cases

### **v1 - Streamlit** is perfect for:
- 🎤 **Quick Demos**: Show AI capabilities rapidly
- 🔬 **Prototyping**: Test new AI agent features
- 👨‍💻 **Development**: Backend development and testing
- 🎓 **Learning**: Understanding AI agent workflows

### **v2 - React** is ideal for:
- 🌐 **Production Websites**: Deploy for real users
- 💼 **Client Presentations**: Professional appearance
- 📱 **Mobile Users**: Responsive design
- 🎨 **Brand Consistency**: Custom styling and themes

## 🛠️ Prerequisites

### Required for All Versions
- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com)
- **Python 3.8+**: For AI backend

### Additional for v2
- **Node.js 16+**: For React frontend
- **npm**: Node package manager

## 🔧 Environment Setup

Create a `.env` file in the respective version directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 📖 Documentation

- **v1 Documentation**: See `v1/README.md` for Streamlit version details
- **v2 Documentation**: See `v2/README_React.md` for React version details

## 🚀 Deployment

### v1 (Streamlit)
```bash
# Deploy to Streamlit Cloud
streamlit deploy
```

### v2 (React + Flask)
```bash
# Frontend: Deploy to Netlify/Vercel
npm run build

# Backend: Deploy to Heroku/AWS
# See v2/README_React.md for details
```

## 🔍 Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Ensure `.env` file exists in the correct directory
   - Verify your API key is valid and has credits

2. **Port Conflicts**
   - v1: Streamlit auto-selects available ports
   - v2: Change ports in `api/app.py` and `package.json`

3. **Dependencies**
   - v1: `pip install -r requirements.txt`
   - v2: `npm install` and `pip install -r api/requirements.txt`

## 📊 Performance

- **v1 Response Time**: ~30-60 seconds for full itinerary
- **v2 Response Time**: ~30-60 seconds for full itinerary
- **AI Processing**: Consistent across both versions

## 🤝 Contributing

1. Choose your preferred version (v1 or v2)
2. Follow the setup instructions for that version
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **CrewAI**: Multi-agent AI framework
- **OpenAI**: GPT models for intelligent planning
- **Streamlit**: Rapid web app development
- **React**: Modern frontend framework

---

**Choose the version that best fits your needs and start planning amazing trips with AI! 🎉** 