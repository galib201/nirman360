// Property related types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    area: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  features: PropertyFeatures;
  type: PropertyType;
  category: PropertyCategory;
  status: "available" | "sold" | "rented" | "pending";
  images: string[];
  isVerified: boolean;
  isPremium: boolean;
  postedAt: string;
  areaSnapshot?: AreaSnapshot;
  // Adding missing properties used in FindProperty.tsx
  views?: number;
  amenities?: string[];
  details?: {
    bedrooms: number;
    [key: string]: any;
  };
}

export type PropertyType = "apartment" | "house" | "villa" | "commercial" | "room" | "office";
export type PropertyCategory = "buy" | "rent";

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: boolean;
  parking: boolean;
  petFriendly: boolean;
  garden: boolean;
  securitySystem: boolean;
  bachelorsAllowed?: boolean;  // Added this property
  familiesAllowed?: boolean;   // Added this property
  womenOnly?: boolean;         // Added this property
  additionalFeatures: string[];
}

export interface AreaSnapshot {
  averagePrice: number;
  nearbyPlaces: {
    name: string;
    type: string;
    distance: number;
  }[];
  crimeRate: "low" | "medium" | "high";
  walkScore: number;
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedProperties: string[];
  bookings: string[];
  inquiries: string[];
}

// Booking related types
export interface BookingRequest {
  id: string;
  propertyId: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

// Filter types
export interface Filter {
  location?: string;
  category?: PropertyCategory;
  type?: PropertyType;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  verified?: boolean;
  forBachelors?: boolean;
  forFamilies?: boolean;
  womenOnly?: boolean;
}

// Nirman AI related types
export interface AIRecommendation {
  propertyId: string;
  score: number;
  matchReason: string;
}

export interface AIUserPreference {
  budget: {
    min: number;
    max: number;
  };
  location: string[];
  propertyType: string[];
  bedrooms: number;
  purpose: PropertyCategory;
  lifestyle: "bachelor" | "family" | "professional" | "student";
  amenities: string[];
}

// Trusted Developer related types
export interface TrustedDeveloper {
  id: string;
  name: string;
  description: string;
  establishedYear: number;
  completedProjects: number;
  rating: number;
  specializations: string[];
  location: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  certifications: string[];
  image: string;
}

// Property Building related types
export interface PropertyBuildingRequest {
  buildingType: "apartment" | "duplex" | "commercial" | "villa" | "house";
  landArea: number; // in square feet
  floors: number;
  location: string;
  luxuryLevel: "standard" | "premium" | "luxury";
  timeframe: number; // in months
  roomRequirements?: {
    bedrooms: number;
    bathrooms: number;
    additionalRooms: string[];
  };
  budget?: number;
  specialRequirements?: string[];
}

export interface BuildingCostBreakdown {
  landCost: number;
  materialCost: number;
  laborCost: number;
  designCost: number;
  permitCost: number;
  finishingCost: number;
  electricalPlumbingCost: number;
  miscCost: number;
  totalCost: number;
  timeline: {
    planning: number; // in months
    foundation: number;
    structure: number;
    finishing: number;
    total: number;
  };
  recommendedDevelopers: TrustedDeveloper[];
}
