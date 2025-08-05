import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StorySidebar = ({ relatedDestinations, storyCategories, onDestinationSelect, onCategorySelect }) => {
  const categories = [
    { id: 'ancient', name: 'Ancient Civilizations', icon: 'Building2', count: 45 },
    { id: 'religious', name: 'Religious Sites', icon: 'Church', count: 32 },
    { id: 'cultural', name: 'Cultural Heritage', icon: 'Users', count: 67 },
    { id: 'architectural', name: 'Architecture', icon: 'Home', count: 28 },
    { id: 'natural', name: 'Natural Wonders', icon: 'Mountain', count: 19 },
    { id: 'modern', name: 'Modern Landmarks', icon: 'Building', count: 24 }
  ];

  const related = [
    { id: 1, name: "Versailles", country: "France", type: "palace", distance: "20km from Paris" },
    { id: 2, name: "Louvre Museum", country: "France", type: "museum", distance: "Central Paris" },
    { id: 3, name: "Notre-Dame", country: "France", type: "cathedral", distance: "Central Paris" },
    { id: 4, name: "Sacré-Cœur", country: "France", type: "basilica", distance: "Montmartre, Paris" },
    { id: 5, name: "Arc de Triomphe", country: "France", type: "monument", distance: "Champs-Élysées" }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'palace': return 'Crown';
      case 'museum': return 'Building2';
      case 'cathedral': return 'Church';
      case 'basilica': return 'Church';
      case 'monument': return 'MapPin';
      default: return 'MapPin';
    }
  };

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Story Categories */}
      <div className="bg-card border border-border rounded-2xl shadow-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Grid3x3" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Story Categories
          </h3>
        </div>
        
        <div className="space-y-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategorySelect && onCategorySelect(category)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <Icon 
                    name={category?.icon} 
                    size={16} 
                    className="text-primary" 
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {category?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {category?.count}
                </span>
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Related Destinations */}
      <div className="bg-card border border-border rounded-2xl shadow-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Related Places
          </h3>
        </div>
        
        <div className="space-y-3">
          {related?.map((destination) => (
            <button
              key={destination?.id}
              onClick={() => onDestinationSelect && onDestinationSelect(destination)}
              className="w-full flex items-start space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-all duration-200 group border border-transparent hover:border-primary/20"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-200">
                <Icon 
                  name={getTypeIcon(destination?.type)} 
                  size={18} 
                  className="text-secondary" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                  {destination?.name}
                </p>
                <p className="text-sm text-muted-foreground capitalize truncate">
                  {destination?.type} • {destination?.distance}
                </p>
              </div>
              <Icon 
                name="ExternalLink" 
                size={14} 
                className="text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0 mt-1" 
              />
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Explore More Places
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-2xl shadow-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Quick Actions
          </h3>
        </div>
        
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            iconName="BookmarkPlus"
            iconPosition="left"
            iconSize={16}
          >
            Save All Stories
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export as PDF
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
          >
            Share Collection
          </Button>
        </div>
      </div>
      {/* Cultural Tip */}
      <div className="bg-gradient-to-br from-accent/10 to-warning/10 border border-accent/20 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Icon name="Lightbulb" size={18} color="white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">
              Cultural Tip
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The best time to visit historical sites is early morning or late afternoon 
              when the lighting enhances architectural details and crowds are smaller.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySidebar;