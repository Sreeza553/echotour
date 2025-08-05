import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const FeatureGrid = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'smart-travel-planner',
      title: 'Smart Travel Planner',
      description: 'AI-powered itinerary creation based on your preferences, destination, and travel style',
      icon: 'MapPin',
      path: '/smart-travel-planner',
      gradient: 'from-primary to-secondary',
      iconColor: 'white',
      stats: 'Plan in minutes'
    },
    {
      id: 'cultural-storytelling',
      title: 'Cultural Storytelling',
      description: 'Discover rich historical narratives and cultural insights for any destination',
      icon: 'BookOpen',
      path: '/cultural-storytelling',
      gradient: 'from-secondary to-accent',
      iconColor: 'white',
      stats: 'Thousands of stories'
    },
    {
      id: 'mood-music',
      title: 'Mood-Based Music',
      description: 'Personalized travel soundtracks that match your mood, weather, and location',
      icon: 'Music',
      path: '/mood-based-music-experience',
      gradient: 'from-accent to-warning',
      iconColor: 'white',
      stats: 'Perfect vibes'
    },
    {
      id: 'voice-memories',
      title: 'Voice Memories Studio',
      description: 'Record and blend your travel experiences with ambient sounds for lasting memories',
      icon: 'Mic',
      path: '/voice-memories-studio',
      gradient: 'from-warning to-primary',
      iconColor: 'white',
      stats: 'Capture moments'
    }
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {features?.map((feature, index) => (
          <div
            key={feature?.id}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-primary-hover transition-all duration-300 ease-out cursor-pointer transform hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleFeatureClick(feature?.path)}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature?.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature?.gradient} flex items-center justify-center shadow-primary group-hover:shadow-primary-hover transition-all duration-300 group-hover:scale-110`}>
                  <Icon 
                    name={feature?.icon} 
                    size={28} 
                    color={feature?.iconColor}
                    strokeWidth={2}
                  />
                </div>
                
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span className="text-xs font-caption font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {feature?.stats}
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-primary"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature?.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
                {feature?.description}
              </p>

              {/* Action Area */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-medium text-success">
                    Ready to use
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span className="text-sm font-medium">
                    Explore
                  </span>
                  <Icon name="ChevronRight" size={16} />
                </div>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Bottom Border Accent */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature?.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
          </div>
        ))}
      </div>
      {/* Additional Info Section */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted rounded-full">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span className="text-sm font-medium text-muted-foreground">
            Powered by AI for personalized travel experiences
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;