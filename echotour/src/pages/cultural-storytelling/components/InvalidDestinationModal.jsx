import React, { useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InvalidDestinationModal = ({ isOpen, onClose, searchedPlace, onSuggestionSelect }) => {
  const suggestions = [
    { id: 1, name: "Paris", country: "France", type: "city", reason: "Rich cultural heritage" },
    { id: 2, name: "Rome", country: "Italy", type: "city", reason: "Ancient history" },
    { id: 3, name: "Kyoto", country: "Japan", type: "city", reason: "Traditional culture" },
    { id: 4, name: "Machu Picchu", country: "Peru", type: "landmark", reason: "Archaeological wonder" },
    { id: 5, name: "Istanbul", country: "Turkey", type: "city", reason: "Cultural crossroads" },
    { id: 6, name: "Marrakech", country: "Morocco", type: "city", reason: "Vibrant traditions" }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionSelect(suggestion);
    onClose();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'city': return 'Building2';
      case 'landmark': return 'MapPin';
      case 'island': return 'Waves';
      default: return 'MapPin';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-background rounded-2xl shadow-primary-hover border border-border animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Destination Not Found
              </h2>
              <p className="text-sm text-muted-foreground">
                We couldn't find stories for this location
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground mb-2">
                  <strong>"{searchedPlace}"</strong> is not in our cultural stories database.
                </p>
                <p className="text-sm text-muted-foreground">
                  Our AI storyteller currently covers major cities, landmarks, and cultural sites. 
                  Try searching for a well-known destination or choose from our suggestions below.
                </p>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Try these popular destinations:
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {suggestions?.map((suggestion) => (
                <button
                  key={suggestion?.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center p-3 text-left hover:bg-muted rounded-lg transition-all duration-200 group border border-transparent hover:border-primary/20"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon 
                      name={getTypeIcon(suggestion?.type)} 
                      size={18} 
                      className="text-primary" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {suggestion?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {suggestion?.country} • {suggestion?.reason}
                    </p>
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="mb-6 p-3 bg-muted rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="HelpCircle" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-1">
                  <strong>Tips for better results:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Use well-known city or landmark names</li>
                  <li>Try alternative spellings or local names</li>
                  <li>Search for the country or region instead</li>
                  <li>Check for typos in your search</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
            >
              Try Again
            </Button>
            <Button
              variant="default"
              fullWidth
              onClick={() => handleSuggestionClick(suggestions?.[0])}
              iconName="Sparkles"
              iconPosition="left"
              iconSize={16}
            >
              Explore Paris
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvalidDestinationModal;