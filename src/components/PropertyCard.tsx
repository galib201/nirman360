
import { Property } from "@/models";
import { formatPrice } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/properties/${property.id}`} className="property-card">
      <div className="property-image-container">
        <img
          src={property.images[0]}
          alt={property.title}
          className="property-image"
        />
        
        {property.isVerified && (
          <div className="property-badge verified-badge">
            <svg className="verified-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified
          </div>
        )}
        
        {property.isPremium && (
          <div className="property-badge premium-badge">
            Premium
          </div>
        )}
      </div>
      
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        
        <div className="property-location">
          <MapPin className="location-icon" />
          <span>{property.location.area}, {property.location.city}</span>
        </div>
        
        <div className="property-footer">
          <div className="property-price">
            {property.category === 'rent' ? `${formatPrice(property.price)}/mo` : formatPrice(property.price)}
          </div>
          
          <div className="property-features">
            <Badge variant="outline" className="feature-badge">
              {property.features.bedrooms} {property.features.bedrooms === 1 ? 'Bed' : 'Beds'}
            </Badge>
            <Badge variant="outline" className="feature-badge">
              {property.features.bathrooms} {property.features.bathrooms === 1 ? 'Bath' : 'Baths'}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
