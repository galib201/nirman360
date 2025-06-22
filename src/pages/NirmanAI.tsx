
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Home, Calculator, Clock, FileText, DollarSign, Hammer, Building } from "lucide-react";

const NirmanAI = () => {
  const [propertyConfig, setPropertyConfig] = useState({
    type: "",
    area: "",
    floors: "",
    unitsPerFloor: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    budget: "",
    quality: "",
    amenities: [] as string[],
    timeline: ""
  });

  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleConfigChange = (field: string, value: string) => {
    setPropertyConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setPropertyConfig(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const calculatePropertyPlan = async () => {
    setIsCalculating(true);
    
    // Simulate AI calculation based on Bangladesh real estate data
    setTimeout(() => {
      const baseRate = propertyConfig.quality === 'premium' ? 4500 : 
                      propertyConfig.quality === 'standard' ? 3500 : 2800;
      
      const totalArea = parseInt(propertyConfig.area) * parseInt(propertyConfig.floors || "1");
      const totalUnits = parseInt(propertyConfig.floors || "1") * parseInt(propertyConfig.unitsPerFloor || "1");
      const baseCost = totalArea * baseRate;
      
      const amenityCost = propertyConfig.amenities.length * 500000;
      const totalCost = baseCost + amenityCost;

      setResults({
        costBreakdown: {
          construction: baseCost * 0.6,
          materials: baseCost * 0.25,
          labor: baseCost * 0.15,
          amenities: amenityCost,
          permits: totalCost * 0.05,
          total: totalCost + (totalCost * 0.05)
        },
        materials: [
          { name: "Cement", quantity: `${Math.round(totalArea * 8)} bags`, rate: "550 BDT/bag" },
          { name: "Steel/Rebar", quantity: `${Math.round(totalArea * 0.12)} tons`, rate: "85,000 BDT/ton" },
          { name: "Bricks", quantity: `${Math.round(totalArea * 450)} pieces`, rate: "12 BDT/piece" },
          { name: "Sand", quantity: `${Math.round(totalArea * 2.5)} cubic feet`, rate: "55 BDT/cft" },
          { name: "Stone chips", quantity: `${Math.round(totalArea * 1.8)} cubic feet`, rate: "65 BDT/cft" }
        ],
        timeline: {
          foundation: "2-3 months",
          structure: "6-8 months", 
          finishing: "4-6 months",
          total: propertyConfig.timeline || "12-18 months"
        },
        specifications: {
          totalUnits: totalUnits,
          totalArea: `${totalArea} sq ft`,
          floors: propertyConfig.floors,
          unitsPerFloor: propertyConfig.unitsPerFloor,
          avgUnitSize: `${Math.round(parseInt(propertyConfig.area) / totalUnits)} sq ft per unit`
        }
      });
      
      setIsCalculating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2 flex items-center">
                <Zap className="mr-3 h-8 w-8 text-nirman-gold" />
                Nirman AI
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                AI-powered property construction planning with real-time Bangladesh market data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configure Your Property</CardTitle>
                  <CardDescription>
                    Provide details about your dream property for AI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Property Type</Label>
                      <Select onValueChange={(value) => handleConfigChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment Building</SelectItem>
                          <SelectItem value="house">Single House</SelectItem>
                          <SelectItem value="duplex">Duplex</SelectItem>
                          <SelectItem value="commercial">Commercial Building</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="area">Total Area (sq ft)</Label>
                      <Input
                        id="area"
                        value={propertyConfig.area}
                        onChange={(e) => handleConfigChange('area', e.target.value)}
                        placeholder="e.g., 1200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="floors">Number of Floors</Label>
                      <Select onValueChange={(value) => handleConfigChange('floors', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select floors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Floor</SelectItem>
                          <SelectItem value="2">2 Floors</SelectItem>
                          <SelectItem value="3">3 Floors</SelectItem>
                          <SelectItem value="4">4 Floors</SelectItem>
                          <SelectItem value="5">5 Floors</SelectItem>
                          <SelectItem value="6">6+ Floors</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="unitsPerFloor">Units/Flats per Floor</Label>
                      <Select onValueChange={(value) => handleConfigChange('unitsPerFloor', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select units" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Unit</SelectItem>
                          <SelectItem value="2">2 Units</SelectItem>
                          <SelectItem value="3">3 Units</SelectItem>
                          <SelectItem value="4">4 Units</SelectItem>
                          <SelectItem value="5">5+ Units</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms per Unit</Label>
                      <Select onValueChange={(value) => handleConfigChange('bedrooms', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4">4 Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Bathrooms per Unit</Label>
                      <Select onValueChange={(value) => handleConfigChange('bathrooms', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bathrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bathroom</SelectItem>
                          <SelectItem value="2">2 Bathrooms</SelectItem>
                          <SelectItem value="3">3 Bathrooms</SelectItem>
                          <SelectItem value="4">4+ Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select onValueChange={(value) => handleConfigChange('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                        <SelectItem value="gulshan">Gulshan</SelectItem>
                        <SelectItem value="uttara">Uttara</SelectItem>
                        <SelectItem value="mirpur">Mirpur</SelectItem>
                        <SelectItem value="banani">Banani</SelectItem>
                        <SelectItem value="wari">Wari</SelectItem>
                        <SelectItem value="bashundhara">Bashundhara RA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget Range (BDT)</Label>
                      <Select onValueChange={(value) => handleConfigChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30-50">30-50 Lakh</SelectItem>
                          <SelectItem value="50-80">50-80 Lakh</SelectItem>
                          <SelectItem value="80-120">80 Lakh - 1.2 Crore</SelectItem>
                          <SelectItem value="120-200">1.2-2 Crore</SelectItem>
                          <SelectItem value="200+">2+ Crore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quality">Construction Quality</Label>
                      <Select onValueChange={(value) => handleConfigChange('quality', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Amenities & Features</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Elevator/Lift", "Generator", "Parking", "Security System", 
                        "Swimming Pool", "Gym", "Rooftop Garden", "Community Hall"
                      ].map((amenity) => (
                        <Button
                          key={amenity}
                          variant={propertyConfig.amenities.includes(amenity) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleAmenityToggle(amenity)}
                          className="justify-start"
                        >
                          {amenity}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={calculatePropertyPlan}
                    className="w-full"
                    disabled={isCalculating || !propertyConfig.type || !propertyConfig.area}
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Generate AI Plan
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {results ? (
                <Tabs defaultValue="cost" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="cost">Cost</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="specs">Specs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cost" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <DollarSign className="mr-2 h-5 w-5 text-nirman-gold" />
                          Cost Breakdown
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Construction Work:</span>
                            <span className="font-semibold">৳{results.costBreakdown.construction.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Materials:</span>
                            <span className="font-semibold">৳{results.costBreakdown.materials.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor:</span>
                            <span className="font-semibold">৳{results.costBreakdown.labor.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Amenities:</span>
                            <span className="font-semibold">৳{results.costBreakdown.amenities.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Permits & Legal:</span>
                            <span className="font-semibold">৳{results.costBreakdown.permits.toLocaleString()}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total Estimated Cost:</span>
                            <span className="text-nirman-gold">৳{results.costBreakdown.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="materials" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Hammer className="mr-2 h-5 w-5 text-nirman-gold" />
                          Material Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {results.materials.map((material: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <div className="font-medium">{material.name}</div>
                                <div className="text-sm text-muted-foreground">{material.rate}</div>
                              </div>
                              <Badge variant="outline">{material.quantity}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-nirman-gold" />
                          Construction Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Foundation Work:</span>
                            <span className="font-semibold">{results.timeline.foundation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Structure & Framework:</span>
                            <span className="font-semibold">{results.timeline.structure}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Finishing & Interior:</span>
                            <span className="font-semibold">{results.timeline.finishing}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total Duration:</span>
                            <span className="text-nirman-gold">{results.timeline.total}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="specs" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Building className="mr-2 h-5 w-5 text-nirman-gold" />
                          Project Specifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Total Units:</span>
                            <span className="font-semibold">{results.specifications.totalUnits}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Built Area:</span>
                            <span className="font-semibold">{results.specifications.totalArea}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Number of Floors:</span>
                            <span className="font-semibold">{results.specifications.floors}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Units per Floor:</span>
                            <span className="font-semibold">{results.specifications.unitsPerFloor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Average Unit Size:</span>
                            <span className="font-semibold">{results.specifications.avgUnitSize}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready for AI Analysis</h3>
                    <p className="text-muted-foreground text-center">
                      Configure your property details and click "Generate AI Plan" to get detailed cost breakdown, 
                      material requirements, and construction timeline.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NirmanAI;
