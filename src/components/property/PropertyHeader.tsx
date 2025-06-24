
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Check, MapPin } from "lucide-react";
import { formatPrice } from "@/utils/formatters";
import { Property } from "@/models";

interface PropertyHeaderProps {
  property: Property;
}

/**
 * PropertyHeader - Displays property title, location, price and status badges
 * @param property - Property object containing details to display
 */
const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  return (
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
  );
};

export default PropertyHeader;
