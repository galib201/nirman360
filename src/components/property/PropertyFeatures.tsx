
import React from 'react';
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Property } from "@/models";

interface PropertyFeaturesProps {
  features: Property['features'];
}

/**
 * PropertyFeatures - Displays property features in a structured layout
 * @param features - Property features object containing all amenities and details
 */
const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features }) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Property Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Features */}
        <div>
          <h4 className="font-medium mb-3">Main Features</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check size={16} className="text-green-500 mr-2" />
              <span>{features.bedrooms} Bedrooms</span>
            </li>
            <li className="flex items-center">
              <Check size={16} className="text-green-500 mr-2" />
              <span>{features.bathrooms} Bathrooms</span>
            </li>
            <li className="flex items-center">
              <Check size={16} className="text-green-500 mr-2" />
              <span>{features.area} sq ft</span>
            </li>
            <li className="flex items-center">
              <Check size={16} className="text-green-500 mr-2" />
              <span>{features.furnished ? 'Furnished' : 'Unfurnished'}</span>
            </li>
            <li className="flex items-center">
              <Check size={16} className="text-green-500 mr-2" />
              <span>{features.parking ? 'Parking Available' : 'No Parking'}</span>
            </li>
          </ul>
        </div>
        
        {/* Additional Features */}
        <div>
          <h4 className="font-medium mb-3">Additional Features</h4>
          <ul className="space-y-2">
            {features.additionalFeatures.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check size={16} className="text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
            {features.petFriendly && (
              <li className="flex items-center">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Pet Friendly</span>
              </li>
            )}
            {features.garden && (
              <li className="flex items-center">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Garden/Outdoor Space</span>
              </li>
            )}
            {features.securitySystem && (
              <li className="flex items-center">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Security System</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default PropertyFeatures;
