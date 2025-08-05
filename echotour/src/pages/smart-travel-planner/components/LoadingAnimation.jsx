import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingAnimation = ({ destination }) => {
  const loadingSteps = [
    { icon: 'MapPin', text: 'Analyzing destination', delay: '0s' },
    { icon: 'Calendar', text: 'Planning timeline', delay: '0.5s' },
    { icon: 'Building2', text: 'Finding nearby attractions', delay: '1s' },
    { icon: 'Route', text: 'Optimizing routes', delay: '1.5s' },
    { icon: 'Sparkles', text: 'Adding personal touches', delay: '2s' }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      {/* Main Loading Animation */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-sunset animate-pulse flex items-center justify-center">
          <Icon name="Plane" size={32} color="white" className="animate-bounce" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent animate-ping" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-secondary animate-pulse" />
      </div>
      {/* Destination Text */}
      <div className="text-center">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          Creating Your Perfect {destination} Experience
        </h3>
        <p className="text-muted-foreground">
          Our AI is crafting a personalized itinerary just for you
        </p>
      </div>
      {/* Loading Steps */}
      <div className="w-full max-w-md space-y-4">
        {loadingSteps?.map((step, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 animate-fade-in"
            style={{ animationDelay: step?.delay }}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon 
                name={step?.icon} 
                size={16} 
                className="text-primary animate-pulse" 
                style={{ animationDelay: step?.delay }}
              />
            </div>
            <span className="text-sm text-foreground font-medium">
              {step?.text}
            </span>
            <div className="flex-1 flex justify-end">
              <div className="flex space-x-1">
                <div 
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `calc(${step?.delay} + 0.1s)` }}
                />
                <div 
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `calc(${step?.delay} + 0.2s)` }}
                />
                <div 
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `calc(${step?.delay} + 0.3s)` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-sunset animate-pulse rounded-full" style={{
            width: '100%',
            animation: 'loading-progress 3s ease-in-out infinite'
          }} />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          This usually takes 10-15 seconds
        </p>
      </div>
      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;