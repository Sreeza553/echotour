import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlaylistDisplay = ({ 
  playlist, 
  currentTrack, 
  onTrackSelect, 
  onToggleFavorite,
  onShuffle,
  onRepeat,
  isShuffled = false,
  isRepeating = false
}) => {
  if (!playlist || playlist?.length === 0) {
    return null;
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    const total = playlist?.reduce((sum, track) => sum + track?.duration, 0);
    return formatDuration(total);
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      happy: 'Sun',
      relaxed: 'Waves',
      adventurous: 'Mountain',
      romantic: 'Heart',
      energetic: 'Zap',
      peaceful: 'Leaf'
    };
    return moodIcons?.[mood] || 'Music';
  };

  return (
    <div className="space-y-6">
      {/* Playlist Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Your Travel Playlist
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {playlist?.length} tracks • {getTotalDuration()}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={isShuffled ? "default" : "outline"}
            size="sm"
            onClick={onShuffle}
            iconName="Shuffle"
            iconSize={16}
          >
            Shuffle
          </Button>
          
          <Button
            variant={isRepeating ? "default" : "outline"}
            size="sm"
            onClick={onRepeat}
            iconName="Repeat"
            iconSize={16}
          >
            Repeat
          </Button>
        </div>
      </div>
      {/* Playlist Tracks */}
      <div className="space-y-2">
        {playlist?.map((track, index) => (
          <div
            key={track?.id}
            className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              currentTrack?.id === track?.id
                ? 'border-primary bg-primary/10 shadow-primary'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-card'
            }`}
            onClick={() => onTrackSelect(track)}
          >
            <div className="flex items-center space-x-4">
              {/* Track Number / Play Icon */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {currentTrack?.id === track?.id ? (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="Play" size={12} color="white" strokeWidth={2} />
                  </div>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                  {track?.title}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {track?.artist}
                </p>
              </div>

              {/* Mood Indicator */}
              <div className="flex-shrink-0 flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <Icon 
                    name={getMoodIcon(track?.mood)} 
                    size={12} 
                    className="text-muted-foreground"
                  />
                </div>
                <span className="text-xs text-muted-foreground capitalize hidden sm:inline">
                  {track?.mood}
                </span>
              </div>

              {/* Duration */}
              <div className="flex-shrink-0 text-sm text-muted-foreground">
                {formatDuration(track?.duration)}
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  onToggleFavorite(track?.id);
                }}
                className="flex-shrink-0 p-1 rounded-full hover:bg-muted transition-colors duration-200"
              >
                <Icon 
                  name={track?.isFavorite ? "Heart" : "Heart"} 
                  size={16} 
                  className={track?.isFavorite ? "text-error fill-current" : "text-muted-foreground hover:text-error"}
                  strokeWidth={track?.isFavorite ? 0 : 2}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Playlist Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted rounded-xl">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {playlist?.length}
          </div>
          <div className="text-xs text-muted-foreground">
            Total Tracks
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {playlist?.filter(t => t?.isFavorite)?.length}
          </div>
          <div className="text-xs text-muted-foreground">
            Favorites
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {getTotalDuration()}
          </div>
          <div className="text-xs text-muted-foreground">
            Duration
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {new Set(playlist.map(t => t.genre))?.size}
          </div>
          <div className="text-xs text-muted-foreground">
            Genres
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDisplay;