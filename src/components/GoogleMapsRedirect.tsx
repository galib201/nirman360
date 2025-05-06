import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";

interface GoogleMapsRedirectProps {
  location: {
    address: string;
    city: string;
    area: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  className?: string;
}

const GoogleMapsRedirect = ({ location, className }: GoogleMapsRedirectProps) => {
  const handleRedirect = () => {
    let searchQuery;
    
    // If we have coordinates, use them for precise location
    if (location.coordinates) {
      searchQuery = `${location.coordinates.latitude},${location.coordinates.longitude}`;
    } else {
      // Otherwise use the address for location search
      searchQuery = `${location.address} ${location.area} ${location.city}`;
    }
    
    // Add "nearby" to show nearby places
    const nearbyQuery = `${searchQuery}&query=nearby`;
    
    // Create Google Maps URL
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nearbyQuery)}`;
    
    // Open in new tab
    window.open(mapsUrl, '_blank');
  };
  
  return (
    <Button 
      variant="outline" 
      onClick={handleRedirect}
      className={className || ""}
    >
      <MapPin className="mr-2 h-4 w-4" />
      View on Google Maps
      <ExternalLink className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default GoogleMapsRedirect;
