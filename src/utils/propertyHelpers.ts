
import { Property, Filter } from "@/models";

export const filterProperties = (properties: Property[], filters: Filter): Property[] => {
  let filtered = properties;

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(property => property.category === filters.category);
  }

  // Filter by location
  if (filters.location) {
    filtered = filtered.filter(property => 
      property.location.area.toLowerCase().includes(filters.location!.toLowerCase()) ||
      property.location.city.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  // Filter by price range
  if (filters.priceMin && filters.priceMax) {
    filtered = filtered.filter(property => 
      property.price >= filters.priceMin! && property.price <= filters.priceMax!
    );
  }

  // Filter by bedrooms
  if (filters.bedrooms) {
    filtered = filtered.filter(property => 
      property.features.bedrooms >= filters.bedrooms!
    );
  }

  // Filter by property type
  if (filters.type) {
    filtered = filtered.filter(property => property.type === filters.type);
  }

  // Filter by furnished status
  if (filters.furnished) {
    filtered = filtered.filter(property => property.features.furnished);
  }

  // Filter by verified status
  if (filters.verified) {
    filtered = filtered.filter(property => property.isVerified);
  }

  // Filter for bachelors (using petFriendly as proxy)
  if (filters.forBachelors) {
    filtered = filtered.filter(property => property.features.bachelorsAllowed);
  }

  // Filter for families
  if (filters.forFamilies) {
    filtered = filtered.filter(property => property.features.familiesAllowed);
  }

  // Filter for women only
  if (filters.womenOnly) {
    filtered = filtered.filter(property => property.features.womenOnly);
  }

  return filtered;
};

export const sortProperties = (properties: Property[], sortBy: 'price-asc' | 'price-desc' | 'date' | 'area'): Property[] => {
  return [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'date':
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      case 'area':
        return b.features.area - a.features.area;
      default:
        return 0;
    }
  });
};

export const getPropertyTypeDisplayName = (type: string): string => {
  const typeMap: Record<string, string> = {
    apartment: 'Apartment',
    house: 'House',
    villa: 'Villa',
    commercial: 'Commercial',
    room: 'Room',
    office: 'Office'
  };
  return typeMap[type] || type;
};

export const getPropertyStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-gray-100 text-gray-800',
    rented: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};
