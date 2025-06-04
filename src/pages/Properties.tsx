
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyCard from "@/components/PropertyCard";
import { Property, Filter } from "@/models";
import { PropertyService } from "@/services/api";
import { Building } from "lucide-react";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<Filter>({});

  // Get category from URL params
  const category = searchParams.get('category') as 'buy' | 'rent' || 'buy';

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await PropertyService.getProperties();
        setProperties(data);
        
        // Filter by category immediately
        const categoryFiltered = data.filter(property => property.category === category);
        setFilteredProperties(categoryFiltered);
        setCurrentFilters({ category });
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [category]);

  const handleFilterChange = (filters: Filter) => {
    setCurrentFilters(filters);
    
    let filtered = properties.filter(property => property.category === category);
    
    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.area.toLowerCase().includes(filters.location!.toLowerCase()) ||
        property.location.city.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.priceMin && filters.priceMax) {
      filtered = filtered.filter(property => 
        property.price >= filters.priceMin! && property.price <= filters.priceMax!
      );
    }
    
    if (filters.bedrooms) {
      filtered = filtered.filter(property => 
        property.features.bedrooms >= filters.bedrooms!
      );
    }
    
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }
    
    if (filters.furnished) {
      filtered = filtered.filter(property => property.features.furnished);
    }
    
    if (filters.verified) {
      filtered = filtered.filter(property => property.isVerified);
    }
    
    if (filters.forBachelors && category === 'rent') {
      filtered = filtered.filter(property => property.features.petFriendly);
    }
    
    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-nirman-navy">
              {category === 'buy' ? 'Properties for Sale' : 'Properties for Rent'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {category === 'buy' 
                ? 'Find your perfect property to purchase in Bangladesh' 
                : 'Discover rental properties across Bangladesh'
              }
            </p>
          </div>
          
          <PropertyFilters 
            onFilterChange={handleFilterChange}
            currentFilters={currentFilters}
            category={category}
          />
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-nirman-navy border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                </p>
              </div>
              
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <Building className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="mt-4 text-muted-foreground">
                    No properties match your criteria. Try adjusting your filters.
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
