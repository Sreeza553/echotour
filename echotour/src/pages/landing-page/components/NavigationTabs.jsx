import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'about', label: 'About', icon: 'Info' },
    { id: 'features', label: 'Features', icon: 'Grid3X3' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active tab based on scroll position
      const sections = tabs?.map(tab => ({
        id: tab?.id,
        element: document.getElementById(tab?.id),
        offset: document.getElementById(tab?.id)?.offsetTop || 0
      }));

      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections?.length - 1; i >= 0; i--) {
        if (sections?.[i]?.element && scrollPosition >= sections?.[i]?.offset) {
          setActiveTab(sections?.[i]?.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId) => {
    const element = document.getElementById(tabId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element?.offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setActiveTab(tabId);
  };

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-card' 
        : 'bg-transparent'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-1 bg-muted/50 backdrop-blur-sm rounded-full p-1 border border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => handleTabClick(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 min-h-touch ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                <Icon 
                  name={tab?.icon} 
                  size={16} 
                  className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-current'} 
                />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavigationTabs;