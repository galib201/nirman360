import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/utils/formatters";
import { PropertyService } from "@/services/api";
import { AreaSnapshot as AreaSnapshotType } from "@/models";
import { toast } from "sonner";
import { MapPin, ExternalLink, ChevronRight, MapIcon, PoundSterling } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaSnapshot = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [areas, setAreas] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [secondArea, setSecondArea] = useState<string>("");
  const [areaData, setAreaData] = useState<AreaSnapshotType | null>(null);
  const [compareData, setCompareData] = useState<AreaSnapshotType | null>(null);
  const [chartMode, setChartMode] = useState<'buy' | 'rent'>('buy');
  
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const properties = await PropertyService.getProperties();
        const uniqueAreas = [...new Set(properties.map(p => p.location.area))];
        setAreas(uniqueAreas);
        
        // Set default selected area
        if (uniqueAreas.length > 0) {
          setSelectedArea(uniqueAreas[0]);
          
          // Set default comparison area (different from selected)
          if (uniqueAreas.length > 1) {
            setSecondArea(uniqueAreas[1]);
          }
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
        toast.error("Failed to load area data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAreas();
  }, []);
  
  useEffect(() => {
    if (selectedArea) {
      fetchAreaData(selectedArea, setAreaData);
    }
  }, [selectedArea]);
  
  useEffect(() => {
    if (secondArea) {
      fetchAreaData(secondArea, setCompareData);
    }
  }, [secondArea]);
  
  const fetchAreaData = async (area: string, setData: React.Dispatch<React.SetStateAction<AreaSnapshotType | null>>) => {
    try {
      setLoading(true);
      const properties = await PropertyService.getProperties();
      const areaProperties = properties.filter(p => p.location.area === area);
      
      if (areaProperties.length > 0) {
        // Use the first property's area snapshot as base
        const baseSnapshot = areaProperties[0].areaSnapshot;
        
        // Calculate average price based on all properties in the area
        const avgPrice = areaProperties.reduce((sum, p) => sum + p.price, 0) / areaProperties.length;
        
        // Create a complete AreaSnapshot with all required properties
        const snapshot: AreaSnapshotType = {
          id: `area-${area.toLowerCase().replace(/\s/g, '-')}`,
          areaName: area,
          city: areaProperties[0].location.city,
          averagePrice: avgPrice,
          priceHistory: [
            { date: "2023-01", price: avgPrice * 0.95 },
            { date: "2023-04", price: avgPrice * 0.97 },
            { date: "2023-07", price: avgPrice * 0.99 },
            { date: "2023-10", price: avgPrice },
          ],
          nearbyPlaces: baseSnapshot.nearbyPlaces,
          crimeRate: baseSnapshot.crimeRate,
          walkScore: baseSnapshot.walkScore,
          demographics: {
            population: 150000 + Math.floor(Math.random() * 50000),
            averageAge: 32 + Math.floor(Math.random() * 8),
            incomeLevel: baseSnapshot.crimeRate === 'low' ? 'high' : baseSnapshot.crimeRate === 'medium' ? 'medium' : 'low'
          }
        };
        
        setData(snapshot);
      } else {
        toast.error(`No data available for ${area}`);
      }
    } catch (error) {
      console.error(`Error fetching data for ${area}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  const goToGoogleMaps = () => {
    if (selectedArea) {
      const searchQuery = `${selectedArea} landmarks nearby`;
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
      window.open(mapsUrl, '_blank');
    }
  };
  
  // Prepare data for price comparison chart
  const prepareChartData = () => {
    if (!areaData) return [];
    
    const chartData = [
      {
        name: 'Apartment',
        [selectedArea]: chartMode === 'buy' ? 2000000 : 18000,
        [secondArea]: compareData ? (chartMode === 'buy' ? 1800000 : 16000) : 0
      },
      {
        name: 'House',
        [selectedArea]: chartMode === 'buy' ? 5000000 : 35000,
        [secondArea]: compareData ? (chartMode === 'buy' ? 4500000 : 30000) : 0
      },
      {
        name: 'Villa',
        [selectedArea]: chartMode === 'buy' ? 8000000 : 60000,
        [secondArea]: compareData ? (chartMode === 'buy' ? 7000000 : 55000) : 0
      },
      {
        name: 'Commercial',
        [selectedArea]: chartMode === 'buy' ? 7000000 : 80000,
        [secondArea]: compareData ? (chartMode === 'buy' ? 6500000 : 75000) : 0
      }
    ];
    
    return chartData;
  };
  
  if (loading && !areaData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-background py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Area Snapshot
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Compare property prices, amenities, and living conditions across different areas
            to make informed real estate decisions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Select Primary Area</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Compare With</label>
              <Select value={secondArea} onValueChange={setSecondArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Select comparison area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.filter(area => area !== selectedArea).map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={goToGoogleMaps} 
                variant="outline" 
                className="w-full md:w-auto"
              >
                <MapIcon className="mr-2 h-4 w-4" />
                View on Google Maps
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {areaData && (
            <>
              <div className="mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-nirman-gold" />
                          {selectedArea} Overview
                        </h2>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between pb-2 border-b">
                            <span className="text-muted-foreground">Average Price</span>
                            <span className="font-medium">{formatPrice(areaData.averagePrice)}</span>
                          </div>
                          
                          <div className="flex justify-between pb-2 border-b">
                            <span className="text-muted-foreground">Crime Rate</span>
                            <span className="font-medium capitalize">{areaData.crimeRate}</span>
                          </div>
                          
                          <div className="flex justify-between pb-2 border-b">
                            <span className="text-muted-foreground">Walk Score</span>
                            <span className="font-medium">{areaData.walkScore}/100</span>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Nearby Places</h3>
                            <div className="space-y-2">
                              {areaData.nearbyPlaces.map((place, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-nirman-gold mr-2"></div>
                                    <span>{place.name}</span>
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {place.distance} km
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {compareData && (
                        <div>
                          <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <MapPin className="mr-2 h-5 w-5 text-nirman-navy" />
                            {secondArea} Overview
                          </h2>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between pb-2 border-b">
                              <span className="text-muted-foreground">Average Price</span>
                              <span className="font-medium">{formatPrice(compareData.averagePrice)}</span>
                            </div>
                            
                            <div className="flex justify-between pb-2 border-b">
                              <span className="text-muted-foreground">Crime Rate</span>
                              <span className="font-medium capitalize">{compareData.crimeRate}</span>
                            </div>
                            
                            <div className="flex justify-between pb-2 border-b">
                              <span className="text-muted-foreground">Walk Score</span>
                              <span className="font-medium">{compareData.walkScore}/100</span>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">Nearby Places</h3>
                              <div className="space-y-2">
                                {compareData.nearbyPlaces.map((place, index) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <div className="w-2 h-2 rounded-full bg-nirman-navy mr-2"></div>
                                      <span>{place.name}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {place.distance} km
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Price Comparison</h2>
                
                <div className="bg-card rounded-lg p-6 border">
                  <div className="mb-4">
                    <Tabs defaultValue="buy" className="w-full" onValueChange={(v) => setChartMode(v as 'buy' | 'rent')}>
                      <TabsList className="grid w-full max-w-xs grid-cols-2">
                        <TabsTrigger value="buy">Buy</TabsTrigger>
                        <TabsTrigger value="rent">Rent</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prepareChartData()}
                        margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => {
                          return value >= 1000000 
                            ? `${(value / 1000000).toFixed(1)}M` 
                            : value >= 1000 
                              ? `${(value / 1000).toFixed(0)}K` 
                              : value.toString();
                        }} />
                        <Tooltip 
                          formatter={(value) => [`৳ ${value.toLocaleString()}`, ""]}
                          labelFormatter={(label) => `Property Type: ${label}`}
                        />
                        <Bar dataKey={selectedArea} fill="#1A1F2C" name={selectedArea} />
                        {compareData && <Bar dataKey={secondArea} fill="#D4AF37" name={secondArea} />}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Area Recommendations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 px-6 justify-between" 
                    onClick={() => navigate('/properties?location=' + selectedArea)}
                  >
                    <div className="flex items-center">
                      <PoundSterling className="h-5 w-5 mr-3 text-nirman-gold" />
                      <div className="text-left">
                        <h3 className="font-medium">Browse Properties in {selectedArea}</h3>
                        <p className="text-sm text-muted-foreground">Find available listings in this area</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="h-auto py-4 px-6 justify-between"
                    onClick={goToGoogleMaps}
                  >
                    <div className="flex items-center">
                      <MapIcon className="h-5 w-5 mr-3 text-nirman-gold" />
                      <div className="text-left">
                        <h3 className="font-medium">Explore {selectedArea} on Maps</h3>
                        <p className="text-sm text-muted-foreground">View amenities, roads, and landmarks</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AreaSnapshot;
