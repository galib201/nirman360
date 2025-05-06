
import { BookingRequest, Filter, Property, User } from "../models";
import { MOCK_BOOKINGS, MOCK_PROPERTIES, MOCK_USERS } from "../utils/mockData";

// Simulating API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const PropertyService = {
  // Get all properties with optional filtering
  getProperties: async (filters?: Filter): Promise<Property[]> => {
    await delay(800); // Simulate API delay
    
    if (!filters) return MOCK_PROPERTIES;
    
    return MOCK_PROPERTIES.filter(property => {
      // Apply filters
      if (filters.location && 
          !property.location.area.toLowerCase().includes(filters.location.toLowerCase()) && 
          !property.location.city.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      if (filters.category && property.category !== filters.category) {
        return false;
      }
      
      if (filters.type && property.type !== filters.type) {
        return false;
      }
      
      if (filters.priceMin && property.price < filters.priceMin) {
        return false;
      }
      
      if (filters.priceMax && property.price > filters.priceMax) {
        return false;
      }
      
      if (filters.bedrooms && property.features.bedrooms < filters.bedrooms) {
        return false;
      }
      
      if (filters.bathrooms && property.features.bathrooms < filters.bathrooms) {
        return false;
      }
      
      if (filters.furnished && property.features.furnished !== filters.furnished) {
        return false;
      }
      
      if (filters.verified && property.isVerified !== filters.verified) {
        return false;
      }
      
      // Handle bachelor vs family
      if (filters.forBachelors === true) {
        if (!property.features.bachelorsAllowed) {
          return false;
        }
      }
      
      if (filters.forFamilies === true) {
        if (!property.features.familiesAllowed) {
          return false;
        }
      }
      
      // Women-only filter
      if (filters.womenOnly === true) {
        if (!property.features.womenOnly) {
          return false;
        }
      }
      
      return true;
    });
  },
  
  // Get a specific property by ID
  getPropertyById: async (id: string): Promise<Property | undefined> => {
    await delay(500);
    return MOCK_PROPERTIES.find(property => property.id === id);
  },
  
  // Get recently verified properties
  getRecentlyVerified: async (): Promise<Property[]> => {
    await delay(600);
    return MOCK_PROPERTIES.filter(property => property.isVerified)
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
      .slice(0, 4);
  },
  
  // Get premium properties
  getPremiumProperties: async (): Promise<Property[]> => {
    await delay(600);
    return MOCK_PROPERTIES.filter(property => property.isPremium)
      .slice(0, 3);
  },

  // Create rental alert (mock implementation)
  createRentalAlert: async (criteria: Record<string, any>): Promise<boolean> => {
    await delay(1000);
    console.log('Creating rental alert with criteria:', criteria);
    // In a real app, we'd store this in a database
    return true;
  }
};

export const BookingService = {
  // Create a new booking
  createBooking: async (booking: Omit<BookingRequest, "id" | "status">): Promise<BookingRequest> => {
    await delay(1000);
    const newBooking: BookingRequest = {
      ...booking,
      id: `b${MOCK_BOOKINGS.length + 1}`,
      status: "pending"
    };
    
    // In a real app, we'd push to the database
    // For now, we just return the new booking
    return newBooking;
  },
  
  // Get bookings for a user
  getUserBookings: async (userId: string): Promise<BookingRequest[]> => {
    await delay(700);
    return MOCK_BOOKINGS.filter(booking => booking.userId === userId);
  }
};

export const UserService = {
  // Get user data
  getUserData: async (userId: string): Promise<User | undefined> => {
    await delay(600);
    return MOCK_USERS.find(user => user.id === userId);
  },
  
  // Save a property to user's saved list
  saveProperty: async (userId: string, propertyId: string): Promise<boolean> => {
    await delay(800);
    // In a real app, we'd update the database
    return true;
  },
  
  // Remove a property from user's saved list
  removeSavedProperty: async (userId: string, propertyId: string): Promise<boolean> => {
    await delay(800);
    // In a real app, we'd update the database
    return true;
  }
};
