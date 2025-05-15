
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Property, Filter } from "@/models";
import { PropertyService } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import "../styles/pages/properties.css";

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
    <div className="properties-container">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto px-4 py-12">
          <div className="hero-content text-center">
            <h1 className="hero-title">Find Your Dream Property</h1>
            <p className="hero-subtitle">Browse through our exclusive collection of premium properties</p>
            <div className="hero-badges">
              <span className="hero-badge">Verified Listings</span>
              <span className="hero-badge">Premium Support</span>
              <span className="hero-badge">Secure Transactions</span>
            </div>
          </div>
        </div>
      </section>
      
      <main className="properties-main">
        <div className="container mx-auto px-4">
          <PropertyFilters onFilterChange={handleFilterChange} currentFilters={filters} />
          
          {loading ? (
            <div className="properties-loading">
              <div className="properties-spinner"></div>
            </div>
          ) : (
            <>
              <div className="properties-header">
                <h2 className="properties-title">
                  Available Properties
                  <span className="properties-count"> ({properties.length} found)</span>
                </h2>
                <div className="properties-sort">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select id="sort-select" className="sort-select">
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
              
              {properties.length > 0 ? (
                <div className="properties-grid">
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
                <div className="properties-empty">
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
