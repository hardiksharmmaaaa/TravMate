import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Emirates_logo.svg" alt="Emirates" className="h-6 inline" />,
      title: 'Multiple Airlines Supported',
      description: 'Choose from a wide range of global airlines for your journey',
    },
    {
      icon: <i className="fab fa-trustpilot text-green-500 text-2xl"></i>,
      title: '100% Trusted Reviews',
      description: 'Rated excellent on Trustpilot by real customers',
    },
    {
      icon: <i className="fas fa-shield-alt text-primary-500 text-2xl"></i>,
      title: '100% Secure Bookings',
      description: 'Your payment and personal data are protected with advanced encryption',
    },
    {
      icon: <i className="fas fa-certificate text-gray-700 text-2xl"></i>,
      title: 'ATOL Protected',
      description: 'Book with confidence – your holiday is ATOL protected',
      link: { text: 'ATOL: 12410', url: '#' },
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Why Book with Us?</h2>
          <p className="subtitle max-w-3xl mx-auto">Enjoy peace of mind and exclusive benefits when you book your flights with TravMate</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="card p-8 text-center border border-card-border">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-bold text-text-main mb-2">{feature.title}</h3>
              <p className="text-text-sub mb-2">{feature.description}</p>
              {feature.link && (
                <a href={feature.link.url} className="text-primary-500 font-semibold text-sm">{feature.link.text}</a>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-ocean-500 rounded-3xl p-12 text-white text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Happy Travelers' },
              { number: '150+', label: 'Destinations' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'AI Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 