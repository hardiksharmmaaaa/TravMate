import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-ocean-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Have questions? We'd love to hear from you!
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                {[
                  {
                    icon: 'fas fa-map-marker-alt',
                    title: 'Our Office',
                    details: ['123 Travel Street', 'San Francisco, CA 94102', 'United States'],
                    color: 'text-red-500'
                  },
                  {
                    icon: 'fas fa-phone',
                    title: 'Phone',
                    details: ['+1 (555) 123-4567', 'Mon-Fri 9AM-6PM PST'],
                    color: 'text-green-500'
                  },
                  {
                    icon: 'fas fa-envelope',
                    title: 'Email',
                    details: ['hello@travmate.com', 'support@travmate.com'],
                    color: 'text-blue-500'
                  },
                  {
                    icon: 'fas fa-clock',
                    title: 'Business Hours',
                    details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
                    color: 'text-purple-500'
                  }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${contact.color} bg-gray-100 rounded-lg flex items-center justify-center`}>
                      <i className={contact.icon}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{contact.title}</h3>
                      {contact.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'facebook', color: 'hover:bg-blue-600' },
                    { name: 'twitter', color: 'hover:bg-blue-400' },
                    { name: 'instagram', color: 'hover:bg-pink-600' },
                    { name: 'linkedin', color: 'hover:bg-blue-700' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 transition-colors ${social.color} hover:text-white`}
                    >
                      <i className={`fab fa-${social.name}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 