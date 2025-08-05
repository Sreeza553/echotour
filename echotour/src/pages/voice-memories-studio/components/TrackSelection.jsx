import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrackSelection = ({ onTrackSelect, selectedTrack, isBlending }) => {
  const [playingTrack, setPlayingTrack] = useState(null);
  const audioRef = useRef(null);

  const lofiTracks = [
    {
      id: 1,
      name: "Sunset Beach Vibes",
      description: "Relaxing waves with gentle piano melodies",
      artwork: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock URL
      duration: "3:24",
      mood: "Peaceful"
    },
    {
      id: 2,
      name: "Mountain Morning",
      description: "Ambient forest sounds with soft guitar",
      artwork: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock URL
      duration: "4:12",
      mood: "Serene"
    },
    {
      id: 3,
      name: "City Night Jazz",
      description: "Urban ambience with smooth jazz undertones",
      artwork: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock URL
      duration: "5:08",
      mood: "Sophisticated"
    },
    {
      id: 4,
      name: "Tropical Paradise",
      description: "Island breeze with ukulele and birds",
      artwork: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock URL
      duration: "3:56",
      mood: "Joyful"
    },
    {
      id: 5,
      name: "Desert Meditation",
      description: "Warm winds with ethereal synth pads",
      artwork: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock URL
      duration: "6:15",
      mood: "Mystical"
    },
    {
      id: 6,
      name: "Rainy Day Comfort",
      description: "Gentle rain with warm acoustic guitar",
      artwork: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock URL
      duration: "4:33",
      mood: "Cozy"
    },
    {
      id: 7,
      name: "Aurora Dreams",
      description: "Cosmic ambience with dreamy synthesizers",
      artwork: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock URL
      duration: "7:22",
      mood: "Ethereal"
    },
    {
      id: 8,
      name: "Garden Sanctuary",
      description: "Nature sounds with soft flute melodies",
      artwork: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock URL
      duration: "5:41",
      mood: "Tranquil"
    }
  ];

  const handleTrackPlay = (track) => {
    if (playingTrack === track?.id) {
      // Stop current track
      if (audioRef?.current) {
        audioRef?.current?.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingTrack(null);
    } else {
      // Play new track
      if (audioRef?.current) {
        audioRef?.current?.pause();
      }
      
      // Create new audio element for demo purposes
      const audio = new Audio();
      audio.src = track?.audioUrl;
      audio.volume = 0.3;
      
      audio.onended = () => {
        setPlayingTrack(null);
      };
      
      audio.onerror = () => {
        console.log('Demo audio not available, simulating playback');
        // Simulate playback for demo
        setTimeout(() => {
          setPlayingTrack(null);
        }, 3000);
      };
      
      audioRef.current = audio;
      setPlayingTrack(track?.id);
      
      // For demo purposes, we'll just simulate playback
      audio?.play()?.catch(() => {
        console.log('Audio playback simulated for demo');
      });
    }
  };

  const handleTrackSelect = (track) => {
    if (onTrackSelect) {
      onTrackSelect(track);
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Choose Background Track
        </h2>
        <p className="text-muted-foreground">
          Select a lofi track to blend with your voice recording
        </p>
      </div>
      {/* Track Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {lofiTracks?.map((track) => (
          <div
            key={track?.id}
            className={`group relative bg-background rounded-xl border transition-all duration-300 hover:shadow-card cursor-pointer ${
              selectedTrack?.id === track?.id 
                ? 'border-primary shadow-primary ring-2 ring-primary/20' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleTrackSelect(track)}
          >
            {/* Track Artwork */}
            <div className="relative overflow-hidden rounded-t-xl">
              <Image
                src={track?.artwork}
                alt={track?.name}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  variant="default"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleTrackPlay(track);
                  }}
                  disabled={isBlending}
                  className="w-12 h-12 rounded-full shadow-lg"
                >
                  <Icon 
                    name={playingTrack === track?.id ? "Pause" : "Play"} 
                    size={20} 
                  />
                </Button>
              </div>

              {/* Playing Indicator */}
              {playingTrack === track?.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span>Playing</span>
                </div>
              )}

              {/* Selected Indicator */}
              {selectedTrack?.id === track?.id && (
                <div className="absolute top-2 left-2 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Icon name="Check" size={12} />
                  <span>Selected</span>
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading font-semibold text-foreground text-sm leading-tight">
                  {track?.name}
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {track?.duration}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {track?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs font-medium text-accent">
                    {track?.mood}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleTrackPlay(track);
                    }}
                    disabled={isBlending}
                    iconName={playingTrack === track?.id ? "Pause" : "Play"}
                    iconSize={14}
                  >
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Selection Status */}
      {selectedTrack ? (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={selectedTrack?.artwork}
                alt={selectedTrack?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-success mb-1">
                Selected: {selectedTrack?.name}
              </h4>
              <p className="text-sm text-success/80">
                Ready to blend with your voice recording
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="Music" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">
            Select a background track to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackSelection;