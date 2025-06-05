
import React from 'react';
import { Property } from '@/models';
import PropertyCard from '@/components/PropertyCard';
import { Building } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  emptyMessage?: string;
}

const PropertyGrid = ({ 
  properties, 
  loading = false, 
  emptyMessage = "No properties match your criteria. Try adjusting your filters." 
}: PropertyGridProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <Building className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
        <p className="mt-4 text-muted-foreground">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  );
};

export default PropertyGrid;
