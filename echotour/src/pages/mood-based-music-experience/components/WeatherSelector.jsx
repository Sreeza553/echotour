import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherSelector = ({ selectedWeather, onWeatherSelect, disabled = false }) => {
  const weatherOptions = [
    {
      id: 'sunny',
      label: 'Sunny',
      icon: 'Sun',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'rainy',
      label: 'Rainy',
      icon: 'CloudRain',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'cloudy',
      label: 'Cloudy',
      icon: 'Cloud',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    },
    {
      id: 'snowy',
      label: 'Snowy',
      icon: 'Snowflake',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Current Weather
        </h3>
        <p className="text-sm text-muted-foreground">
          What's the weather like at your destination?
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {weatherOptions?.map((weather) => (
          <button
            key={weather?.id}
            onClick={() => onWeatherSelect(weather?.id)}
            disabled={disabled}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 min-h-touch ${
              selectedWeather === weather?.id
                ? 'border-primary bg-primary/10 shadow-primary'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-card'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-lg ${weather?.bgColor} flex items-center justify-center transition-all duration-300`}>
                <Icon 
                  name={weather?.icon} 
                  size={20} 
                  className={weather?.color}
                  strokeWidth={2}
                />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                {weather?.label}
              </span>
              {selectedWeather === weather?.id && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Check" size={10} color="white" strokeWidth={3} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherSelector;