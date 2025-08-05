import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = ({ onAuthClick }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/smart-travel-planner');
  };

  const handleExploreFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-accent/20 to-warning/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/15 to-accent/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Travel Companion
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Your Journey,{' '}
              <span className="bg-gradient-sunset bg-clip-text text-transparent">
                Perfectly
              </span>{' '}
              Crafted
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover personalized travel experiences with AI-powered planning, cultural storytelling, mood-based music, and voice memories that make every trip unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                variant="default"
                size="lg"
                onClick={handleGetStarted}
                iconName="MapPin"
                iconPosition="left"
                iconSize={20}
                className="min-h-touch shadow-primary hover:shadow-primary-hover"
              >
                Start Planning
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleExploreFeatures}
                iconName="Compass"
                iconPosition="left"
                iconSize={20}
                className="min-h-touch"
              >
                Explore Features
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-heading font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Trips Planned</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-heading font-bold text-foreground">200+</div>
                <div className="text-sm text-muted-foreground">Destinations</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-heading font-bold text-foreground">4.9★</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-primary-hover">
                <Image
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Travelers exploring beautiful destinations with EchoTour"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-background rounded-2xl p-4 shadow-card border border-border animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-sunset flex items-center justify-center">
                    <Icon name="MapPin" size={20} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Smart Planning</div>
                    <div className="text-xs text-muted-foreground">AI-Powered</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-background rounded-2xl p-4 shadow-card border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-warning flex items-center justify-center">
                    <Icon name="Music" size={20} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Perfect Vibes</div>
                    <div className="text-xs text-muted-foreground">Mood Music</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-6 bg-background rounded-2xl p-3 shadow-card border border-border animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <Icon name="BookOpen" size={16} color="white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">Cultural Stories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={handleExploreFeatures}
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-card hover:shadow-primary transition-all duration-300"
        >
          <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;