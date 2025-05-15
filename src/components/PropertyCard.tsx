
import React from 'react';
import { Property } from '@/models';
import '../styles/components/property-card.css';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formattedPrice = `৳${property.price.toLocaleString()}`;
  
  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          className="property-image" 
          src={property.images[0]} 
          alt={property.title} 
        />
        <div className="property-badges">
          {property.isVerified && (
            <span className="property-badge verified-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="verified-icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Verified
            </span>
          )}
          {property.isPremium && (
            <span className="property-badge premium-badge">Premium</span>
          )}
        </div>
      </div>
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <div className="property-location">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="location-icon">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {property.location.area}, {property.location.city}
        </div>
        <div className="property-footer">
          <div className="property-price">{formattedPrice}</div>
          <div className="property-features">
            <span className="feature-badge">{property.features.bedrooms} beds</span>
            <span className="feature-badge">{property.features.bathrooms} baths</span>
            <span className="feature-badge">{property.features.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
