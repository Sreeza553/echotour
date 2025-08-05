import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ItineraryGenerator = ({ formData, onGenerate, isLoading }) => {
  const [preferences, setPreferences] = useState({
    budget: 'medium',
    pace: 'moderate',
    interests: []
  });

  const budgetOptions = [
    { value: 'budget', label: 'Budget-Friendly', icon: 'DollarSign', color: 'text-success' },
    { value: 'medium', label: 'Moderate', icon: 'Banknote', color: 'text-warning' },
    { value: 'luxury', label: 'Luxury', icon: 'Crown', color: 'text-primary' }
  ];

  const paceOptions = [
    { value: 'relaxed', label: 'Relaxed', icon: 'Coffee', description: 'Take it slow, enjoy the moment' },
    { value: 'moderate', label: 'Moderate', icon: 'MapPin', description: 'Balanced mix of activities' },
    { value: 'packed', label: 'Action-Packed', icon: 'Zap', description: 'See everything possible' }
  ];

  const interestOptions = [
    { value: 'culture', label: 'Culture & History', icon: 'Landmark' },
    { value: 'food', label: 'Food & Dining', icon: 'UtensilsCrossed' },
    { value: 'nature', label: 'Nature & Outdoors', icon: 'Trees' },
    { value: 'adventure', label: 'Adventure Sports', icon: 'Mountain' },
    { value: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
    { value: 'nightlife', label: 'Nightlife', icon: 'Music' },
    { value: 'art', label: 'Art & Museums', icon: 'Palette' },
    { value: 'photography', label: 'Photography', icon: 'Camera' }
  ];

  const handleBudgetChange = (budget) => {
    setPreferences(prev => ({ ...prev, budget }));
  };

  const handlePaceChange = (pace) => {
    setPreferences(prev => ({ ...prev, pace }));
  };

  const handleInterestToggle = (interest) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev?.interests?.includes(interest)
        ? prev?.interests?.filter(i => i !== interest)
        : [...prev?.interests, interest]
    }));
  };

  const handleGenerate = () => {
    onGenerate({
      ...formData,
      preferences
    });
  };

  const isFormValid = () => {
    return formData?.destination && 
           (formData?.duration?.preset || formData?.duration?.custom) && 
           formData?.accommodation?.name;
  };

  return (
    <div className="space-y-6">
      {/* Budget Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Budget Preference
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {budgetOptions?.map((option) => (
            <button
              key={option?.value}
              type="button"
              onClick={() => handleBudgetChange(option?.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                preferences?.budget === option?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon 
                  name={option?.icon} 
                  size={24} 
                  className={preferences?.budget === option?.value ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className={`text-sm font-medium ${
                  preferences?.budget === option?.value ? 'text-primary' : 'text-foreground'
                }`}>
                  {option?.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Pace Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Travel Pace
        </label>
        <div className="space-y-2">
          {paceOptions?.map((option) => (
            <button
              key={option?.value}
              type="button"
              onClick={() => handlePaceChange(option?.value)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                preferences?.pace === option?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={option?.icon} 
                  size={20} 
                  className={preferences?.pace === option?.value ? 'text-primary' : 'text-muted-foreground'} 
                />
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${
                    preferences?.pace === option?.value ? 'text-primary' : 'text-foreground'
                  }`}>
                    {option?.label}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {option?.description}
                  </p>
                </div>
                {preferences?.pace === option?.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Interests Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Interests (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {interestOptions?.map((option) => (
            <button
              key={option?.value}
              type="button"
              onClick={() => handleInterestToggle(option?.value)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                preferences?.interests?.includes(option?.value)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon 
                  name={option?.icon} 
                  size={20} 
                  className={preferences?.interests?.includes(option?.value) ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className={`text-xs font-medium text-center ${
                  preferences?.interests?.includes(option?.value) ? 'text-primary' : 'text-foreground'
                }`}>
                  {option?.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Generate Button */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleGenerate}
          disabled={!isFormValid() || isLoading}
          loading={isLoading}
          iconName="Sparkles"
          iconPosition="left"
          className="min-h-touch"
        >
          {isLoading ? 'Generating Your Perfect Itinerary...' : 'Generate AI Itinerary'}
        </Button>
        
        {!isFormValid() && (
          <div className="flex items-center space-x-2 mt-3 text-sm text-muted-foreground">
            <Icon name="AlertCircle" size={16} />
            <span>Please fill in destination, duration, and accommodation details</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryGenerator;