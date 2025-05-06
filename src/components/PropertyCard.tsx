
import { Property } from "@/models";
import { formatPrice } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/properties/${property.id}`} className="property-card group block">
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {property.isVerified && (
          <div className="property-badge verified-badge flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified
          </div>
        )}
        
        {property.isPremium && (
          <div className="property-badge premium-badge absolute top-3 left-3">
            Premium
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin size={14} className="mr-1" />
          <span>{property.location.area}, {property.location.city}</span>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="font-semibold text-lg">
            {property.category === 'rent' ? `${formatPrice(property.price)}/mo` : formatPrice(property.price)}
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {property.features.bedrooms} {property.features.bedrooms === 1 ? 'Bed' : 'Beds'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {property.features.bathrooms} {property.features.bathrooms === 1 ? 'Bath' : 'Baths'}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
