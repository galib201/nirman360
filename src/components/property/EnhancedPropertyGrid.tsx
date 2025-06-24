
import React, { Suspense } from 'react';
import { Property } from '@/models';
import PropertyCard from '@/components/PropertyCard';
import ResponsiveGrid from '@/components/ui/responsive-grid';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Building } from 'lucide-react';
import { useViewport } from '@/hooks/useViewport';

interface EnhancedPropertyGridProps {
  properties: Property[];
  loading?: boolean;
  emptyMessage?: string;
}

const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-8 sm:py-12 border rounded-lg">
    <Building className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground opacity-20" />
    <p className="mt-4 text-muted-foreground text-sm sm:text-base px-4">
      {message}
    </p>
  </div>
);

const EnhancedPropertyGrid = ({ 
  properties, 
  loading = false, 
  emptyMessage = "No properties match your criteria. Try adjusting your filters." 
}: EnhancedPropertyGridProps) => {
  const { isMobile, isTablet } = useViewport();

  if (loading) {
    return (
      <LoadingSkeleton 
        type="card" 
        count={isMobile ? 2 : isTablet ? 4 : 6}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      />
    );
  }

  if (properties.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  const responsiveCols = {
    default: 1,
    sm: 2,
    lg: 3,
    xl: isMobile ? 2 : 4
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <p className="text-muted-foreground text-sm sm:text-base">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>
      
      <Suspense fallback={<LoadingSkeleton type="card" count={6} />}>
        <ResponsiveGrid cols={responsiveCols} gap="gap-4 sm:gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ResponsiveGrid>
      </Suspense>
    </>
  );
};

export default EnhancedPropertyGrid;
