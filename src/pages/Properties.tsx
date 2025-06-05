
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyGrid from "@/components/property/PropertyGrid";
import { usePropertyData } from "@/hooks/usePropertyData";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') as 'buy' | 'rent' || 'buy';
  
  const {
    filteredProperties,
    loading,
    currentFilters,
    applyFilters
  } = usePropertyData(category);

  const title = category === 'buy' ? 'Properties for Sale' : 'Properties for Rent';
  const subtitle = category === 'buy' 
    ? 'Find your perfect property to purchase in Bangladesh' 
    : 'Discover rental properties across Bangladesh';

  return (
    <PageLayout title={title} subtitle={subtitle}>
      <PropertyFilters 
        onFilterChange={applyFilters}
        currentFilters={currentFilters}
        category={category}
      />
      
      <PropertyGrid 
        properties={filteredProperties}
        loading={loading}
      />
    </PageLayout>
  );
};

export default Properties;
