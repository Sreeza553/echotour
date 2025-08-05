import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AuthModal from '../../components/ui/AuthModal';
import DestinationInput from './components/DestinationInput';
import TripDurationSelector from './components/TripDurationSelector';
import AccommodationInput from './components/AccommodationInput';
import ItineraryGenerator from './components/ItineraryGenerator';
import ItineraryResults from './components/ItineraryResults';
import LoadingAnimation from './components/LoadingAnimation';
import Icon from '../../components/AppIcon';

const SmartTravelPlanner = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const [formData, setFormData] = useState({
    destination: '',
    duration: { preset: '', custom: '' },
    accommodation: { type: 'hotel', name: '' }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      setUser(null);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = (authData) => {
    setIsAuthenticated(true);
    setUser(authData?.user);
    setShowAuthModal(false);
  };

  const handleDestinationChange = (destination) => {
    setFormData(prev => ({ ...prev, destination }));
    if (errors?.destination) {
      setErrors(prev => ({ ...prev, destination: '' }));
    }
  };

  const handleDurationChange = (duration) => {
    setFormData(prev => ({ ...prev, duration }));
    if (errors?.duration) {
      setErrors(prev => ({ ...prev, duration: '' }));
    }
  };

  const handleAccommodationChange = (accommodation) => {
    setFormData(prev => ({ ...prev, accommodation }));
    if (errors?.accommodation) {
      setErrors(prev => ({ ...prev, accommodation: '' }));
    }
  };

  const generateMockItinerary = (data) => {
    const duration = parseInt(data?.duration?.preset || data?.duration?.custom);
    const days = [];

    // Mock activities based on destination and preferences
    const mockActivities = {
      morning: [
        { name: "Local Market Visit", type: "culture", description: "Explore authentic local markets and street food", time: "09:00", duration: "2h", distance: "0.5 km", cost: "$15" },
        { name: "Historical Museum", type: "culture", description: "Discover the rich history and heritage", time: "09:30", duration: "2.5h", distance: "1.2 km", cost: "$20" },
        { name: "Sunrise Viewpoint", type: "nature", description: "Watch the sunrise from the best vantage point", time: "06:00", duration: "1.5h", distance: "3.2 km", cost: "Free" }
      ],
      afternoon: [
        { name: "Famous Landmark", type: "attraction", description: "Visit the most iconic attraction in the city", time: "14:00", duration: "3h", distance: "2.1 km", cost: "$25" },
        { name: "Local Restaurant", type: "restaurant", description: "Authentic cuisine experience", time: "13:00", duration: "1.5h", distance: "0.8 km", cost: "$30" },
        { name: "Art Gallery", type: "culture", description: "Contemporary and traditional art exhibitions", time: "15:00", duration: "2h", distance: "1.5 km", cost: "$18" }
      ],
      evening: [
        { name: "Sunset Cruise", type: "activity", description: "Relaxing boat ride with scenic views", time: "18:00", duration: "2h", distance: "4.5 km", cost: "$45" },
        { name: "Night Market", type: "shopping", description: "Shopping and street food adventure", time: "19:00", duration: "2.5h", distance: "1.8 km", cost: "$20" },
        { name: "Cultural Show", type: "entertainment", description: "Traditional music and dance performance", time: "20:00", duration: "1.5h", distance: "2.3 km", cost: "$35" }
      ]
    };

    for (let i = 0; i < duration; i++) {
      const dayActivities = [];
      
      // Add morning activity
      const morningActivity = mockActivities?.morning?.[i % mockActivities?.morning?.length];
      dayActivities?.push({ ...morningActivity });

      // Add afternoon activity
      const afternoonActivity = mockActivities?.afternoon?.[i % mockActivities?.afternoon?.length];
      dayActivities?.push({ ...afternoonActivity });

      // Add evening activity
      const eveningActivity = mockActivities?.evening?.[i % mockActivities?.evening?.length];
      dayActivities?.push({ ...eveningActivity });

      days?.push({
        activities: dayActivities,
        totalTime: "8-10 hours"
      });
    }

    return {
      destination: data?.destination,
      duration: duration,
      totalActivities: days?.reduce((total, day) => total + day?.activities?.length, 0),
      accommodation: data?.accommodation,
      preferences: data?.preferences,
      days: days,
      generatedAt: new Date()?.toISOString()
    };
  };

  const handleGenerateItinerary = async (data) => {
    setIsLoading(true);
    setShowResults(false);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const mockItinerary = generateMockItinerary(data);
      setGeneratedItinerary(mockItinerary);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModifyItinerary = () => {
    setShowResults(false);
    setGeneratedItinerary(null);
  };

  const handleSaveItinerary = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    // Mock save functionality
    alert('Itinerary saved to your account!');
  };

  const handleShareItinerary = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: `My ${generatedItinerary?.destination} Itinerary`,
        text: `Check out my ${generatedItinerary?.duration}-day trip to ${generatedItinerary?.destination}!`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Itinerary link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick}
        user={user}
      />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-mesh py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
                Smart Travel Planner
              </h1>
              <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
                Create AI-powered itineraries tailored to your preferences, destination, and travel style
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <LoadingAnimation destination={formData?.destination} />
            ) : showResults ? (
              <ItineraryResults
                itinerary={generatedItinerary}
                onModify={handleModifyItinerary}
                onSave={handleSaveItinerary}
                onShare={handleShareItinerary}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-5">
                  <div className="bg-card border border-border rounded-2xl shadow-card p-6 lg:p-8 sticky top-24">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-sunset flex items-center justify-center">
                        <Icon name="MapPin" size={24} color="white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-heading font-semibold text-foreground">
                          Plan Your Trip
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Tell us about your travel preferences
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <DestinationInput
                        value={formData?.destination}
                        onChange={handleDestinationChange}
                        error={errors?.destination}
                      />

                      <TripDurationSelector
                        value={formData?.duration}
                        onChange={handleDurationChange}
                        error={errors?.duration}
                      />

                      <AccommodationInput
                        value={formData?.accommodation}
                        onChange={handleAccommodationChange}
                        error={errors?.accommodation}
                      />
                    </div>
                  </div>
                </div>

                {/* Generator Section */}
                <div className="lg:col-span-7">
                  <div className="bg-card border border-border rounded-2xl shadow-card p-6 lg:p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                        <Icon name="Sparkles" size={24} color="white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-heading font-semibold text-foreground">
                          Customize Your Experience
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Set your preferences for the perfect itinerary
                        </p>
                      </div>
                    </div>

                    <ItineraryGenerator
                      formData={formData}
                      onGenerate={handleGenerateItinerary}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        {!showResults && !isLoading && (
          <section className="py-12 lg:py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4">
                  Why Choose Our AI Planner?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Experience the future of travel planning with our intelligent system
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: 'Brain',
                    title: 'AI-Powered Intelligence',
                    description: 'Advanced algorithms analyze millions of travel data points to create perfect itineraries'
                  },
                  {
                    icon: 'MapPin',
                    title: 'Location Optimization',
                    description: 'Smart routing starts from your accommodation and expands to nearby attractions efficiently'
                  },
                  {
                    icon: 'Clock',
                    title: 'Real-Time Updates',
                    description: 'Dynamic planning adjusts to weather, events, and local conditions for the best experience'
                  }
                ]?.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center mx-auto mb-4">
                      <Icon name={feature?.icon} size={28} color="white" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      {feature?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuthSuccess}
        mode="signin"
      />
    </div>
  );
};

export default SmartTravelPlanner;