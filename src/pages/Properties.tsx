
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Property, Filter } from "@/models";
import { PropertyService } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filter>({});
  
  useEffect(() => {
    // Get initial filters from URL params
    const initialFilters: Filter = {};
    
    const location = searchParams.get('location');
    if (location) initialFilters.location = location;
    
    const category = searchParams.get('category');
    if (category === 'buy' || category === 'rent') initialFilters.category = category;
    
    const type = searchParams.get('type');
    if (type) initialFilters.type = type as any;
    
    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) initialFilters.bedrooms = parseInt(bedrooms);
    
    const verified = searchParams.get('verified');
    if (verified === 'true') initialFilters.verified = true;
    
    setFilters(initialFilters);
    fetchProperties(initialFilters);
  }, [searchParams]);
  
  const fetchProperties = async (currentFilters: Filter) => {
    try {
      setLoading(true);
      const data = await PropertyService.getProperties(currentFilters);
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (newFilters: Filter) => {
    setFilters(newFilters);
    fetchProperties(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-background py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Browse Properties
          </h1>
          
          <PropertyFilters onFilterChange={handleFilterChange} currentFilters={filters} />
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  {properties.length} properties found
                </p>
              </div>
              
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property, index) => (
                    <div 
                      key={property.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-muted py-16 rounded-lg text-center">
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
