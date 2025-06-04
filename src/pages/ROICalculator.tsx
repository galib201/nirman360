
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, PiggyBank, TrendingUp, BarChart4, Building2 } from "lucide-react";
import { toast } from "sonner";

// Enhanced property types with Bangladesh-specific ROI data
const propertyTypesBangladesh = [
  { value: "apartment", label: "Apartment Building", roiMultiplier: 0.12, appreciationRate: 8 },
  { value: "duplex", label: "Duplex House", roiMultiplier: 0.10, appreciationRate: 7 },
  { value: "commercial", label: "Commercial Space", roiMultiplier: 0.15, appreciationRate: 10 },
  { value: "villa", label: "Villa", roiMultiplier: 0.08, appreciationRate: 6 },
  { value: "office", label: "Office Building", roiMultiplier: 0.14, appreciationRate: 9 }
];

// Bangladesh locations with market factors
const bangladeshLocations = [
  { value: "dhaka-gulshan", label: "Dhaka - Gulshan", marketFactor: 1.8, rentPerSqft: 80 },
  { value: "dhaka-banani", label: "Dhaka - Banani", marketFactor: 1.6, rentPerSqft: 75 },
  { value: "dhaka-dhanmondi", label: "Dhaka - Dhanmondi", marketFactor: 1.4, rentPerSqft: 70 },
  { value: "dhaka-uttara", label: "Dhaka - Uttara", marketFactor: 1.2, rentPerSqft: 60 },
  { value: "chittagong", label: "Chittagong", marketFactor: 1.0, rentPerSqft: 45 },
  { value: "sylhet", label: "Sylhet", marketFactor: 0.9, rentPerSqft: 40 },
  { value: "rajshahi", label: "Rajshahi", marketFactor: 0.8, rentPerSqft: 35 }
];

const ROICalculator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [squareFeet, setSquareFeet] = useState("1200");
  const [initialInvestment, setInitialInvestment] = useState("8000000");
  const [maintenancePercent, setMaintenancePercent] = useState(8);
  const [occupancyRate, setOccupancyRate] = useState(85);
  const [constructionQuality, setConstructionQuality] = useState("standard");
  const [marketCondition, setMarketCondition] = useState("stable");
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  // Parse prefilled data from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const prefillData = searchParams.get('prefill');
    
    if (prefillData) {
      try {
        const data = JSON.parse(decodeURIComponent(prefillData));
        
        if (data.propertyPrice) setInitialInvestment(String(data.propertyPrice));
        if (data.area) setSquareFeet(String(data.area));
        if (data.propertyType) {
          const mappedType = mapPropertyType(data.propertyType);
          if (mappedType) setPropertyType(mappedType);
        }
        if (data.location) {
          const mappedLocation = bangladeshLocations.find(
            loc => loc.label.toLowerCase().includes(data.location.toLowerCase())
          )?.value;
          if (mappedLocation) setPropertyLocation(mappedLocation);
        }
        
        toast.success("Data pre-filled from property details");
      } catch (error) {
        console.error("Error parsing prefill data:", error);
      }
    }
  }, [location.search]);

  const mapPropertyType = (type: string): string | undefined => {
    const typeMap: Record<string, string> = {
      "apartment": "apartment",
      "house": "duplex",
      "villa": "villa",
      "commercial": "commercial",
      "office": "office"
    };
    
    return typeMap[type.toLowerCase()];
  };

  const calculateROI = () => {
    const selectedProperty = propertyTypesBangladesh.find(p => p.value === propertyType);
    const selectedLocation = bangladeshLocations.find(l => l.value === propertyLocation);
    
    if (!selectedProperty || !selectedLocation) {
      toast.error("Please select both property type and location");
      return;
    }

    const sqft = parseFloat(squareFeet);
    const investment = parseFloat(initialInvestment);
    
    if (isNaN(sqft) || isNaN(investment)) {
      toast.error("Please enter valid numbers");
      return;
    }
    
    // Enhanced calculation with Bangladesh market factors
    const baseRentPerSqft = selectedLocation.rentPerSqft;
    const qualityMultiplier = constructionQuality === "premium" ? 1.3 : constructionQuality === "luxury" ? 1.5 : 1.0;
    const marketMultiplier = marketCondition === "growing" ? 1.2 : marketCondition === "declining" ? 0.8 : 1.0;
    
    const adjustedRentPerSqft = baseRentPerSqft * qualityMultiplier * marketMultiplier;
    const monthlyRentalIncome = sqft * adjustedRentPerSqft * (occupancyRate / 100);
    const annualRentalIncome = monthlyRentalIncome * 12;
    
    // Enhanced expense calculation
    const maintenanceCost = (maintenancePercent / 100) * annualRentalIncome;
    const propertyTax = 0.005 * investment; // 0.5% property tax in Bangladesh
    const managementFee = 0.08 * annualRentalIncome; // 8% management fee
    const insuranceCost = 0.002 * investment; // 0.2% insurance
    const totalAnnualExpenses = maintenanceCost + propertyTax + managementFee + insuranceCost;
    
    const netOperatingIncome = annualRentalIncome - totalAnnualExpenses;
    const cashOnCashROI = (netOperatingIncome / investment) * 100;
    
    // Enhanced appreciation calculation
    const appreciationRate = selectedProperty.appreciationRate / 100;
    const annualAppreciation = appreciationRate * investment;
    const totalReturn = netOperatingIncome + annualAppreciation;
    const totalROI = (totalReturn / investment) * 100;
    
    const paybackPeriod = investment / netOperatingIncome;
    
    // Enhanced unit analysis
    const averageUnitSize = 1000;
    const numberOfUnits = Math.max(1, Math.floor(sqft / averageUnitSize));
    const monthlyIncomePerUnit = monthlyRentalIncome / numberOfUnits;
    
    setResults({
      monthlyRentalIncome,
      annualRentalIncome,
      maintenanceCost,
      propertyTax,
      managementFee,
      insuranceCost,
      totalAnnualExpenses,
      netOperatingIncome,
      cashOnCashROI,
      annualAppreciation,
      totalROI,
      paybackPeriod,
      numberOfUnits,
      monthlyIncomePerUnit,
      appreciationRate: selectedProperty.appreciationRate
    });
    
    setShowResults(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-nirman-navy">
              ROI Calculator - Bangladesh
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Calculate potential returns with real Bangladesh market data including construction costs, rental rates, and appreciation trends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Enhanced Property Analysis
                </CardTitle>
                <CardDescription>
                  Comprehensive property investment analysis for Bangladesh market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypesBangladesh.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location in Bangladesh</Label>
                    <Select value={propertyLocation} onValueChange={setPropertyLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {bangladeshLocations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="squareFeet">Total Area (Sq Ft)</Label>
                    <Input 
                      type="number" 
                      value={squareFeet} 
                      onChange={(e) => setSquareFeet(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="initialInvestment">Total Investment (BDT)</Label>
                    <Input 
                      type="number" 
                      value={initialInvestment} 
                      onChange={(e) => setInitialInvestment(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="constructionQuality">Construction Quality</Label>
                    <Select value={constructionQuality} onValueChange={setConstructionQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="marketCondition">Market Condition</Label>
                    <Select value={marketCondition} onValueChange={setMarketCondition}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="declining">Declining</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="growing">Growing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      Annual Maintenance: {maintenancePercent}%
                    </Label>
                    <Slider 
                      min={3} 
                      max={15} 
                      step={0.5} 
                      value={[maintenancePercent]} 
                      onValueChange={(value) => setMaintenancePercent(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      Expected Occupancy: {occupancyRate}%
                    </Label>
                    <Slider 
                      min={60} 
                      max={95} 
                      step={1} 
                      value={[occupancyRate]} 
                      onValueChange={(value) => setOccupancyRate(value[0])}
                    />
                  </div>
                </div>
                
                <Button 
                  className="mt-8 w-full bg-nirman-gold hover:bg-nirman-gold/90"
                  onClick={calculateROI}
                  disabled={!propertyType || !propertyLocation}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Enhanced ROI
                </Button>
              </CardContent>
            </Card>
            
            {showResults && results && (
              <Card className="col-span-1 border-nirman-gold/50">
                <CardHeader className="bg-nirman-cream">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart4 className="h-5 w-5" />
                    Bangladesh Market Analysis
                  </CardTitle>
                  <CardDescription>
                    Real-time calculations based on current market data
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2 bg-nirman-cream -mx-6 px-6">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-nirman-gold" />
                        <span className="font-semibold">Cash-on-Cash ROI</span>
                      </div>
                      <span className="font-bold text-nirman-gold text-lg">
                        {results.cashOnCashROI.toFixed(2)}%
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Monthly Rental Income</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.monthlyRentalIncome)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Annual Rental Income</span>
                        <span className="font-semibold">
                          {formatCurrency(results.annualRentalIncome)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>• Maintenance</span>
                        <span className="text-red-500">
                          {formatCurrency(results.maintenanceCost)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>• Property Tax</span>
                        <span className="text-red-500">
                          {formatCurrency(results.propertyTax)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>• Management Fee</span>
                        <span className="text-red-500">
                          {formatCurrency(results.managementFee)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>• Insurance</span>
                        <span className="text-red-500">
                          {formatCurrency(results.insuranceCost)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between font-semibold">
                        <span>Net Operating Income</span>
                        <span className="text-green-600">
                          {formatCurrency(results.netOperatingIncome)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Annual Appreciation ({results.appreciationRate}%)</span>
                        <span className="font-semibold">
                          {formatCurrency(results.annualAppreciation)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between border-t pt-2">
                        <span>Total ROI (Income + Appreciation)</span>
                        <span className="font-bold text-nirman-gold">
                          {results.totalROI.toFixed(2)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Payback Period</span>
                        <span className="font-semibold">
                          {results.paybackPeriod.toFixed(1)} years
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ROICalculator;
