import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for user_email cookie
    const match = document.cookie.match(/user_email=([^;]+)/);
    if (match) {
      setIsLoggedIn(true);
      setUserEmail(decodeURIComponent(match[1]));
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Plan Trip', path: '/#trip-planner' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  const handleLogout = async () => {
    await axios.get('/api/logout');
    setIsLoggedIn(false);
    setUserEmail('');
    window.location.reload();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg backdrop-blur-lg bg-opacity-95'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 md:w-10 md:h-10 bg-primary-500 rounded-full flex items-center justify-center"
            >
              <i className="fas fa-plane text-white text-lg"></i>
            </motion.div>
            <span className={`text-xl md:text-2xl font-display font-bold flex items-center space-x-1 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              <span className="text-text-main">Trav</span><span className="text-primary-500">Mate</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-bold uppercase tracking-wide transition-colors duration-300 ${
                  isScrolled
                    ? 'text-text-main hover:text-primary-500'
                    : 'text-white hover:text-primary-200'
                } ${
                  location.pathname === item.path ? 'text-primary-500' : ''
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                  />
                )}
              </Link>
            ))}
            {/* Google Auth Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn-secondary border-primary-600 text-primary-600 hover:bg-primary-50 ml-4"
              >
                <i className="fab fa-google mr-2"></i> Sign Out
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="btn-primary ml-4"
              >
                <i className="fab fa-google mr-2"></i> Sign In with Google
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0,
          }}
          className="md:hidden overflow-hidden bg-white shadow-lg rounded-lg mt-2"
        >
          <div className="py-4 px-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 