import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AboutSection = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'AI-Powered Intelligence',
      description: 'Advanced algorithms analyze your preferences to create personalized travel experiences tailored just for you.'
    },
    {
      icon: 'Globe',
      title: 'Global Coverage',
      description: 'Explore destinations worldwide with comprehensive cultural insights and local recommendations.'
    },
    {
      icon: 'Headphones',
      title: 'Immersive Audio',
      description: 'Create lasting memories with voice recordings and ambient soundscapes that capture your journey.'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile-First Design',
      description: 'Seamless experience across all devices, optimized for travelers on the go.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Travelers', icon: 'Users' },
    { number: '200+', label: 'Destinations', icon: 'MapPin' },
    { number: '1M+', label: 'Memories Created', icon: 'Heart' },
    { number: '4.9/5', label: 'User Rating', icon: 'Star' }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <Icon name="Info" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-secondary">About EchoTour</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Revolutionizing Travel with{' '}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              AI Innovation
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            EchoTour combines cutting-edge artificial intelligence with deep cultural insights to transform how you explore the world. Every journey becomes a personalized adventure filled with meaningful discoveries and lasting memories.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-6">
              Why Choose EchoTour?
            </h3>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We believe every traveler deserves experiences that resonate with their unique interests and preferences. Our AI-powered platform doesn't just plan trips—it crafts journeys that speak to your soul, connecting you with local cultures, perfect soundtracks, and unforgettable moments.
            </p>

            <div className="space-y-6">
              {features?.map((feature, index) => (
                <div 
                  key={feature?.title}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-sunset flex items-center justify-center shadow-primary">
                    <Icon name={feature?.icon} size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      {feature?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-primary-hover">
                <Image
                  src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Travelers using EchoTour AI features for personalized experiences"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-card border border-border animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success to-accent flex items-center justify-center">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Trip Optimized</div>
                    <div className="text-xs text-muted-foreground">AI Analysis Complete</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-card border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Sparkles" size={16} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Personalized</div>
                    <div className="text-xs text-muted-foreground">Just for You</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats?.map((stat, index) => (
            <div 
              key={stat?.label}
              className="text-center p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-primary transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-sunset flex items-center justify-center mx-auto mb-4 shadow-primary">
                <Icon name={stat?.icon} size={20} color="white" />
              </div>
              <div className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                {stat?.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;