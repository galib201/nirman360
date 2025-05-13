
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'buy' | 'rent';
  type: 'apartment' | 'house' | 'villa' | 'office' | 'commercial' | 'room';
  location: {
    address: string;
    area: string;
    city: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    furnished: boolean;
    parking: boolean;
    petFriendly: boolean;
    garden: boolean;
    securitySystem: boolean;
    bachelorsAllowed: boolean;
    familiesAllowed: boolean;
    womenOnly: boolean;
    additionalFeatures: string[];
  };
  status: 'available' | 'sold' | 'rented' | 'pending';
  images: string[];
  isVerified: boolean;
  isPremium: boolean;
  postedAt: string;
  postedBy?: {
    id: string;
    name: string;
    type: 'owner' | 'agent';
    image?: string;
  };
  areaSnapshot: {
    averagePrice: number;
    nearbyPlaces: {
      name: string;
      type: string;
      distance: number;
    }[];
    crimeRate: 'low' | 'medium' | 'high';
    walkScore: number;
  };
}

export type PropertyType = 'apartment' | 'house' | 'villa' | 'office' | 'commercial' | 'room';
export type PropertyCategory = 'buy' | 'rent';
