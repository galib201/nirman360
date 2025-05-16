
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/models";
import { PropertyService } from "@/services/api";
import { 
  Building, 
  Map as MapIcon, 
  Search, 
  Check, 
  CheckSquare 
} from "lucide-react";

// Adding custom typing for Property with amenities and details needed by this component
interface ExtendedProperty extends Property {
  views?: number;
  amenities?: string[];
  details?: {
    bedrooms: number;
    [key: string]: any;
  };
}

const FindProperty = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("buy");
  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<ExtendedProperty[]>([]);
  const [recommendations, setRecommendations] = useState<ExtendedProperty[]>([]);
  
  // Form filters
  const [budget, setBudget] = useState<[number, number]>([1000000, 10000000]);
  const [minBudgetInput, setMinBudgetInput] = useState<string>("1000000");
  const [maxBudgetInput, setMaxBudgetInput] = useState<string>("10000000");
  const [minBedrooms, setMinBedrooms] = useState<string>("any");
  const [location, setLocation] = useState<string>("any");
  const [propertyType, setPropertyType] = useState<string>("any");
  
  // Lifestyle preferences (just for UI, not actually filtering in this demo)
  const [hasGym, setHasGym] = useState<boolean>(false);
  const [hasPool, setHasPool] = useState<boolean>(false);
  const [hasSecurity, setHasSecurity] = useState<boolean>(false);
  const [isPetFriendly, setIsPetFriendly] = useState<boolean>(false);
  const [hasGarden, setHasGarden] = useState<boolean>(false);
  
  const formatBudget = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)} Lac`;
    } else {
      return `${value.toLocaleString()} BDT`;
    }
  };

  // Update the slider when input values change
  const handleBudgetInputChange = () => {
    const minVal = parseInt(minBudgetInput) || budget[0];
    const maxVal = parseInt(maxBudgetInput) || budget[1];
    
    // Ensure minVal is not greater than maxVal
    const newMinVal = Math.min(minVal, maxVal);
    const newMaxVal = Math.max(minVal, maxVal);
    
    setBudget([newMinVal, newMaxVal]);
  };

  // Update the input fields when slider changes
  useEffect(() => {
    setMinBudgetInput(budget[0].toString());
    setMaxBudgetInput(budget[1].toString());
  }, [budget]);
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const allProperties = await PropertyService.getProperties();
        
        // Add required fields for type safety
        const extendedProperties = allProperties.map(prop => ({
          ...prop,
          views: prop.views || 0,
          amenities: prop.amenities || [],
          details: prop.details || { bedrooms: 2 }
        }));
        
        // Filter properties based on the active tab
        const filteredProperties = extendedProperties.filter(
          property => property.category === activeTab
        );
        
        setProperties(filteredProperties);
        
        // Create initial recommendations based on popularity
        const recommendedProperties = [...filteredProperties]
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 4);
        
        setRecommendations(recommendedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [activeTab]);
  
  const handleSearch = () => {
    setLoading(true);
    
    // Filter properties based on criteria
    const filtered = properties.filter(property => {
      const matchesBudget = property.price >= budget[0] && property.price <= budget[1];
      
      const matchesBedrooms = 
        minBedrooms === "any" || 
        ((property.details?.bedrooms || 0) >= parseInt(minBedrooms));
      
      const matchesLocation = 
        location === "any" || 
        (property.location && property.location.area.toLowerCase() === location.toLowerCase());
      
      const matchesPropertyType = 
        propertyType === "any" || 
        property.type.toLowerCase() === propertyType.toLowerCase();
      
      return matchesBudget && matchesBedrooms && matchesLocation && matchesPropertyType;
    });
    
    // Sort by most relevant
    const sorted = [...filtered].sort((a, b) => {
      // Prioritize verified properties
      if (a.isVerified && !b.isVerified) return -1;
      if (!a.isVerified && b.isVerified) return 1;
      
      // Then by feature match count (this would be more sophisticated in a real app)
      let aScore = 0;
      let bScore = 0;
      
      if (hasGym && (a.amenities || []).includes("Gym")) aScore++;
      if (hasGym && (b.amenities || []).includes("Gym")) bScore++;
      
      if (hasPool && (a.amenities || []).includes("Swimming Pool")) aScore++;
      if (hasPool && (b.amenities || []).includes("Swimming Pool")) bScore++;
      
      if (hasSecurity && (a.amenities || []).includes("24/7 Security")) aScore++;
      if (hasSecurity && (b.amenities || []).includes("24/7 Security")) bScore++;
      
      return bScore - aScore;
    });
    
    setRecommendations(sorted.slice(0, 8));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-semibold">
              Find Your Perfect Property
            </h1>
            <p className="text-muted-foreground mt-2">
              Tell us what you're looking for and we'll find properties that match your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1">
              <CardContent className="pt-6">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="rent">Rent</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2 mb-4">
                      <div>
                        <Label htmlFor="minBudget" className="text-xs text-muted-foreground">Min Budget</Label>
                        <Input
                          id="minBudget"
                          type="number"
                          value={minBudgetInput}
                          onChange={(e) => setMinBudgetInput(e.target.value)}
                          onBlur={handleBudgetInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxBudget" className="text-xs text-muted-foreground">Max Budget</Label>
                        <Input
                          id="maxBudget"
                          type="number"
                          value={maxBudgetInput}
                          onChange={(e) => setMaxBudgetInput(e.target.value)}
                          onBlur={handleBudgetInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <Slider
                        min={activeTab === "buy" ? 1000000 : 10000}
                        max={activeTab === "buy" ? 50000000 : 500000}
                        step={activeTab === "buy" ? 500000 : 5000}
                        value={budget}
                        onValueChange={(value: number[]) => setBudget([value[0], value[1]])}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{formatBudget(budget[0])}</span>
                        <span className="text-xs text-muted-foreground">{formatBudget(budget[1])}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Minimum Bedrooms</Label>
                    <Select value={minBedrooms} onValueChange={setMinBedrooms}>
                      <SelectTrigger id="bedrooms">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="Gulshan">Gulshan</SelectItem>
                        <SelectItem value="Banani">Banani</SelectItem>
                        <SelectItem value="Dhanmondi">Dhanmondi</SelectItem>
                        <SelectItem value="Bashundhara">Bashundhara</SelectItem>
                        <SelectItem value="Uttara">Uttara</SelectItem>
                        <SelectItem value="Mirpur">Mirpur</SelectItem>
                        <SelectItem value="Mohammadpur">Mohammadpur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger id="propertyType">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Lifestyle & Amenities</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gym" checked={hasGym} onCheckedChange={setHasGym as any} />
                        <label htmlFor="gym" className="text-sm cursor-pointer">Gym</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pool" checked={hasPool} onCheckedChange={setHasPool as any} />
                        <label htmlFor="pool" className="text-sm cursor-pointer">Swimming Pool</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="security" checked={hasSecurity} onCheckedChange={setHasSecurity as any} />
                        <label htmlFor="security" className="text-sm cursor-pointer">24/7 Security</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="petFriendly" checked={isPetFriendly} onCheckedChange={setIsPetFriendly as any} />
                        <label htmlFor="petFriendly" className="text-sm cursor-pointer">Pet Friendly</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="garden" checked={hasGarden} onCheckedChange={setHasGarden as any} />
                        <label htmlFor="garden" className="text-sm cursor-pointer">Garden/Terrace</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-nirman-gold hover:bg-nirman-gold/90"
                    onClick={handleSearch}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Find Properties
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="col-span-1 lg:col-span-2">
              <div className="mb-4 p-4 bg-nirman-cream rounded-lg flex items-center">
                <CheckSquare className="h-5 w-5 mr-2 text-nirman-gold" />
                <h2 className="font-medium">Recommended Properties for You</h2>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Building className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">
                    No properties match your criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
              
              {recommendations.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/properties?category=${activeTab}`)}
                  >
                    <MapIcon className="mr-2 h-4 w-4" />
                    View All {activeTab === "buy" ? "Properties for Sale" : "Rental Properties"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindProperty;
