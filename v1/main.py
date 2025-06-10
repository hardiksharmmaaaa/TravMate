import streamlit as st
import os
from datetime import datetime, date
from trip_agents import TripAgents, triptasks
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Page configuration
st.set_page_config(
    page_title="TravMate - AI Trip Planner",
    page_icon="✈️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 2rem;
    }
    .section-header {
        font-size: 1.5rem;
        color: #ff7f0e;
        border-bottom: 2px solid #ff7f0e;
        padding-bottom: 0.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .stButton > button {
        background-color: #1f77b4;
        color: white;
        border-radius: 10px;
        border: none;
        padding: 0.5rem 1rem;
        font-weight: bold;
    }
    .stButton > button:hover {
        background-color: #0f5f94;
    }
    .result-box {
        background-color: #f0f2f6;
        padding: 1.5rem;
        border-radius: 10px;
        margin: 1rem 0;
        border-left: 4px solid #1f77b4;
    }
    .result-box h2 {
        color: #1f77b4;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
    }
    .result-box h3 {
        color: #ff7f0e;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    .result-box ul {
        margin-left: 1rem;
    }
    .result-box li {
        margin-bottom: 0.5rem;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'trip_results' not in st.session_state:
    st.session_state.trip_results = {}
if 'planning_complete' not in st.session_state:
    st.session_state.planning_complete = False

def format_ai_output(result):
    """Format CrewAI output for better user display with proper headings and structure"""
    try:
        # Try to extract the raw content from CrewAI result
        if hasattr(result, 'raw'):
            content = str(result.raw)
        else:
            content = str(result)
        
        # Clean up the content for better display
        content = content.replace('\\n', '\n')
        content = content.replace('**', '')
        
        # Split into lines for processing
        lines = content.split('\n')
        formatted_lines = []
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line:
                continue
                
            # Check for city/location names (often followed by colon)
            if ':' in line and not line.startswith(('•', '-', '*', '1.', '2.', '3.', '4.', '5.')) and len(line.split(':')[0]) < 50:
                # This looks like a location or section header
                location_name = line.split(':')[0].strip()
                if location_name and not any(word in location_name.lower() for word in ['hotel', 'day', 'cost', 'price', 'budget']):
                    formatted_lines.append(f"## 🌟 {location_name}")
                    # Add the description after the colon if it exists
                    if len(line.split(':', 1)) > 1:
                        description = line.split(':', 1)[1].strip()
                        if description:
                            formatted_lines.append(description)
                else:
                    formatted_lines.append(f"### {line}")
            
            # Handle hotel names or numbered items
            elif line.startswith(('Hotel 1:', 'Hotel 2:', 'Hotel 3:', 'Day 1:', 'Day 2:', 'Day 3:', 'Day 4:', 'Day 5:')):
                formatted_lines.append(f"## 🏨 {line}" if 'Hotel' in line else f"## 📅 {line}")
            
            # Handle main section headings
            elif any(section in line.lower() for section in ['accommodation', 'transportation', 'food', 'activities', 'budget breakdown', 'weather', 'best time to visit']):
                formatted_lines.append(f"### 📋 {line}")
            
            # Handle bullet points and lists
            elif line.startswith('-') or line.startswith('*'):
                bullet_content = line[1:].strip()
                # Check if this bullet point contains a sub-category
                if ':' in bullet_content and len(bullet_content.split(':')[0]) < 30:
                    category = bullet_content.split(':')[0].strip()
                    description = bullet_content.split(':', 1)[1].strip()
                    formatted_lines.append(f"**{category}:** {description}")
                else:
                    formatted_lines.append(f"• {bullet_content}")
            
            # Handle numbered lists
            elif line.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.')):
                formatted_lines.append(f"**{line}**")
            
            # Handle price/cost information
            elif any(word in line.lower() for word in ['price', 'cost', '$', 'budget', 'estimate']):
                formatted_lines.append(f"💰 **{line}**")
            
            # Handle location information
            elif line.startswith('Location:'):
                formatted_lines.append(f"📍 **{line}**")
            
            # Handle features/amenities
            elif any(word in line.lower() for word in ['features:', 'amenities:', 'includes:']):
                formatted_lines.append(f"✨ **{line}**")
            
            # Regular text
            else:
                formatted_lines.append(line)
        
        # Join with proper spacing
        result_text = []
        for i, line in enumerate(formatted_lines):
            if line.startswith('##'):
                # Add extra space before main headings
                if i > 0:
                    result_text.append('')
                result_text.append(line)
                result_text.append('')
            elif line.startswith('###'):
                # Add space before subheadings
                if i > 0:
                    result_text.append('')
                result_text.append(line)
            else:
                result_text.append(line)
        
        return '\n'.join(result_text) if result_text else content
        
    except Exception as e:
        return str(result)

def main():
    # Header
    st.markdown('<h1 class="main-header">🌍 TravMate - AI Trip Planner ✈️</h1>', unsafe_allow_html=True)
    st.markdown("Plan your perfect trip with AI-powered agents!")
    
    # Sidebar for user inputs
    with st.sidebar:
        st.header("Trip Preferences")
        
        # Travel Type
        travel_type = st.selectbox(
            "Travel Type 🎯",
            ["Adventure", "Relaxation", "Cultural", "Business", "Family", "Solo", "Romantic", "Educational"]
        )
        
        # Travel Duration
        travel_duration = st.selectbox(
            "Travel Duration ⏰",
            ["1-3 days", "4-7 days", "1-2 weeks", "2-4 weeks", "1+ month"]
        )
        
        # Travel Budget
        travel_budget = st.selectbox(
            "Travel Budget 💰",
            ["Under $500", "$500-$1000", "$1000-$2500", "$2500-$5000", "$5000+"]
        )
        
        # Travel Interests
        travel_interests = st.multiselect(
            "Travel Interests 🎪",
            ["Food & Dining", "Museums & Culture", "Outdoor Activities", "Nightlife", 
             "Shopping", "Historical Sites", "Nature & Wildlife", "Beach & Water Sports",
             "Photography", "Local Experiences", "Architecture", "Sports"]
        )
        
        # Travel Dates
        travel_dates = st.date_input(
            "Travel Dates 📅",
            value=[date.today()],
            help="Select your travel start date"
        )
        
        # Destination Country (optional)
        destination_country = st.text_input(
            "Preferred Country (Optional) 🌎",
            placeholder="e.g., France, Japan, USA"
        )
        
        # Plan Trip Button
        plan_button = st.button("🚀 Plan My Trip", type="primary", use_container_width=True)
    
    # Main content area
    if plan_button:
        if not travel_interests:
            st.error("Please select at least one travel interest!")
            return
            
        # Prepare inputs
        inputs = {
            "travel_type": travel_type.lower(),
            "travel_duration": travel_duration,
            "travel_budget": travel_budget,
            "travel_interests": ", ".join(travel_interests),
            "travel_dates": str(travel_dates[0]) if travel_dates else str(date.today()),
            "destination_country": destination_country if destination_country else "any country"
        }
        
        # Check for OpenAI API key
        if not os.getenv("OPENAI_API_KEY"):
            st.error("❌ OpenAI API key not found! Please set your OPENAI_API_KEY in the environment variables.")
            st.info("💡 Add your OpenAI API key to a .env file in your project directory:")
            st.code("OPENAI_API_KEY=your_api_key_here")
            return
        
        st.session_state.planning_complete = False
        st.session_state.trip_results = {}
        
        # Planning process with progress tracking
        st.markdown('<h2 class="section-header">🔄 Planning Your Trip...</h2>', unsafe_allow_html=True)
        
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        try:
            # Initialize agents and tasks
            agents = TripAgents()
            tasks = triptasks()
            
            # Step 1: City Selection
            status_text.text("🏙️ Selecting best cities for your trip...")
            progress_bar.progress(20)
            
            city_selector_agent = agents.city_selector()
            city_task = tasks.city_selector_task(inputs, city_selector_agent)
            
            city_crew = Crew(
                agents=[city_selector_agent],
                tasks=[city_task],
                verbose=False
            )
            
            city_result = city_crew.kickoff()
            city_recommendations = format_ai_output(city_result)
            st.session_state.trip_results['cities'] = city_recommendations
            
            # Extract city names for subsequent tasks
            city_text = str(city_result.raw) if hasattr(city_result, 'raw') else str(city_result)
            
            # Step 2: Hotel Selection (based on recommended cities)
            status_text.text("🏨 Finding best hotels in recommended cities...")
            progress_bar.progress(40)
            
            # Update inputs to include recommended cities
            hotel_inputs = inputs.copy()
            hotel_inputs['recommended_cities'] = city_text
            
            hotel_selector_agent = agents.hotel_selector()
            hotel_task = tasks.hotel_selector_task(hotel_inputs, hotel_selector_agent)
            
            hotel_crew = Crew(
                agents=[hotel_selector_agent],
                tasks=[hotel_task],
                verbose=False
            )
            
            hotel_result = hotel_crew.kickoff()
            st.session_state.trip_results['hotels'] = format_ai_output(hotel_result)
            
            # Step 3: Budget Planning (based on cities and hotels)
            status_text.text("💰 Creating budget plan for recommended destinations...")
            progress_bar.progress(60)
            
            budget_inputs = inputs.copy()
            budget_inputs['recommended_cities'] = city_text
            budget_inputs['recommended_hotels'] = str(hotel_result.raw) if hasattr(hotel_result, 'raw') else str(hotel_result)
            
            budget_agent = agents.budget_manager_agent()
            budget_task = tasks.budget_manager_task(budget_inputs, budget_agent)
            
            budget_crew = Crew(
                agents=[budget_agent],
                tasks=[budget_task],
                verbose=False
            )
            
            budget_result = budget_crew.kickoff()
            st.session_state.trip_results['budget'] = format_ai_output(budget_result)
            
            # Step 4: Itinerary Planning (based on cities)
            status_text.text("📋 Creating detailed itinerary for recommended cities...")
            progress_bar.progress(80)
            
            itinerary_inputs = inputs.copy()
            itinerary_inputs['recommended_cities'] = city_text
            
            itinerary_agent = agents.itinerary_planner()
            itinerary_task = tasks.itinerary_planner_task(itinerary_inputs, itinerary_agent)
            
            itinerary_crew = Crew(
                agents=[itinerary_agent],
                tasks=[itinerary_task],
                verbose=False
            )
            
            itinerary_result = itinerary_crew.kickoff()
            st.session_state.trip_results['itinerary'] = format_ai_output(itinerary_result)
            
            # Step 5: Local Guide Information (based on cities)
            status_text.text("🗺️ Gathering local insights for recommended destinations...")
            progress_bar.progress(100)
            
            guide_inputs = inputs.copy()
            guide_inputs['recommended_cities'] = city_text
            
            local_guide_agent = agents.local_guide()
            city_research_task = tasks.city_researcher_task(guide_inputs, local_guide_agent)
            
            guide_crew = Crew(
                agents=[local_guide_agent],
                tasks=[city_research_task],
                verbose=False
            )
            
            guide_result = guide_crew.kickoff()
            st.session_state.trip_results['local_guide'] = format_ai_output(guide_result)
            
            status_text.text("✅ Trip planning completed!")
            st.session_state.planning_complete = True
            
            # Add a small delay to show completion
            time.sleep(1)
            st.rerun()
            
        except Exception as e:
            st.error(f"❌ An error occurred during planning: {str(e)}")
            st.info("💡 Please check your OpenAI API key and try again.")
    
    # Display results if planning is complete
    if st.session_state.planning_complete and st.session_state.trip_results:
        st.markdown('<h2 class="section-header">🎉 Your Personalized Trip Plan</h2>', unsafe_allow_html=True)
        
        # Create tabs for different sections
        tab1, tab2, tab3, tab4, tab5 = st.tabs(["🏙️ Cities", "🏨 Hotels", "💰 Budget", "📋 Itinerary", "🗺️ Local Guide"])
        
        with tab1:
            st.markdown("### Recommended Cities")
            if 'cities' in st.session_state.trip_results:
                st.markdown('<div class="result-box">', unsafe_allow_html=True)
                st.markdown(st.session_state.trip_results['cities'])
                st.markdown('</div>', unsafe_allow_html=True)
        
        with tab2:
            st.markdown("### Recommended Hotels")
            if 'hotels' in st.session_state.trip_results:
                st.markdown('<div class="result-box">', unsafe_allow_html=True)
                st.markdown(st.session_state.trip_results['hotels'])
                st.markdown('</div>', unsafe_allow_html=True)
        
        with tab3:
            st.markdown("### Budget Breakdown")
            if 'budget' in st.session_state.trip_results:
                st.markdown('<div class="result-box">', unsafe_allow_html=True)
                st.markdown(st.session_state.trip_results['budget'])
                st.markdown('</div>', unsafe_allow_html=True)
        
        with tab4:
            st.markdown("### Detailed Itinerary")
            if 'itinerary' in st.session_state.trip_results:
                st.markdown('<div class="result-box">', unsafe_allow_html=True)
                st.markdown(st.session_state.trip_results['itinerary'])
                st.markdown('</div>', unsafe_allow_html=True)
        
        with tab5:
            st.markdown("### Local Insights & Tips")
            if 'local_guide' in st.session_state.trip_results:
                st.markdown('<div class="result-box">', unsafe_allow_html=True)
                st.markdown(st.session_state.trip_results['local_guide'])
                st.markdown('</div>', unsafe_allow_html=True)
        
        # Download/Export Options
        st.markdown('<h3 class="section-header">📥 Export Your Trip Plan</h3>', unsafe_allow_html=True)
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Prepare text for download
            trip_summary = f"""
TravMate - Trip Plan Summary
============================

Trip Type: {travel_type}
Duration: {travel_duration}
Budget: {travel_budget}
Interests: {', '.join(travel_interests) if travel_interests else 'None'}
Travel Date: {str(travel_dates[0]) if travel_dates else 'Not specified'}

RECOMMENDED CITIES:
{st.session_state.trip_results.get('cities', 'Not available')}

RECOMMENDED HOTELS:
{st.session_state.trip_results.get('hotels', 'Not available')}

BUDGET BREAKDOWN:
{st.session_state.trip_results.get('budget', 'Not available')}

DETAILED ITINERARY:
{st.session_state.trip_results.get('itinerary', 'Not available')}

LOCAL INSIGHTS:
{st.session_state.trip_results.get('local_guide', 'Not available')}
"""
            
            st.download_button(
                label="📄 Download as Text",
                data=trip_summary,
                file_name=f"trip_plan_{date.today()}.txt",
                mime="text/plain"
            )
        
        with col2:
            if st.button("🔄 Plan Another Trip", type="secondary"):
                st.session_state.planning_complete = False
                st.session_state.trip_results = {}
                st.rerun()
    
    # Footer
    st.markdown("---")
    st.markdown("Made with ❤️ using TravMate AI Agents | Powered by OpenAI & CrewAI")

if __name__ == "__main__":
    main()
