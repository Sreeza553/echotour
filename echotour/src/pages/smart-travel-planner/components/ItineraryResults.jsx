import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ItineraryResults = ({ itinerary, onModify, onSave, onShare }) => {
  const [expandedDays, setExpandedDays] = useState(new Set([0]));
  const [viewMode, setViewMode] = useState('timeline');

  const toggleDayExpansion = (dayIndex) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded?.has(dayIndex)) {
      newExpanded?.delete(dayIndex);
    } else {
      newExpanded?.add(dayIndex);
    }
    setExpandedDays(newExpanded);
  };

  const expandAllDays = () => {
    setExpandedDays(new Set(itinerary.days.map((_, index) => index)));
  };

  const collapseAllDays = () => {
    setExpandedDays(new Set());
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      'attraction': 'MapPin',
      'restaurant': 'UtensilsCrossed',
      'shopping': 'ShoppingBag',
      'transport': 'Car',
      'hotel': 'Building2',
      'activity': 'Activity',
      'culture': 'Landmark',
      'nature': 'Trees',
      'entertainment': 'Music'
    };
    return iconMap?.[type] || 'MapPin';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'attraction': 'text-primary',
      'restaurant': 'text-warning',
      'shopping': 'text-secondary',
      'transport': 'text-muted-foreground',
      'hotel': 'text-accent',
      'activity': 'text-success',
      'culture': 'text-primary',
      'nature': 'text-success',
      'entertainment': 'text-secondary'
    };
    return colorMap?.[type] || 'text-primary';
  };

  if (!itinerary) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Your {itinerary?.destination} Itinerary
          </h2>
          <p className="text-muted-foreground mt-1">
            {itinerary?.duration} day{itinerary?.duration > 1 ? 's' : ''} • {itinerary?.totalActivities} activities planned
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={expandedDays?.size === itinerary?.days?.length ? collapseAllDays : expandAllDays}
            iconName={expandedDays?.size === itinerary?.days?.length ? "ChevronUp" : "ChevronDown"}
            iconPosition="left"
          >
            {expandedDays?.size === itinerary?.days?.length ? 'Collapse All' : 'Expand All'}
          </Button>
        </div>
      </div>
      {/* View Mode Toggle */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        <button
          onClick={() => setViewMode('timeline')}
          className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            viewMode === 'timeline' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Clock" size={16} className="mr-2" />
          Timeline View
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            viewMode === 'map' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Map" size={16} className="mr-2" />
          Map View
        </button>
      </div>
      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          {itinerary?.days?.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
            >
              {/* Day Header */}
              <button
                onClick={() => toggleDayExpansion(dayIndex)}
                className="w-full p-4 bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {dayIndex + 1}
                      </span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-foreground">
                        Day {dayIndex + 1}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {day?.activities?.length} activities • {day?.totalTime}
                      </p>
                    </div>
                  </div>
                  <Icon 
                    name={expandedDays?.has(dayIndex) ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </div>
              </button>

              {/* Day Activities */}
              {expandedDays?.has(dayIndex) && (
                <div className="p-4 space-y-4">
                  {day?.activities?.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    >
                      {/* Time */}
                      <div className="flex-shrink-0 text-center">
                        <div className="text-sm font-medium text-foreground">
                          {activity?.time}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity?.duration}
                        </div>
                      </div>

                      {/* Activity Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <Icon 
                            name={getActivityIcon(activity?.type)} 
                            size={16} 
                            className={getActivityColor(activity?.type)} 
                          />
                        </div>
                      </div>

                      {/* Activity Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground">
                          {activity?.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity?.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Icon name="MapPin" size={12} />
                            <span>{activity?.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Icon name="DollarSign" size={12} />
                            <span>{activity?.cost}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ExternalLink"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Map View */}
      {viewMode === 'map' && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="h-96 bg-muted flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={itinerary?.destination}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(itinerary?.destination)}&z=12&output=embed`}
              className="border-0"
            />
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onModify}
          iconName="Edit3"
          iconPosition="left"
          className="flex-1"
        >
          Modify Itinerary
        </Button>
        <Button
          variant="secondary"
          onClick={onSave}
          iconName="Bookmark"
          iconPosition="left"
          className="flex-1"
        >
          Save Itinerary
        </Button>
        <Button
          variant="default"
          onClick={onShare}
          iconName="Share2"
          iconPosition="left"
          className="flex-1"
        >
          Share Itinerary
        </Button>
      </div>
    </div>
  );
};

export default ItineraryResults;