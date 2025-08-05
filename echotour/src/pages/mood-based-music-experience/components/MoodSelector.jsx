import React from 'react';
import Icon from '../../../components/AppIcon';

const MoodSelector = ({ selectedMood, onMoodSelect, disabled = false }) => {
  const moods = [
    {
      id: 'happy',
      label: 'Happy',
      icon: 'Sun',
      color: 'from-accent to-warning',
      description: 'Upbeat and energetic vibes'
    },
    {
      id: 'relaxed',
      label: 'Relaxed',
      icon: 'Waves',
      color: 'from-secondary to-primary',
      description: 'Calm and peaceful sounds'
    },
    {
      id: 'adventurous',
      label: 'Adventurous',
      icon: 'Mountain',
      color: 'from-primary to-warning',
      description: 'Bold and exciting rhythms'
    },
    {
      id: 'romantic',
      label: 'Romantic',
      icon: 'Heart',
      color: 'from-secondary to-accent',
      description: 'Soft and intimate melodies'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Select Your Mood
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose the mood that matches your travel vibe
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {moods?.map((mood) => (
          <button
            key={mood?.id}
            onClick={() => onMoodSelect(mood?.id)}
            disabled={disabled}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 min-h-touch ${
              selectedMood === mood?.id
                ? 'border-primary bg-primary/10 shadow-primary'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-card'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mood?.color} flex items-center justify-center shadow-card group-hover:shadow-primary transition-all duration-300`}>
                <Icon 
                  name={mood?.icon} 
                  size={24} 
                  color="white" 
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {mood?.label}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {mood?.description}
                </p>
              </div>
              {selectedMood === mood?.id && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" strokeWidth={3} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;