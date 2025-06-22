
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Calculator, Clock, MapPin, Building, Home, Car, Elevator } from "lucide-react";

interface PropertyConfig {
  buildingType: string;
  landArea: number;
  floors: number;
  unitsPerFloor: number;
  location: string;
  luxuryLevel: string;
  hasLift: boolean;
  hasParking: boolean;
  hasGenerator: boolean;
  bedrooms: number;
  bathrooms: number;
  additionalRooms: string[];
  specialRequirements: string;
}

interface CostBreakdown {
  landCost: number;
  materialCost: number;
  laborCost: number;
  liftCost: number;
  finishingCost: number;
  electricalPlumbingCost: number;
  designPermitCost: number;
  totalCost: number;
  costPerSqFt: number;
  timeline: {
    planning: number;
    foundation: number;
    structure: number;
    finishing: number;
    total: number;
  };
}

const NirmanAI = () => {
  const [config, setConfig] = useState<PropertyConfig>({
    buildingType: '',
    landArea: 0,
    floors: 1,
    unitsPerFloor: 1,
    location: '',
    luxuryLevel: '',
    hasLift: false,
    hasParking: false,
    hasGenerator: false,
    bedrooms: 2,
    bathrooms: 2,
    additionalRooms: [],
    specialRequirements: ''
  });

  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Bangladesh specific construction rates (BDT per sq ft)
  const constructionRates = {
    standard: { apartment: 1200, duplex: 1400, commercial: 1600, villa: 1800 },
    premium: { apartment: 1800, duplex: 2200, commercial: 2400, villa: 2800 },
    luxury: { apartment: 2500, duplex: 3000, commercial: 3500, villa: 4000 }
  };

  // Location multipliers for Bangladesh
  const locationMultipliers: { [key: string]: number } = {
    'Gulshan': 1.5,
    'Banani': 1.4,
    'Dhanmondi': 1.3,
    'Uttara': 1.2,
    'Wari': 1.0,
    'Mohammadpur': 0.9,
    'Mirpur': 0.8,
    'Savar': 0.7
  };

  const calculateCost = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const totalBuiltArea = config.landArea * config.floors * 0.75; // 75% efficiency
      const baseRate = constructionRates[config.luxuryLevel as keyof typeof constructionRates]?.[config.buildingType as keyof typeof constructionRates.standard] || 1200;
      const locationMultiplier = locationMultipliers[config.location] || 1.0;
      const finalRate = baseRate * locationMultiplier;

      const materialCost = totalBuiltArea * finalRate * 0.4;
      const laborCost = totalBuiltArea * finalRate * 0.3;
      const finishingCost = totalBuiltArea * finalRate * 0.2;
      const electricalPlumbingCost = totalBuiltArea * finalRate * 0.1;
      const liftCost = config.hasLift ? config.floors * 800000 : 0; // 8 lakh per lift
      const designPermitCost = totalBuiltArea * 50;

      const totalCost = materialCost + laborCost + finishingCost + electricalPlumbingCost + liftCost + designPermitCost;

      // Timeline calculation (in months)
      const planningTime = Math.ceil(config.floors / 2);
      const foundationTime = Math.ceil(config.floors / 3) + 1;
      const structureTime = config.floors * 1.5;
      const finishingTime = Math.ceil(totalBuiltArea / 1000) * 2;
      const totalTime = planningTime + foundationTime + structureTime + finishingTime;

      setCostBreakdown({
        landCost: 0, // Land cost separate
        materialCost,
        laborCost,
        liftCost,
        finishingCost,
        electricalPlumbingCost,
        designPermitCost,
        totalCost,
        costPerSqFt: totalCost / totalBuiltArea,
        timeline: {
          planning: planningTime,
          foundation: foundationTime,
          structure: structureTime,
          finishing: finishingTime,
          total: totalTime
        }
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)} L`;
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <PageLayout 
      title="NirmanAI Property Configuration" 
      subtitle="AI-powered construction cost estimation and planning"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-nirman-navy" />
              Property Configuration
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buildingType">Building Type</Label>
                  <Select value={config.buildingType} onValueChange={(value) => setConfig({...config, buildingType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select value={config.location} onValueChange={(value) => setConfig({...config, location: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gulshan">Gulshan</SelectItem>
                      <SelectItem value="Banani">Banani</SelectItem>
                      <SelectItem value="Dhanmondi">Dhanmondi</SelectItem>
                      <SelectItem value="Uttara">Uttara</SelectItem>
                      <SelectItem value="Wari">Wari</SelectItem>
                      <SelectItem value="Mohammadpur">Mohammadpur</SelectItem>
                      <SelectItem value="Mirpur">Mirpur</SelectItem>
                      <SelectItem value="Savar">Savar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="landArea">Land Area (sq ft)</Label>
                  <Input
                    type="number"
                    value={config.landArea || ''}
                    onChange={(e) => setConfig({...config, landArea: Number(e.target.value)})}
                    placeholder="e.g. 2500"
                  />
                </div>

                <div>
                  <Label htmlFor="floors">Number of Floors</Label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={config.floors}
                    onChange={(e) => setConfig({...config, floors: Number(e.target.value)})}
                  />
                </div>

                <div>
                  <Label htmlFor="unitsPerFloor">Units per Floor</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={config.unitsPerFloor}
                    onChange={(e) => setConfig({...config, unitsPerFloor: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="luxuryLevel">Finishing Quality</Label>
                <Select value={config.luxuryLevel} onValueChange={(value) => setConfig({...config, luxuryLevel: value})}>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms per Unit</Label>
                  <Input
                    type="number"
                    min="1"
                    max="6"
                    value={config.bedrooms}
                    onChange={(e) => setConfig({...config, bedrooms: Number(e.target.value)})}
                  />
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms per Unit</Label>
                  <Input
                    type="number"
                    min="1"
                    max="6"
                    value={config.bathrooms}
                    onChange={(e) => setConfig({...config, bathrooms: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Additional Features</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'hasLift', label: 'Elevator', icon: Elevator },
                    { key: 'hasParking', label: 'Parking', icon: Car },
                    { key: 'hasGenerator', label: 'Generator', icon: Bot }
                  ].map(({ key, label, icon: Icon }) => (
                    <Badge
                      key={key}
                      variant={config[key as keyof PropertyConfig] ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setConfig({...config, [key]: !config[key as keyof PropertyConfig]})}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <textarea
                  className="w-full p-2 border rounded-md resize-none"
                  rows={3}
                  value={config.specialRequirements}
                  onChange={(e) => setConfig({...config, specialRequirements: e.target.value})}
                  placeholder="Any special requirements or features..."
                />
              </div>

              <Button
                onClick={calculateCost}
                disabled={!config.buildingType || !config.location || !config.landArea || isCalculating}
                className="w-full"
              >
                <Calculator className="h-4 w-4 mr-2" />
                {isCalculating ? 'Calculating...' : 'Calculate Cost & Timeline'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {costBreakdown ? (
            <>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-nirman-gold" />
                  Cost Breakdown
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Materials:</span>
                    <span className="font-medium">{formatCurrency(costBreakdown.materialCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor:</span>
                    <span className="font-medium">{formatCurrency(costBreakdown.laborCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finishing:</span>
                    <span className="font-medium">{formatCurrency(costBreakdown.finishingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Electrical & Plumbing:</span>
                    <span className="font-medium">{formatCurrency(costBreakdown.electricalPlumbingCost)}</span>
                  </div>
                  {costBreakdown.liftCost > 0 && (
                    <div className="flex justify-between">
                      <span>Lift Installation:</span>
                      <span className="font-medium">{formatCurrency(costBreakdown.liftCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Design & Permits:</span>
                    <span className="font-medium">{formatCurrency(costBreakdown.designPermitCost)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost:</span>
                    <span className="text-nirman-navy">{formatCurrency(costBreakdown.totalCost)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cost per sq ft: ৳{Math.round(costBreakdown.costPerSqFt).toLocaleString()}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-nirman-gold" />
                  Construction Timeline
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Planning & Design:</span>
                    <span className="font-medium">{costBreakdown.timeline.planning} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Foundation:</span>
                    <span className="font-medium">{costBreakdown.timeline.foundation} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Structure:</span>
                    <span className="font-medium">{costBreakdown.timeline.structure} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finishing:</span>
                    <span className="font-medium">{costBreakdown.timeline.finishing} months</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Duration:</span>
                    <span className="text-nirman-navy">{costBreakdown.timeline.total} months</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-nirman-lightblue border-none">
                <h3 className="font-semibold mb-2">Project Summary</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Building:</strong> {config.floors}-floor {config.buildingType} in {config.location}</p>
                  <p><strong>Total Units:</strong> {config.floors * config.unitsPerFloor}</p>
                  <p><strong>Built Area:</strong> ~{Math.round(config.landArea * config.floors * 0.75).toLocaleString()} sq ft</p>
                  <p><strong>Quality:</strong> {config.luxuryLevel} finishing</p>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-6">
              <div className="text-center text-muted-foreground">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Fill in the property details to get cost estimation and timeline</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default NirmanAI;
