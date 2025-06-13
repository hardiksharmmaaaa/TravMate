import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9e4e1cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      review: 'TravMate created the most amazing itinerary for my trip to Japan. The AI recommendations were spot-on and I discovered places I never would have found on my own!',
      rating: 5,
      trip: 'Tokyo & Kyoto Adventure'
    },
    {
      name: 'Michael Chen',
      location: 'San Francisco, USA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      review: 'The budget breakdown was incredibly accurate and helped me plan my finances perfectly. The local insights made my European trip unforgettable!',
      rating: 5,
      trip: 'European Cultural Tour'
    },
    {
      name: 'Emily Rodriguez',
      location: 'Miami, USA',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      review: 'I was skeptical about AI travel planning, but TravMate exceeded all my expectations. The personalized recommendations were perfect for my solo adventure!',
      rating: 5,
      trip: 'Bali Solo Journey'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            What Our <span className="text-gradient">Travelers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="card p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-4xl text-primary-200">
                <i className="fas fa-quote-right"></i>
              </div>

              {/* Star Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg mr-1"></i>
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.review}"
              </p>

              {/* Trip Tag */}
              <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {testimonial.trip}
              </div>

              {/* User Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your Own Success Story?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who trust TravMate for their perfect trips
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('trip-planner')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-lg px-8 py-4"
          >
            <i className="fas fa-rocket mr-2"></i>
            Start Planning Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 