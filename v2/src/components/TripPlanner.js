import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    travelers: 2,
    budget: 'mid-range',
    travelType: 'leisure',
    interests: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [tripResults, setTripResults] = useState(null);
  const [tripType, setTripType] = useState('round');

  const budgetOptions = [
    { value: 'budget', label: 'Budget', description: 'Under $1000', icon: '💰' },
    { value: 'mid-range', label: 'Mid-Range', description: '$1000 - $3000', icon: '💳' },
    { value: 'luxury', label: 'Luxury', description: '$3000+', icon: '💎' }
  ];

  const travelTypes = [
    { value: 'leisure', label: 'Leisure', icon: '🏖️' },
    { value: 'adventure', label: 'Adventure', icon: '🏔️' },
    { value: 'cultural', label: 'Cultural', icon: '🏛️' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'romantic', label: 'Romantic', icon: '💕' }
  ];

  const interestOptions = [
    { value: 'food', label: 'Food & Dining', icon: '🍽️' },
    { value: 'nature', label: 'Nature', icon: '🌿' },
    { value: 'history', label: 'History', icon: '🏛️' },
    { value: 'art', label: 'Art & Culture', icon: '🎨' },
    { value: 'nightlife', label: 'Nightlife', icon: '🌃' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'wellness', label: 'Wellness', icon: '🧘‍♀️' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.destination.trim()) {
      toast.error('Please enter a destination');
      return;
    }

    if (formData.interests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the backend API
      const response = await axios.post('/api/plan-trip', {
        destination: formData.destination,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        travelers: formData.travelers,
        budget: formData.budget,
        travelType: formData.travelType,
        interests: formData.interests.join(', ')
      });

      setTripResults(response.data);
      toast.success('Your trip has been planned successfully!');
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('trip-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      
    } catch (error) {
      console.error('Error planning trip:', error);
      toast.error('Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="trip-planner" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Plan Your Perfect <span className="text-gradient">Journey</span>
          </h2>
          <p className="subtitle max-w-3xl mx-auto">
            Tell us about your dream trip and let our AI create a personalized itinerary just for you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="card max-w-4xl mx-auto p-8"
        >
          {/* Tabbed Trip Type */}
          <div className="flex space-x-4 mb-8">
            {['Round Trip', 'One Way', 'Multi-City'].map((type, idx) => (
              <button
                key={type}
                type="button"
                onClick={() => setTripType(type.toLowerCase().replace(' ', '-'))}
                className={`px-6 py-2 rounded-full font-semibold border transition-all duration-200 focus:outline-none text-base ${
                  tripType === type.toLowerCase().replace(' ', '-')
                    ? 'bg-primary-500 text-white border-primary-500 shadow'
                    : 'bg-white text-text-main border-card-border hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Destination Input */}
            <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-lg font-semibold text-text-main mb-3">
                  <i className="fas fa-map-marker-alt text-primary-500 mr-2"></i>
                  Where do you want to go?
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="e.g., Tokyo, Japan or Bali, Indonesia"
                  className="input-field text-lg"
                />
              </div>
              <button
                type="submit"
                className="btn-primary text-lg px-8 h-14 md:ml-4 mt-2 md:mt-0"
                disabled={isLoading}
              >
                <i className="fas fa-search mr-2"></i> Search
              </button>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  <i className="fas fa-calendar-alt text-primary-600 mr-2"></i>
                  Departure Date
                </label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => handleInputChange('startDate', date)}
                  minDate={new Date()}
                  className="input-field text-lg w-full"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  <i className="fas fa-calendar-check text-primary-600 mr-2"></i>
                  Return Date
                </label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => handleInputChange('endDate', date)}
                  minDate={formData.startDate}
                  className="input-field text-lg w-full"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            </div>

            {/* Travelers and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  <i className="fas fa-users text-primary-600 mr-2"></i>
                  Number of Travelers
                </label>
                <select
                  value={formData.travelers}
                  onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                  className="input-field text-lg"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Traveler' : 'Travelers'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  <i className="fas fa-wallet text-primary-600 mr-2"></i>
                  Budget Range
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('budget', option.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.budget === option.value
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="font-semibold text-sm">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                <i className="fas fa-suitcase text-primary-600 mr-2"></i>
                Travel Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {travelTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('travelType', type.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.travelType === type.value
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-semibold text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                <i className="fas fa-heart text-primary-600 mr-2"></i>
                What interests you? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest.value}
                    type="button"
                    onClick={() => handleInterestToggle(interest.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.interests.includes(interest.value)
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{interest.icon}</div>
                    <div className="font-semibold text-sm">{interest.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className={`btn-primary text-xl px-12 py-4 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="loading-dots mr-3">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    Creating Your Perfect Trip...
                  </div>
                ) : (
                  <>
                    <i className="fas fa-magic mr-2"></i>
                    Create My Itinerary
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Results Section */}
        {tripResults && (
          <motion.div
            id="trip-results"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <div className="card p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                <i className="fas fa-star text-accent-500 mr-2"></i>
                Your Personalized Itinerary
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trip Overview */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-primary-500 to-ocean-500 text-white rounded-2xl p-6">
                    <h4 className="text-xl font-bold mb-4">Trip Overview</h4>
                    <div className="space-y-3">
                      <div>
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        {formData.destination}
                      </div>
                      <div>
                        <i className="fas fa-calendar mr-2"></i>
                        {formData.startDate.toLocaleDateString()} - {formData.endDate.toLocaleDateString()}
                      </div>
                      <div>
                        <i className="fas fa-users mr-2"></i>
                        {formData.travelers} Travelers
                      </div>
                      <div>
                        <i className="fas fa-tags mr-2"></i>
                        {formData.interests.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itinerary Details */}
                <div className="lg:col-span-2">
                  <div className="prose max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: tripResults.itinerary || 'Loading your amazing itinerary...' }}
                    />
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button className="btn-primary flex-1">
                      <i className="fas fa-download mr-2"></i>
                      Download PDF
                    </button>
                    <button className="btn-secondary flex-1">
                      <i className="fas fa-share-alt mr-2"></i>
                      Share Trip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TripPlanner; 