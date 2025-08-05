import React, { useState, useEffect, useRef } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PlaceSearchInput = ({ onPlaceSelect, onGenerateStory, isLoading }) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock destinations database
  const destinations = [
    { id: 1, name: "Paris", country: "France", type: "city" },
    { id: 2, name: "Rome", country: "Italy", type: "city" },
    { id: 3, name: "Tokyo", country: "Japan", type: "city" },
    { id: 4, name: "Machu Picchu", country: "Peru", type: "landmark" },
    { id: 5, name: "Great Wall of China", country: "China", type: "landmark" },
    { id: 6, name: "Taj Mahal", country: "India", type: "landmark" },
    { id: 7, name: "Santorini", country: "Greece", type: "island" },
    { id: 8, name: "Bali", country: "Indonesia", type: "island" },
    { id: 9, name: "Cairo", country: "Egypt", type: "city" },
    { id: 10, name: "Petra", country: "Jordan", type: "landmark" },
    { id: 11, name: "Kyoto", country: "Japan", type: "city" },
    { id: 12, name: "Barcelona", country: "Spain", type: "city" },
    { id: 13, name: "Istanbul", country: "Turkey", type: "city" },
    { id: 14, name: "Angkor Wat", country: "Cambodia", type: "landmark" },
    { id: 15, name: "Marrakech", country: "Morocco", type: "city" },
    { id: 16, name: "Venice", country: "Italy", type: "city" },
    { id: 17, name: "Prague", country: "Czech Republic", type: "city" },
    { id: 18, name: "Chichen Itza", country: "Mexico", type: "landmark" },
    { id: 19, name: "Edinburgh", country: "Scotland", type: "city" },
    { id: 20, name: "Dubrovnik", country: "Croatia", type: "city" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event.target) &&
          inputRef?.current && !inputRef?.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchValue(value);
    setSelectedPlace(null);

    if (value?.length > 0) {
      const filtered = destinations?.filter(dest =>
        dest?.name?.toLowerCase()?.includes(value?.toLowerCase()) ||
        dest?.country?.toLowerCase()?.includes(value?.toLowerCase())
      )?.slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (destination) => {
    setSearchValue(destination?.name);
    setSelectedPlace(destination);
    setShowSuggestions(false);
    if (onPlaceSelect) {
      onPlaceSelect(destination);
    }
  };

  const handleGenerateClick = () => {
    if (selectedPlace) {
      onGenerateStory(selectedPlace);
    } else {
      // Check if entered text matches any destination
      const matchedDestination = destinations?.find(dest =>
        dest?.name?.toLowerCase() === searchValue?.toLowerCase()
      );
      
      if (matchedDestination) {
        setSelectedPlace(matchedDestination);
        onGenerateStory(matchedDestination);
      } else {
        onGenerateStory({ name: searchValue, isInvalid: true });
      }
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'city': return 'Building2';
      case 'landmark': return 'MapPin';
      case 'island': return 'Waves';
      default: return 'MapPin';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="relative">
          <Input
            ref={inputRef}
            label="Destination"
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Enter a place name (e.g., Paris, Taj Mahal, Santorini)"
            description="Search for cities, landmarks, or cultural sites to discover their stories"
            className="pr-12"
            disabled={isLoading}
          />
          <div className="absolute right-3 top-9 text-muted-foreground">
            <Icon name="Search" size={20} />
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions?.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-primary z-50 max-h-64 overflow-y-auto"
          >
            <div className="py-2">
              {suggestions?.map((destination) => (
                <button
                  key={destination?.id}
                  onClick={() => handleSuggestionClick(destination)}
                  className="w-full flex items-center px-4 py-3 text-left hover:bg-muted transition-colors duration-150 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors duration-150">
                    <Icon 
                      name={getTypeIcon(destination?.type)} 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                      {destination?.name}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {destination?.type} • {destination?.country}
                    </p>
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-150" 
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Generate Button */}
      <div className="mt-6">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleGenerateClick}
          disabled={!searchValue?.trim() || isLoading}
          loading={isLoading}
          iconName="Sparkles"
          iconPosition="left"
          iconSize={20}
          className="min-h-touch"
        >
          {isLoading ? 'Generating Story...' : 'Generate Cultural Story'}
        </Button>
      </div>
      {/* Quick Suggestions */}
      {!showSuggestions && !searchValue && (
        <div className="mt-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Popular destinations:
          </p>
          <div className="flex flex-wrap gap-2">
            {destinations?.slice(0, 6)?.map((destination) => (
              <button
                key={destination?.id}
                onClick={() => handleSuggestionClick(destination)}
                className="inline-flex items-center px-3 py-2 bg-muted hover:bg-primary/10 text-sm text-muted-foreground hover:text-primary rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20"
                disabled={isLoading}
              >
                <Icon 
                  name={getTypeIcon(destination?.type)} 
                  size={14} 
                  className="mr-2" 
                />
                {destination?.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceSearchInput;