import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MoodSelector from './components/MoodSelector';
import WeatherSelector from './components/WeatherSelector';
import RegionSelector from './components/RegionSelector';
import MusicPreferences from './components/MusicPreferences';
import PlaylistGenerator from './components/PlaylistGenerator';
import PlaylistDisplay from './components/PlaylistDisplay';
import AudioPlayer from './components/AudioPlayer';
import Icon from '../../components/AppIcon';

const MoodBasedMusicExperience = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    mood: '',
    weather: '',
    region: '',
    preferences: []
  });
  
  // Playlist state
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  // Mock playlist data
  const generateMockPlaylist = (mood, weather, region, preferences) => {
    // Working demo audio URLs (royalty-free and publicly accessible)
    const demoAudioUrls = [
      'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      'https://file-examples.com/storage/fe68c3d56f42e1b7555814b/2017/11/file_example_MP3_700KB.mp3',
      'https://samplelib.com/lib/preview/mp3/sample-3s.mp3',
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
      'https://file-examples.com/storage/fe68c3d56f42e1b7555814b/2017/11/file_example_MP3_1MG.mp3',
      'https://www.soundjay.com/misc/sounds/clock-ticking-3.mp3'
    ];

    const mockTracks = [
      {
        id: 1,
        title: "Wanderlust Dreams",
        artist: "Travel Beats",
        duration: 245,
        mood: mood,
        genre: preferences?.includes('instrumental') ? 'Instrumental' : 'Pop',
        audioUrl: demoAudioUrls?.[0],
        isFavorite: false
      },
      {
        id: 2,
        title: "Sunset Boulevard",
        artist: "Journey Sounds",
        duration: 198,
        mood: mood,
        genre: preferences?.includes('bollywood') ? 'Bollywood' : 'Electronic',
        audioUrl: demoAudioUrls?.[1],
        isFavorite: false
      },
      {
        id: 3,
        title: "Mountain Echoes",
        artist: "Nature Vibes",
        duration: 267,
        mood: mood,
        genre: preferences?.includes('instrumental') ? 'Instrumental' : 'Ambient',
        audioUrl: demoAudioUrls?.[2],
        isFavorite: false
      },
      {
        id: 4,
        title: "City Lights",
        artist: "Urban Melody",
        duration: 223,
        mood: mood,
        genre: preferences?.includes('hollywood') ? 'Pop' : 'Jazz',
        audioUrl: demoAudioUrls?.[3],
        isFavorite: false
      },
      {
        id: 5,
        title: "Ocean Breeze",
        artist: "Coastal Sounds",
        duration: 189,
        mood: mood,
        genre: preferences?.includes('mixed') ? 'World' : 'Chill',
        audioUrl: demoAudioUrls?.[4],
        isFavorite: false
      },
      {
        id: 6,
        title: "Desert Mirage",
        artist: "Exotic Rhythms",
        duration: 234,
        mood: mood,
        genre: preferences?.includes('bollywood') ? 'Bollywood' : 'World',
        audioUrl: demoAudioUrls?.[5],
        isFavorite: false
      }
    ];

    // Filter based on weather and add weather-specific tracks
    const weatherTracks = {
      sunny: [
        {
          id: 7,
          title: "Sunshine Vibes",
          artist: "Bright Beats",
          duration: 201,
          mood: mood,
          genre: 'Pop',
          audioUrl: demoAudioUrls?.[0],
          isFavorite: false
        }
      ],
      rainy: [
        {
          id: 8,
          title: "Raindrop Melody",
          artist: "Storm Sounds",
          duration: 256,
          mood: mood,
          genre: 'Ambient',
          audioUrl: demoAudioUrls?.[1],
          isFavorite: false
        }
      ],
      cloudy: [
        {
          id: 9,
          title: "Cloudy Skies",
          artist: "Mellow Tunes",
          duration: 178,
          mood: mood,
          genre: 'Chill',
          audioUrl: demoAudioUrls?.[2],
          isFavorite: false
        }
      ],
      snowy: [
        {
          id: 10,
          title: "Winter Wonderland",
          artist: "Frosty Melodies",
          duration: 243,
          mood: mood,
          genre: 'Classical',
          audioUrl: demoAudioUrls?.[3],
          isFavorite: false
        }
      ]
    };

    const combinedTracks = [...mockTracks, ...(weatherTracks?.[weather] || [])];
    return combinedTracks?.slice(0, 8); // Return 8 tracks
  };

  const handleMoodSelect = (mood) => {
    setFormData(prev => ({ ...prev, mood }));
  };

  const handleWeatherSelect = (weather) => {
    setFormData(prev => ({ ...prev, weather }));
  };

  const handleRegionSelect = (region) => {
    setFormData(prev => ({ ...prev, region }));
  };

  const handlePreferenceToggle = (preference, checked) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked
        ? [...prev?.preferences, preference]
        : prev?.preferences?.filter(p => p !== preference)
    }));
  };

  const handleGeneratePlaylist = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newPlaylist = generateMockPlaylist(
        formData?.mood,
        formData?.weather,
        formData?.region,
        formData?.preferences
      );
      
      setPlaylist(newPlaylist);
      setCurrentTrack(newPlaylist?.[0]);
    } catch (error) {
      console.error('Error generating playlist:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };

  const handleToggleFavorite = (trackId) => {
    setPlaylist(prev => 
      prev?.map(track => 
        track?.id === trackId 
          ? { ...track, isFavorite: !track?.isFavorite }
          : track
      )
    );
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    if (!isShuffled) {
      // Shuffle playlist
      const shuffled = [...playlist]?.sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
    }
  };

  const handleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const handleTrackChange = (track) => {
    setCurrentTrack(track);
  };

  const handlePlaylistEnd = () => {
    if (!isRepeating) {
      setCurrentTrack(null);
    }
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      setUser(null);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuth = (authData) => {
    setIsAuthenticated(true);
    setUser(authData?.user);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated}
        user={user}
        onAuthClick={handleAuthClick}
      />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-16 bg-gradient-mesh">
          <div className="absolute inset-0 bg-background/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <Breadcrumb />
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mt-4 mb-4">
                Mood-Based Music Experience
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create personalized travel soundtracks that match your mood, weather, and destination
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-sunset flex items-center justify-center shadow-card">
                      <Icon name="Settings" size={20} color="white" />
                    </div>
                    <h2 className="text-xl font-heading font-semibold text-foreground ml-3">
                      Customize Your Experience
                    </h2>
                  </div>

                  <div className="space-y-8">
                    <MoodSelector
                      selectedMood={formData?.mood}
                      onMoodSelect={handleMoodSelect}
                      disabled={isGenerating}
                    />

                    <WeatherSelector
                      selectedWeather={formData?.weather}
                      onWeatherSelect={handleWeatherSelect}
                      disabled={isGenerating}
                    />

                    <RegionSelector
                      selectedRegion={formData?.region}
                      onRegionSelect={handleRegionSelect}
                      disabled={isGenerating}
                    />

                    <MusicPreferences
                      selectedPreferences={formData?.preferences}
                      onPreferenceToggle={handlePreferenceToggle}
                      disabled={isGenerating}
                    />

                    <PlaylistGenerator
                      formData={formData}
                      onGeneratePlaylist={handleGeneratePlaylist}
                      isGenerating={isGenerating}
                      disabled={isGenerating}
                    />
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-8">
                {playlist?.length > 0 ? (
                  <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                      <PlaylistDisplay
                        playlist={playlist}
                        currentTrack={currentTrack}
                        onTrackSelect={handleTrackSelect}
                        onToggleFavorite={handleToggleFavorite}
                        onShuffle={handleShuffle}
                        onRepeat={handleRepeat}
                        isShuffled={isShuffled}
                        isRepeating={isRepeating}
                      />
                    </div>

                    <div className="bg-card border border-border rounded-2xl shadow-card">
                      <AudioPlayer
                        currentTrack={currentTrack}
                        playlist={playlist}
                        onTrackChange={handleTrackChange}
                        onPlaylistEnd={handlePlaylistEnd}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-2xl p-12 shadow-card text-center">
                    <div className="max-w-md mx-auto">
                      <div className="w-20 h-20 rounded-full bg-gradient-sunset flex items-center justify-center mx-auto mb-6 shadow-primary">
                        <Icon name="Music" size={40} color="white" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                        Ready to Create Your Playlist?
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Complete the form on the left to generate a personalized travel soundtrack that matches your mood and destination.
                      </p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success" />
                          <span>Mood-based curation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success" />
                          <span>Weather-adaptive</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success" />
                          <span>Region-specific</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                Why Choose Our Music Experience?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced AI algorithms create the perfect soundtrack for every moment of your journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: 'Brain',
                  title: 'AI-Powered',
                  description: 'Smart algorithms analyze your preferences'
                },
                {
                  icon: 'CloudRain',
                  title: 'Weather-Aware',
                  description: 'Music that matches the current weather'
                },
                {
                  icon: 'MapPin',
                  title: 'Location-Based',
                  description: 'Regional music styles and local favorites'
                },
                {
                  icon: 'Heart',
                  title: 'Mood-Matched',
                  description: 'Perfect vibes for every travel moment'
                }
              ]?.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-primary-hover transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-sunset flex items-center justify-center mx-auto mb-4 shadow-card">
                    <Icon name={feature?.icon} size={24} color="white" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MoodBasedMusicExperience;