
// Model types for the application
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: Location;
  features: PropertyFeatures;
  type: PropertyType;
  category: PropertyCategory;
  status: PropertyStatus;
  images: string[];
  isVerified: boolean;
  isPremium: boolean;
  postedAt: string;
  areaSnapshot: AreaSnapshot;
}

export interface Location {
  address: string;
  city: string;
  area: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  area: number; // in square feet
  furnished: boolean;
  parking: boolean;
  petFriendly: boolean;
  garden: boolean;
  securitySystem: boolean;
  additionalFeatures: string[];
}

export type PropertyType = 'apartment' | 'house' | 'villa' | 'land' | 'commercial';

export type PropertyCategory = 'rent' | 'buy';

export type PropertyStatus = 'available' | 'pending' | 'sold' | 'rented';

export interface AreaSnapshot {
  averagePrice: number;
  nearbyPlaces: NearbyPlace[];
  crimeRate: 'low' | 'medium' | 'high';
  walkScore: number; // 0-100
}

export interface NearbyPlace {
  name: string;
  type: 'restaurant' | 'school' | 'hospital' | 'park' | 'shopping' | 'transport';
  distance: number; // in kilometers
}

export interface BookingRequest {
  id: string;
  propertyId: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedProperties: string[];
  bookings: string[];
  inquiries: string[];
}

export interface Filter {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  category?: PropertyCategory;
  type?: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  forBachelors?: boolean;
  forFamilies?: boolean;
  womenOnly?: boolean;
  verified?: boolean;
}
