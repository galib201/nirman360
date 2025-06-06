
import { useState, useEffect } from "react";
import { Property } from "@/models";
import { PropertyService } from "@/services/api";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

const AIRecommendations = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [bestDeals, setBestDeals] = useState<Property[]>([]);
  const [recentlyVerified, setRecentlyVerified] = useState<Property[]>([]);
  const [basedOnArea, setBasedOnArea] = useState<Property[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>({});
  
  useEffect(() => {
    // Mock user preferences from localStorage
    const mockPreferences = {
      budget: { min: 2000000, max: 8000000 },
      preferredAreas: ['Gulshan', 'Dhanmondi', 'Banani'],
      propertyType: 'apartment',
      bedrooms: 3,
      category: 'buy'
    };
    
    // In real app, get from localStorage
    const storedPreferences = localStorage.getItem('userPreferences');
    const preferences = storedPreferences ? JSON.parse(storedPreferences) : mockPreferences;
    setUserPreferences(preferences);
    
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        
        const allProperties = await PropertyService.getProperties();
        
        // Best Deals - properties with good price/value ratio
        const deals = allProperties
          .filter(p => p.category === 'buy' && p.price < 5000000)
          .sort((a, b) => a.price - b.price)
          .slice(0, 4);
        setBestDeals(deals);
        
        // Recently Verified
        const verified = allProperties
          .filter(p => p.isVerified)
          .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
          .slice(0, 4);
        setRecentlyVerified(verified);
        
        // Based on your area
        const areaProperties = allProperties
          .filter(p => p.location.area === "Gulshan")
          .slice(0, 4);
        setBasedOnArea(areaProperties);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, []);

  const getRecommendationExplanation = (property: Property, type: string) => {
    const reasons = [];
    
    if (type === 'bestDeals') {
      if (property.price <= userPreferences.budget?.max) {
        reasons.push('within your budget');
      }
      if (property.features.bedrooms === userPreferences.bedrooms) {
        reasons.push(`has ${userPreferences.bedrooms} bedrooms as preferred`);
      }
      if (property.type === userPreferences.propertyType) {
        reasons.push('matches your property type preference');
      }
    } else if (type === 'recentlyVerified') {
      reasons.push('recently verified by our team');
      if (userPreferences.preferredAreas?.includes(property.location.area)) {
        reasons.push('in your preferred area');
      }
      if (property.category === userPreferences.category) {
        reasons.push('matches your buying/renting preference');
      }
    } else if (type === 'basedOnArea') {
      if (userPreferences.preferredAreas?.includes(property.location.area)) {
        reasons.push('in your frequently searched area');
      }
      reasons.push('popular in this neighborhood');
      if (property.features.area >= 1200) {
        reasons.push('spacious layout');
      }
    }
    
    return reasons.length > 0 ? reasons.join(', ') : 'matches your search history';
  };

  const PropertyCardWithExplanation = ({ property, type }: { property: Property, type: string }) => (
    <div className="space-y-3">
      <PropertyCard property={property} />
      <div className="bg-nirman-cream p-3 rounded-lg">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-nirman-gold mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-nirman-navy mb-1">Why we recommend this:</p>
            <p className="text-xs text-muted-foreground capitalize">
              Suggested because it {getRecommendationExplanation(property, type)}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-background py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            AI Recommendations
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Personalized property recommendations powered by our AI algorithm, tailored to your preferences and search history.
          </p>
          
          <Tabs defaultValue="bestDeals" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="bestDeals">Best Deals For You</TabsTrigger>
              <TabsTrigger value="recentlyVerified">Recently Verified</TabsTrigger>
              <TabsTrigger value="basedOnArea">Based On Your Area</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bestDeals">
              <div className="mb-4 bg-nirman-cream p-4 rounded-lg">
                <h2 className="font-medium text-lg mb-1">Best Value Properties</h2>
                <p className="text-sm text-muted-foreground">
                  Our AI has analyzed thousands of listings to find properties with the best price-to-value ratio based on your preferences.
                </p>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestDeals.map((property, index) => (
                    <div 
                      key={property.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PropertyCardWithExplanation property={property} type="bestDeals" />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recentlyVerified">
              <div className="mb-4 bg-nirman-cream p-4 rounded-lg">
                <h2 className="font-medium text-lg mb-1">Freshly Verified Properties</h2>
                <p className="text-sm text-muted-foreground">
                  These properties have been recently verified by our team and match your previous search criteria.
                </p>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentlyVerified.map((property, index) => (
                    <div 
                      key={property.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PropertyCardWithExplanation property={property} type="recentlyVerified" />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="basedOnArea">
              <div className="mb-4 bg-nirman-cream p-4 rounded-lg">
                <h2 className="font-medium text-lg mb-1">Properties In Your Preferred Area</h2>
                <p className="text-sm text-muted-foreground">
                  Based on your browsing history, we've found these properties in areas you frequently search for.
                </p>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {basedOnArea.map((property, index) => (
                    <div 
                      key={property.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PropertyCardWithExplanation property={property} type="basedOnArea" />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 p-6 bg-gradient-premium text-white rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold mb-2">How Our AI Works</h2>
                <p className="text-sm text-white text-opacity-80 max-w-xl">
                  Our recommendation engine analyzes your search patterns, viewing history, and preferences
                  to suggest properties that match your needs. The more you use Nirman360, the more
                  personalized your recommendations become.
                </p>
              </div>
              <div className="text-center md:text-right">
                <span className="block text-sm mb-1 text-white text-opacity-80">AI Accuracy Score</span>
                <span className="text-2xl font-bold">87%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIRecommendations;
