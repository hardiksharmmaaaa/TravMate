from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restx import Api, Resource, fields
import sys
import os
from datetime import datetime

# Add the parent directory to the Python path to import trip_agents
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from trip_agents import TripAgents, triptasks
from crewai import Crew
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize Swagger UI
api = Api(app, version='1.0', 
    title='TravMate API',
    description='AI-Powered Trip Planning API',
    doc='/api/docs'
)

# Create namespaces for different API endpoints
ns_trip = api.namespace('trip', description='Trip planning operations')

# Define models for request/response
trip_input = api.model('TripInput', {
    'travelType': fields.String(required=True, description='Type of travel (e.g., leisure, business)'),
    'startDate': fields.String(required=True, description='Start date of the trip'),
    'endDate': fields.String(required=True, description='End date of the trip'),
    'budget': fields.String(required=True, description='Trip budget range'),
    'interests': fields.String(required=True, description='Travel interests'),
    'destination': fields.String(required=False, description='Preferred destination country')
})

class TripPlannerAPI:
    def __init__(self):
        self.agents = TripAgents()
        self.tasks = triptasks()

    def format_ai_output(self, result):
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
                        formatted_lines.append(f"<h2 class='text-2xl font-bold text-primary-600 mt-6 mb-3'>🌟 {location_name}</h2>")
                        # Add the description after the colon if it exists
                        if len(line.split(':', 1)) > 1:
                            description = line.split(':', 1)[1].strip()
                            if description:
                                formatted_lines.append(f"<p class='mb-4'>{description}</p>")
                    else:
                        formatted_lines.append(f"<h3 class='text-xl font-semibold text-gray-800 mt-4 mb-2'>{line}</h3>")
                
                # Handle hotel names or numbered items
                elif line.startswith(('Hotel 1:', 'Hotel 2:', 'Hotel 3:', 'Day 1:', 'Day 2:', 'Day 3:', 'Day 4:', 'Day 5:')):
                    icon = '🏨' if 'Hotel' in line else '📅'
                    formatted_lines.append(f"<h2 class='text-2xl font-bold text-primary-600 mt-6 mb-3'>{icon} {line}</h2>")
                
                # Handle main section headings
                elif any(section in line.lower() for section in ['accommodation', 'transportation', 'food', 'activities', 'budget breakdown', 'weather', 'best time to visit']):
                    formatted_lines.append(f"<h3 class='text-xl font-semibold text-gray-800 mt-4 mb-2'>📋 {line}</h3>")
                
                # Handle bullet points and lists
                elif line.startswith('-') or line.startswith('*'):
                    bullet_content = line[1:].strip()
                    # Check if this bullet point contains a sub-category
                    if ':' in bullet_content and len(bullet_content.split(':')[0]) < 30:
                        category = bullet_content.split(':')[0].strip()
                        description = bullet_content.split(':', 1)[1].strip()
                        formatted_lines.append(f"<p class='mb-2'><strong>{category}:</strong> {description}</p>")
                    else:
                        formatted_lines.append(f"<p class='mb-2'>• {bullet_content}</p>")
                
                # Handle numbered lists
                elif line.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.')):
                    formatted_lines.append(f"<p class='mb-2 font-semibold'>{line}</p>")
                
                # Handle price/cost information
                elif any(word in line.lower() for word in ['price', 'cost', '$', 'budget', 'estimate']):
                    formatted_lines.append(f"<p class='mb-2 text-green-600 font-semibold'>💰 {line}</p>")
                
                # Handle location information
                elif line.startswith('Location:'):
                    formatted_lines.append(f"<p class='mb-2 text-blue-600 font-semibold'>📍 {line}</p>")
                
                # Handle features/amenities
                elif any(word in line.lower() for word in ['features:', 'amenities:', 'includes:']):
                    formatted_lines.append(f"<p class='mb-2 text-purple-600 font-semibold'>✨ {line}</p>")
                
                # Regular text
                else:
                    formatted_lines.append(f"<p class='mb-2'>{line}</p>")
            
            return '\n'.join(formatted_lines) if formatted_lines else content
            
        except Exception as e:
            return str(result)

    def plan_trip(self, data):
        """Plan a trip using the AI agents"""
        try:
            # Prepare inputs for the agents
            inputs = {
                "travel_type": data.get('travelType', 'leisure'),
                "travel_duration": self.calculate_duration(data.get('startDate'), data.get('endDate')),
                "travel_budget": data.get('budget', 'mid-range'),
                "travel_interests": data.get('interests', ''),
                "travel_dates": data.get('startDate', ''),
                "destination_country": data.get('destination', 'any country')
            }

            # Step 1: City Selection
            city_selector_agent = self.agents.city_selector()
            city_task = self.tasks.city_selector_task(inputs, city_selector_agent)
            
            city_crew = Crew(
                agents=[city_selector_agent],
                tasks=[city_task],
                verbose=False
            )
            
            city_result = city_crew.kickoff()
            city_text = str(city_result.raw) if hasattr(city_result, 'raw') else str(city_result)
            
            # Step 2: Hotel Selection (based on recommended cities)
            hotel_inputs = inputs.copy()
            hotel_inputs['recommended_cities'] = city_text
            
            hotel_selector_agent = self.agents.hotel_selector()
            hotel_task = self.tasks.hotel_selector_task(hotel_inputs, hotel_selector_agent)
            
            hotel_crew = Crew(
                agents=[hotel_selector_agent],
                tasks=[hotel_task],
                verbose=False
            )
            
            hotel_result = hotel_crew.kickoff()
            
            # Step 3: Budget Planning
            budget_inputs = inputs.copy()
            budget_inputs['recommended_cities'] = city_text
            budget_inputs['recommended_hotels'] = str(hotel_result.raw) if hasattr(hotel_result, 'raw') else str(hotel_result)
            
            budget_agent = self.agents.budget_manager_agent()
            budget_task = self.tasks.budget_manager_task(budget_inputs, budget_agent)
            
            budget_crew = Crew(
                agents=[budget_agent],
                tasks=[budget_task],
                verbose=False
            )
            
            budget_result = budget_crew.kickoff()
            
            # Step 4: Itinerary Planning
            itinerary_inputs = inputs.copy()
            itinerary_inputs['recommended_cities'] = city_text
            
            itinerary_agent = self.agents.itinerary_planner()
            itinerary_task = self.tasks.itinerary_planner_task(itinerary_inputs, itinerary_agent)
            
            itinerary_crew = Crew(
                agents=[itinerary_agent],
                tasks=[itinerary_task],
                verbose=False
            )
            
            itinerary_result = itinerary_crew.kickoff()
            
            # Step 5: Local Guide Information
            guide_inputs = inputs.copy()
            guide_inputs['recommended_cities'] = city_text
            
            local_guide_agent = self.agents.local_guide()
            city_research_task = self.tasks.city_researcher_task(guide_inputs, local_guide_agent)
            
            guide_crew = Crew(
                agents=[local_guide_agent],
                tasks=[city_research_task],
                verbose=False
            )
            
            guide_result = guide_crew.kickoff()
            
            # Format and combine all results
            return self.create_combined_itinerary(
                city_result,
                hotel_result,
                budget_result,
                itinerary_result,
                guide_result
            )
            
        except Exception as e:
            raise Exception(f"Error planning trip: {str(e)}")

    def calculate_duration(self, start_date, end_date):
        """Calculate trip duration from start and end dates"""
        try:
            if not start_date or not end_date:
                return "1 week"  # Default duration
                
            start = datetime.strptime(start_date, "%Y-%m-%d")
            end = datetime.strptime(end_date, "%Y-%m-%d")
            days = (end - start).days
            
            if days <= 3:
                return "1-3 days"
            elif days <= 7:
                return "4-7 days"
            elif days <= 14:
                return "1-2 weeks"
            elif days <= 30:
                return "2-4 weeks"
            else:
                return "1+ month"
                
        except Exception:
            return "1 week"  # Default duration if there's an error

    def create_combined_itinerary(self, city_result, hotel_result, budget_result, itinerary_result, guide_result):
        """Create a combined and formatted itinerary from all results"""
        try:
            return {
                'cities': self.format_ai_output(city_result),
                'hotels': self.format_ai_output(hotel_result),
                'budget': self.format_ai_output(budget_result),
                'itinerary': self.format_ai_output(itinerary_result),
                'local_guide': self.format_ai_output(guide_result)
            }
        except Exception as e:
            raise Exception(f"Error creating combined itinerary: {str(e)}")

trip_planner = TripPlannerAPI()

@ns_trip.route('/plan')
class TripPlanner(Resource):
    @ns_trip.expect(trip_input)
    @ns_trip.doc('plan_trip', 
        responses={
            200: 'Success',
            400: 'Invalid input',
            500: 'Server error'
        })
    def post(self):
        """Plan a new trip based on user preferences"""
        try:
            result = trip_planner.plan_trip(request.json)
            return jsonify(result)
        except Exception as e:
            return {'error': str(e)}, 500

@ns_trip.route('/health')
class HealthCheck(Resource):
    @ns_trip.doc('health_check')
    def get(self):
        """Check if the API is running"""
        return {'status': 'healthy', 'timestamp': datetime.now().isoformat()}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True) 