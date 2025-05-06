
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Property } from "@/models";
import { PropertyService } from "@/services/api";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Home, Building2, Users, Sofa, UserRound } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<"buy" | "rent">("buy");
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [premiumProperties, setPremiumProperties] = useState<Property[]>([]);
  const [recentlyVerified, setRecentlyVerified] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Rent-specific filters
  const [forBachelors, setForBachelors] = useState(false);
  const [forFamilies, setForFamilies] = useState(false);
  const [isFurnished, setIsFurnished] = useState(false);
  const [womenOnly, setWomenOnly] = useState(false);
  const [propertyType, setPropertyType] = useState<string>("");
  const [isRentalAlertModalOpen, setIsRentalAlertModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // Fetch premium properties
        const premium = await PropertyService.getPremiumProperties();
        setPremiumProperties(premium);
        
        // Fetch recently verified properties
        const verified = await PropertyService.getRecentlyVerified();
        setRecentlyVerified(verified);
        
        // Fetch all properties for featured section
        const all = await PropertyService.getProperties();
        setFeaturedProperties(all.slice(0, 6)); // Get first 6 properties
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: Record<string, any> = {
      location: searchQuery,
      category: category
    };
    
    // Add rent-specific filters if category is rent
    if (category === "rent") {
      if (forBachelors) filters.forBachelors = true;
      if (forFamilies) filters.forFamilies = true;
      if (isFurnished) filters.furnished = true;
      if (womenOnly) filters.womenOnly = true;
      if (propertyType) filters.type = propertyType;
    }
    
    // Convert filters to query params
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    
    navigate(`/properties?${searchParams.toString()}`);
  };

  const handleRentalAlert = () => {
    toast.success("Rental alert created! We'll notify you when matching properties are listed.");
    setIsRentalAlertModalOpen(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-premium py-16 md:py-24 text-white">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Perfect <span className="text-nirman-gold">Property</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Your trusted platform for verified premium real estate listings across Bangladesh
            </p>
            
            <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 md:p-4 shadow-lg max-w-2xl mx-auto">
              <div className="flex flex-col gap-4">
                <Tabs 
                  defaultValue={category} 
                  className="w-full" 
                  onValueChange={(value) => setCategory(value as "buy" | "rent")}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="rent">Rent</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-4">
                    <div className="relative flex w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search by location, area, or city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>

                  <TabsContent value="rent" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 text-left">
                        <div className="text-sm font-medium text-gray-700">For</div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="bachelors" 
                              checked={forBachelors}
                              onCheckedChange={(checked) => {
                                setForBachelors(checked === true);
                                if (checked && forFamilies) setForFamilies(false);
                              }}
                            />
                            <Label htmlFor="bachelors" className="text-gray-700">Bachelors</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="families" 
                              checked={forFamilies}
                              onCheckedChange={(checked) => {
                                setForFamilies(checked === true);
                                if (checked && forBachelors) setForBachelors(false);
                              }}
                            />
                            <Label htmlFor="families" className="text-gray-700">Families</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="womenOnly"
                              checked={womenOnly}
                              onCheckedChange={(checked) => setWomenOnly(checked === true)}
                            />
                            <Label htmlFor="womenOnly" className="text-gray-700">Women Only</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-left">
                        <div className="text-sm font-medium text-gray-700">Options</div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="furnished" 
                              checked={isFurnished}
                              onCheckedChange={(checked) => setIsFurnished(checked === true)}
                            />
                            <Label htmlFor="furnished" className="text-gray-700">Furnished</Label>
                          </div>
                          <div>
                            <Select value={propertyType} onValueChange={setPropertyType}>
                              <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Property Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="room">Room</SelectItem>
                                <SelectItem value="office">Office</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => toast.success("Rental alert created! We'll notify you when matching properties are listed.")}
                      >
                        Create Rental Alert
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button type="submit" className="w-full">
                  Search Properties
                </Button>
              </div>
            </form>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-nirman-gold bg-opacity-20 p-3 mb-3">
                  <svg className="w-5 h-5 text-nirman-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm">Verified Listings</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-nirman-gold bg-opacity-20 p-3 mb-3">
                  <svg className="w-5 h-5 text-nirman-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9L12 5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 19H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">Free to Post</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-nirman-gold bg-opacity-20 p-3 mb-3">
                  <svg className="w-5 h-5 text-nirman-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.287 15.9606C19.3468 16.285 19.5043 16.5843 19.738 16.8101C19.9717 17.0359 20.2717 17.1852 20.5967 17.2371C20.9216 17.2889 21.255 17.241 21.55 17.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2C13.8565 3.57383 14.9697 5.81417 15 8.165V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2C10.1435 3.57383 9.03029 5.81417 9 8.165V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-nirman-gold bg-opacity-20 p-3 mb-3">
                  <svg className="w-5 h-5 text-nirman-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8H19C20.1046 8 21 8.89543 21 10V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10C3 8.89543 3.89543 8 5 8H6M15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5M15 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20V20.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm">Legal Help</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-10">Featured Properties</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProperties.map(property => (
                  <div key={property.id} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Button asChild variant="outline" size="lg">
                  <a href="/properties">View All Properties</a>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Premium Properties */}
      <section className="py-12 md:py-16 bg-nirman-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-4">Premium Properties</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Handpicked luxury properties that offer exceptional quality, location, and amenities
          </p>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumProperties.map((property, index) => (
                <div 
                  key={property.id} 
                  className={`animate-fade-in ${index === 0 ? 'md:col-span-2' : ''}`}
                  style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Recently Verified */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-4">Recently Verified Near You</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Freshly verified properties in your area that meet our quality standards
          </p>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyVerified.map((property, index) => (
                <div 
                  key={property.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 md:py-16 bg-nirman-lightblue">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-10">How Nirman360 Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mb-4">
                <span className="text-2xl font-semibold text-nirman-navy">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Search Properties</h3>
              <p className="text-muted-foreground">
                Browse our extensive collection of verified properties using our smart filters
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mb-4">
                <span className="text-2xl font-semibold text-nirman-navy">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Book a Visit</h3>
              <p className="text-muted-foreground">
                Schedule a convenient time to visit the property with our booking system
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mb-4">
                <span className="text-2xl font-semibold text-nirman-navy">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Close the Deal</h3>
              <p className="text-muted-foreground">
                Finalize your transaction with confidence using our legal assistance and deal tracking
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-12 md:py-16 bg-gradient-premium text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
            Ready to List Your Property?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            Reach thousands of potential buyers and renters with our free listing service. Get your property verified for better visibility!
          </p>
          <Button size="lg" className="bg-nirman-gold text-nirman-navy hover:bg-opacity-90">
            Post Your Property Now
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
