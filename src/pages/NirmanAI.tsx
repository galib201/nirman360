
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AIUserPreference, BuildingCostBreakdown, Property, PropertyBuildingRequest, TrustedDeveloper } from "@/models";
import { PropertyService, PropertyBuildingService } from "@/services/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, Zap, Construction, Phone, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PropertyCard from "@/components/PropertyCard";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const NirmanAI = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'property-finder';

  // Property Finder States
  const [currentStep, setCurrentStep] = useState(0); // Starting with step 0 for initial choice
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
    purpose: "buy", // Default, will be set by user in first step
    lifestyle: "family",
    amenities: []
  });

  // Property Nirman States
  const [buildingStep, setBuildingStep] = useState(0);
  const [buildingRequest, setBuildingRequest] = useState<PropertyBuildingRequest>({
    buildingType: "house",
    landArea: 1800,
    floors: 2,
    location: "Dhaka",
    luxuryLevel: "standard",
    timeframe: 12,
    roomRequirements: {
      bedrooms: 3,
      bathrooms: 2,
      additionalRooms: []
    },
    specialRequirements: []
  });
  const [buildingLoading, setBuildingLoading] = useState(false);
  const [costBreakdown, setCostBreakdown] = useState<BuildingCostBreakdown | null>(null);

  // Effect to handle direct URL parameters for tabs
  useEffect(() => {
    if (initialTab === 'property-nirman') {
      document.getElementById('property-nirman-tab')?.click();
    }
  }, [initialTab]);

  // For Property Finder (first feature) -----------------------------
  // Step 0: Choose purpose (buy or rent)
  const renderPurposeSelection = () => (
    <div className="space-y-8">
      <div className="bg-gradient-premium text-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Welcome to Nirman AI</h2>
        <p>I'll help you find the perfect property based on your preferences.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">What are you looking for?</h2>
        
        <div className="grid grid-cols-2 gap-6 mt-4">
          <Button 
            size="lg" 
            className="h-40 flex flex-col items-center justify-center gap-2 text-lg"
            onClick={() => {
              setPreferences({...preferences, purpose: "buy"});
              setCurrentStep(1);
            }}
          >
            <span className="text-4xl">🏠</span>
            Buy a Property
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="h-40 flex flex-col items-center justify-center gap-2 text-lg border-2"
            onClick={() => {
              setPreferences({...preferences, purpose: "rent"});
              setCurrentStep(1);
            }}
          >
            <span className="text-4xl">🔑</span>
            Rent a Property
          </Button>
        </div>
      </div>
    </div>
  );

  // Step 1: Budget and location
  const renderStep1 = () => (
    <div className="space-y-6">
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
                defaultValue={[0, 50]} 
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
                defaultValue={[0, 50000]} 
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
      
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Preferred locations?</h2>
        <p className="text-sm text-muted-foreground">Select one or more areas</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Gulshan", "Banani", "Dhanmondi", "Uttara", "Mohakhali", "Mirpur", "Baridhara"].map(location => (
            <Button 
              key={location} 
              variant={preferences.location.includes(location) ? "default" : "outline"} 
              onClick={() => {
                const selectedLocations = preferences.location;
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
              }}
              className="justify-start"
            >
              {preferences.location.includes(location) && <CheckCircle className="mr-2 h-4 w-4" />}
              {location}
            </Button>
          ))}
        </div>
      </div>
      
      <Button onClick={() => setCurrentStep(2)} className="w-full">Next</Button>
    </div>
  );
  
  // Step 2: Property type and bedrooms - different based on buy/rent
  const renderStep2 = () => {
    // Property type options differ based on purpose
    const propertyTypeOptions = preferences.purpose === "buy" 
      ? ["apartment", "house", "villa"] 
      : ["apartment", "house", "room", "commercial"];
    
    const propertyTypeLabels: {[key: string]: string} = {
      "apartment": "Apartment",
      "house": "House",
      "villa": "Villa",
      "room": "Room",
      "commercial": "Commercial Space"
    };
    
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Property type?</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {propertyTypeOptions.map(type => (
              <Button 
                key={type} 
                variant={preferences.propertyType.includes(type) ? "default" : "outline"}
                onClick={() => {
                  const selectedTypes = preferences.propertyType;
                  if (selectedTypes.includes(type)) {
                    setPreferences({
                      ...preferences,
                      propertyType: selectedTypes.filter(t => t !== type)
                    });
                  } else {
                    setPreferences({
                      ...preferences,
                      propertyType: [...selectedTypes, type]
                    });
                  }
                }}
                className="justify-start"
              >
                {preferences.propertyType.includes(type) && <CheckCircle className="mr-2 h-4 w-4" />}
                {propertyTypeLabels[type]}
              </Button>
            ))}
          </div>
          
          {preferences.purpose === "buy" || preferences.propertyType.some(t => t !== "commercial") ? (
            <div className="pt-4">
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
          ) : null}
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
          <Button onClick={() => setCurrentStep(3)}>Next</Button>
        </div>
      </div>
    );
  };
  
  // Step 3: Lifestyle and amenities - different based on buy/rent
  const renderStep3 = () => {
    // Lifestyle options differ based on purpose
    const lifestyleOptions = preferences.purpose === "buy"
      ? [
          { value: 'family', label: 'Family' },
          { value: 'professional', label: 'Working Professional' },
          { value: 'student', label: 'Student' },
        ]
      : [
          { value: 'bachelor', label: 'Bachelor/Single' },
          { value: 'family', label: 'Family' },
          { value: 'professional', label: 'Working Professional' },
          { value: 'student', label: 'Student' }
        ];
    
    // Amenity options differ based on purpose
    const amenityOptions = preferences.purpose === "buy"
      ? [
          { value: 'parking', label: 'Parking Space' },
          { value: 'garden', label: 'Garden/Outdoor Space' },
          { value: 'securitySystem', label: 'Security System' },
          { value: 'petFriendly', label: 'Pet Friendly' }
        ]
      : [
          { value: 'furnished', label: 'Furnished' },
          { value: 'parking', label: 'Parking Space' },
          { value: 'securitySystem', label: 'Security System' },
          { value: 'petFriendly', label: 'Pet Friendly' },
          { value: 'bachelorsAllowed', label: 'Bachelors Allowed' }
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
                {preferences.lifestyle === option.value && <CheckCircle className="mr-2 h-4 w-4" />}
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
  
  // Results view - with different messaging based on buy/rent
  const renderResults = () => (
    <div className="space-y-6">
      <div className="bg-gradient-premium text-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">
          {preferences.purpose === "buy" 
            ? "Your Dream Home Matches" 
            : "Your Perfect Rental Matches"}
        </h2>
        <p>
          {preferences.purpose === "buy"
            ? "Nirman AI has analyzed your preferences and found these properties that match your home buying criteria."
            : "Nirman AI has found these rental properties based on your specific requirements."}
        </p>
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
          <Button onClick={() => setCurrentStep(0)}>Start Over</Button>
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
        <Button onClick={() => setCurrentStep(0)}>Start a New Search</Button>
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
      
      toast.success(`Nirman AI has found ${preferences.purpose === "buy" ? "properties" : "rentals"} matching your preferences!`);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // For Property Nirman (second feature) -----------------------------
  // Step 0: Choose building type
  const renderBuildingTypeSelection = () => (
    <div className="space-y-8">
      <div className="bg-gradient-premium text-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Welcome to Property Nirman</h2>
        <p>I'll help you plan your dream property and connect you with the best developers in Bangladesh.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">What type of property do you want to build?</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <Button 
            className="h-32 flex flex-col items-center justify-center gap-2"
            variant={buildingRequest.buildingType === "house" ? "default" : "outline"}
            onClick={() => setBuildingRequest({...buildingRequest, buildingType: "house"})}
          >
            <span className="text-2xl">🏠</span>
            House
          </Button>
          
          <Button 
            className="h-32 flex flex-col items-center justify-center gap-2"
            variant={buildingRequest.buildingType === "apartment" ? "default" : "outline"}
            onClick={() => setBuildingRequest({...buildingRequest, buildingType: "apartment"})}
          >
            <span className="text-2xl">🏢</span>
            Apartment Building
          </Button>

          <Button 
            className="h-32 flex flex-col items-center justify-center gap-2"
            variant={buildingRequest.buildingType === "duplex" ? "default" : "outline"}
            onClick={() => setBuildingRequest({...buildingRequest, buildingType: "duplex"})}
          >
            <span className="text-2xl">🏘️</span>
            Duplex
          </Button>

          <Button 
            className="h-32 flex flex-col items-center justify-center gap-2"
            variant={buildingRequest.buildingType === "villa" ? "default" : "outline"}
            onClick={() => setBuildingRequest({...buildingRequest, buildingType: "villa"})}
          >
            <span className="text-2xl">🏯</span>
            Villa
          </Button>

          <Button 
            className="h-32 flex flex-col items-center justify-center gap-2"
            variant={buildingRequest.buildingType === "commercial" ? "default" : "outline"}
            onClick={() => setBuildingRequest({...buildingRequest, buildingType: "commercial"})}
          >
            <span className="text-2xl">🏪</span>
            Commercial
          </Button>
        </div>

        <div className="pt-8 text-center">
          <Button onClick={() => setBuildingStep(1)} className="w-48">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Step 1: Size, location, luxury level
  const renderBuildingBasicInfo = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Basic Property Information</h2>
        <p className="text-sm text-muted-foreground">Tell us about your land and location</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Land Area (sq. ft)</label>
            <Input 
              type="number"
              value={buildingRequest.landArea}
              onChange={e => setBuildingRequest({...buildingRequest, landArea: Number(e.target.value)})}
              min={100}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Floors</label>
            <Select 
              value={buildingRequest.floors.toString()} 
              onValueChange={value => setBuildingRequest({...buildingRequest, floors: Number(value)})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select floors" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(floors => (
                  <SelectItem key={floors} value={floors.toString()}>
                    {floors} {floors === 1 ? 'floor' : 'floors'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <label className="text-sm font-medium">Location</label>
          <Select 
            value={buildingRequest.location} 
            onValueChange={value => setBuildingRequest({...buildingRequest, location: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Cox's Bazar", "Barisal", "Rangpur", "Mymensingh"].map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-sm font-medium">Quality & Finishing</label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={buildingRequest.luxuryLevel === "standard" ? "default" : "outline"}
              className="flex flex-col h-20 text-xs"
              onClick={() => setBuildingRequest({...buildingRequest, luxuryLevel: "standard"})}
            >
              <span className="text-sm font-medium mb-1">Standard</span>
              <span className="text-muted-foreground">Basic quality</span>
            </Button>

            <Button
              variant={buildingRequest.luxuryLevel === "premium" ? "default" : "outline"}
              className="flex flex-col h-20 text-xs"
              onClick={() => setBuildingRequest({...buildingRequest, luxuryLevel: "premium"})}
            >
              <span className="text-sm font-medium mb-1">Premium</span>
              <span className="text-muted-foreground">High quality</span>
            </Button>

            <Button
              variant={buildingRequest.luxuryLevel === "luxury" ? "default" : "outline"}
              className="flex flex-col h-20 text-xs"
              onClick={() => setBuildingRequest({...buildingRequest, luxuryLevel: "luxury"})}
            >
              <span className="text-sm font-medium mb-1">Luxury</span>
              <span className="text-muted-foreground">Top quality</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setBuildingStep(0)}>Back</Button>
        <Button onClick={() => setBuildingStep(2)}>Next</Button>
      </div>
    </div>
  );

  // Step 2: Room requirements and additional features
  const renderBuildingDetailedInfo = () => {
    // Only show room configuration for non-commercial buildings
    const isResidential = buildingRequest.buildingType !== "commercial";

    const additionalRoomOptions = [
      { value: "homeOffice", label: "Home Office" },
      { value: "gym", label: "Gym Room" },
      { value: "library", label: "Library" },
      { value: "storageRoom", label: "Storage Room" },
      { value: "gameRoom", label: "Game Room" },
      { value: "homeTheater", label: "Home Theater" },
    ];

    const specialRequirementOptions = [
      { value: "swimmingPool", label: "Swimming Pool" },
      { value: "roofGarden", label: "Roof Garden" },
      { value: "solarPanels", label: "Solar Panels" },
      { value: "rainwaterHarvesting", label: "Rainwater Harvesting" },
      { value: "smartHome", label: "Smart Home Systems" },
      { value: "elevator", label: "Elevator" },
      { value: "fireplace", label: "Fireplace" },
      { value: "securitySystem", label: "Advanced Security System" },
    ];

    const toggleAdditionalRoom = (room: string) => {
      if (!buildingRequest.roomRequirements) {
        setBuildingRequest({
          ...buildingRequest,
          roomRequirements: { bedrooms: 2, bathrooms: 2, additionalRooms: [room] }
        });
        return;
      }

      const currentRooms = buildingRequest.roomRequirements.additionalRooms || [];
      
      if (currentRooms.includes(room)) {
        setBuildingRequest({
          ...buildingRequest,
          roomRequirements: {
            ...buildingRequest.roomRequirements,
            additionalRooms: currentRooms.filter(r => r !== room)
          }
        });
      } else {
        setBuildingRequest({
          ...buildingRequest,
          roomRequirements: {
            ...buildingRequest.roomRequirements,
            additionalRooms: [...currentRooms, room]
          }
        });
      }
    };

    const toggleSpecialRequirement = (req: string) => {
      const currentReqs = buildingRequest.specialRequirements || [];
      
      if (currentReqs.includes(req)) {
        setBuildingRequest({
          ...buildingRequest,
          specialRequirements: currentReqs.filter(r => r !== req)
        });
      } else {
        setBuildingRequest({
          ...buildingRequest,
          specialRequirements: [...currentReqs, req]
        });
      }
    };

    return (
      <div className="space-y-6">
        {isResidential && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Room Requirements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bedrooms</label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, "6+"].map(num => (
                    <Button
                      key={num}
                      variant={buildingRequest.roomRequirements?.bedrooms === (num === "6+" ? 6 : Number(num)) ? "default" : "outline"}
                      onClick={() => setBuildingRequest({
                        ...buildingRequest,
                        roomRequirements: {
                          ...(buildingRequest.roomRequirements || { additionalRooms: [], bathrooms: 2 }),
                          bedrooms: num === "6+" ? 6 : Number(num)
                        }
                      })}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bathrooms</label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, "6+"].map(num => (
                    <Button
                      key={num}
                      variant={buildingRequest.roomRequirements?.bathrooms === (num === "6+" ? 6 : Number(num)) ? "default" : "outline"}
                      onClick={() => setBuildingRequest({
                        ...buildingRequest,
                        roomRequirements: {
                          ...(buildingRequest.roomRequirements || { additionalRooms: [], bedrooms: 3 }),
                          bathrooms: num === "6+" ? 6 : Number(num)
                        }
                      })}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium">Additional Rooms</label>
              <p className="text-xs text-muted-foreground">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                {additionalRoomOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={(buildingRequest.roomRequirements?.additionalRooms || []).includes(option.value) ? "default" : "outline"}
                    onClick={() => toggleAdditionalRoom(option.value)}
                    className="justify-start"
                    size="sm"
                  >
                    {(buildingRequest.roomRequirements?.additionalRooms || []).includes(option.value) && 
                      <CheckCircle className="mr-2 h-3 w-3" />}
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Special Requirements & Features</h2>
          <p className="text-sm text-muted-foreground">Select any special features you want</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
            {specialRequirementOptions.map(option => (
              <Button
                key={option.value}
                variant={(buildingRequest.specialRequirements || []).includes(option.value) ? "default" : "outline"}
                onClick={() => toggleSpecialRequirement(option.value)}
                className="justify-start"
                size="sm"
              >
                {(buildingRequest.specialRequirements || []).includes(option.value) && 
                  <CheckCircle className="mr-1 h-3 w-3" />}
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h2 className="text-xl font-semibold">Estimated Budget</h2>
          <p className="text-sm text-muted-foreground">
            If you have a specific budget in mind, enter it below. Otherwise, we'll provide a cost estimation.
          </p>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget (BDT)</label>
            <Input 
              type="number"
              placeholder="Optional"
              value={buildingRequest.budget || ''}
              onChange={e => setBuildingRequest({
                ...buildingRequest, 
                budget: e.target.value ? Number(e.target.value) : undefined
              })}
              min={1000000}
            />
            <p className="text-xs text-muted-foreground">Leave empty for our AI to calculate based on your requirements</p>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setBuildingStep(1)}>Back</Button>
          <Button 
            onClick={handleCalculateBuildingCost} 
            disabled={buildingLoading}
            className="bg-nirman-gold hover:bg-nirman-gold/90"
          >
            {buildingLoading ? "Calculating..." : "Calculate Building Cost"} 
            <Construction className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Results view for building cost breakdown
  const renderBuildingResults = () => {
    if (!costBreakdown) return null;

    const formatCurrency = (amount: number) => {
      if (amount >= 10000000) {
        return `${(amount / 10000000).toFixed(2)} Crore BDT`;
      } else if (amount >= 100000) {
        return `${(amount / 100000).toFixed(2)} Lac BDT`;
      } else {
        return `${amount.toLocaleString()} BDT`;
      }
    };

    const totalCostInCrores = (costBreakdown.totalCost / 10000000).toFixed(2);
    const costPerSqFt = Math.round(costBreakdown.totalCost / buildingRequest.landArea);
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-premium text-white p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Your Property Building Plan</h2>
          <p>
            Based on your requirements, we've created a detailed building plan with cost breakdown and
            recommended developers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Property Cost Breakdown</CardTitle>
                <CardDescription>
                  Estimated costs for building a {buildingRequest.floors}-floor {buildingRequest.buildingType} 
                  in {buildingRequest.location} ({buildingRequest.landArea} sq. ft)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-xl">Total Cost:</span>
                  <span className="font-semibold text-xl text-nirman-gold">{formatCurrency(costBreakdown.totalCost)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Per Square Foot:</span>
                  <span>{costPerSqFt.toLocaleString()} BDT</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Cost Distribution</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Land Cost</span>
                        <span>{formatCurrency(costBreakdown.landCost)}</span>
                      </div>
                      <Progress value={Math.round((costBreakdown.landCost / costBreakdown.totalCost) * 100)} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Materials</span>
                        <span>{formatCurrency(costBreakdown.materialCost)}</span>
                      </div>
                      <Progress value={Math.round((costBreakdown.materialCost / costBreakdown.totalCost) * 100)} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Labor</span>
                        <span>{formatCurrency(costBreakdown.laborCost)}</span>
                      </div>
                      <Progress value={Math.round((costBreakdown.laborCost / costBreakdown.totalCost) * 100)} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Finishing</span>
                        <span>{formatCurrency(costBreakdown.finishingCost)}</span>
                      </div>
                      <Progress value={Math.round((costBreakdown.finishingCost / costBreakdown.totalCost) * 100)} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Electrical & Plumbing</span>
                        <span>{formatCurrency(costBreakdown.electricalPlumbingCost)}</span>
                      </div>
                      <Progress value={Math.round((costBreakdown.electricalPlumbingCost / costBreakdown.totalCost) * 100)} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Design & Permit</span>
                        <span>{formatCurrency(costBreakdown.designCost + costBreakdown.permitCost)}</span>
                      </div>
                      <Progress value={Math.round(((costBreakdown.designCost + costBreakdown.permitCost) / costBreakdown.totalCost) * 100)} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Miscellaneous</span>
                        <span>{formatCurrency(costBreakdown.miscCost)}</span>
                      </div>
                      <Progress value={Math.round((costBreakdown.miscCost / costBreakdown.totalCost) * 100)} />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Project Timeline</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded-md p-3">
                      <div className="text-xs text-muted-foreground">Planning & Approvals</div>
                      <div className="font-medium">{costBreakdown.timeline.planning} months</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-xs text-muted-foreground">Foundation Work</div>
                      <div className="font-medium">{costBreakdown.timeline.foundation} months</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-xs text-muted-foreground">Structure Construction</div>
                      <div className="font-medium">{costBreakdown.timeline.structure} months</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-xs text-muted-foreground">Finishing & Handover</div>
                      <div className="font-medium">{costBreakdown.timeline.finishing} months</div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="bg-muted/30">
                      Total Duration: {costBreakdown.timeline.total} months
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Recommended Developers</h3>
            <p className="text-muted-foreground">
              We've matched your requirements with these top-rated developers specializing in {buildingRequest.buildingType} construction in {buildingRequest.location}.
            </p>
            
            <div className="space-y-4">
              {costBreakdown.recommendedDevelopers.map((developer) => (
                <Card key={developer.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-32 md:h-full">
                        <img 
                          src={developer.image} 
                          alt={developer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">{developer.name}</h4>
                          <div className="flex items-center text-amber-500">
                            <Star className="fill-amber-500 h-4 w-4 mr-1" />
                            <span>{developer.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {developer.completedProjects} completed projects • Est. {developer.establishedYear}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {developer.specializations.slice(0, 2).map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" /> Call
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" /> Email
                          </Button>
                          <Button size="sm" className="flex items-center">
                            <ExternalLink className="h-3 w-3 mr-1" /> View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-nirman-cream rounded-lg p-4">
              <h4 className="font-medium mb-2">Next Steps</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Schedule a consultation with any of our recommended developers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Download your detailed property plan and cost breakdown
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Get financing options through our partner banks
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setBuildingStep(0)} variant="outline" className="mr-2">
            Start New Plan
          </Button>
          <Button className="bg-nirman-gold hover:bg-nirman-gold/90">
            Download Property Plan
          </Button>
        </div>
      </div>
    );
  };

  const handleCalculateBuildingCost = async () => {
    try {
      setBuildingLoading(true);
      
      // In a real app, this would be an API call to a backend service
      // Here we're using our mock service
      const result = await PropertyBuildingService.calculateBuildingCost(buildingRequest);
      setCostBreakdown(result);
      setBuildingStep(3);
      
      toast.success("Your property building plan is ready!");
    } catch (error) {
      console.error('Error calculating building costs:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBuildingLoading(false);
    }
  };
  
  const renderCurrentBuildingStep = () => {
    switch (buildingStep) {
      case 0: return renderBuildingTypeSelection();
      case 1: return renderBuildingBasicInfo();
      case 2: return renderBuildingDetailedInfo();
      case 3: return renderBuildingResults();
      default: return renderBuildingTypeSelection();
    }
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderPurposeSelection();
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderResults();
      default: return renderPurposeSelection();
    }
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = () => {
    if (currentStep === 0) return 0;
    if (currentStep === 4) return 100;
    return (currentStep / 3) * 100;
  };

  // Building progress percentage
  const buildingProgressPercentage = () => {
    if (buildingStep === 0) return 0;
    if (buildingStep === 3) return 100;
    return (buildingStep / 3) * 100;
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
            
            <Tabs defaultValue="property-finder" id="nirman-ai-tabs">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="property-finder">Find Property</TabsTrigger>
                <TabsTrigger value="property-nirman" id="property-nirman-tab">
                  <Construction className="mr-2 h-4 w-4" /> 
                  Property Nirman
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="property-finder">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {currentStep === 0 
                        ? "Find Your Perfect Property" 
                        : currentStep === 4 
                          ? "Your Personalized Matches" 
                          : preferences.purpose === "buy" 
                            ? "Find Your Dream Home" 
                            : "Find Your Ideal Rental"}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === 0 
                        ? "Tell us what you're looking for and our AI will find the best matches for you" 
                        : currentStep === 4 
                          ? "Our AI has selected these properties based on your preferences" 
                          : "Tell us your preferences and we'll find the perfect match"}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {currentStep > 0 && currentStep < 4 && (
                      <div className="mb-6">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300 ease-in-out"
                            style={{ width: `${progressPercentage()}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Step {currentStep} of 3</span>
                          <span>
                            {currentStep === 1 ? "Budget & Location" : 
                             currentStep === 2 ? "Property Details" : 
                             "Lifestyle & Amenities"}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {renderCurrentStep()}
                  </CardContent>
                  
                  {currentStep > 0 && currentStep < 4 && (
                    <CardFooter className="flex justify-between border-t px-6 py-4">
                      <div className="text-sm text-muted-foreground">
                        {preferences.purpose === "buy" ? "Home buying journey" : "Rental search"}
                      </div>
                      {currentStep < 3 ? (
                        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(currentStep + 1)}>
                          Skip this step
                        </Button>
                      ) : null}
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="property-nirman">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Construction className="mr-2 h-5 w-5 text-nirman-gold" />
                      {buildingStep === 0 
                        ? "Build Your Dream Property" 
                        : buildingStep === 3 
                          ? "Your Property Building Plan" 
                          : "Property Nirman"}
                    </CardTitle>
                    <CardDescription>
                      {buildingStep === 0 
                        ? "Plan your construction project with our AI and get connected with trusted developers" 
                        : buildingStep === 3 
                          ? "Review your cost breakdown and recommended developers" 
                          : "Tell us about your requirements and we'll create a detailed building plan"}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {buildingStep > 0 && buildingStep < 3 && (
                      <div className="mb-6">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-nirman-gold transition-all duration-300 ease-in-out"
                            style={{ width: `${buildingProgressPercentage()}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Step {buildingStep} of 3</span>
                          <span>
                            {buildingStep === 1 ? "Basic Information" : 
                             buildingStep === 2 ? "Detailed Requirements" : ""}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {renderCurrentBuildingStep()}
                  </CardContent>
                  
                  {buildingStep > 0 && buildingStep < 3 && (
                    <CardFooter className="flex justify-between border-t px-6 py-4">
                      <div className="text-sm text-muted-foreground">
                        Property building plan
                      </div>
                      {buildingStep < 2 ? (
                        <Button variant="ghost" size="sm" onClick={() => setBuildingStep(buildingStep + 1)}>
                          Skip this step
                        </Button>
                      ) : null}
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NirmanAI;
