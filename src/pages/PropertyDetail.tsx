
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "@/models";
import { PropertyService } from "@/services/api";
import { formatDate } from "@/utils/formatters";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AreaSnapshotCard from "@/components/AreaSnapshotCard";
import PropertyImageGallery from "@/components/property/PropertyImageGallery";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyActions from "@/components/property/PropertyActions";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorState from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Home, MapPin } from "lucide-react";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { formatPrice } from "@/utils/formatters";

/**
 * PropertyDetail - Main property detail page component
 * Displays comprehensive property information including images, details, features, and actions
 */
const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const {
    handleMapRedirect,
    handleROICalculator,
    handleEMICalculator,
    handleAreaSnapshot,
    handleCompareProperty
  } = usePropertyActions(property);
  
  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError(false);
      if (id) {
        const data = await PropertyService.getPropertyById(id);
        if (data) {
          setProperty(data);
        } else {
          setError(true);
        }
      }
    } catch (error) {
      console.error('Error fetching property details:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProperty();
  }, [id]);
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }
  
  // Error or property not found state
  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 container mx-auto px-4">
          <ErrorState
            title="Property Not Found"
            message="The property you're looking for doesn't exist or has been removed."
            actionLabel="Browse Properties"
            onAction={() => window.location.href = '/properties'}
          />
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
          <PropertyHeader property={property} />
          
          {/* Property Images */}
          <PropertyImageGallery
            images={property.images}
            title={property.title}
            activeImageIndex={activeImageIndex}
            onImageSelect={setActiveImageIndex}
          />
          
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
                  <PropertyFeatures features={property.features} />
                </TabsContent>
                
                {/* Area Snapshot Tab */}
                <TabsContent value="area" className="space-y-4">
                  <AreaSnapshotCard area={property.location.area} />
                  
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Area Details</h3>
                    
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
                              <Home size={16} />
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
            
            {/* Right Column - Actions */}
            <div>
              <PropertyActions
                property={property}
                onAreaSnapshot={handleAreaSnapshot}
                onROICalculator={handleROICalculator}
                onEMICalculator={handleEMICalculator}
                onCompareProperty={handleCompareProperty}
              />
              
              {/* Quick Info Card */}
              <Card className="p-6 mt-6">
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
