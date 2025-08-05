import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AuthModal from '../../components/ui/AuthModal';
import PlaceSearchInput from './components/PlaceSearchInput';
import StoryCard from './components/StoryCard';
import InvalidDestinationModal from './components/InvalidDestinationModal';
import LoadingAnimation from './components/LoadingAnimation';
import StorySidebar from './components/StorySidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CulturalStorytelling = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [generatedStories, setGeneratedStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [invalidPlace, setInvalidPlace] = useState('');
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    // Check for existing auth state
    const savedAuth = localStorage.getItem('echoTour_auth');
    const savedUser = localStorage.getItem('echoTour_user');
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }

    // Load bookmarked stories
    const savedBookmarks = localStorage.getItem('echoTour_bookmarks');
    if (savedBookmarks) {
      setBookmarkedStories(JSON.parse(savedBookmarks));
    }
  }, []);

  const handleAuth = (authData) => {
    setIsAuthenticated(true);
    setUser(authData?.user);
    localStorage.setItem('echoTour_auth', 'true');
    localStorage.setItem('echoTour_user', JSON.stringify(authData?.user));
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('echoTour_auth');
    localStorage.removeItem('echoTour_user');
  };

  const generateMockStory = (destination) => {
    const stories = {
      "Paris": {
        destination: { name: "Paris", country: "France", type: "city" },
        readTime: 8,
        establishedYear: "3rd century BC",
        significance: "Cultural Capital",
        views: 15420,
        likes: 2340,
        quote: "Paris is always a good idea.",
        quoteSource: "Audrey Hepburn",
        overview: `Paris, the City of Light, stands as one of the world's most beloved destinations, where centuries of history blend seamlessly with modern sophistication. From its humble beginnings as a Celtic settlement called Lutetia to its rise as the capital of France, Paris has been shaped by Roman conquest, medieval growth, and revolutionary change.\n\nThe city's iconic landmarks tell the story of France itself - from the Gothic majesty of Notre-Dame Cathedral to the iron lattice of the Eiffel Tower, each monument represents a different era of Parisian evolution. The Seine River, which winds through the heart of the city, has been both witness and participant in this grand historical narrative.`,
        history: `Founded in the 3rd century BC by the Parisii, a Celtic tribe, Paris began as a modest settlement on the Île de la Cité. The Romans conquered the area in 52 BC, renaming it Lutetia and establishing it as an important trading post.\n\nDuring the medieval period, Paris emerged as the political and cultural center of France. The construction of Notre-Dame Cathedral in 1163 marked the beginning of the city's architectural golden age. The University of Paris, founded in 1150, established the city as a center of learning that attracted scholars from across Europe.\n\nThe French Revolution of 1789 transformed Paris into the epicenter of political change, with events like the storming of the Bastille forever altering the course of world history. The 19th century brought Baron Haussmann's grand urban redesign, creating the wide boulevards and elegant architecture that define modern Paris.`,
        culture: `Parisian culture is synonymous with sophistication, artistic expression, and intellectual discourse. The city has been home to countless artists, writers, and philosophers who have shaped Western culture. From the Impressionist painters who captured the city's changing light to the existentialist philosophers who debated in its cafés, Paris has always been a crucible of creativity.\n\nThe café culture of Paris is legendary - these establishments serve not just as places to enjoy coffee and conversation, but as informal salons where ideas are exchanged and friendships forged. The tradition of the flâneur, the leisurely observer of urban life, embodies the Parisian approach to experiencing the city.\n\nFashion and cuisine are integral to Parisian identity. The city's haute couture houses have set global fashion trends for centuries, while its culinary traditions - from neighborhood bistros to Michelin-starred restaurants - continue to influence gastronomy worldwide.`,
        traditions: `Parisian traditions reflect the city's deep appreciation for beauty, quality, and the art of living well. The daily ritual of visiting the local boulangerie for fresh bread is more than mere shopping - it's a social custom that connects neighbors and maintains community bonds.\n\nThe tradition of Sunday strolls through the city's parks and along the Seine embodies the Parisian philosophy of taking time to appreciate life's pleasures. Markets like those at Place des Vosges or Marché Saint-Germain continue centuries-old traditions of local commerce and social interaction.\n\nSeasonal celebrations in Paris blend religious heritage with secular joy. The Fête de la Musique in June transforms the entire city into a concert venue, while the Christmas markets bring warmth and light to the winter months. These traditions create a rhythm of life that connects modern Parisians to their historical roots.`,
        facts: `Paris is home to more than 130 museums and monuments, making it one of the world's greatest repositories of art and culture. The Louvre Museum, originally a royal palace, houses over 35,000 works of art, including the Mona Lisa and Venus de Milo.\n\nThe city's 20 arrondissements spiral outward from the center like a snail shell, a design that reflects centuries of organic growth. Each arrondissement has its own distinct character and local government, creating a city of neighborhoods within a metropolis.\n\nParis has more dog owners per capita than any other major city, and the famous green Wallace fountains, installed in the 1870s, still provide free drinking water throughout the city. The Paris Metro, opened in 1900, ensures that no point in the city is more than 500 meters from a station.`,
        highlights: [
          {
            title: "Architectural Marvel",
            description: "Home to Gothic, Renaissance, and modern architectural masterpieces spanning over 2,000 years"
          },
          {
            title: "Cultural Epicenter",
            description: "Birthplace of Impressionism and countless artistic movements that shaped world culture"
          },
          {
            title: "Culinary Capital",
            description: "Origin of haute cuisine and home to more Michelin-starred restaurants than any other city"
          },
          {
            title: "Literary Legacy",
            description: "Inspiration for countless writers from Hemingway to Hugo, with over 700 bookshops"
          }
        ]
      },
      "Rome": {
        destination: { name: "Rome", country: "Italy", type: "city" },
        readTime: 10,
        establishedYear: "753 BC",
        significance: "Eternal City",
        views: 18750,
        likes: 3120,
        quote: "All roads lead to Rome.",
        quoteSource: "Ancient Proverb",
        overview: `Rome, the Eternal City, stands as a living testament to over 2,800 years of continuous history. From its legendary founding by Romulus and Remus to its role as the capital of the Roman Empire and later the center of Christianity, Rome has been at the heart of Western civilization.\n\nWalking through Rome is like traveling through time itself. Ancient ruins stand alongside Renaissance palaces, while Baroque fountains grace medieval piazzas. The city's seven hills still define its geography, just as they did when the first settlements were established along the Tiber River.`,
        history: `According to legend, Rome was founded in 753 BC by Romulus, who became its first king after killing his twin brother Remus. Archaeological evidence suggests the area was inhabited much earlier, with settlements dating back to the 10th century BC.\n\nThe Roman Republic, established in 509 BC, grew from a small city-state to control the entire Mediterranean world. The transition to the Roman Empire under Augustus in 27 BC marked the beginning of the Pax Romana, a period of unprecedented peace and prosperity that lasted for over 200 years.\n\nAfter the fall of the Western Roman Empire in 476 AD, Rome became the spiritual center of Christianity. The papal states controlled the city for over a thousand years, commissioning magnificent churches, palaces, and artworks that still define the city's character today.`,
        culture: `Roman culture is built on layers of history, where ancient traditions blend with modern Italian life. The concept of 'la dolce vita' - the sweet life - embodies the Roman approach to enjoying life's pleasures, from leisurely meals to evening strolls through historic neighborhoods.\n\nThe tradition of the passeggiata, the evening walk, transforms Roman streets into social theaters where families, friends, and lovers gather to see and be seen. Piazzas serve as outdoor living rooms where Romans of all ages come together to socialize, debate, and celebrate.\n\nRoman cuisine reflects the city's history and character - simple, honest ingredients prepared with time-honored techniques. From carbonara to cacio e pepe, Roman dishes tell stories of the city's working-class roots and agricultural heritage.`,
        traditions: `Roman traditions are deeply rooted in both ancient customs and Catholic heritage. The celebration of Easter in Rome draws pilgrims from around the world, while local festivals like the Festa de' Noantri in Trastevere maintain neighborhood traditions that date back centuries.\n\nThe tradition of throwing coins into the Trevi Fountain ensures a return to Rome - a custom that generates over €1 million annually for local charities. Sunday family meals remain sacred, often lasting for hours and bringing together multiple generations.\n\nMarket culture thrives in Rome, with neighborhood markets like Campo de' Fiori and Testaccio serving as social hubs where Romans maintain connections to their food sources and community traditions.`,facts: `Rome contains more obelisks than Egypt, with 13 ancient Egyptian obelisks decorating the city's piazzas and churches. The Pantheon, built in 126 AD, remains the world's largest unreinforced concrete dome and is still in use as a church.\n\nThe city has over 900 churches, more than any other city in the world. Vatican City, entirely enclosed within Rome, is the world's smallest sovereign state at just 0.17 square miles.\n\nRome's Catacombs contain over 600 miles of underground tunnels where early Christians buried their dead. The city's famous fountains, including the Trevi Fountain, are supplied by aqueducts that have been providing fresh water for over 2,000 years.`,
        highlights: [
          {
            title: "Ancient Wonders",
            description: "Home to the Colosseum, Roman Forum, and countless archaeological treasures"
          },
          {
            title: "Religious Center",
            description: "Heart of the Catholic Church with St. Peter\'s Basilica and the Sistine Chapel"
          },
          {
            title: "Artistic Legacy",
            description: "Renaissance and Baroque masterpieces by Michelangelo, Bernini, and Caravaggio"
          },
          {
            title: "Living History",
            description: "A city where ancient ruins are part of daily life and modern culture"
          }
        ]
      }
    };

    return stories?.[destination?.name] || null;
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  const handleGenerateStory = async (place) => {
    if (place?.isInvalid) {
      setInvalidPlace(place?.name);
      setShowInvalidModal(true);
      return;
    }

    setIsLoading(true);
    setSelectedPlace(place);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const mockStory = generateMockStory(place);
      
      if (mockStory) {
        const storyWithId = {
          ...mockStory,
          id: Date.now(),
          generatedAt: new Date()?.toISOString()
        };
        
        setGeneratedStories(prev => [storyWithId, ...prev]);
        setActiveTab('current');
      } else {
        setInvalidPlace(place?.name);
        setShowInvalidModal(true);
      }
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmark = (story) => {
    const isBookmarked = bookmarkedStories?.some(s => s?.id === story?.id);
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedStories?.filter(s => s?.id !== story?.id);
    } else {
      updatedBookmarks = [...bookmarkedStories, story];
    }
    
    setBookmarkedStories(updatedBookmarks);
    localStorage.setItem('echoTour_bookmarks', JSON.stringify(updatedBookmarks));
  };

  const handleShare = async (story) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cultural Story: ${story?.destination?.name}`,
          text: `Discover the rich cultural heritage of ${story?.destination?.name}`,
          url: window.location?.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
      // You could show a toast notification here
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    handleGenerateStory(suggestion);
  };

  const handleDestinationSelect = (destination) => {
    const mockDestination = {
      id: destination?.id,
      name: destination?.name,
      country: destination?.country,
      type: destination?.type
    };
    handleGenerateStory(mockDestination);
  };

  const handleCategorySelect = (category) => {
    // This could filter stories by category in a real implementation
    console.log('Selected category:', category);
  };

  const isStoryBookmarked = (storyId) => {
    return bookmarkedStories?.some(s => s?.id === storyId);
  };

  const currentStories = generatedStories;
  const displayedStories = activeTab === 'current' ? currentStories : bookmarkedStories;

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
      />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <Breadcrumb />
              
              <div className="mt-8 mb-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Icon name="Sparkles" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">
                    AI-Powered Cultural Discovery
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-4">
                  Cultural
                  <span className="bg-gradient-sunset bg-clip-text text-transparent"> Storytelling</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover the rich historical narratives and cultural significance of destinations worldwide. 
                  Our AI storyteller weaves together centuries of history, traditions, and cultural insights.
                </p>
              </div>
            </div>

            {/* Search Input */}
            <PlaceSearchInput
              onPlaceSelect={handlePlaceSelect}
              onGenerateStory={handleGenerateStory}
              isLoading={isLoading}
            />
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <LoadingAnimation destination={selectedPlace} />
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                  {displayedStories?.length > 0 ? (
                    <>
                      {/* Tab Navigation */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex space-x-1 bg-muted rounded-lg p-1">
                          <button
                            onClick={() => setActiveTab('current')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                              activeTab === 'current' ?'bg-background text-primary shadow-sm' :'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Generated Stories ({currentStories?.length})
                          </button>
                          <button
                            onClick={() => setActiveTab('bookmarked')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                              activeTab === 'bookmarked' ?'bg-background text-primary shadow-sm' :'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Bookmarked ({bookmarkedStories?.length})
                          </button>
                        </div>

                        {displayedStories?.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              iconName="Download"
                              iconSize={16}
                            >
                              Export All
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              iconName="Share2"
                              iconSize={16}
                            >
                              Share Collection
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Stories Grid */}
                      <div className="space-y-8">
                        {displayedStories?.map((story) => (
                          <StoryCard
                            key={story?.id}
                            story={story}
                            onBookmark={handleBookmark}
                            onShare={handleShare}
                            isBookmarked={isStoryBookmarked(story?.id)}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    /* Empty State */
                    (<div className="text-center py-16">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-sunset flex items-center justify-center mx-auto mb-6 shadow-primary">
                        <Icon name="BookOpen" size={40} color="white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                        {activeTab === 'current' ? 'No Stories Generated Yet' : 'No Bookmarked Stories'}
                      </h3>
                      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        {activeTab === 'current' ?'Search for a destination above to discover its rich cultural heritage and historical significance.' :'Bookmark your favorite stories to access them quickly and build your personal collection.'
                        }
                      </p>
                      {activeTab === 'bookmarked' && (
                        <Button
                          variant="default"
                          onClick={() => setActiveTab('current')}
                          iconName="ArrowLeft"
                          iconPosition="left"
                          iconSize={16}
                        >
                          Generate Stories
                        </Button>
                      )}
                    </div>)
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:block">
                  <StorySidebar
                    relatedDestinations={[]}
                    storyCategories={[]}
                    onDestinationSelect={handleDestinationSelect}
                    onCategorySelect={handleCategorySelect}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
        mode="signin"
      />
      <InvalidDestinationModal
        isOpen={showInvalidModal}
        onClose={() => setShowInvalidModal(false)}
        searchedPlace={invalidPlace}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </div>
  );
};

export default CulturalStorytelling;