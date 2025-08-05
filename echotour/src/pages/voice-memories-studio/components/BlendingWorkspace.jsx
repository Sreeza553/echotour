import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BlendingWorkspace = ({ 
  voiceRecording, 
  selectedTrack, 
  onBlendComplete,
  isBlending,
  setIsBlending 
}) => {
  const [blendSettings, setBlendSettings] = useState({
    voiceVolume: 70,
    trackVolume: 30,
    fadeIn: 2,
    fadeOut: 2,
    blendIntensity: 50
  });
  const [blendedAudio, setBlendedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [blendProgress, setBlendProgress] = useState(0);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (audioRef?.current) {
      const audio = audioRef?.current;
      
      const updateTime = () => setCurrentTime(audio?.currentTime);
      const updateDuration = () => setDuration(audio?.duration);
      const handleEnded = () => setIsPlaying(false);
      
      audio?.addEventListener('timeupdate', updateTime);
      audio?.addEventListener('loadedmetadata', updateDuration);
      audio?.addEventListener('ended', handleEnded);
      
      return () => {
        audio?.removeEventListener('timeupdate', updateTime);
        audio?.removeEventListener('loadedmetadata', updateDuration);
        audio?.removeEventListener('ended', handleEnded);
      };
    }
  }, [blendedAudio]);

  const handleSliderChange = (setting, value) => {
    setBlendSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const startBlending = async () => {
    if (!voiceRecording || !selectedTrack) return;
    
    setIsBlending(true);
    setBlendProgress(0);
    
    // Simulate AI blending process
    const blendSteps = [
      { step: 'Analyzing voice recording...', progress: 20 },
      { step: 'Processing background track...', progress: 40 },
      { step: 'Applying volume balance...', progress: 60 },
      { step: 'Adding fade effects...', progress: 80 },
      { step: 'Finalizing blend...', progress: 100 }
    ];
    
    for (const { step, progress } of blendSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setBlendProgress(progress);
    }
    
    // Create mock blended audio URL
    const mockBlendedUrl = voiceRecording; // In real app, this would be the actual blended audio
    setBlendedAudio(mockBlendedUrl);
    setIsBlending(false);
    
    if (onBlendComplete) {
      onBlendComplete(mockBlendedUrl);
    }
  };

  const togglePlayback = () => {
    if (!audioRef?.current || !blendedAudio) return;
    
    if (isPlaying) {
      audioRef?.current?.pause();
    } else {
      audioRef?.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!audioRef?.current || !duration) return;
    
    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const exportAudio = () => {
    if (!blendedAudio) return;
    
    // Create download link
    const link = document.createElement('a');
    link.href = blendedAudio;
    link.download = `voice-memory-${Date.now()}.wav`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const canBlend = voiceRecording && selectedTrack && !isBlending;
  const hasBlendedAudio = blendedAudio && !isBlending;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          AI Blending Workspace
        </h2>
        <p className="text-muted-foreground">
          Customize and blend your voice with the selected track
        </p>
      </div>
      {/* Prerequisites Check */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg border ${
          voiceRecording 
            ? 'border-success/20 bg-success/10' :'border-muted bg-muted/50'
        }`}>
          <div className="flex items-center space-x-3">
            <Icon 
              name={voiceRecording ? "CheckCircle" : "Circle"} 
              size={20} 
              className={voiceRecording ? "text-success" : "text-muted-foreground"} 
            />
            <div>
              <h4 className="font-medium text-foreground">Voice Recording</h4>
              <p className="text-sm text-muted-foreground">
                {voiceRecording ? 'Ready to blend' : 'Record your voice first'}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${
          selectedTrack 
            ? 'border-success/20 bg-success/10' :'border-muted bg-muted/50'
        }`}>
          <div className="flex items-center space-x-3">
            <Icon 
              name={selectedTrack ? "CheckCircle" : "Circle"} 
              size={20} 
              className={selectedTrack ? "text-success" : "text-muted-foreground"} 
            />
            <div>
              <h4 className="font-medium text-foreground">Background Track</h4>
              <p className="text-sm text-muted-foreground">
                {selectedTrack ? selectedTrack?.name : 'Select a track first'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Blending Controls */}
      {canBlend && (
        <div className="space-y-6 mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Blend Settings
          </h3>

          {/* Volume Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Voice Volume: {blendSettings?.voiceVolume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={blendSettings?.voiceVolume}
                onChange={(e) => handleSliderChange('voiceVolume', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Track Volume: {blendSettings?.trackVolume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={blendSettings?.trackVolume}
                onChange={(e) => handleSliderChange('trackVolume', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Fade Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fade In: {blendSettings?.fadeIn}s
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={blendSettings?.fadeIn}
                onChange={(e) => handleSliderChange('fadeIn', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fade Out: {blendSettings?.fadeOut}s
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={blendSettings?.fadeOut}
                onChange={(e) => handleSliderChange('fadeOut', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Blend Intensity */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Blend Intensity: {blendSettings?.blendIntensity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={blendSettings?.blendIntensity}
              onChange={(e) => handleSliderChange('blendIntensity', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher values create more seamless blending
            </p>
          </div>
        </div>
      )}
      {/* Blending Progress */}
      {isBlending && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              AI Blending in Progress...
            </span>
            <span className="text-sm text-muted-foreground">
              {blendProgress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${blendProgress}%` }}
            />
          </div>
        </div>
      )}
      {/* Blend Button */}
      {canBlend && !hasBlendedAudio && (
        <div className="text-center mb-6">
          <Button
            variant="default"
            size="lg"
            onClick={startBlending}
            disabled={isBlending}
            loading={isBlending}
            iconName="Zap"
            iconPosition="left"
            className="min-h-touch"
          >
            {isBlending ? 'Blending...' : 'Start AI Blending'}
          </Button>
        </div>
      )}
      {/* Audio Player */}
      {hasBlendedAudio && (
        <div className="bg-background rounded-xl p-6 border border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
            Your Blended Memory
          </h3>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={blendedAudio}
            onLoadedMetadata={() => setDuration(audioRef?.current?.duration || 0)}
            onTimeUpdate={() => setCurrentTime(audioRef?.current?.currentTime || 0)}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Progress Bar */}
          <div 
            className="w-full bg-muted rounded-full h-2 mb-4 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-100"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button
              variant="outline"
              size="lg"
              onClick={togglePlayback}
              iconName={isPlaying ? "Pause" : "Play"}
              iconPosition="left"
              className="min-h-touch"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>

            <Button
              variant="default"
              size="lg"
              onClick={exportAudio}
              iconName="Download"
              iconPosition="left"
              className="min-h-touch"
            >
              Export
            </Button>
          </div>

          {/* Success Message */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
            <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
            <p className="text-success font-medium">
              Your voice memory has been successfully blended!
            </p>
          </div>
        </div>
      )}
      {/* Instructions */}
      {!canBlend && (
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <Icon name="Info" size={32} className="text-muted-foreground mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-foreground mb-2">
            Ready to Create Magic?
          </h3>
          <p className="text-muted-foreground mb-4">
            Record your voice and select a background track to start blending
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Step 1: Record Voice</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-muted-foreground">Step 2: Choose Track</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted-foreground">Step 3: Blend</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlendingWorkspace;