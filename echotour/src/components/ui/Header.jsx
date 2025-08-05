import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const Header = ({ isAuthenticated = false, onAuthClick, user = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Home', path: '/landing-page', icon: 'Home' },
    { label: 'Travel Planner', path: '/smart-travel-planner', icon: 'MapPin' },
    { label: 'Cultural Stories', path: '/cultural-storytelling', icon: 'BookOpen' },
    { label: 'Music Experience', path: '/mood-based-music-experience', icon: 'Music' },
    { label: 'Voice Memories', path: '/voice-memories-studio', icon: 'Mic' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (onAuthClick) {
      onAuthClick();
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-card border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('/landing-page')}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-sunset flex items-center justify-center shadow-primary group-hover:shadow-primary-hover transition-all duration-200">
                <Icon name="Compass" size={24} color="white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                EchoTour
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={18} className="mr-2" />
                {item?.label}
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={18} className="mr-2" />
                More
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationItems?.slice(4)?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors duration-150 ${
                        isActivePath(item?.path)
                          ? 'text-primary bg-primary/10' :'text-popover-foreground'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-sunset flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user?.name || 'User'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthClick}
                  iconName="LogOut"
                  iconSize={16}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleAuthClick}
                iconName="User"
                iconPosition="left"
                iconSize={16}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-card animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 min-h-touch ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className="mr-3" />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
              
              <div className="pt-4 border-t border-border">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center px-4 py-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center">
                        <Icon name="User" size={20} color="white" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-foreground">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      fullWidth
                      onClick={handleAuthClick}
                      iconName="LogOut"
                      iconPosition="left"
                      iconSize={18}
                      className="justify-start min-h-touch"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handleAuthClick}
                    iconName="User"
                    iconPosition="left"
                    iconSize={18}
                    className="min-h-touch"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;