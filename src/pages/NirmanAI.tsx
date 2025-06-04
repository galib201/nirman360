import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building, 
  Home, 
  Zap, 
  Loader2, 
  Send, 
  Calculator,
  Construction,
  Building2,
  Landmark,
  PenTool,
  Users,
  Banknote
} from "lucide-react";
import { toast } from "sonner";

// Enhanced mock AI service with Bangladesh-specific calculations
const mockAIResponse = (prompt: string, config?: any) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      // Bangladesh construction rates (BDT per sq ft)
      const bangladeshRates = {
        foundation: 800, // BDT per sq ft
        structure: 1200, // BDT per sq ft  
        finishes: 1000, // BDT per sq ft
        electrical: 200, // BDT per sq ft
        plumbing: 150, // BDT per sq ft
        lift: 2500000, // BDT per lift
        tiles: 300, // BDT per sq ft
        paint: 80, // BDT per sq ft
        doors: 25000, // BDT per door
        windows: 8000, // BDT per sq ft
        roofing: 400, // BDT per sq ft
      };

      // Location multipliers for Bangladesh
      const locationMultipliers = {
        gulshan: 1.5,
        banani: 1.4,
        dhanmondi: 1.3,
        bashundhara: 1.2,
        uttara: 1.1,
        mirpur: 1.0,
        chittagong: 0.9,
        sylhet: 0.8,
        rajshahi: 0.7,
      };

      const size = config?.totalArea || 1200;
      const floors = config?.floors || 1;
      const hasLift = config?.hasLift || false;
      const finishQuality = config?.finishQuality || 'standard';
      const location = config?.location || 'dhanmondi';
      
      const qualityMultiplier = {
        basic: 0.7,
        standard: 1.0,
        premium: 1.3,
        luxury: 1.8
      }[finishQuality];

      const locationMultiplier = locationMultipliers[location] || 1.0;
      
      // Calculate base construction cost
      const baseCost = size * (
        bangladeshRates.foundation * 0.15 +
        bangladeshRates.structure * 0.35 +
        bangladeshRates.finishes * 0.25 +
        bangladeshRates.electrical * 0.10 +
        bangladeshRates.plumbing * 0.08 +
        bangladeshRates.tiles * 0.05 +
        bangladeshRates.paint * 0.02
      );
      
      let totalCost = baseCost * qualityMultiplier * locationMultiplier;
      
      // Add lift cost if applicable
      if (hasLift) {
        totalCost += bangladeshRates.lift * floors;
      }
      
      // Calculate detailed material requirements
      const materialRequirements = {
        cement: Math.round(size * 2.5), // bags per sq ft
        steel: Math.round(size * 4), // kg per sq ft  
        bricks: Math.round(size * 45), // pieces per sq ft
        sand: Math.round(size * 1.2), // cft per sq ft
        aggregates: Math.round(size * 0.8), // cft per sq ft
        tiles: Math.round(size * 1.1), // sq ft
        paint: Math.round(size * 0.3), // liters
      };

      const response = {
        propertyType: config?.propertyType || "Apartment",
        location: location,
        totalArea: size,
        floors: floors,
        estimatedCost: Math.round(totalCost),
        recommendations: [
          `Use ${finishQuality} quality materials for optimal cost-performance`,
          hasLift ? "Install energy-efficient lift system to reduce operational costs" : "Consider adding lift for future convenience",
          `Location multiplier of ${locationMultiplier}x applied for ${location}`,
          `Estimated construction time: ${Math.ceil(size/100)} months for ${floors} floors`,
          "Include 10-15% contingency for material price fluctuations"
        ],
        costBreakdown: {
          foundation: Math.round(totalCost * 0.15),
          structure: Math.round(totalCost * 0.35),
          finishes: Math.round(totalCost * 0.25),
          electrical: Math.round(totalCost * 0.10),
          plumbing: Math.round(totalCost * 0.08),
          miscellaneous: Math.round(totalCost * 0.07),
        },
        materialRequirements,
        timeEstimate: {
          planning: "1-2 months",
          permits: "2-4 months", 
          foundation: `${Math.ceil(floors * 0.5)}-${Math.ceil(floors * 1)} months`,
          structure: `${Math.ceil(floors * 2)}-${Math.ceil(floors * 3)} months`,
          finishing: `${Math.ceil(floors * 1.5)}-${Math.ceil(floors * 2)} months`,
          total: `${Math.ceil(floors * 5)}-${Math.ceil(floors * 8)} months`
        },
        permits: [
          "Building Plan Approval from RAJUK/City Corporation",
          "Environmental Clearance (if applicable)",
          "Fire Safety Clearance", 
          "Utility Connections (Gas, Water, Electricity)",
          "Occupancy Certificate"
        ]
      };
      
      resolve(response);
    }, 3000);
  });
};

const NirmanAI = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    {
      role: "assistant",
      content: "Hello! I'm Nirman AI, your property building assistant. Describe the property you want to build, and I'll help you plan it, estimate costs, and connect you with trusted developers."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [aiResults, setAIResults] = useState<any>(null);
  
  // Enhanced property configuration state
  const [propertyType, setPropertyType] = useState("apartment");
  const [propertySize, setPropertySize] = useState(1200);
  const [propertyLocation, setPropertyLocation] = useState("dhanmondi");
  const [floors, setFloors] = useState(1);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [hasLift, setHasLift] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [finishQuality, setFinishQuality] = useState("standard");
  const [roofType, setRoofType] = useState("rcc");
  const [wallType, setWallType] = useState("brick");
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = async () => {
    if (!prompt.trim()) return;
    
    const userMessage = prompt;
    setPrompt("");
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
    
    // Show loading state
    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: "assistant", content: "Thinking..." }]);
    
    try {
      // Call AI service
      const response = await mockAIResponse(userMessage);
      
      // Update chat with AI response
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop(); // Remove "Thinking..." message
        return [...newHistory, { 
          role: "assistant", 
          content: `Based on your requirements, I've created a plan for a ${response.propertyType} in ${response.location}. The estimated cost is approximately ${new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(response.estimatedCost)}. Would you like to see the detailed breakdown?` 
        }];
      });
      
      // Store AI results
      setAIResults(response);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop(); // Remove "Thinking..." message
        return [...newHistory, { 
          role: "assistant", 
          content: "I'm sorry, I encountered an error processing your request. Please try again." 
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleGenerateFromConfig = async () => {
    setIsLoading(true);
    
    try {
      const config = {
        propertyType,
        totalArea: propertySize,
        location: propertyLocation,
        floors,
        bedrooms,
        bathrooms,
        hasLift,
        hasParking,
        hasGarden,
        hasPool,
        finishQuality,
        roofType,
        wallType
      };
      
      // Call AI service with configuration
      const response = await mockAIResponse("", config);
      
      // Store AI results
      setAIResults(response);
      
      // Switch to results tab
      setActiveTab("results");
      
      toast.success("Property plan generated successfully!");
      
    } catch (error) {
      console.error("Error generating from config:", error);
      toast.error("Failed to generate property plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleROICalculation = () => {
    if (!aiResults) return;
    
    // Prepare the data to be sent to ROI calculator
    const nirmanData = {
      propertyType: aiResults.propertyType || "apartment",
      location: aiResults.location || "",
      squareFeet: aiResults.totalArea || 1000,
      estimatedCost: aiResults.estimatedCost || 5000000,
    };
    
    // Navigate to ROI calculator with the Nirman AI data
    navigate('/roi-calculator', { state: { nirmanData } });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-nirman-gold" />
              <h1 className="text-3xl md:text-4xl font-display font-semibold">
                Nirman AI
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your AI-powered assistant for planning, designing, and estimating costs for your dream property in Bangladesh.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>Chat with Nirman AI</span>
                </TabsTrigger>
                <TabsTrigger value="configure" className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  <span>Configure Property</span>
                </TabsTrigger>
                <TabsTrigger value="results" className="flex items-center gap-2" disabled={!aiResults}>
                  <Building className="h-4 w-4" />
                  <span>View Results</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Chat with Nirman AI</CardTitle>
                    <CardDescription>
                      Describe your dream property and get personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4">
                      {chatHistory.map((message, index) => (
                        <div 
                          key={index} 
                          className={`mb-4 ${message.role === "user" ? "text-right" : ""}`}
                        >
                          <div 
                            className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                              message.role === "user" 
                                ? "bg-nirman-navy text-white" 
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {message.content === "Thinking..." ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Thinking...</span>
                              </div>
                            ) : (
                              message.content
                            )}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="Describe the property you want to build..." 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow"
                        disabled={isLoading}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!prompt.trim() || isLoading}
                        className="bg-nirman-gold text-nirman-navy hover:bg-nirman-gold/90"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        "I want to build a 3-bedroom apartment in Dhanmondi with modern amenities."
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        "Design a luxury villa with 5 bedrooms, a swimming pool, and a garden in Gulshan."
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        "What would it cost to build a budget-friendly 1000 sq ft office space in Mirpur?"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="configure">
                <Card>
                  <CardHeader>
                    <CardTitle>Enhanced Property Configuration</CardTitle>
                    <CardDescription>
                      Set detailed parameters for your property to get accurate Bangladesh-specific cost estimates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Basic Details */}
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select value={propertyType} onValueChange={setPropertyType}>
                          <SelectTrigger id="propertyType">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="office">Office Space</SelectItem>
                            <SelectItem value="commercial">Commercial Building</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Select value={propertyLocation} onValueChange={setPropertyLocation}>
                          <SelectTrigger id="location">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gulshan">Gulshan</SelectItem>
                            <SelectItem value="banani">Banani</SelectItem>
                            <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                            <SelectItem value="bashundhara">Bashundhara</SelectItem>
                            <SelectItem value="uttara">Uttara</SelectItem>
                            <SelectItem value="mirpur">Mirpur</SelectItem>
                            <SelectItem value="chittagong">Chittagong</SelectItem>
                            <SelectItem value="sylhet">Sylhet</SelectItem>
                            <SelectItem value="rajshahi">Rajshahi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="propertySize">
                          Property Size (sq ft): {propertySize}
                        </Label>
                        <Slider 
                          id="propertySize"
                          min={500} 
                          max={10000} 
                          step={100} 
                          value={[propertySize]} 
                          onValueChange={(value) => setPropertySize(value[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="floors">Number of Floors</Label>
                        <Select value={floors.toString()} onValueChange={(value) => setFloors(parseInt(value))}>
                          <SelectTrigger id="floors">
                            <SelectValue placeholder="Select number of floors" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Select value={bedrooms.toString()} onValueChange={(value) => setBedrooms(parseInt(value))}>
                          <SelectTrigger id="bedrooms">
                            <SelectValue placeholder="Select number of bedrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Select value={bathrooms.toString()} onValueChange={(value) => setBathrooms(parseInt(value))}>
                          <SelectTrigger id="bathrooms">
                            <SelectValue placeholder="Select number of bathrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="finishQuality">Finish Quality</Label>
                        <Select value={finishQuality} onValueChange={setFinishQuality}>
                          <SelectTrigger id="finishQuality">
                            <SelectValue placeholder="Select finish quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="luxury">Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="roofType">Roof Type</Label>
                        <Select value={roofType} onValueChange={setRoofType}>
                          <SelectTrigger id="roofType">
                            <SelectValue placeholder="Select roof type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rcc">RCC Slab</SelectItem>
                            <SelectItem value="tin">Tin Shed</SelectItem>
                            <SelectItem value="tiles">Clay Tiles</SelectItem>
                            <SelectItem value="concrete">Concrete Tiles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="wallType">Wall Type</Label>
                        <Select value={wallType} onValueChange={setWallType}>
                          <SelectTrigger id="wallType">
                            <SelectValue placeholder="Select wall type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brick">Brick Wall</SelectItem>
                            <SelectItem value="concrete">Concrete Block</SelectItem>
                            <SelectItem value="cement">Cement Block</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Features Checkboxes */}
                    <div className="mt-8">
                      <Label className="text-base font-medium mb-4 block">Additional Features</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasLift"
                            checked={hasLift}
                            onCheckedChange={(checked) => setHasLift(!!checked)}
                          />
                          <Label htmlFor="hasLift">Lift/Elevator</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasParking"
                            checked={hasParking}
                            onCheckedChange={(checked) => setHasParking(!!checked)}
                          />
                          <Label htmlFor="hasParking">Parking Space</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasGarden"
                            checked={hasGarden}
                            onCheckedChange={(checked) => setHasGarden(!!checked)}
                          />
                          <Label htmlFor="hasGarden">Garden/Lawn</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasPool"
                            checked={hasPool}
                            onCheckedChange={(checked) => setHasPool(!!checked)}
                          />
                          <Label htmlFor="hasPool">Swimming Pool</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleGenerateFromConfig} 
                      className="w-full bg-nirman-gold text-nirman-navy hover:bg-nirman-gold/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Building className="mr-2 h-4 w-4" />
                          Generate Enhanced Property Plan
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="results">
                {aiResults ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Enhanced Property Summary</CardTitle>
                        <CardDescription>
                          Comprehensive overview of your property plan with Bangladesh-specific data
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-5 w-5 text-nirman-gold" />
                              <div>
                                <p className="text-sm text-muted-foreground">Property Type</p>
                                <p className="font-medium">{aiResults.propertyType}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Landmark className="h-5 w-5 text-nirman-gold" />
                              <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-medium">{aiResults.location}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-nirman-gold" />
                              <div>
                                <p className="text-sm text-muted-foreground">Total Area</p>
                                <p className="font-medium">{aiResults.totalArea} sq ft ({aiResults.floors} floors)</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Banknote className="h-5 w-5 text-nirman-gold" />
                              <div>
                                <p className="text-sm text-muted-foreground">Estimated Cost</p>
                                <p className="font-medium">
                                  {new Intl.NumberFormat('en-BD', { 
                                    style: 'currency', 
                                    currency: 'BDT',
                                    maximumFractionDigits: 0
                                  }).format(aiResults.estimatedCost)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Construction className="h-5 w-5 text-nirman-gold" />
                              <div>
                                <p className="text-sm text-muted-foreground">Construction Time</p>
                                <p className="font-medium">{aiResults.timeEstimate?.total || "8-12 months"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Cost Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {aiResults.costBreakdown && (
                            <div className="space-y-2">
                              {Object.entries(aiResults.costBreakdown).map(([key, value]: [string, any]) => (
                                <div key={key} className="flex justify-between items-center">
                                  <span className="capitalize">{key}</span>
                                  <span className="font-medium">
                                    {new Intl.NumberFormat('en-BD', { 
                                      style: 'currency', 
                                      currency: 'BDT',
                                      maximumFractionDigits: 0
                                    }).format(value)}
                                  </span>
                                </div>
                              ))}
                              <div className="border-t pt-2 mt-2 flex justify-between items-center font-semibold">
                                <span>Total</span>
                                <span>
                                  {new Intl.NumberFormat('en-BD', { 
                                    style: 'currency', 
                                    currency: 'BDT',
                                    maximumFractionDigits: 0
                                  }).format(aiResults.estimatedCost)}
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Material Requirements</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {aiResults.materialRequirements && (
                            <div className="space-y-2">
                              {Object.entries(aiResults.materialRequirements).map(([key, value]: [string, any]) => (
                                <div key={key} className="flex justify-between items-center">
                                  <span className="capitalize">{key}</span>
                                  <span className="font-medium">
                                    {value} {key === 'cement' ? 'bags' : key === 'steel' ? 'kg' : key === 'bricks' ? 'pcs' : key === 'paint' ? 'liters' : 'cft'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Timeline Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {aiResults.timeEstimate && (
                            <div className="space-y-2">
                              {Object.entries(aiResults.timeEstimate).map(([key, value]: [string, any]) => (
                                <div key={key} className="flex justify-between items-center">
                                  <span className="capitalize">{key}</span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Required Permits & Approvals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {aiResults.permits && (
                          <ul className="list-disc pl-5 space-y-1">
                            {aiResults.permits.map((permit: string, index: number) => (
                              <li key={index}>{permit}</li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>AI Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {aiResults.recommendations && (
                          <ul className="list-disc pl-5 space-y-1">
                            {aiResults.recommendations.map((rec: string, index: number) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button 
                        onClick={handleROICalculation}
                        className="bg-nirman-gold text-nirman-navy hover:bg-nirman-gold/90"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate ROI for this property
                      </Button>
                      
                      <Button variant="outline">
                        Connect with Developers
                      </Button>
                      
                      <Button variant="outline">
                        Download Detailed Report
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No results yet. Chat with Nirman AI or configure your property to generate results.
                    </p>
                  </div>
                )}
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
