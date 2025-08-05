import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AuthModal from '../../components/ui/AuthModal';
import HeroSection from './components/HeroSection';
import NavigationTabs from './components/NavigationTabs';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing authentication
    const savedAuth = localStorage.getItem('echoTour_auth');
    const savedUser = localStorage.getItem('echoTour_user');
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Sign out
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('echoTour_auth');
      localStorage.removeItem('echoTour_user');
    } else {
      // Open auth modal
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = ({ user: authUser }) => {
    setIsAuthenticated(true);
    setUser(authUser);
    localStorage.setItem('echoTour_auth', 'true');
    localStorage.setItem('echoTour_user', JSON.stringify(authUser));
    setIsAuthModalOpen(false);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick}
        user={user}
      />

      {/* Navigation Tabs */}
      <NavigationTabs />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection onAuthClick={handleAuthClick} />

        {/* About Section */}
        <AboutSection />

        {/* Features Section */}
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onAuth={handleAuthSuccess}
        mode="signin"
      />
    </div>
  );
};

export default LandingPage;