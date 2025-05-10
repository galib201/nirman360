
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AIUserPreference, Property } from "@/models";
import { PropertyService } from "@/services/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, Zap } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/PropertyCard";

const NirmanAI = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Property[]>([]);
  const [preferences, setPreferences] = useState<AIUserPreference>({
    budget: {
      min: 0,
      max: 5000000
    },
    location: [],
    propertyType: [],
    bedrooms: 2,
    purpose: "buy",
    lifestyle: "family",
    amenities: []
  });

  // Step 1: Choose purpose and budget
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">What are you looking for?</h2>
        <Tabs 
          defaultValue={preferences.purpose} 
          className="w-full"
          onValueChange={(value) => setPreferences({...preferences, purpose: value as "buy" | "rent"})}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="rent">Rent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">What is your budget?</h2>
        <div className="space-y-6 pt-2">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Budget Range</span>
              <span className="text-sm font-medium">
                {preferences.purpose === "buy" 
                  ? `${(preferences.budget.min/1000000).toFixed(1)} - ${(preferences.budget.max/1000000).toFixed(1)} Million BDT` 
                  : `${preferences.budget.min.toLocaleString()} - ${preferences.budget.max.toLocaleString()} BDT/month`}
              </span>
            </div>
            
            {preferences.purpose === "buy" ? (
              <Slider 
                defaultValue={[preferences.budget.min/1000000, preferences.budget.max/1000000]} 
                max={100} 
                step={1} 
                minStepsBetweenThumbs={1}
                onValueChange={(values) => {
                  setPreferences({
                    ...preferences,
                    budget: {
                      min: values[0] * 1000000,
                      max: values[1] * 1000000
                    }
                  });
                }}
              />
            ) : (
              <Slider 
                defaultValue={[preferences.budget.min, preferences.budget.max]} 
                max={100000} 
                step={1000} 
                minStepsBetweenThumbs={5000}
                onValueChange={(values) => {
                  setPreferences({
                    ...preferences,
                    budget: {
                      min: values[0],
                      max: values[1]
                    }
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
      
      <Button onClick={() => setCurrentStep(2)} className="w-full">Next</Button>
    </div>
  );
  
  // Step 2: Location and property type
  const renderStep2 = () => {
    const locationOptions = ["Gulshan", "Banani", "Dhanmondi", "Uttara", "Mohakhali", "Mirpur", "Baridhara"];
    const selectedLocations = preferences.location;
    
    const toggleLocation = (location: string) => {
      if (selectedLocations.includes(location)) {
        setPreferences({
          ...preferences,
          location: selectedLocations.filter(l => l !== location)
        });
      } else {
        setPreferences({
          ...preferences,
          location: [...selectedLocations, location]
        });
      }
    };
    
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Preferred locations?</h2>
          <p className="text-sm text-muted-foreground">Select one or more areas</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {locationOptions.map(location => (
              <Button 
                key={location} 
                variant={selectedLocations.includes(location) ? "default" : "outline"} 
                onClick={() => toggleLocation(location)}
                className="justify-start"
              >
                {selectedLocations.includes(location) && <CheckCircle className="mr-2 h-4 w-4" />}
                {location}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Property type?</h2>
          
          <Select 
            value={preferences.propertyType.join(',')} 
            onValueChange={(value) => setPreferences({...preferences, propertyType: value.split(',')})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="room">Room</SelectItem>
              <SelectItem value="commercial">Commercial Space</SelectItem>
              <SelectItem value="apartment,house">Apartment or House</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="pt-2">
            <label className="text-sm font-medium">Number of bedrooms</label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {[1, 2, 3, "4+"].map((num) => (
                <Button 
                  key={num} 
                  variant={preferences.bedrooms === (num === "4+" ? 4 : Number(num)) ? "default" : "outline"}
                  onClick={() => setPreferences({...preferences, bedrooms: num === "4+" ? 4 : Number(num)})}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
          <Button onClick={() => setCurrentStep(3)}>Next</Button>
        </div>
      </div>
    );
  };
  
  // Step 3: Lifestyle and amenities
  const renderStep3 = () => {
    const lifestyleOptions = [
      { value: 'bachelor', label: 'Bachelor/Single' },
      { value: 'family', label: 'Family' },
      { value: 'professional', label: 'Working Professional' },
      { value: 'student', label: 'Student' }
    ];
    
    const amenityOptions = [
      { value: 'furnished', label: 'Furnished' },
      { value: 'parking', label: 'Parking Space' },
      { value: 'garden', label: 'Garden/Outdoor Space' },
      { value: 'securitySystem', label: 'Security System' },
      { value: 'petFriendly', label: 'Pet Friendly' }
    ];
    
    const toggleAmenity = (amenity: string) => {
      if (preferences.amenities.includes(amenity)) {
        setPreferences({
          ...preferences,
          amenities: preferences.amenities.filter(a => a !== amenity)
        });
      } else {
        setPreferences({
          ...preferences,
          amenities: [...preferences.amenities, amenity]
        });
      }
    };
    
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">What's your lifestyle?</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {lifestyleOptions.map(option => (
              <Button 
                key={option.value} 
                variant={preferences.lifestyle === option.value ? "default" : "outline"}
                onClick={() => setPreferences({...preferences, lifestyle: option.value as any})}
                className="justify-start"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Must-have amenities?</h2>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {amenityOptions.map(option => (
              <Button 
                key={option.value} 
                variant={preferences.amenities.includes(option.value) ? "default" : "outline"}
                onClick={() => toggleAmenity(option.value)}
                className="justify-start"
              >
                {preferences.amenities.includes(option.value) && <CheckCircle className="mr-2 h-4 w-4" />}
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>Back</Button>
          <Button onClick={handleFindRecommendations} disabled={loading}>
            {loading ? "Finding matches..." : "Find My Perfect Property"} 
            <Zap className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  // Results view
  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-gradient-premium text-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Your Personalized Matches</h2>
        <p>Nirman AI has analyzed your preferences and found these properties specifically for you.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(property => (
          <div key={property.id} className="animate-fade-in">
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
      
      {results.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No exact matches found</h3>
          <p className="text-muted-foreground mb-6">We couldn't find properties that exactly match your criteria. Try adjusting your preferences.</p>
          <Button onClick={() => setCurrentStep(1)}>Start Over</Button>
        </div>
      )}
      
      <div className="bg-nirman-cream p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">How Nirman AI works</h3>
        <p className="text-sm text-muted-foreground">
          Our advanced AI algorithm analyzes thousands of listings and user behavior patterns to find properties
          that best match your specific needs and preferences. The more you interact with Nirman360,
          the better our recommendations become.
        </p>
      </div>
      
      <div className="text-center">
        <Button onClick={() => setCurrentStep(1)}>Start a New Search</Button>
      </div>
    </div>
  );
  
  const handleFindRecommendations = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call to an AI service
      // Here we're simulating with a delay and filtering our mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get properties that match the user preferences
      const filteredProperties = await PropertyService.getAIRecommendations(preferences);
      setResults(filteredProperties);
      setCurrentStep(4);
      
      toast.success("Nirman AI has found properties matching your preferences!");
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderResults();
      default: return renderStep1();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <Zap className="h-8 w-8 text-nirman-gold" />
              <h1 className="text-3xl md:text-4xl font-display font-semibold">Nirman AI</h1>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Find Your Perfect Property</CardTitle>
                <CardDescription>
                  Tell us what you're looking for and our AI will find the best matches for you
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {currentStep < 4 && (
                  <div className="flex justify-between items-center mb-6">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={`flex flex-col items-center ${currentStep === step ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                            ${currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                        >
                          {step}
                        </div>
                        <span className="text-xs hidden md:block">
                          {step === 1 ? 'Purpose & Budget' : 
                           step === 2 ? 'Location & Type' : 
                           'Lifestyle & Amenities'}
                        </span>
                      </div>
                    ))}
                    <div className="absolute left-0 right-0 h-[2px] bg-muted -z-10" />
                  </div>
                )}
                
                {renderCurrentStep()}
              </CardContent>
              
              {currentStep < 4 && (
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of 3
                  </div>
                  {currentStep < 3 ? (
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(currentStep + 1)}>
                      Skip this step
                    </Button>
                  ) : null}
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NirmanAI;
