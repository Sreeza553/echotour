import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AuthModal from '../../components/ui/AuthModal';
import RecordingControls from './components/RecordingControls';
import TrackSelection from './components/TrackSelection';
import BlendingWorkspace from './components/BlendingWorkspace';
import Icon from '../../components/AppIcon';

const VoiceMemoriesStudio = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [voiceRecording, setVoiceRecording] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [blendedAudio, setBlendedAudio] = useState(null);
  const [isBlending, setIsBlending] = useState(false);

  useEffect(() => {
    // Check for existing auth state
    const savedAuth = localStorage.getItem('echoTour_auth');
    const savedUser = localStorage.getItem('echoTour_user');
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = (authData) => {
    setIsAuthenticated(true);
    setUser(authData?.user);
    
    // Save auth state
    localStorage.setItem('echoTour_auth', 'true');
    localStorage.setItem('echoTour_user', JSON.stringify(authData?.user));
    
    setShowAuthModal(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear auth state
    localStorage.removeItem('echoTour_auth');
    localStorage.removeItem('echoTour_user');
    
    // Clear session data
    setVoiceRecording(null);
    setSelectedTrack(null);
    setBlendedAudio(null);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      handleSignOut();
    } else {
      setShowAuthModal(true);
    }
  };

  const handleRecordingComplete = (audioUrl, audioBlob) => {
    setVoiceRecording(audioUrl);
    // Clear previous blend when new recording is made
    setBlendedAudio(null);
  };

  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
    // Clear previous blend when new track is selected
    setBlendedAudio(null);
  };

  const handleBlendComplete = (blendedUrl) => {
    setBlendedAudio(blendedUrl);
  };

  const resetWorkspace = () => {
    setVoiceRecording(null);
    setSelectedTrack(null);
    setBlendedAudio(null);
    setIsBlending(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick}
        user={user}
      />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-mesh py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Icon name="Mic" size={20} className="text-white" />
                <span className="text-white font-medium">Voice Memories Studio</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
                Capture Your Travel
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Voice Memories
                </span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                Record your thoughts, blend them with ambient sounds, and create personalized soundtracks that capture the essence of your travel experiences.
              </p>

              {/* Quick Stats */}
              <div className="flex items-center justify-center space-x-8 text-white/80">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm">Lofi Tracks</div>
                </div>
                <div className="w-px h-8 bg-white/30" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">AI</div>
                  <div className="text-sm">Blending</div>
                </div>
                <div className="w-px h-8 bg-white/30" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">∞</div>
                  <div className="text-sm">Memories</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb />
          </div>
        </section>

        {/* Studio Workspace */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Workspace Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Your Creative Studio
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Follow the three simple steps to create your personalized travel soundtrack
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                voiceRecording ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
              }`}>
                <Icon name={voiceRecording ? "CheckCircle" : "Mic"} size={16} />
                <span className="text-sm font-medium">Record Voice</span>
              </div>
              
              <div className="w-8 h-px bg-border" />
              
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                selectedTrack ? 'bg-success/20 text-success' : voiceRecording ?'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={selectedTrack ? "CheckCircle" : "Music"} size={16} />
                <span className="text-sm font-medium">Choose Track</span>
              </div>
              
              <div className="w-8 h-px bg-border" />
              
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                blendedAudio ? 'bg-success/20 text-success' : (voiceRecording && selectedTrack) ?'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={blendedAudio ? "CheckCircle" : "Zap"} size={16} />
                <span className="text-sm font-medium">AI Blend</span>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-8">
              <RecordingControls
                onRecordingComplete={handleRecordingComplete}
                isBlending={isBlending}
              />
              
              <TrackSelection
                onTrackSelect={handleTrackSelect}
                selectedTrack={selectedTrack}
                isBlending={isBlending}
              />
              
              <BlendingWorkspace
                voiceRecording={voiceRecording}
                selectedTrack={selectedTrack}
                onBlendComplete={handleBlendComplete}
                isBlending={isBlending}
                setIsBlending={setIsBlending}
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="space-y-8">
                <RecordingControls
                  onRecordingComplete={handleRecordingComplete}
                  isBlending={isBlending}
                />
              </div>
              
              <div className="space-y-8">
                <TrackSelection
                  onTrackSelect={handleTrackSelect}
                  selectedTrack={selectedTrack}
                  isBlending={isBlending}
                />
              </div>
              
              <div className="space-y-8">
                <BlendingWorkspace
                  voiceRecording={voiceRecording}
                  selectedTrack={selectedTrack}
                  onBlendComplete={handleBlendComplete}
                  isBlending={isBlending}
                  setIsBlending={setIsBlending}
                />
              </div>
            </div>

            {/* Reset Workspace */}
            {(voiceRecording || selectedTrack || blendedAudio) && (
              <div className="text-center mt-12">
                <button
                  onClick={resetWorkspace}
                  disabled={isBlending}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="RotateCcw" size={18} />
                  <span>Reset Workspace</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
                Studio Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional-grade tools for creating memorable travel soundtracks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "Mic",
                  title: "High-Quality Recording",
                  description: "Crystal clear voice capture with real-time audio level monitoring"
                },
                {
                  icon: "Music",
                  title: "Curated Lofi Tracks",
                  description: "8 professionally crafted ambient tracks for every travel mood"
                },
                {
                  icon: "Zap",
                  title: "AI-Powered Blending",
                  description: "Intelligent audio mixing that creates seamless soundscapes"
                },
                {
                  icon: "Download",
                  title: "Export & Share",
                  description: "Save your creations and share them with fellow travelers"
                }
              ]?.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-primary-hover transition-all duration-300 text-center group"
                >
                  <div className="w-12 h-12 bg-gradient-sunset rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon name={feature?.icon} size={24} color="white" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-sunset flex items-center justify-center">
                  <Icon name="Compass" size={20} color="white" />
                </div>
                <span className="text-xl font-heading font-bold">EchoTour</span>
              </div>
              <p className="text-background/70 mb-4">
                Creating memorable travel experiences through AI-powered personalization
              </p>
              <p className="text-background/50 text-sm">
                © {new Date()?.getFullYear()} EchoTour. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
        mode="signin"
      />
    </div>
  );
};

export default VoiceMemoriesStudio;