
import { AIRecommendation, AIUserPreference, BookingRequest, BuildingCostBreakdown, Filter, Property, PropertyBuildingRequest, TrustedDeveloper, User } from "../models";
import { MOCK_AI_USER_PREFERENCES, MOCK_BOOKINGS, MOCK_PROPERTIES, MOCK_USERS } from "../utils/mockData";
import { MOCK_TRUSTED_DEVELOPERS } from "../utils/developerData";

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
  
  // Get properties by category (buy or rent)
  getPropertiesByCategory: async (category: "buy" | "rent"): Promise<Property[]> => {
    await delay(600);
    return MOCK_PROPERTIES.filter(property => property.category === category);
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
  },
  
  // Get AI recommendations based on user preferences
  getAIRecommendations: async (preferences: AIUserPreference): Promise<Property[]> => {
    await delay(1500); // Simulate AI processing time
    
    // Filter properties based on AI preference criteria
    const filteredProperties = MOCK_PROPERTIES.filter(property => {
      // Match purpose (buy/rent)
      if (property.category !== preferences.purpose) return false;
      
      // Match budget range
      if (property.price < preferences.budget.min || property.price > preferences.budget.max) return false;
      
      // Match location if specified
      if (preferences.location.length > 0 && 
          !preferences.location.includes(property.location.area)) {
        return false;
      }
      
      // Match property type if specified
      if (preferences.propertyType.length > 0 && 
          !preferences.propertyType.includes(property.type)) {
        return false;
      }
      
      // Match minimum bedrooms
      if (property.features.bedrooms < preferences.bedrooms) return false;
      
      // Match lifestyle preferences with appropriate rules
      if (preferences.purpose === "rent") {
        if (preferences.lifestyle === 'bachelor' && property.features.bachelorsAllowed === false) return false;
        if (preferences.lifestyle === 'family' && property.features.familiesAllowed === false) return false;
        if (preferences.lifestyle === 'student' && property.features.bachelorsAllowed === false) return false;
      }
      
      // Match required amenities with different rules for buy vs rent
      for (const amenity of preferences.amenities) {
        if (amenity === 'furnished' && !property.features.furnished) return false;
        if (amenity === 'parking' && !property.features.parking) return false;
        if (amenity === 'garden' && !property.features.garden) return false;
        if (amenity === 'securitySystem' && !property.features.securitySystem) return false;
        if (amenity === 'petFriendly' && !property.features.petFriendly) return false;
        if (amenity === 'bachelorsAllowed' && !property.features.bachelorsAllowed) return false;
      }
      
      return true;
    });
    
    // Apply different sorting based on purpose
    if (preferences.purpose === "buy") {
      // For buying: prioritize value for money (simulated here)
      filteredProperties.sort((a, b) => {
        // Value calculation example (lower price per square foot is better)
        const aValue = a.price / a.features.area;
        const bValue = b.price / b.features.area;
        return aValue - bValue;
      });
    } else {
      // For renting: prioritize verified and recent listings
      filteredProperties.sort((a, b) => {
        // Verified listings first
        if (a.isVerified !== b.isVerified) {
          return a.isVerified ? -1 : 1;
        }
        // Then most recent
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      });
    }
    
    return filteredProperties.slice(0, 6);
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

export const DeveloperService = {
  // Get all trusted developers
  getAllDevelopers: async (): Promise<TrustedDeveloper[]> => {
    await delay(800);
    return MOCK_TRUSTED_DEVELOPERS;
  },
  
  // Get developers by specialization
  getDevelopersBySpecialization: async (specialization: string): Promise<TrustedDeveloper[]> => {
    await delay(600);
    return MOCK_TRUSTED_DEVELOPERS.filter(
      developer => developer.specializations.some(
        spec => spec.toLowerCase().includes(specialization.toLowerCase())
      )
    );
  },
  
  // Get developers by location
  getDevelopersByLocation: async (location: string): Promise<TrustedDeveloper[]> => {
    await delay(600);
    return MOCK_TRUSTED_DEVELOPERS.filter(
      developer => developer.location.toLowerCase().includes(location.toLowerCase())
    );
  },
  
  // Get a specific developer by ID
  getDeveloperById: async (id: string): Promise<TrustedDeveloper | undefined> => {
    await delay(500);
    return MOCK_TRUSTED_DEVELOPERS.find(developer => developer.id === id);
  }
};

export const PropertyBuildingService = {
  // Calculate the cost breakdown for a property building project
  calculateBuildingCost: async (request: PropertyBuildingRequest): Promise<BuildingCostBreakdown> => {
    await delay(1500); // Simulate complex calculation time
    
    // Base rates per square foot based on luxury level (in BDT)
    const baseRates = {
      standard: 3000,
      premium: 4500,
      luxury: 6500
    };
    
    // Location cost multipliers
    const locationMultipliers: {[key: string]: number} = {
      'dhaka': 1.5,
      'chattogram': 1.3,
      'sylhet': 1.1,
      'rajshahi': 0.9,
      'khulna': 0.9,
      'barisal': 0.8,
      'rangpur': 0.8,
      'mymensingh': 0.8,
      'cox\'s bazar': 1.2
    };
    
    // Determine the location multiplier
    let locationMultiplier = 1.0;
    const locationLower = request.location.toLowerCase();
    
    for (const [key, multiplier] of Object.entries(locationMultipliers)) {
      if (locationLower.includes(key)) {
        locationMultiplier = multiplier;
        break;
      }
    }
    
    // Building type multipliers
    const buildingTypeMultipliers: {[key: string]: number} = {
      'apartment': 1.3,
      'duplex': 1.2,
      'commercial': 1.5,
      'villa': 1.4,
      'house': 1.0
    };
    
    const baseRate = baseRates[request.luxuryLevel];
    const totalArea = request.landArea * request.floors;
    const baseConstructionCost = totalArea * baseRate * locationMultiplier * buildingTypeMultipliers[request.buildingType];
    
    // Calculate individual cost components
    const landCost = request.landArea * 5000 * locationMultiplier; // Assumed land cost per sq ft
    const materialCost = baseConstructionCost * 0.65;
    const laborCost = baseConstructionCost * 0.2;
    const designCost = baseConstructionCost * 0.05;
    const permitCost = baseConstructionCost * 0.02;
    const finishingCost = baseConstructionCost * 0.1;
    const electricalPlumbingCost = baseConstructionCost * 0.08;
    const miscCost = baseConstructionCost * 0.03;
    
    // Calculate total cost
    const constructionCost = materialCost + laborCost + designCost + permitCost + finishingCost + electricalPlumbingCost + miscCost;
    const totalCost = landCost + constructionCost;
    
    // Calculate timeline components (in months)
    const planningTime = 2;
    const foundationTime = request.floors * 0.5;
    const structureTime = request.floors * 1.5;
    const finishingTime = request.floors * 1.0;
    const totalTime = planningTime + foundationTime + structureTime + finishingTime;
    
    // Find recommended developers based on building type and location
    const recommendedDevelopers = MOCK_TRUSTED_DEVELOPERS
      .filter(developer => {
        // Match by relevant specialization for the building type
        let matchesSpecialization = false;
        
        if (request.buildingType === 'apartment' && developer.specializations.some(s => 
          s.toLowerCase().includes('apartment') || s.toLowerCase().includes('residential'))) {
          matchesSpecialization = true;
        } else if (request.buildingType === 'commercial' && developer.specializations.some(s => 
          s.toLowerCase().includes('commercial'))) {
          matchesSpecialization = true;
        } else if (request.buildingType === 'villa' && developer.specializations.some(s => 
          s.toLowerCase().includes('villa') || s.toLowerCase().includes('luxury'))) {
          matchesSpecialization = true;
        } else if (developer.specializations.some(s => 
          s.toLowerCase().includes(request.buildingType.toLowerCase()))) {
          matchesSpecialization = true;
        }
        
        // Factor in luxury level
        if (request.luxuryLevel === 'luxury' && !developer.specializations.some(s => 
          s.toLowerCase().includes('luxury'))) {
          return false;
        }
        
        return matchesSpecialization;
      })
      .sort((a, b) => b.rating - a.rating) // Sort by rating
      .slice(0, 3); // Get top 3
    
    return {
      landCost,
      materialCost,
      laborCost,
      designCost,
      permitCost,
      finishingCost,
      electricalPlumbingCost,
      miscCost,
      totalCost,
      timeline: {
        planning: planningTime,
        foundation: foundationTime,
        structure: structureTime,
        finishing: finishingTime,
        total: totalTime
      },
      recommendedDevelopers
    };
  }
};
