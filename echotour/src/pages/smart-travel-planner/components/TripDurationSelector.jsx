import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TripDurationSelector = ({ value, onChange, error }) => {
  const [durationType, setDurationType] = useState('preset');

  const presetDurations = [
    { value: '1', label: '1 Day (Day Trip)' },
    { value: '2', label: '2 Days (Weekend)' },
    { value: '3', label: '3 Days (Long Weekend)' },
    { value: '5', label: '5 Days (Work Week)' },
    { value: '7', label: '1 Week' },
    { value: '10', label: '10 Days (Extended Trip)' },
    { value: '14', label: '2 Weeks' },
    { value: '21', label: '3 Weeks' },
    { value: '30', label: '1 Month' }
  ];

  const handleDurationTypeChange = (type) => {
    setDurationType(type);
    if (type === 'preset' && value?.custom) {
      onChange({ preset: '', custom: '' });
    } else if (type === 'custom' && value?.preset) {
      onChange({ preset: '', custom: '' });
    }
  };

  const handlePresetChange = (selectedValue) => {
    onChange({ preset: selectedValue, custom: '' });
  };

  const handleCustomChange = (e) => {
    const customValue = e?.target?.value;
    onChange({ preset: '', custom: customValue });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Trip Duration
        </label>
        
        {/* Duration Type Selector */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-4">
          <button
            type="button"
            onClick={() => handleDurationTypeChange('preset')}
            className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              durationType === 'preset' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Calendar" size={16} className="mr-2" />
            Preset
          </button>
          <button
            type="button"
            onClick={() => handleDurationTypeChange('custom')}
            className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              durationType === 'custom' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Edit3" size={16} className="mr-2" />
            Custom
          </button>
        </div>

        {/* Preset Duration Selector */}
        {durationType === 'preset' && (
          <Select
            placeholder="Select trip duration"
            options={presetDurations}
            value={value?.preset || ''}
            onChange={handlePresetChange}
            error={error}
          />
        )}

        {/* Custom Duration Input */}
        {durationType === 'custom' && (
          <div className="space-y-3">
            <Input
              type="number"
              placeholder="Enter number of days"
              value={value?.custom || ''}
              onChange={handleCustomChange}
              error={error}
              min="1"
              max="365"
            />
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Info" size={14} />
              <span>Enter duration between 1-365 days</span>
            </div>
          </div>
        )}
      </div>
      {/* Duration Summary */}
      {(value?.preset || value?.custom) && (
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              Trip Duration: {value?.preset || value?.custom} day{(value?.preset > 1 || value?.custom > 1) ? 's' : ''}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Perfect for {
              (value?.preset <= 3 || value?.custom <= 3) ? 'a quick getaway' :
              (value?.preset <= 7 || value?.custom <= 7) ? 'exploring key attractions' :
              (value?.preset <= 14 || value?.custom <= 14) ? 'in-depth exploration': 'comprehensive cultural immersion'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TripDurationSelector;