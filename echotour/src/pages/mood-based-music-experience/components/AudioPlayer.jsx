import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioPlayer = ({ 
  currentTrack, 
  playlist = [], 
  onTrackChange,
  onPlaylistEnd 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Multiple reliable audio sources with fallbacks
  const getAudioSources = (track) => {
    if (!track) return [];
    
    // Generate multiple working sources for better reliability
    const sources = [
      // Internet Archive - Public Domain Audio
      `https://archive.org/download/testmp3testfile/mpthreetest.mp3`,
      // HTML5 Test Audio Files
      `https://html5demos.com/assets/dizzy.mp3`,
      // Sample Audio Files
      `https://www.soundjay.com/misc/sounds/clock-ticking-3.mp3`,
      // Alternative sources
      `https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg`,
      `https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg`
    ];
    
    // Rotate sources based on track ID to provide variety
    const startIndex = (track?.id || 0) % sources?.length;
    return [...sources?.slice(startIndex), ...sources?.slice(0, startIndex)];
  };

  // Get current audio URL with fallback support
  const getCurrentAudioUrl = (track) => {
    const sources = getAudioSources(track);
    return sources?.[currentUrlIndex] || sources?.[0];
  };

  // Try next audio source if current one fails
  const tryNextSource = () => {
    const sources = getAudioSources(currentTrack);
    const nextIndex = (currentUrlIndex + 1) % sources?.length;
    
    if (nextIndex !== currentUrlIndex) {
      setCurrentUrlIndex(nextIndex);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (currentTrack && audioRef?.current) {
      setIsLoading(true);
      setHasError(false);
      setCurrentUrlIndex(0); // Reset to first source for new track
      
      // Reset audio when track changes
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      
      // Load new track
      const audioUrl = getCurrentAudioUrl(currentTrack);
      if (audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef?.current?.load();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    // Update audio source when URL index changes
    if (currentTrack && audioRef?.current) {
      const audioUrl = getCurrentAudioUrl(currentTrack);
      if (audioUrl && audioRef?.current?.src !== audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef?.current?.load();
      }
    }
  }, [currentUrlIndex, currentTrack]);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Test autoplay capability
  useEffect(() => {
    const testAutoplay = async () => {
      if (audioRef?.current) {
        try {
          await audioRef?.current?.play();
          setCanAutoplay(true);
          setShowPlayButton(false);
          audioRef?.current?.pause();
        } catch (error) {
          setCanAutoplay(false);
          setShowPlayButton(true);
        }
      }
    };

    testAutoplay();
  }, []);

  const handlePlayPause = async () => {
    if (!currentTrack || !audioRef?.current) return;

    try {
      if (isPlaying) {
        audioRef?.current?.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef?.current?.play();
        setIsPlaying(true);
        setShowPlayButton(false);
        setHasError(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      
      // Try next source if available
      if (tryNextSource()) {
        setIsLoading(true);
        // Wait a moment for the new source to load
        setTimeout(() => handlePlayPause(), 1000);
      } else {
        setHasError(true);
        setIsPlaying(false);
        setIsLoading(false);
        setShowPlayButton(true);
      }
    }
  };

  const handleForcePlay = async () => {
    if (!currentTrack || !audioRef?.current) return;
    
    try {
      setIsLoading(true);
      setHasError(false);
      
      // Ensure we have a valid source
      const audioUrl = getCurrentAudioUrl(currentTrack);
      if (audioUrl) {
        audioRef.current.src = audioUrl;
        await audioRef?.current?.load();
        await audioRef?.current?.play();
        setIsPlaying(true);
        setShowPlayButton(false);
        setCanAutoplay(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Force play error:', error);
      
      // Try next source if available
      if (tryNextSource()) {
        setTimeout(() => handleForcePlay(), 1000);
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef?.current) {
      setCurrentTime(audioRef?.current?.currentTime);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (e) => {
    console.error('Audio error:', e);
    
    // Try next source automatically
    if (tryNextSource()) {
      setIsLoading(true);
      // Allow time for the new source to load
      setTimeout(() => {
        if (audioRef?.current) {
          audioRef?.current?.load();
        }
      }, 500);
    } else {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e) => {
    if (!currentTrack || !audioRef?.current || !progressRef?.current) return;

    const rect = progressRef?.current?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const width = rect?.width;
    const percentage = clickX / width;
    const newTime = percentage * (currentTrack?.duration || 180);

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePrevious = () => {
    if (!playlist?.length || !currentTrack) return;

    const currentIndex = playlist?.findIndex(track => track?.id === currentTrack?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist?.length - 1;
    onTrackChange(playlist?.[prevIndex]);
  };

  const handleNext = () => {
    if (!playlist?.length || !currentTrack) return;

    const currentIndex = playlist?.findIndex(track => track?.id === currentTrack?.id);
    const nextIndex = currentIndex < playlist?.length - 1 ? currentIndex + 1 : 0;
    
    if (nextIndex === 0 && currentIndex === playlist?.length - 1) {
      // Reached end of playlist
      onPlaylistEnd?.();
    }
    
    onTrackChange(playlist?.[nextIndex]);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    handleNext();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return 'VolumeX';
    if (volume < 0.5) return 'Volume1';
    return 'Volume2';
  };

  if (!currentTrack) {
    return (
      <div className="p-6 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl border border-orange-200 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Icon name="Music" size={32} color="white" />
        </div>
        <p className="text-gray-600 font-medium">
          Select a track to start your musical journey
        </p>
      </div>
    );
  }

  const progressPercentage = (currentTrack?.duration || 180) > 0 
    ? (currentTime / (currentTrack?.duration || 180)) * 100 
    : 0;

  return (
    <div className="sticky bottom-0 bg-gradient-to-r from-orange-50 to-pink-50 border-t border-orange-200 shadow-xl backdrop-blur-sm">
      {/* Single Audio Element with Error Handling */}
      <audio
        ref={audioRef}
        src={getCurrentAudioUrl(currentTrack)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onLoadedData={() => {
          if (audioRef?.current) {
            audioRef.current.volume = volume;
          }
        }}
        preload="metadata"
      />
      
      <div className="p-6">
        {/* Force Play Button (for browsers that block autoplay) */}
        {showPlayButton && !canAutoplay && (
          <div className="mb-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-300 text-center">
            <p className="text-sm text-gray-700 mb-3">
              🎵 Click to enable audio playback (required by your browser)
            </p>
            <Button
              variant="default"
              onClick={handleForcePlay}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={18} className="animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Icon name="Play" size={18} className="mr-2" />
                  Enable Audio & Play
                </>
              )}
            </Button>
          </div>
        )}

        {/* Error Message with Retry Options */}
        {hasError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-center">
            <p className="text-sm text-red-700 mb-2">
              ⚠️ Audio source unavailable. Trying alternative sources...
            </p>
            <div className="flex justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleForcePlay}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Retry
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentUrlIndex(0);
                  setTimeout(handleForcePlay, 500);
                }}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Reset Source
              </Button>
            </div>
          </div>
        )}

        {/* Track Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Icon name="Music" size={28} color="white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 text-lg truncate">
              {currentTrack?.title}
            </h4>
            <p className="text-gray-600 truncate">
              {currentTrack?.artist}
            </p>
            <p className="text-xs text-gray-500 capitalize mt-1">
              {currentTrack?.genre} • {currentTrack?.mood}
            </p>
          </div>

          {isLoading && (
            <div className="flex items-center space-x-2 text-orange-600">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div
            ref={progressRef}
            className="w-full h-3 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full cursor-pointer shadow-inner"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack?.duration || 180)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200"
              iconName="SkipBack"
              iconSize={20}
            />
            
            <Button
              variant="default"
              size="lg"
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icon name="Loader2" size={24} color="white" className="animate-spin" />
              ) : (
                <Icon name={isPlaying ? "Pause" : "Play"} size={24} color="white" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200"
              iconName="SkipForward"
              iconSize={20}
            />
          </div>

          {/* Volume Control */}
          <div className="relative">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200"
              iconName={getVolumeIcon()}
              iconSize={20}
            />
            
            {showVolumeSlider && (
              <div className="absolute bottom-full right-0 mb-3 p-4 bg-white border border-orange-200 rounded-xl shadow-xl backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <Icon name="VolumeX" size={16} className="text-gray-500" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e?.target?.value))}
                    className="w-24 h-2 bg-gradient-to-r from-orange-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #f97316 0%, #ec4899 ${volume * 100}%, #fed7aa ${volume * 100}%, #fce7f3 100%)`
                    }}
                  />
                  <Icon name="Volume2" size={16} className="text-gray-500" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs text-gray-600 font-medium">{Math.round(volume * 100)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Debug Info (can be removed in production) */}
        {hasError && (
          <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600 text-center">
            <p>Current source: {getCurrentAudioUrl(currentTrack)}</p>
            <p>Source index: {currentUrlIndex + 1} of {getAudioSources(currentTrack)?.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;