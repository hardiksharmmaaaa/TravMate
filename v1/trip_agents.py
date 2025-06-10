from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI
import os 
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)


class TripAgents:

    def __init__(self):
        self.llm=ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

    def city_selector(self):
        return Agent(
            role="City Selector Expert",
            goal="Identify the best city for the trip based on the user's preferences",
            backstory="You are a city selector who is responsible for selecting a city for the trip." 
            "An expert in city selection and travel planning. With Extensive knowledge of the world's cities and their unique features.",
            llm=self.llm,
            verbose=True,
        )
    
    def hotel_selector(self):
        return Agent(
            role="Hotel Selector Expert",
            goal="Identify the best hotel for the trip based on the user's preferences",
            backstory="You are a hotel selector who is responsible for selecting a hotel for the trip." 
            "An expert in hotel selection and travel planning. With Extensive knowledge of the world's hotels and their unique features.",
            llm=self.llm,
            verbose=True,
        )
    
    def local_guide(self):
        return Agent(
            role="Location Selector Expert",
            goal="Identify the best location for the trip based on the user's preferences and provide detailed insights about the selected location",
            backstory="You are a location selector who is responsible for selecting a location for the trip." 
            "An expert in location selection and travel planning. With Extensive knowledge of the world's locations and their unique features."
            "You are also a local guide who is responsible for providing detailed insights about the selected location.",
            llm=self.llm,
            verbose=True,
        )
    
    def budget_manager_agent(self):
        return Agent(
            role="Budget Manager Expert",
            goal="Identify the best budget for the trip based on the user's preferences",
            backstory="You are a budget manager who is responsible for identifying the best budget for the trip." 
            "An expert in budget management and travel planning. With Extensive knowledge of the world's budgets and their unique features.",
            llm=self.llm,
            verbose=True,
        )
    
    def itinerary_planner(self):
        return Agent(
            role="Itinerary Planner Expert",
            goal="Identify the best itinerary for the trip based on the user's preferences",
            backstory="You are a itinerary planner who is responsible for identifying the best itinerary for the trip." 
            "An expert in itinerary planning and travel planning. With Extensive knowledge of the world's itineraries and their unique features.",
            llm=self.llm,
            verbose=True,
        )



class triptasks:
    def __init__(self):
        pass
    
    def city_selector_task(self, inputs,agent):
        return Task(
            name="city_selector_task",
            description=(
                f"analyze the user's preferences and provide 3 cities that the user can choose from"
                f"The cities should be in the user's preferred country"
                f"Travel Type:{inputs['travel_type']}\n"
                f"Travel Duration:{inputs['travel_duration']}\n"
                f"Travel Budget:{inputs['travel_budget']}\n"
                f"Travel Interests:{inputs['travel_interests']}\n"
                f"Travel Dates:{inputs['travel_dates']}\n"
            ),
            agent=agent,
            expected_output="Bullet points of the 3 cities that the user can choose from with 2 sentence explaination each" ,
        )
    
    def hotel_selector_task(self, inputs, agent):
        recommended_cities = inputs.get('recommended_cities', '')
        return Task(
            name="hotel_selector_task",
            description=(
                f"provide a list of 3 hotels that the user can choose from based on their preferences.\n"
                f"IMPORTANT: Select hotels ONLY from these recommended cities: {recommended_cities}\n"
                f"Travel Type: {inputs['travel_type']}\n"
                f"Travel Duration: {inputs['travel_duration']}\n"
                f"Travel Budget: {inputs['travel_budget']}\n"
                f"Travel Interests: {inputs['travel_interests']}\n"
                f"Consider location within the recommended cities, amenities, price range, and user preferences when selecting hotels."
            ),
            agent=agent,
            expected_output="Bullet points of the 3 hotels with names, locations (from recommended cities only), key features, and price estimates with proper formatting" ,
        )

    def city_researcher_task(self, inputs, agent):
        recommended_cities = inputs.get('recommended_cities', '')
        return Task(
            name="city_researcher_task",
            description=(
                f"provide detailed insights about the recommended destinations based on user preferences including :\n"
                f"1. Weather conditions\n"
                f"2. Best time to visit\n"
                f"3. Best restaurants\n"
                f"4. Best hotels\n"
                f"5. Best activities\n"
                f"6. Best transportation options\n"
                f"Travel Type: {inputs['travel_type']}\n"
                f"Travel Duration: {inputs['travel_duration']}\n"
                f"Travel Budget: {inputs['travel_budget']}\n"
                f"Travel Interests: {inputs['travel_interests']}\n"
                f"Recommended Cities: {recommended_cities}\n"
                f"IMPORTANT: Provide insights ONLY for the recommended cities mentioned above."
            ),
            agent=agent,
            expected_output="Organized and detailed report of the recommended destinations with 2 sentence explanation each" ,
        )
    def itinerary_planner_task(self, inputs, agent):
        recommended_cities = inputs.get('recommended_cities', '')
        return Task(
            name="itinerary_planner_task",
            description=(
                f"provide a detailed itinerary for the trip based on the user's preferences and recommended cities:\n"
                f"Travel Type: {inputs['travel_type']}\n"
                f"Travel Duration: {inputs['travel_duration']}\n"
                f"Travel Budget: {inputs['travel_budget']}\n"
                f"Travel Interests: {inputs['travel_interests']}\n"
                f"Travel Dates: {inputs['travel_dates']}\n"
                f"Recommended Cities: {recommended_cities}\n"
                f"IMPORTANT: Create itinerary ONLY for the recommended cities mentioned above.\n"
                f"Create a day-by-day itinerary with activities, timing, and recommendations for the recommended cities."
            ),
            agent=agent,
            expected_output="Detailed day-by-day itinerary for the recommended cities with proper formatting and explanations" ,
        )
    
    def budget_manager_task(self, inputs, agent):
        recommended_cities = inputs.get('recommended_cities', '')
        recommended_hotels = inputs.get('recommended_hotels', '')
        return Task(
            name="budget_manager_task",
            description=(
                f"provide a detailed budget breakdown for the trip based on the user's preferences and recommendations:\n"
                f"Travel Type: {inputs['travel_type']}\n"
                f"Travel Duration: {inputs['travel_duration']}\n"
                f"Travel Budget: {inputs['travel_budget']}\n"
                f"Travel Interests: {inputs['travel_interests']}\n"
                f"Recommended Cities: {recommended_cities}\n"
                f"Recommended Hotels: {recommended_hotels}\n"
                f"Include costs for accommodation, food, transportation, activities, and miscellaneous expenses based on the recommended cities and hotels."
            ),
            agent=agent,
            expected_output="Detailed budget breakdown with cost estimates for different categories based on recommended destinations with proper formatting" ,
        )
    
class TripCrew(Crew):
    def __init__(self, inputs):
        self.inputs = inputs

        city_selector_agent = TripAgents().city_selector()
        hotel_selector_agent = TripAgents().hotel_selector()
        local_guide_agent = TripAgents().local_guide()
        budget_manager_agent = TripAgents().budget_manager_agent()
        itinerary_planner_agent = TripAgents().itinerary_planner()

        city_selector_task = triptasks().city_selector_task(self.inputs, city_selector_agent)
        hotel_selector_task = triptasks().hotel_selector_task(self.inputs, hotel_selector_agent)
        city_researcher_task = triptasks().city_researcher_task("Paris", local_guide_agent)
        budget_manager_task = triptasks().budget_manager_task(self.inputs, budget_manager_agent)
        itinerary_planner_task = triptasks().itinerary_planner_task(self.inputs,"Paris", itinerary_planner_agent)

        crew=crew(
            agents=[city_selector_agent, hotel_selector_agent, local_guide_agent, budget_manager_agent, itinerary_planner_agent],
            tasks=[city_selector_task, hotel_selector_task, city_researcher_task, budget_manager_task, itinerary_planner_task],
            verbose=True,
        )

        result=crew.kickoff()
        print(result)

if __name__ == "__main__":
    inputs = {
        "travel_type": "adventure",
        "travel_duration": "1 week",
        "travel_budget": "1000",
    }
    trip_crew = TripCrew(inputs)
    trip_crew.kickoff()