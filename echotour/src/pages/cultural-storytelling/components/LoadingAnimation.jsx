import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingAnimation = ({ destination }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-gradient-sunset flex items-center justify-center shadow-primary animate-pulse">
                <Icon name="BookOpen" size={28} color="white" strokeWidth={2} />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-bounce">
                <Icon name="Sparkles" size={14} color="white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
                Crafting Your Cultural Story
              </h2>
              <p className="text-muted-foreground">
                Discovering the rich heritage of <span className="font-medium text-primary">{destination?.name}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="p-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Generating Story</span>
              <span className="text-sm font-medium text-primary">Step 2 of 3</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-sunset h-2 rounded-full animate-pulse" style={{ width: '66%' }}></div>
            </div>
          </div>

          {/* Loading Steps */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                <Icon name="Check" size={14} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-muted-foreground">
                Analyzing historical records and cultural significance
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-spin">
                <Icon name="Loader2" size={14} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-foreground font-medium">
                Generating personalized cultural narrative
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                Formatting story sections and highlights
              </span>
            </div>
          </div>

          {/* Cultural Motifs Animation */}
          <div className="relative h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl overflow-hidden mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-4 gap-4 opacity-20">
                {[
                  'Landmark', 'Users', 'Heart', 'Star',
                  'Clock', 'Globe', 'Book', 'Camera',
                  'Map', 'Compass', 'Mountain', 'Waves'
                ]?.map((iconName, index) => (
                  <div
                    key={iconName}
                    className="w-8 h-8 flex items-center justify-center animate-pulse"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon name={iconName} size={20} className="text-primary" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="absolute top-8 right-6 w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-warning rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted rounded-full">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Our AI is weaving together centuries of history
              </span>
            </div>
          </div>

          {/* Shimmer Placeholders */}
          <div className="mt-8 space-y-4">
            <div className="h-4 bg-muted rounded animate-shimmer"></div>
            <div className="h-4 bg-muted rounded animate-shimmer" style={{ width: '85%' }}></div>
            <div className="h-4 bg-muted rounded animate-shimmer" style={{ width: '92%' }}></div>
            <div className="h-4 bg-muted rounded animate-shimmer" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/50 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Zap" size={16} className="text-accent" />
            <span>Powered by AI cultural intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;