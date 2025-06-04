
import React, { useState } from "react";
import { Property } from "@/models";
import { PropertyService } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatPrice } from "@/utils/formatters";
import { Building, MapPin, Bed, Bath, Square, Car, Check, X } from "lucide-react";

interface ComparePropertyProps {
  selectedProperty?: Property;
  onClose?: () => void;
}

const CompareProperty = ({ selectedProperty, onClose }: ComparePropertyProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [compareProperty, setCompareProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await PropertyService.getProperties();
        // Filter out the currently selected property
        const filteredProperties = data.filter(p => p.id !== selectedProperty?.id);
        setProperties(filteredProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [selectedProperty]);

  const handleCompareSelect = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    setCompareProperty(property || null);
  };

  const ComparisonFeature = ({ 
    label, 
    value1, 
    value2, 
    isBetter1, 
    isBetter2 
  }: { 
    label: string; 
    value1: string | number; 
    value2: string | number; 
    isBetter1?: boolean; 
    isBetter2?: boolean; 
  }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b">
      <div className="font-medium">{label}</div>
      <div className={`text-center ${isBetter1 ? 'text-green-600 font-semibold' : ''}`}>
        {value1}
        {isBetter1 && <Check size={16} className="inline ml-1" />}
      </div>
      <div className={`text-center ${isBetter2 ? 'text-green-600 font-semibold' : ''}`}>
        {value2}
        {isBetter2 && <Check size={16} className="inline ml-1" />}
      </div>
    </div>
  );

  if (!selectedProperty) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Property Selected</h3>
          <p className="text-muted-foreground">
            Please select a property from the property details page to start comparison.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Compare Properties</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Property to Compare</CardTitle>
          <CardDescription>
            Choose another property to compare with {selectedProperty.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleCompareSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a property to compare" />
            </SelectTrigger>
            <SelectContent>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.title} - {formatPrice(property.price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {compareProperty && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Cards */}
          <Card>
            <CardHeader>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg">{selectedProperty.title}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {selectedProperty.location.area}, {selectedProperty.location.city}
              </CardDescription>
              <div className="text-xl font-semibold text-nirman-gold">
                {formatPrice(selectedProperty.price)}
                {selectedProperty.category === 'rent' && '/mo'}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={compareProperty.images[0]}
                  alt={compareProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg">{compareProperty.title}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {compareProperty.location.area}, {compareProperty.location.city}
              </CardDescription>
              <div className="text-xl font-semibold text-nirman-gold">
                {formatPrice(compareProperty.price)}
                {compareProperty.category === 'rent' && '/mo'}
              </div>
            </CardHeader>
          </Card>

          {/* Detailed Comparison */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="grid grid-cols-3 gap-4 py-3 border-b font-semibold bg-muted">
                    <div>Feature</div>
                    <div className="text-center">{selectedProperty.title}</div>
                    <div className="text-center">{compareProperty.title}</div>
                  </div>

                  <ComparisonFeature
                    label="Price"
                    value1={formatPrice(selectedProperty.price)}
                    value2={formatPrice(compareProperty.price)}
                    isBetter1={selectedProperty.price < compareProperty.price}
                    isBetter2={compareProperty.price < selectedProperty.price}
                  />

                  <ComparisonFeature
                    label="Price per sq ft"
                    value1={`৳${Math.round(selectedProperty.price / selectedProperty.features.area)}`}
                    value2={`৳${Math.round(compareProperty.price / compareProperty.features.area)}`}
                    isBetter1={(selectedProperty.price / selectedProperty.features.area) < (compareProperty.price / compareProperty.features.area)}
                    isBetter2={(compareProperty.price / compareProperty.features.area) < (selectedProperty.price / selectedProperty.features.area)}
                  />

                  <ComparisonFeature
                    label="Area"
                    value1={`${selectedProperty.features.area} sq ft`}
                    value2={`${compareProperty.features.area} sq ft`}
                    isBetter1={selectedProperty.features.area > compareProperty.features.area}
                    isBetter2={compareProperty.features.area > selectedProperty.features.area}
                  />

                  <ComparisonFeature
                    label="Bedrooms"
                    value1={selectedProperty.features.bedrooms}
                    value2={compareProperty.features.bedrooms}
                    isBetter1={selectedProperty.features.bedrooms > compareProperty.features.bedrooms}
                    isBetter2={compareProperty.features.bedrooms > selectedProperty.features.bedrooms}
                  />

                  <ComparisonFeature
                    label="Bathrooms"
                    value1={selectedProperty.features.bathrooms}
                    value2={compareProperty.features.bathrooms}
                    isBetter1={selectedProperty.features.bathrooms > compareProperty.features.bathrooms}
                    isBetter2={compareProperty.features.bathrooms > selectedProperty.features.bathrooms}
                  />

                  <ComparisonFeature
                    label="Furnished"
                    value1={selectedProperty.features.furnished ? "Yes" : "No"}
                    value2={compareProperty.features.furnished ? "Yes" : "No"}
                    isBetter1={selectedProperty.features.furnished && !compareProperty.features.furnished}
                    isBetter2={compareProperty.features.furnished && !selectedProperty.features.furnished}
                  />

                  <ComparisonFeature
                    label="Parking"
                    value1={selectedProperty.features.parking ? "Yes" : "No"}
                    value2={compareProperty.features.parking ? "Yes" : "No"}
                    isBetter1={selectedProperty.features.parking && !compareProperty.features.parking}
                    isBetter2={compareProperty.features.parking && !selectedProperty.features.parking}
                  />

                  <ComparisonFeature
                    label="Verified"
                    value1={selectedProperty.isVerified ? "Yes" : "No"}
                    value2={compareProperty.isVerified ? "Yes" : "No"}
                    isBetter1={selectedProperty.isVerified && !compareProperty.isVerified}
                    isBetter2={compareProperty.isVerified && !selectedProperty.isVerified}
                  />

                  <ComparisonFeature
                    label="Walk Score"
                    value1={`${selectedProperty.areaSnapshot.walkScore}/100`}
                    value2={`${compareProperty.areaSnapshot.walkScore}/100`}
                    isBetter1={selectedProperty.areaSnapshot.walkScore > compareProperty.areaSnapshot.walkScore}
                    isBetter2={compareProperty.areaSnapshot.walkScore > selectedProperty.areaSnapshot.walkScore}
                  />

                  <ComparisonFeature
                    label="Crime Rate"
                    value1={selectedProperty.areaSnapshot.crimeRate}
                    value2={compareProperty.areaSnapshot.crimeRate}
                    isBetter1={selectedProperty.areaSnapshot.crimeRate === 'low' && compareProperty.areaSnapshot.crimeRate !== 'low'}
                    isBetter2={compareProperty.areaSnapshot.crimeRate === 'low' && selectedProperty.areaSnapshot.crimeRate !== 'low'}
                  />
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Additional Features - {selectedProperty.title}</h4>
                    <div className="space-y-2">
                      {selectedProperty.features.additionalFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check size={16} className="text-green-500 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Additional Features - {compareProperty.title}</h4>
                    <div className="space-y-2">
                      {compareProperty.features.additionalFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check size={16} className="text-green-500 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareProperty;
