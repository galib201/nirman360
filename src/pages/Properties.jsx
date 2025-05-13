
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PropertyService } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import "../styles/pages/properties.css";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    // Get initial filters from URL params
    const initialFilters = {};
    
    const location = searchParams.get('location');
    if (location) initialFilters.location = location;
    
    const category = searchParams.get('category');
    if (category === 'buy' || category === 'rent') initialFilters.category = category;
    
    const type = searchParams.get('type');
    if (type) initialFilters.type = type;
    
    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) initialFilters.bedrooms = parseInt(bedrooms);
    
    const verified = searchParams.get('verified');
    if (verified === 'true') initialFilters.verified = true;
    
    setFilters(initialFilters);
    fetchProperties(initialFilters);
  }, [searchParams]);
  
  const fetchProperties = async (currentFilters) => {
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
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchProperties(newFilters);
  };
  
  return (
    <div className="properties-container">
      <Header />
      
      <main className="properties-main">
        <div className="container mx-auto px-4">
          <h1 className="properties-title">
            Browse Properties
          </h1>
          
          <PropertyFilters onFilterChange={handleFilterChange} currentFilters={filters} />
          
          {loading ? (
            <div className="properties-loading">
              <div className="properties-spinner"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="properties-count">
                  {properties.length} properties found
                </p>
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
