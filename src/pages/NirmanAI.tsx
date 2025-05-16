import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calculator, Construction, Gauge, HardHat, LucideIcon, MessageSquare, RefreshCw, User, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface NirmanAIProps {
  onLogoClick?: () => void;
}

// Property type options
const propertyTypeOptions = [
  { value: "apartment", label: "Apartment Building" },
  { value: "commercial", label: "Commercial Building" },
  { value: "duplex", label: "Duplex House" },
  { value: "villa", label: "Villa" },
  { value: "singlefamily", label: "Single Family House" },
];

// Location based pricing factors (multiplier)
const locationPriceFactors: Record<string, number> = {
  "Gulshan": 1.8,
  "Banani": 1.7,
  "Baridhara": 1.65,
  "Dhanmondi": 1.5,
  "Bashundhara": 1.3,
  "Uttara": 1.2,
  "Mirpur": 1.0,
  "Mohammadpur": 1.1,
  "Khilgaon": 0.9,
  "Rampura": 0.85,
  "Other": 0.8,
};

// Mock developers data
const mockDevelopers = [
  {
    id: 1,
    name: "BuildRight Developers Ltd.",
    specialty: ["Apartment", "Commercial"],
    rating: 4.8,
    completedProjects: 36,
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "MasterCraft Construction",
    specialty: ["Villa", "Duplex"],
    rating: 4.7,
    completedProjects: 42,
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Nirman Builders & Associates",
    specialty: ["Apartment", "Commercial", "Villa"],
    rating: 4.9,
    completedProjects: 51,
    image: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    name: "GreenLife Eco Builders",
    specialty: ["Sustainable", "Villa", "Apartment"],
    rating: 4.6,
    completedProjects: 28,
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const NirmanAI = ({ onLogoClick }: NirmanAIProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messageInput, setMessageInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState("property-nirman");
  
  // Property Nirman form state
  const [propertyType, setPropertyType] = useState<string>("");
  const [propertySize, setPropertySize] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bedroomsCount, setBedroomsCount] = useState<string>("3");
  const [bathroomsCount, setBathroomsCount] = useState<string>("3");
  const [floorCount, setFloorCount] = useState<string>("");
  const [luxuryLevel, setLuxuryLevel] = useState<string>("standard");
  const [hasBasement, setHasBasement] = useState(false);
  const [hasGarage, setHasGarage] = useState(false);
  const [hasElevator, setHasElevator] = useState(false);
  const [hasSolar, setHasSolar] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [hasSwimmingPool, setHasSwimmingPool] = useState(false);
  const [hasGym, setHasGym] = useState(false);
  const [hasBbqArea, setHasBbqArea] = useState(false);
  
  // Results
  const [costEstimate, setCostEstimate] = useState<any>(null);
  const [recommendedDevelopers, setRecommendedDevelopers] = useState<any[]>([]);
  const [timeEstimate, setTimeEstimate] = useState<string>("");
  
  // Generate cost estimate
  const generateCostEstimate = () => {
    setIsProcessing(true);
    
    // Perform validation
    if (!propertyType || !propertySize || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields before generating an estimate.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }
    
    setTimeout(() => {
      // Base costs per square foot based on property type and luxury level
      const baseCostMap: Record<string, Record<string, number>> = {
        standard: {
          apartment: 3500,
          commercial: 4000,
          duplex: 4200,
          villa: 4500,
          singlefamily: 3800,
        },
        premium: {
          apartment: 5000,
          commercial: 6000,
          duplex: 6500,
          villa: 7000,
          singlefamily: 5500,
        },
        luxury: {
          apartment: 8000,
          commercial: 9500,
          duplex: 10000,
          villa: 12000,
          singlefamily: 9000,
        },
      };
      
      // Calculate base cost
      const size = parseInt(propertySize);
      const baseSquareFoot = baseCostMap[luxuryLevel][propertyType];
      const locationFactor = locationPriceFactors[location] || locationPriceFactors["Other"];
      
      let baseCost = size * baseSquareFoot * locationFactor;
      
      // Additional costs for features
      const additionalCosts = {
        basement: hasBasement ? size * 0.3 * baseSquareFoot : 0,
        garage: hasGarage ? 800000 : 0,
        elevator: hasElevator ? 1500000 * (parseInt(floorCount) || 1) : 0,
        solar: hasSolar ? 1200000 : 0,
        garden: hasGarden ? 500000 : 0,
        swimmingPool: hasSwimmingPool ? 3000000 : 0,
        gym: hasGym ? 1000000 : 0,
        bbqArea: hasBbqArea ? 300000 : 0,
      };
      
      const totalAdditionalCosts = Object.values(additionalCosts).reduce((sum, cost) => sum + cost, 0);
      const totalCost = baseCost + totalAdditionalCosts;
      
      // Cost breakdown
      const costBreakdown = {
        structural: totalCost * 0.45,
        finishes: totalCost * 0.25,
        electrical: totalCost * 0.1,
        plumbing: totalCost * 0.08,
        hvac: totalCost * 0.07,
        site_work: totalCost * 0.05,
      };
      
      // Time estimate based on property type and size
      const baseMonths = {
        apartment: 18,
        commercial: 24,
        duplex: 12,
        villa: 14,
        singlefamily: 10,
      };
      
      const sizeFactor = Math.ceil(size / 1000); // Every 1000 sqft adds time
      let timeInMonths = baseMonths[propertyType] + sizeFactor;
      
      // Adjust for complexity
      if (hasBasement) timeInMonths += 2;
      if (hasElevator) timeInMonths += 1;
      if (hasSwimmingPool) timeInMonths += 2;
      if (parseInt(floorCount) > 5) timeInMonths += parseInt(floorCount) - 5;
      
      // Set results
      setCostEstimate({
        totalCost,
        costPerSquareFoot: totalCost / size,
        breakdown: costBreakdown,
        additionalCosts,
      });
      
      setTimeEstimate(`${timeInMonths} months`);
      
      // Filter and sort developers based on property type
      const filteredDevelopers = mockDevelopers.filter(dev => 
        dev.specialty.some(s => s.toLowerCase() === propertyType || 
        s.toLowerCase() === luxuryLevel)
      );
      
      filteredDevelopers.sort((a, b) => b.rating - a.rating);
      setRecommendedDevelopers(filteredDevelopers);
      
      setIsProcessing(false);
      setStep(2);
    }, 2500);
  };
  
  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return `৳${(num / 10000000).toFixed(2)} Crore`;
    } else if (num >= 100000) {
      return `৳${(num / 100000).toFixed(2)} Lac`;
    } else {
      return `৳${num.toFixed(2)}`;
    }
  };
  
  const resetForm = () => {
    setStep(1);
    setPropertyType("");
    setPropertySize("");
    setLocation("");
    setBedroomsCount("3");
    setBathroomsCount("3");
    setFloorCount("");
    setLuxuryLevel("standard");
    setHasBasement(false);
    setHasGarage(false);
    setHasElevator(false);
    setHasSolar(false);
    setHasGarden(false);
    setHasSwimmingPool(false);
    setHasGym(false);
    setHasBbqArea(false);
    setCostEstimate(null);
    setRecommendedDevelopers([]);
    setTimeEstimate("");
  };
  
  // Function to navigate to ROI calculator with cost estimate data
  const goToRoiCalculator = () => {
    if (costEstimate) {
      // Navigate to ROI calculator with cost estimate data as state
      navigate('/roi-calculator', {
        state: {
          propertyValue: costEstimate.totalCost,
          propertyType,
          location,
          propertySize,
          fromNirmanAI: true
        }
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={onLogoClick} />
      
      <main className="flex-grow py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-nirman-gold p-3 rounded-full">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Nirman AI Property Builder
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Plan your dream property, get accurate cost estimates, and connect with trusted developers
              </p>
            </div>
            
            <Tabs 
              defaultValue="property-nirman" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="grid grid-cols-1 w-full">
                <TabsTrigger value="property-nirman">
                  <Construction className="mr-2 h-4 w-4" />
                  Property Nirman
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="property-nirman">
                <Card className="mt-4">
                  <CardHeader>
                    <Badge className="mb-2 w-fit bg-nirman-gold text-white hover:bg-nirman-gold/90">
                      Step {step} of 2
                    </Badge>
                    <CardTitle>
                      {step === 1 ? "Property Details & Requirements" : "Cost Estimation & Developers"}
                    </CardTitle>
                    <CardDescription>
                      {step === 1 
                        ? "Fill in the details of your dream property to get cost estimates" 
                        : "Review the cost breakdown and connect with developers"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {step === 1 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="propertyType">Property Type <span className="text-red-500">*</span></Label>
                            <Select value={propertyType} onValueChange={setPropertyType}>
                              <SelectTrigger id="propertyType">
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                              <SelectContent>
                                {propertyTypeOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="propertySize">Size (sq. ft) <span className="text-red-500">*</span></Label>
                            <Input 
                              id="propertySize" 
                              type="number"
                              placeholder="e.g. 1800"
                              value={propertySize}
                              onChange={(e) => setPropertySize(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                            <Select value={location} onValueChange={setLocation}>
                              <SelectTrigger id="location">
                                <SelectValue placeholder="Select area" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(locationPriceFactors).map(loc => (
                                  <SelectItem key={loc} value={loc}>
                                    {loc}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="floorCount">Number of Floors</Label>
                            <Input 
                              id="floorCount" 
                              type="number"
                              placeholder="e.g. 2"
                              value={floorCount}
                              onChange={(e) => setFloorCount(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="bedroomsCount">Bedrooms</Label>
                            <Select value={bedroomsCount} onValueChange={setBedroomsCount}>
                              <SelectTrigger id="bedroomsCount">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bathroomsCount">Bathrooms</Label>
                            <Select value={bathroomsCount} onValueChange={setBathroomsCount}>
                              <SelectTrigger id="bathroomsCount">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="luxuryLevel">Quality Level</Label>
                            <Select value={luxuryLevel} onValueChange={setLuxuryLevel}>
                              <SelectTrigger id="luxuryLevel">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="luxury">Luxury</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Label>Additional Features</Label>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="basement" 
                                checked={hasBasement} 
                                onCheckedChange={setHasBasement as any} 
                              />
                              <Label htmlFor="basement" className="cursor-pointer">Basement</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="garage" 
                                checked={hasGarage} 
                                onCheckedChange={setHasGarage as any} 
                              />
                              <Label htmlFor="garage" className="cursor-pointer">Garage</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="elevator" 
                                checked={hasElevator} 
                                onCheckedChange={setHasElevator as any} 
                              />
                              <Label htmlFor="elevator" className="cursor-pointer">Elevator</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="solar" 
                                checked={hasSolar} 
                                onCheckedChange={setHasSolar as any} 
                              />
                              <Label htmlFor="solar" className="cursor-pointer">Solar Panels</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="garden" 
                                checked={hasGarden} 
                                onCheckedChange={setHasGarden as any} 
                              />
                              <Label htmlFor="garden" className="cursor-pointer">Garden Area</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="swimming-pool" 
                                checked={hasSwimmingPool} 
                                onCheckedChange={setHasSwimmingPool as any} 
                              />
                              <Label htmlFor="swimming-pool" className="cursor-pointer">Swimming Pool</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="gym" 
                                checked={hasGym} 
                                onCheckedChange={setHasGym as any} 
                              />
                              <Label htmlFor="gym" className="cursor-pointer">Gym</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="bbq-area" 
                                checked={hasBbqArea} 
                                onCheckedChange={setHasBbqArea as any} 
                              />
                              <Label htmlFor="bbq-area" className="cursor-pointer">BBQ Area</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {costEstimate && (
                          <>
                            <div className="bg-nirman-cream p-4 rounded-lg">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    Estimated Total Cost
                                  </h3>
                                  <p className="text-muted-foreground text-sm">
                                    Based on your project specifications
                                  </p>
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-nirman-gold mt-2 md:mt-0">
                                  {formatNumber(costEstimate.totalCost)}
                                </div>
                              </div>
                              
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                  <h4 className="text-sm font-medium">
                                    Cost per square foot
                                  </h4>
                                </div>
                                <div className="font-medium mt-1 md:mt-0">
                                  {formatNumber(costEstimate.costPerSquareFoot)} / sq.ft
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-3">Cost Breakdown</h3>
                              
                              <div className="space-y-2">
                                {Object.entries(costEstimate.breakdown).map(([key, value]: [string, any]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-muted-foreground capitalize">
                                      {key.replace('_', ' ')}
                                    </span>
                                    <span className="font-medium">
                                      {formatNumber(value)} 
                                      <span className="text-xs text-muted-foreground ml-1">
                                        ({Math.round((value / costEstimate.totalCost) * 100)}%)
                                      </span>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-2">Project Timeline</h3>
                              <div className="flex items-center">
                                <Gauge className="h-5 w-5 text-nirman-gold mr-2" />
                                <span>
                                  Estimated completion time: <strong>{timeEstimate}</strong>
                                </span>
                              </div>
                            </div>
                            
                            {/* ROI Calculator Button */}
                            <div className="bg-nirman-cream p-4 rounded-lg">
                              <div className="flex flex-col md:flex-row justify-between items-center">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    Calculate Return on Investment
                                  </h3>
                                  <p className="text-muted-foreground text-sm">
                                    See how your investment in this property will perform over time
                                  </p>
                                </div>
                                <Button 
                                  className="bg-nirman-gold hover:bg-nirman-gold/90 mt-3 md:mt-0"
                                  onClick={goToRoiCalculator}
                                >
                                  <Calculator className="h-4 w-4 mr-2" />
                                  Calculate ROI
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-4">Recommended Developers</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recommendedDevelopers.length > 0 ? (
                                  recommendedDevelopers.map(developer => (
                                    <div key={developer.id} className="border rounded-lg p-4 flex">
                                      <div 
                                        className="w-16 h-16 rounded-full bg-cover bg-center mr-4"
                                        style={{ backgroundImage: `url(${developer.image})` }}
                                      />
                                      <div>
                                        <h4 className="font-medium">{developer.name}</h4>
                                        <div className="flex items-center text-sm mt-1">
                                          <span className="flex items-center mr-3">
                                            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {developer.rating}
                                          </span>
                                          <span className="flex items-center">
                                            <HardHat className="w-4 h-4 mr-1" />
                                            {developer.completedProjects} projects
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                          {developer.specialty.map((spec: string) => (
                                            <Badge key={spec} variant="secondary" className="text-xs">
                                              {spec}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-span-2 text-center py-8 text-muted-foreground">
                                    No matching developers found for your project specifications
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3">
                    {step === 2 ? (
                      <>
                        <Button variant="outline" onClick={resetForm}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Start New Estimate
                        </Button>
                      </>
                    ) : (
                      <Button 
                        className="bg-nirman-gold hover:bg-nirman-gold/90"
                        onClick={generateCostEstimate}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="animate-spin mr-2">
                              <RefreshCw className="h-4 w-4" />
                            </span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Generate Estimate
                          </>
                        )}
                      </Button>
                    )}
                  </CardFooter>
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
