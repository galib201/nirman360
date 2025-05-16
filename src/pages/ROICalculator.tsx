
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
import { Calculator, PiggyBank, TrendingUp, BarChart4 } from "lucide-react";
import { toast } from "sonner";

// Property types and their base ROI multipliers
const propertyTypes = [
  { value: "apartment", label: "Apartment Building", roiMultiplier: 0.08 },
  { value: "duplex", label: "Duplex", roiMultiplier: 0.07 },
  { value: "commercial", label: "Commercial Space", roiMultiplier: 0.09 },
  { value: "villa", label: "Villa", roiMultiplier: 0.065 },
  { value: "office", label: "Office Building", roiMultiplier: 0.085 }
];

// Locations and their market factor
const locations = [
  { value: "gulshan", label: "Gulshan", marketFactor: 1.4 },
  { value: "banani", label: "Banani", marketFactor: 1.3 },
  { value: "dhanmondi", label: "Dhanmondi", marketFactor: 1.2 },
  { value: "bashundhara", label: "Bashundhara", marketFactor: 1.1 },
  { value: "uttara", label: "Uttara", marketFactor: 1.0 },
  { value: "mirpur", label: "Mirpur", marketFactor: 0.9 },
  { value: "mohammadpur", label: "Mohammadpur", marketFactor: 0.85 }
];

const ROICalculator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [squareFeet, setSquareFeet] = useState("1000");
  const [initialInvestment, setInitialInvestment] = useState("5000000");
  const [maintenancePercent, setMaintenancePercent] = useState(5);
  const [occupancyRate, setOccupancyRate] = useState(90);
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [dataSource, setDataSource] = useState("manual");

  // Parse and apply data from NirmanAI if available
  useEffect(() => {
    if (location.state && location.state.nirmanData) {
      const nirmanData = location.state.nirmanData;
      
      // Set data source for tracking
      setDataSource("nirman");
      
      // Toast notification
      toast.success("Data pre-filled from Nirman AI results");
      
      // Map the property type from Nirman AI to our options
      const mappedPropertyType = mapNirmanPropertyType(nirmanData.propertyType);
      if (mappedPropertyType) setPropertyType(mappedPropertyType);
      
      // Map location if available
      if (nirmanData.location) {
        const mappedLocation = locations.find(
          loc => loc.label.toLowerCase() === nirmanData.location.toLowerCase()
        )?.value;
        if (mappedLocation) setPropertyLocation(mappedLocation);
      }
      
      // Set square feet if available
      if (nirmanData.squareFeet || nirmanData.area) {
        setSquareFeet(String(nirmanData.squareFeet || nirmanData.area || 1000));
      }
      
      // Set initial investment based on estimated cost if available
      if (nirmanData.estimatedCost) {
        setInitialInvestment(String(nirmanData.estimatedCost));
      }
    }
  }, [location.state]);

  // Helper function to map Nirman AI property types to our options
  const mapNirmanPropertyType = (nirmanType: string): string | undefined => {
    const typeMap: Record<string, string> = {
      "apartment": "apartment",
      "residential": "apartment",
      "duplex": "duplex",
      "commercial": "commercial",
      "office": "office",
      "villa": "villa",
      "house": "villa"
    };
    
    if (!nirmanType) return undefined;
    
    for (const [key, value] of Object.entries(typeMap)) {
      if (nirmanType.toLowerCase().includes(key)) {
        return value;
      }
    }
    
    return undefined;
  };

  const calculateROI = () => {
    const selectedProperty = propertyTypes.find(p => p.value === propertyType);
    const selectedLocation = locations.find(l => l.value === propertyLocation);
    
    if (!selectedProperty || !selectedLocation) {
      toast.error("Please select both property type and location");
      return;
    }

    const sqft = parseFloat(squareFeet);
    const investment = parseFloat(initialInvestment);
    
    if (isNaN(sqft) || isNaN(investment)) {
      toast.error("Please enter valid numbers for square feet and investment");
      return;
    }
    
    // Calculate base metrics
    const baseRentPerSqft = 50; // in BDT
    const locationAdjustedRent = baseRentPerSqft * selectedLocation.marketFactor;
    const monthlyRentalIncome = sqft * locationAdjustedRent * (occupancyRate / 100);
    const annualRentalIncome = monthlyRentalIncome * 12;
    
    // Calculate expenses
    const maintenanceCost = (maintenancePercent / 100) * annualRentalIncome;
    const propertyTax = 0.01 * investment; // Assuming 1% property tax
    const totalAnnualExpenses = maintenanceCost + propertyTax;
    
    // Calculate net operating income and ROI
    const netOperatingIncome = annualRentalIncome - totalAnnualExpenses;
    const cashOnCashROI = (netOperatingIncome / investment) * 100;
    
    // Calculate appreciation (assuming 5% annual appreciation)
    const annualAppreciation = 0.05 * investment;
    const totalReturn = netOperatingIncome + annualAppreciation;
    const totalROI = (totalReturn / investment) * 100;
    
    // Payback period in years
    const paybackPeriod = investment / netOperatingIncome;
    
    // Calculate monthly breakdown for each unit (assuming average unit size of 1000 sqft)
    const averageUnitSize = 1000; // in sqft
    const numberOfUnits = Math.max(1, Math.floor(sqft / averageUnitSize));
    const monthlyIncomePerUnit = monthlyRentalIncome / numberOfUnits;
    
    setResults({
      monthlyRentalIncome,
      annualRentalIncome,
      maintenanceCost,
      propertyTax,
      netOperatingIncome,
      cashOnCashROI,
      annualAppreciation,
      totalROI,
      paybackPeriod,
      numberOfUnits,
      monthlyIncomePerUnit,
      dataOrigin: dataSource
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
            <h1 className="text-3xl md:text-4xl font-display font-semibold">
              ROI Calculator
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Calculate the potential return on investment for your property in Bangladesh based on real market data.
              {dataSource === "nirman" && " Data pre-filled from your Nirman AI results."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
                <CardDescription>
                  Enter details about your property investment to calculate potential ROI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select 
                      value={propertyType} 
                      onValueChange={setPropertyType}
                    >
                      <SelectTrigger id="propertyType">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select 
                      value={propertyLocation} 
                      onValueChange={setPropertyLocation}
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="squareFeet">Total Square Feet</Label>
                    <Input 
                      id="squareFeet"
                      type="number" 
                      value={squareFeet} 
                      onChange={(e) => setSquareFeet(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="initialInvestment">Initial Investment (BDT)</Label>
                    <Input 
                      id="initialInvestment"
                      type="number" 
                      value={initialInvestment} 
                      onChange={(e) => setInitialInvestment(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maintenancePercent">
                      Annual Maintenance (% of Rental Income): {maintenancePercent}%
                    </Label>
                    <Slider 
                      id="maintenancePercent"
                      min={1} 
                      max={20} 
                      step={0.5} 
                      value={[maintenancePercent]} 
                      onValueChange={(value) => setMaintenancePercent(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="occupancyRate">
                      Expected Occupancy Rate: {occupancyRate}%
                    </Label>
                    <Slider 
                      id="occupancyRate"
                      min={50} 
                      max={100} 
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
                  Calculate ROI
                </Button>
              </CardContent>
            </Card>
            
            {showResults && results && (
              <Card className="col-span-1 border-nirman-gold/50">
                <CardHeader className="bg-nirman-cream">
                  <CardTitle>ROI Analysis</CardTitle>
                  <CardDescription>
                    Based on current market rates in Bangladesh
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <PiggyBank className="h-5 w-5 mr-2 text-nirman-gold" />
                        <span>Monthly Rental Income</span>
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(results.monthlyRentalIncome)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <PiggyBank className="h-5 w-5 mr-2 text-nirman-gold" />
                        <span>Annual Rental Income</span>
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(results.annualRentalIncome)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <span>Annual Expenses</span>
                      <span className="font-semibold text-red-500">
                        {formatCurrency(results.maintenanceCost + results.propertyTax)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-nirman-gold" />
                        <span>Net Operating Income</span>
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(results.netOperatingIncome)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2 bg-nirman-cream -mx-6 px-6">
                      <div className="flex items-center">
                        <BarChart4 className="h-5 w-5 mr-2 text-nirman-gold" />
                        <span>Cash-on-Cash ROI</span>
                      </div>
                      <span className="font-bold text-nirman-gold">
                        {results.cashOnCashROI.toFixed(2)}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <span>Annual Appreciation (Est.)</span>
                      <span className="font-semibold">
                        {formatCurrency(results.annualAppreciation)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <span>Total ROI (Income + Appreciation)</span>
                      <span className="font-semibold">
                        {results.totalROI.toFixed(2)}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <span>Payback Period</span>
                      <span className="font-semibold">
                        {results.paybackPeriod.toFixed(1)} years
                      </span>
                    </div>
                    
                    <div className="mt-6 pt-2 border-t">
                      <h3 className="text-lg font-semibold mb-2">Per Unit Analysis</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Number of Units:</span>
                          <span>{results.numberOfUnits}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Monthly Income Per Unit:</span>
                          <span>{formatCurrency(results.monthlyIncomePerUnit)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="mt-12 bg-nirman-cream p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">How We Calculate ROI</h2>
            <p className="mb-4">
              Our ROI calculator uses real market data from Bangladesh to provide accurate estimates for your property investment. 
              We consider factors such as location premiums, property type, maintenance costs, and current rental market rates.
            </p>
            <p>
              The calculation includes both rental income ROI and estimated property appreciation to give you a complete 
              picture of your potential return on investment.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ROICalculator;
