import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToPlanner = () => {
    const element = document.getElementById('trip-planner');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-primary-50 bg-opacity-60"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 opacity-20"
        >
          <i className="fas fa-plane text-white text-6xl transform rotate-12"></i>
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [100, 0, 100],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute top-40 right-20 opacity-15"
        >
          <i className="fas fa-globe text-white text-8xl"></i>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 10
          }}
          className="absolute bottom-32 left-1/4 opacity-10"
        >
          <i className="fas fa-map-marked-alt text-white text-7xl"></i>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="hero-text mb-4 md:mb-6 text-4xl md:text-6xl font-bold text-gray-800 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Discover Your Next
            <br />
            <span className="text-blue-700 drop-shadow-lg">Adventure</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 drop-shadow-lg font-medium mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Let our AI-powered travel planner craft personalized itineraries that turn your dream destinations into unforgettable journeys.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToPlanner}
              className="btn-primary text-base md:text-lg px-6 py-3 md:px-8 md:py-4 shadow-xl"
            >
              <i className="fas fa-rocket mr-2"></i>
              Plan My Trip
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect text-gray-800 font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-30 text-base md:text-lg"
            >
              <i className="fas fa-play mr-2"></i>
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {[
              { number: "10K+", label: "Happy Travelers" },
              { number: "150+", label: "Destinations" },
              { number: "98%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white bg-opacity-80 border border-card-border rounded-2xl p-4 md:p-6 text-center shadow-soft"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 text-base md:text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 