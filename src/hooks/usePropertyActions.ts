
import { useNavigate } from "react-router-dom";
import { Property } from "@/models";

/**
 * Custom hook for property-related navigation actions
 * Centralizes navigation logic for property detail actions
 */
export const usePropertyActions = (property: Property | null) => {
  const navigate = useNavigate();

  const handleMapRedirect = () => {
    if (property) {
      const query = `${property.location.address}, ${property.location.area}, ${property.location.city}`;
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
    }
  };

  const handleROICalculator = () => {
    if (property) {
      navigate('/roi-calculator', { 
        state: { 
          propertyData: {
            price: property.price,
            title: property.title,
            location: property.location,
            area: property.features.area,
            type: property.type
          }
        }
      });
    }
  };

  const handleEMICalculator = () => {
    if (property) {
      navigate('/emi-calculator', { 
        state: { 
          propertyData: {
            price: property.price,
            title: property.title,
            location: property.location
          }
        }
      });
    }
  };

  const handleAreaSnapshot = () => {
    if (property) {
      navigate('/area-snapshot', {
        state: {
          location: property.location
        }
      });
    }
  };

  const handleCompareProperty = () => {
    if (property) {
      navigate('/compare-property', {
        state: {
          property: property
        }
      });
    }
  };

  return {
    handleMapRedirect,
    handleROICalculator,
    handleEMICalculator,
    handleAreaSnapshot,
    handleCompareProperty
  };
};
