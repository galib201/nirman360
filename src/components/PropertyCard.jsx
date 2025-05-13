
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, ArrowRight } from 'lucide-react';
import '../styles/components/property-card.css';

const PropertyCard = ({ property }) => {
  if (!property) return null;
  
  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="property-image"
        />
        
        <div className="property-badges">
          {property.verified && (
            <span className="property-badge property-badge-verified">Verified</span>
          )}
          {property.featured && (
            <span className="property-badge property-badge-featured">Featured</span>
          )}
          {property.hot && (
            <span className="property-badge property-badge-hot">Hot</span>
          )}
        </div>
      </div>
      
      <div className="property-content">
        <h3 className="property-title">
          <Link to={`/properties/${property.id}`}>{property.title}</Link>
        </h3>
        
        <div className="property-location">
          {property.location.area}, {property.location.city}
        </div>
        
        <div className="property-features">
          {property.bedrooms && (
            <div className="property-feature">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          
          {property.bathrooms && (
            <div className="property-feature">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          
          {property.size && (
            <div className="property-feature">
              <Square className="h-4 w-4" />
              <span>{property.size} sqft</span>
            </div>
          )}
        </div>
        
        <div className="property-price">
          {formatPrice(property.price)}
          {property.category === 'rent' && <span className="property-price-rent">/month</span>}
        </div>
        
        <div className="property-actions">
          <Button asChild size="sm" className="w-full">
            <Link to={`/properties/${property.id}`}>
              View Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
