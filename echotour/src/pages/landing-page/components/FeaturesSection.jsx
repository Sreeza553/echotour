import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'smart-travel-planner',
      title: 'Smart Travel Planner',
      description: 'AI-powered itinerary creation that adapts to your preferences, budget, and travel style. Get personalized recommendations for destinations, activities, and accommodations.',
      icon: 'MapPin',
      path: '/smart-travel-planner',
      gradient: 'from-primary to-secondary',
      benefits: [
        'Personalized itineraries in minutes',
        'Budget-conscious recommendations',
        'Real-time activity suggestions',
        'Local insider tips'
      ],
      stats: '50K+ trips planned'
    },
    {
      id: 'cultural-storytelling',
      title: 'Cultural Storytelling',
      description: 'Discover rich historical narratives and cultural insights for any destination. Immerse yourself in local traditions, legends, and authentic stories.',
      icon: 'BookOpen',
      path: '/cultural-storytelling',
      gradient: 'from-secondary to-accent',
      benefits: [
        'Historical context for locations',
        'Local legends and folklore',
        'Cultural etiquette guides',
        'Interactive story experiences'
      ],
      stats: '10K+ stories available'
    },
    {
      id: 'mood-music',
      title: 'Mood-Based Music Experience',
      description: 'Personalized travel soundtracks that match your mood, weather, and location. Create the perfect ambiance for every moment of your journey.',
      icon: 'Music',
      path: '/mood-based-music-experience',
      gradient: 'from-accent to-warning',
      benefits: [
        'Weather-responsive playlists',
        'Location-specific music',
        'Mood-based recommendations',
        'Offline listening support'
      ],
      stats: '1M+ songs curated'
    },
    {
      id: 'voice-memories',
      title: 'Voice Memories Studio',
      description: 'Record and blend your travel experiences with ambient sounds. Create lasting audio memories that transport you back to special moments.',
      icon: 'Mic',
      path: '/voice-memories-studio',
      gradient: 'from-warning to-primary',
      benefits: [
        'High-quality audio recording',
        'Ambient sound blending',
        'Memory organization tools',
        'Easy sharing options'
      ],
      stats: '500K+ memories created'
    }
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <Icon name="Grid3X3" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Everything You Need for{' '}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              Perfect Travels
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive suite of AI-powered tools designed to enhance every aspect of your travel experience, from planning to memories.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features?.map((feature, index) => (
            <div
              key={feature?.id}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border shadow-card hover:shadow-primary-hover transition-all duration-500 ease-out cursor-pointer transform hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleFeatureClick(feature?.path)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature?.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative p-8 lg:p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature?.gradient} flex items-center justify-center shadow-primary group-hover:shadow-primary-hover transition-all duration-300 group-hover:scale-110`}>
                    <Icon 
                      name={feature?.icon} 
                      size={32} 
                      color="white"
                      strokeWidth={2}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-xs font-caption font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {feature?.stats}
                    </span>
                    <Icon 
                      name="ArrowUpRight" 
                      size={18} 
                      className="text-primary"
                    />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature?.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
                  {feature?.description}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {feature?.benefits?.map((benefit, benefitIndex) => (
                    <div 
                      key={benefitIndex}
                      className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                      style={{ transitionDelay: `${benefitIndex * 50}ms` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-medium text-success">
                      Ready to explore
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    iconSize={16}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                  >
                    Try Now
                  </Button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Bottom Border Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature?.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-sunset rounded-full shadow-primary hover:shadow-primary-hover transition-all duration-300">
            <Icon name="Sparkles" size={18} color="white" />
            <span className="text-white font-medium">
              All features powered by advanced AI technology
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;