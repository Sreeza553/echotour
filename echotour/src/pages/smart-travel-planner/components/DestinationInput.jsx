import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DestinationInput = ({ value, onChange, error }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const popularDestinations = [
    { id: 1, name: "Paris, France", country: "France", type: "City" },
    { id: 2, name: "Tokyo, Japan", country: "Japan", type: "City" },
    { id: 3, name: "New York, USA", country: "United States", type: "City" },
    { id: 4, name: "London, England", country: "United Kingdom", type: "City" },
    { id: 5, name: "Rome, Italy", country: "Italy", type: "City" },
    { id: 6, name: "Barcelona, Spain", country: "Spain", type: "City" },
    { id: 7, name: "Amsterdam, Netherlands", country: "Netherlands", type: "City" },
    { id: 8, name: "Dubai, UAE", country: "United Arab Emirates", type: "City" },
    { id: 9, name: "Sydney, Australia", country: "Australia", type: "City" },
    { id: 10, name: "Bangkok, Thailand", country: "Thailand", type: "City" },
    { id: 11, name: "Istanbul, Turkey", country: "Turkey", type: "City" },
    { id: 12, name: "Prague, Czech Republic", country: "Czech Republic", type: "City" },
    { id: 13, name: "Vienna, Austria", country: "Austria", type: "City" },
    { id: 14, name: "Singapore", country: "Singapore", type: "City-State" },
    { id: 15, name: "Mumbai, India", country: "India", type: "City" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event.target) &&
        !inputRef?.current?.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e?.target?.value;
    onChange(inputValue);

    if (inputValue?.length > 0) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const filtered = popularDestinations?.filter(destination =>
          destination?.name?.toLowerCase()?.includes(inputValue?.toLowerCase()) ||
          destination?.country?.toLowerCase()?.includes(inputValue?.toLowerCase())
        );
        setSuggestions(filtered?.slice(0, 6));
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (destination) => {
    onChange(destination?.name);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleInputFocus = () => {
    if (value?.length > 0 && suggestions?.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative">
      <div ref={inputRef}>
        <Input
          label="Destination"
          type="text"
          placeholder="Where would you like to go?"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          error={error}
          required
          className="pr-10"
        />
        <div className="absolute right-3 top-9 flex items-center">
          {isLoading ? (
            <Icon name="Loader2" size={18} className="text-muted-foreground animate-spin" />
          ) : (
            <Icon name="MapPin" size={18} className="text-muted-foreground" />
          )}
        </div>
      </div>
      {showSuggestions && suggestions?.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-lg shadow-primary max-h-64 overflow-y-auto"
        >
          <div className="py-2">
            {suggestions?.map((destination) => (
              <button
                key={destination?.id}
                onClick={() => handleSuggestionClick(destination)}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-muted transition-colors duration-150 group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Icon name="MapPin" size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                    {destination?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {destination?.country} • {destination?.type}
                  </p>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationInput;