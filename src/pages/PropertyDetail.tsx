
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Property } from "@/models";
import { PropertyService } from "@/services/api";
import { formatPrice, formatDate } from "@/utils/formatters";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Check, Home, Info, MapPin, Calculator, TrendingUp, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await PropertyService.getPropertyById(id);
          if (data) {
            setProperty(data);
          }
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperty();
  }, [id]);
  
  const handleBookVisit = () => {
    // In a real app, this would open a booking form
    toast({
      title: "Booking request sent!",
      description: "You'll be redirected to complete payment of BDT 99 to unlock contact details.",
    });
  };
  
  const handleMapRedirect = () => {
    if (property) {
      const query = `${property.location.address}, ${property.location.area}, ${property.location.city}`;
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
    }
  };

  const handleROICalculator = () => {
    if (property) {
      navigate('/roi-calculator', { 
        state: { 
          propertyData: {
            price: property.price,
            title: property.title,
            location: property.location,
            area: property.features.area,
            type: property.type
          }
        }
      });
    }
  };

  const handleEMICalculator = () => {
    if (property) {
      navigate('/emi-calculator', { 
        state: { 
          propertyData: {
            price: property.price,
            title: property.title,
            location: property.location
          }
        }
      });
    }
  };

  const handleAreaSnapshot = () => {
    if (property) {
      navigate('/area-snapshot', {
        state: {
          location: property.location
        }
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-display font-semibold mb-4">Property Not Found</h1>
          <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/properties">Browse Properties</a>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Property Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-display font-semibold">{property.title}</h1>
              <div className="flex items-center mt-2">
                <MapPin size={18} className="text-muted-foreground mr-1" />
                <span className="text-muted-foreground">
                  {property.location.address}, {property.location.area}, {property.location.city}
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <h2 className="text-2xl font-semibold">
                {property.category === 'rent' ? `${formatPrice(property.price)}/mo` : formatPrice(property.price)}
              </h2>
              <div className="flex items-center mt-1">
                <Badge className="mr-2" variant={property.status === 'available' ? 'default' : 'outline'}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </Badge>
                
                {property.isVerified && (
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <Check size={14} className="mr-1" /> Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Property Images */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
            <div className="lg:col-span-3 rounded-lg overflow-hidden h-96">
              <img
                src={property.images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {property.images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`cursor-pointer rounded-lg overflow-hidden h-44 ${activeImageIndex === index ? 'ring-4 ring-nirman-gold' : ''}`}
                >
                  <img
                    src={image}
                    alt={`${property.title} image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="area">Area Snapshot</TabsTrigger>
                </TabsList>
                
                {/* Details Tab */}
                <TabsContent value="details" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Property Overview</h3>
                    <p className="text-muted-foreground mb-6">
                      {property.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Type</span>
                        <span className="font-medium capitalize">{property.type}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Bedrooms</span>
                        <span className="font-medium">{property.features.bedrooms}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Bathrooms</span>
                        <span className="font-medium">{property.features.bathrooms}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Area</span>
                        <span className="font-medium">{property.features.area} sq ft</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Key Information</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check size={16} className="text-green-500 mr-2" />
                          <span>Posted on {formatDate(property.postedAt)}</span>
                        </li>
                        <li className="flex items-center">
                          <Check size={16} className="text-green-500 mr-2" />
                          <span>
                            {property.features.furnished ? 'Furnished' : 'Unfurnished'}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check size={16} className="text-green-500 mr-2" />
                          <span>
                            {property.features.parking ? 'Parking Available' : 'No Parking'}
                          </span>
                        </li>
                        {property.features.petFriendly && (
                          <li className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span>Pet Friendly</span>
                          </li>
                        )}
                        {property.features.garden && (
                          <li className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span>Garden/Outdoor Space</span>
                          </li>
                        )}
                        {property.features.securitySystem && (
                          <li className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span>Security System</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </Card>
                </TabsContent>
                
                {/* Features Tab */}
                <TabsContent value="features" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Property Features</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-3">Main Features</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span>{property.features.bedrooms} Bedrooms</span>
                          </li>
                          <li className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span>{property.features.bathrooms} Bathrooms</span>
                          </li>
                          <li className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span>{property.features.area} sq ft</span>
                          </li>
                          <li className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span>{property.features.furnished ? 'Furnished' : 'Unfurnished'}</span>
                          </li>
                          <li className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2" />
                            <span>{property.features.parking ? 'Parking Available' : 'No Parking'}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Additional Features</h4>
                        <ul className="space-y-2">
                          {property.features.additionalFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check size={16} className="text-green-500 mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          {property.features.petFriendly && (
                            <li className="flex items-center">
                              <Check size={16} className="text-green-500 mr-2" />
                              <span>Pet Friendly</span>
                            </li>
                          )}
                          {property.features.garden && (
                            <li className="flex items-center">
                              <Check size={16} className="text-green-500 mr-2" />
                              <span>Garden/Outdoor Space</span>
                            </li>
                          )}
                          {property.features.securitySystem && (
                            <li className="flex items-center">
                              <Check size={16} className="text-green-500 mr-2" />
                              <span>Security System</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                {/* Area Snapshot Tab */}
                <TabsContent value="area" className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Area Snapshot</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-muted p-4 rounded-lg">
                        <span className="text-sm text-muted-foreground block">Average Price</span>
                        <span className="font-semibold text-lg block mt-1">
                          {formatPrice(property.areaSnapshot.averagePrice)}
                        </span>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <span className="text-sm text-muted-foreground block">Crime Rate</span>
                        <span className={`font-semibold text-lg block mt-1 capitalize ${property.areaSnapshot.crimeRate === 'low' ? 'text-green-600' : property.areaSnapshot.crimeRate === 'medium' ? 'text-amber-600' : 'text-red-600'}`}>
                          {property.areaSnapshot.crimeRate}
                        </span>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <span className="text-sm text-muted-foreground block">Walk Score</span>
                        <span className="font-semibold text-lg block mt-1">
                          {property.areaSnapshot.walkScore}/100
                        </span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-3">Nearby Places</h4>
                    <div className="space-y-3">
                      {property.areaSnapshot.nearbyPlaces.map((place, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center">
                            <div className="bg-nirman-lightblue p-1 rounded mr-2">
                              {place.type === 'restaurant' && <Home size={16} />}
                              {place.type === 'school' && <Home size={16} />}
                              {place.type === 'hospital' && <Home size={16} />}
                              {place.type === 'park' && <Home size={16} />}
                              {place.type === 'shopping' && <Home size={16} />}
                              {place.type === 'transport' && <Home size={16} />}
                            </div>
                            <span>{place.name}</span>
                          </div>
                          <span className="text-muted-foreground">{place.distance} km</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Button onClick={handleMapRedirect} variant="outline" className="w-full">
                        <MapPin size={16} className="mr-2" />
                        View on Google Maps
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Contact and Actions */}
            <div>
              {/* Book a Visit Card */}
              <Card className="p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Book a Visit</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule a visit to see this property in person
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mb-4">
                      <Calendar size={16} className="mr-2" />
                      Book a Visit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book a Visit</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 px-2">
                      <p className="mb-4">
                        A small fee of <strong>BDT 99</strong> is required to unlock contact details and book a visit.
                      </p>
                      <p className="text-sm mb-6">
                        This helps us ensure that only genuine visitors can book appointments.
                      </p>
                      <Button onClick={handleBookVisit} className="w-full">
                        Pay BDT 99 to Continue
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" className="w-full">
                  Save Property
                </Button>
              </Card>

              {/* Additional Options for Properties for Sale */}
              {property.category === 'buy' && (
                <Card className="p-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4">Property Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get detailed insights and calculations for this property
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleAreaSnapshot}
                    >
                      <MapPin size={16} className="mr-2" />
                      Detailed Area Snapshot
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleROICalculator}
                    >
                      <TrendingUp size={16} className="mr-2" />
                      Calculate ROI
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleEMICalculator}
                    >
                      <CreditCard size={16} className="mr-2" />
                      EMI Calculator
                    </Button>
                  </div>
                </Card>
              )}
              
              {/* Legal Help Card */}
              <Card className="p-6 mb-6 bg-nirman-lightblue border-none">
                <div className="flex items-start mb-4">
                  <Info size={24} className="text-nirman-navy mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Need Legal Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      Get professional assistance with documentation and legal formalities
                    </p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  Explore Legal Services
                </Button>
              </Card>
              
              {/* Area Snapshot Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Info</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-medium">{property.id}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-medium">{formatDate(property.postedAt)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium capitalize">{property.status}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
