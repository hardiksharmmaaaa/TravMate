import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaSearch } from 'react-icons/fa';

const Hero = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Thailand
          </motion.h1>
        </div>

        {/* Search Form */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-4 md:p-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Trip Type Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isRoundTrip 
                  ? 'bg-brand-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setIsRoundTrip(true)}
            >
              <FaExchangeAlt className="rotate-90" />
              Round Trip
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                !isRoundTrip 
                  ? 'bg-brand-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setIsRoundTrip(false)}
            >
              <FaExchangeAlt />
              One Way
            </button>
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="From where?"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>

            {isRoundTrip && (
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent appearance-none"
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-center">
            <button className="flex items-center gap-2 bg-brand-primary hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-all">
              <FaSearch />
              Search
            </button>
          </div>
        </motion.div>

        {/* Rating */}
        <motion.div 
          className="flex items-center justify-center gap-2 mt-6 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex -space-x-2">
            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            ★★★★★
          </div>
          <span className="text-sm">4.5</span>
          <span className="text-sm text-gray-300">(10K Reviews)</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 