
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";
import { toast } from "sonner";

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
  showNearby?: boolean;
  label?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  placeType?: "restaurant" | "school" | "hospital" | "market" | "transport" | undefined;
}

const GoogleMapsRedirect = ({ 
  location,
  className,
  showNearby = false,
  label,
  size = "default",
  variant = "outline",
  placeType = undefined
}: GoogleMapsRedirectProps) => {
  const handleRedirect = () => {
    try {
      let searchQuery;
      
      // If we have coordinates, use them for precise location
      if (location.coordinates) {
        searchQuery = `${location.coordinates.latitude},${location.coordinates.longitude}`;
      } else {
        // Otherwise use the address for location search
        searchQuery = `${location.address} ${location.area} ${location.city}`;
      }
      
      // Create appropriate Google Maps URL
      let mapsUrl;
      
      if (showNearby && placeType) {
        // Show specific nearby places like restaurants, schools, etc.
        const nearbyQuery = encodeURIComponent(searchQuery);
        mapsUrl = `https://www.google.com/maps/search/${placeType}+near+${nearbyQuery}`;
      } else if (showNearby) {
        // Show general nearby places
        const nearbyQuery = encodeURIComponent(searchQuery);
        mapsUrl = `https://www.google.com/maps/search/?api=1&query=${nearbyQuery}&query=nearby`;
      } else {
        // Just show the exact location
        const locationQuery = encodeURIComponent(searchQuery);
        mapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationQuery}`;
      }
      
      // Open in new tab
      window.open(mapsUrl, '_blank');
      
      // Show success toast
      let toastMessage = showNearby 
        ? `Opening ${placeType ? placeType + ' near' : 'nearby places around'} location in Google Maps` 
        : 'Opening location in Google Maps';
      
      toast.success(toastMessage);
    } catch (error) {
      console.error('Error redirecting to Google Maps:', error);
      toast.error("Could not open Google Maps. Please try again later.");
    }
  };
  
  return (
    <Button 
      variant={variant}
      size={size}
      onClick={handleRedirect}
      className={className || ""}
    >
      <MapPin className="mr-2 h-4 w-4" />
      {label || (showNearby ? `Explore ${placeType ? placeType + ' Nearby' : 'Nearby Places'}` : "View on Google Maps")}
      <ExternalLink className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default GoogleMapsRedirect;
