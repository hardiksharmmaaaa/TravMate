import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripPlanner from './components/TripPlanner';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <TripPlanner />
              <Features />
              <Testimonials />
            </main>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App; 