import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StoryCard = ({ story, onBookmark, onShare, isBookmarked = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark(story);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(story);
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'culture', label: 'Culture', icon: 'Users' },
    { id: 'traditions', label: 'Traditions', icon: 'Heart' },
    { id: 'facts', label: 'Fun Facts', icon: 'Lightbulb' }
  ];

  const getSectionContent = (sectionId) => {
    switch (sectionId) {
      case 'overview':
        return story?.overview;
      case 'history':
        return story?.history;
      case 'culture':
        return story?.culture;
      case 'traditions':
        return story?.traditions;
      case 'facts':
        return story?.facts;
      default:
        return story?.overview;
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-card hover:shadow-primary-hover transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-sunset flex items-center justify-center shadow-primary">
                <Icon name="MapPin" size={24} color="white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {story?.destination?.name}
                </h2>
                <p className="text-muted-foreground capitalize">
                  {story?.destination?.type} • {story?.destination?.country}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
              iconSize={18}
              className={isBookmarked ? "text-primary" : "text-muted-foreground"}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              iconName="Share2"
              iconSize={18}
              className="text-muted-foreground"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{story?.readTime} min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>Est. {story?.establishedYear}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} />
            <span>{story?.significance}</span>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="px-6 pb-4">
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeSection === section?.id
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={section?.icon} size={16} />
              <span className="hidden sm:inline">{section?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="px-6 pb-6">
        <div className="prose prose-sm max-w-none">
          {/* Highlighted Quote */}
          {story?.quote && activeSection === 'overview' && (
            <div className="mb-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <blockquote className="text-lg font-medium text-foreground italic mb-2">
                "{story?.quote}"
              </blockquote>
              <cite className="text-sm text-muted-foreground">
                — {story?.quoteSource}
              </cite>
            </div>
          )}

          {/* Main Content */}
          <div className="text-foreground leading-relaxed">
            {getSectionContent(activeSection)}
          </div>

          {/* Key Highlights */}
          {activeSection === 'facts' && story?.highlights && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {story?.highlights?.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-accent/10 rounded-lg border border-accent/20"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <Icon name="Star" size={14} color="white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {highlight?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {highlight?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        </div>
      </div>
      {/* Footer Actions */}
      <div className="px-6 py-4 bg-muted/50 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Eye" size={16} />
              <span>{story?.views} views</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="ThumbsUp" size={16} />
              <span>{story?.likes} likes</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconSize={16}
            >
              Save PDF
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Navigation"
              iconSize={16}
            >
              Plan Visit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;