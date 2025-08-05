import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PlaylistGenerator = ({ 
  formData, 
  onGeneratePlaylist, 
  isGenerating = false,
  disabled = false 
}) => {
  const [animationStep, setAnimationStep] = useState(0);

  const isFormValid = () => {
    return (formData?.mood &&
    formData?.weather &&
    formData?.region && formData?.preferences?.length > 0);
  };

  const handleGenerate = async () => {
    if (!isFormValid() || disabled) return;
    
    setAnimationStep(1);
    setTimeout(() => setAnimationStep(2), 1000);
    setTimeout(() => setAnimationStep(3), 2000);
    
    await onGeneratePlaylist();
    setAnimationStep(0);
  };

  const getLoadingMessage = () => {
    switch (animationStep) {
      case 1:
        return "Analyzing your preferences...";
      case 2:
        return "Curating perfect tracks...";
      case 3:
        return "Creating your playlist...";
      default:
        return "Generate Playlist";
    }
  };

  const getLoadingIcon = () => {
    switch (animationStep) {
      case 1:
        return "Search";
      case 2:
        return "Music";
      case 3:
        return "Sparkles";
      default:
        return "Play";
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Summary */}
      <div className="p-4 bg-muted rounded-xl border border-border">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Settings" size={16} className="mr-2" />
          Your Selection Summary
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Mood:</span>
            <span className="font-medium text-foreground capitalize">
              {formData?.mood || 'Not selected'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Weather:</span>
            <span className="font-medium text-foreground capitalize">
              {formData?.weather || 'Not selected'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Region:</span>
            <span className="font-medium text-foreground">
              {formData?.region ? 
                formData?.region?.split('-')?.map(word => 
                  word?.charAt(0)?.toUpperCase() + word?.slice(1)
                )?.join(' ') : 
                'Not selected'
              }
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Preferences:</span>
            <span className="font-medium text-foreground">
              {formData?.preferences?.length > 0 ? 
                `${formData?.preferences?.length} selected` : 
                'None selected'
              }
            </span>
          </div>
        </div>
      </div>
      {/* Generate Button */}
      <div className="text-center">
        <Button
          variant="default"
          size="lg"
          onClick={handleGenerate}
          disabled={!isFormValid() || isGenerating || disabled}
          loading={isGenerating}
          iconName={getLoadingIcon()}
          iconPosition="left"
          iconSize={20}
          className="w-full sm:w-auto min-w-48 min-h-touch"
        >
          {isGenerating ? getLoadingMessage() : "Create My Playlist"}
        </Button>
        
        {!isFormValid() && (
          <p className="text-sm text-muted-foreground mt-2">
            Please complete all selections above
          </p>
        )}
      </div>
      {/* Loading Animation */}
      {isGenerating && (
        <div className="flex justify-center items-center space-x-4 py-8">
          <div className="flex space-x-2">
            {[0, 1, 2]?.map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <div className="flex space-x-1">
            <Icon name="Music" size={20} className="text-primary animate-pulse" />
            <Icon name="MapPin" size={16} className="text-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Icon name="Heart" size={14} className="text-accent animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistGenerator;