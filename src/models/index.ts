
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
  type: "apartment" | "house" | "villa" | "commercial" | "room" | "office";
  category: "buy" | "rent";
  status: "available" | "sold" | "rented" | "pending";
  images: string[];
  isVerified: boolean;
  isPremium: boolean;
  postedAt: string;
  areaSnapshot?: AreaSnapshot;
}

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
  category?: "buy" | "rent";
  type?: "apartment" | "house" | "villa" | "commercial" | "room" | "office";
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
  purpose: "buy" | "rent";
  lifestyle: "bachelor" | "family" | "professional" | "student";
  amenities: string[];
}
