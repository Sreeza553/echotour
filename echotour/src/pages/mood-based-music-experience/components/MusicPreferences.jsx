import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const MusicPreferences = ({ selectedPreferences, onPreferenceToggle, disabled = false }) => {
  const musicTypes = [
    {
      id: 'bollywood',
      label: 'Bollywood',
      icon: 'Music2',
      description: 'Indian film music and classics'
    },
    {
      id: 'hollywood',
      label: 'Hollywood',
      icon: 'Film',
      description: 'Western pop and movie soundtracks'
    },
    {
      id: 'instrumental',
      label: 'Instrumental',
      icon: 'Piano',
      description: 'Pure instrumental and ambient'
    },
    {
      id: 'mixed',
      label: 'Mixed',
      icon: 'Shuffle',
      description: 'Blend of all genres'
    }
  ];

  const handlePreferenceChange = (preferenceId, checked) => {
    onPreferenceToggle(preferenceId, checked);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Music Preferences
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred music styles (select multiple)
        </p>
      </div>
      <div className="space-y-3">
        {musicTypes?.map((type) => (
          <div
            key={type?.id}
            className={`group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-card transition-all duration-300 ${
              disabled ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  checked={selectedPreferences?.includes(type?.id)}
                  onChange={(e) => handlePreferenceChange(type?.id, e?.target?.checked)}
                  disabled={disabled}
                />
              </div>
              
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-sunset flex items-center justify-center shadow-card group-hover:shadow-primary transition-all duration-300">
                  <Icon 
                    name={type?.icon} 
                    size={20} 
                    color="white" 
                    strokeWidth={2}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {type?.label}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPreferences?.length === 0 && (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <p className="text-sm text-warning">
              Please select at least one music preference
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPreferences;