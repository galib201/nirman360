import { AIUserPreference, BookingRequest, Property, User } from "../models";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Luxury Apartment with Ocean View",
    description: "Stunning 3-bedroom apartment with panoramic ocean views, modern amenities, and a private balcony. Perfect for those seeking a high-end living experience in the heart of the city.",
    price: 15000000,
    location: {
      address: "123 Ocean Drive",
      city: "Dhaka",
      area: "Gulshan",
      coordinates: {
        latitude: 23.7925,
        longitude: 90.4078
      }
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      furnished: true,
      parking: true,
      petFriendly: true,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: true,
      womenOnly: false,
      additionalFeatures: ["Swimming Pool", "Gym", "24/7 Security"]
    },
    type: "apartment",
    category: "buy",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1489958449943-2429e8be8625"
    ],
    isVerified: true,
    isPremium: true,
    postedAt: "2023-04-15T10:30:00Z",
    areaSnapshot: {
      averagePrice: 14000000,
      nearbyPlaces: [
        { name: "City Park", type: "park", distance: 0.5 },
        { name: "Central Hospital", type: "hospital", distance: 1.2 },
        { name: "International School", type: "school", distance: 0.8 }
      ],
      crimeRate: "low",
      walkScore: 85
    }
  },
  {
    id: "p2",
    title: "Modern Family Home in Green Suburbs",
    description: "Spacious 4-bedroom house in a quiet, green neighborhood. Features a large garden, modern kitchen, and ample living space for a growing family.",
    price: 25000000,
    location: {
      address: "45 Green Valley Road",
      city: "Dhaka",
      area: "Banani",
      coordinates: {
        latitude: 23.7937,
        longitude: 90.4065
      }
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      furnished: false,
      parking: true,
      petFriendly: true,
      garden: true,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: true,
      womenOnly: false,
      additionalFeatures: ["Spacious Backyard", "Modern Kitchen", "Home Office"]
    },
    type: "house",
    category: "buy",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833"
    ],
    isVerified: true,
    isPremium: false,
    postedAt: "2023-04-10T14:45:00Z",
    areaSnapshot: {
      averagePrice: 22000000,
      nearbyPlaces: [
        { name: "Elementary School", type: "school", distance: 0.3 },
        { name: "Shopping Mall", type: "shopping", distance: 2.0 },
        { name: "Community Park", type: "park", distance: 0.6 }
      ],
      crimeRate: "low",
      walkScore: 70
    }
  },
  {
    id: "p3",
    title: "Studio Apartment for Bachelors",
    description: "Compact and efficient studio apartment, ideal for young professionals or students. Located in a vibrant neighborhood with easy access to public transport.",
    price: 15000,
    location: {
      address: "78 College Street",
      city: "Dhaka",
      area: "Dhanmondi",
      coordinates: {
        latitude: 23.7461,
        longitude: 90.3742
      }
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      area: 500,
      furnished: true,
      parking: false,
      petFriendly: false,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: true,
      familiesAllowed: false,
      womenOnly: false,
      additionalFeatures: ["Fast Internet", "Close to University", "Shared Rooftop"]
    },
    type: "apartment",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e"
    ],
    isVerified: false,
    isPremium: false,
    postedAt: "2023-04-20T09:15:00Z",
    areaSnapshot: {
      averagePrice: 16000,
      nearbyPlaces: [
        { name: "University Campus", type: "school", distance: 0.4 },
        { name: "Metro Station", type: "transport", distance: 0.2 },
        { name: "Local Cafe", type: "restaurant", distance: 0.1 }
      ],
      crimeRate: "medium",
      walkScore: 95
    }
  },
  {
    id: "p4",
    title: "Luxury Villa with Private Pool",
    description: "Exclusive 5-bedroom villa with private pool, garden, and entertainment areas. Perfect for those seeking luxury and privacy in a premium location.",
    price: 50000000,
    location: {
      address: "10 Elite Avenue",
      city: "Dhaka",
      area: "Baridhara",
      coordinates: {
        latitude: 23.8103,
        longitude: 90.4125
      }
    },
    features: {
      bedrooms: 5,
      bathrooms: 5,
      area: 4500,
      furnished: true,
      parking: true,
      petFriendly: true,
      garden: true,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: true,
      womenOnly: false,
      additionalFeatures: ["Private Pool", "Home Theatre", "Wine Cellar", "Smart Home System"]
    },
    type: "villa",
    category: "buy",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511"
    ],
    isVerified: true,
    isPremium: true,
    postedAt: "2023-04-05T11:00:00Z",
    areaSnapshot: {
      averagePrice: 48000000,
      nearbyPlaces: [
        { name: "Golf Course", type: "park", distance: 1.0 },
        { name: "International School", type: "school", distance: 1.5 },
        { name: "Fine Dining Restaurant", type: "restaurant", distance: 0.8 }
      ],
      crimeRate: "low",
      walkScore: 60
    }
  },
  {
    id: "p5",
    title: "Family-Friendly Apartment with Garden Access",
    description: "Comfortable 3-bedroom apartment with access to a shared garden, playground, and community facilities. Perfect for families with children.",
    price: 25000,
    location: {
      address: "34 Family Lane",
      city: "Dhaka",
      area: "Uttara",
      coordinates: {
        latitude: 23.8758,
        longitude: 90.3795
      }
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1400,
      furnished: false,
      parking: true,
      petFriendly: true,
      garden: true,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: true,
      womenOnly: false,
      additionalFeatures: ["Playground", "Community Center", "24/7 Security"]
    },
    type: "apartment",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
    ],
    isVerified: true,
    isPremium: false,
    postedAt: "2023-04-18T16:20:00Z",
    areaSnapshot: {
      averagePrice: 22000,
      nearbyPlaces: [
        { name: "Elementary School", type: "school", distance: 0.4 },
        { name: "Family Clinic", type: "hospital", distance: 0.6 },
        { name: "Supermarket", type: "shopping", distance: 0.3 }
      ],
      crimeRate: "low",
      walkScore: 75
    }
  },
  {
    id: "p6",
    title: "Commercial Space in Business District",
    description: "Prime commercial space in the heart of the business district. Ideal for offices, retail, or service businesses looking for high visibility and foot traffic.",
    price: 120000,
    location: {
      address: "56 Business Avenue",
      city: "Dhaka",
      area: "Motijheel",
      coordinates: {
        latitude: 23.7298,
        longitude: 90.4125
      }
    },
    features: {
      bedrooms: 0,
      bathrooms: 2,
      area: 2000,
      furnished: false,
      parking: true,
      petFriendly: false,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: false,
      womenOnly: false,
      additionalFeatures: ["Meeting Rooms", "Reception Area", "High-Speed Internet"]
    },
    type: "commercial",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e"
    ],
    isVerified: true,
    isPremium: true,
    postedAt: "2023-04-12T13:40:00Z",
    areaSnapshot: {
      averagePrice: 100000,
      nearbyPlaces: [
        { name: "Central Bank", type: "transport", distance: 0.3 },
        { name: "Corporate Tower", type: "transport", distance: 0.2 },
        { name: "Business Hotel", type: "transport", distance: 0.5 }
      ],
      crimeRate: "low",
      walkScore: 90
    }
  },
  {
    id: "p7",
    title: "Women's Hostel with Modern Amenities",
    description: "Secure and comfortable hostel exclusively for women. Features modern amenities, study areas, and 24/7 security.",
    price: 12000,
    location: {
      address: "27 University Road",
      city: "Dhaka",
      area: "Mohakhali",
      coordinates: {
        latitude: 23.7779,
        longitude: 90.4065
      }
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      area: 300,
      furnished: true,
      parking: false,
      petFriendly: false,
      garden: true,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: false,
      womenOnly: true,
      additionalFeatures: ["Study Room", "Common Kitchen", "CCTV Security"]
    },
    type: "room",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace",
      "https://images.unsplash.com/photo-1439158771502-46975e819208",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2"
    ],
    isVerified: true,
    isPremium: false,
    postedAt: "2023-04-25T10:30:00Z",
    areaSnapshot: {
      averagePrice: 14000,
      nearbyPlaces: [
        { name: "Women's University", type: "school", distance: 0.3 },
        { name: "Coffee Shop", type: "restaurant", distance: 0.2 },
        { name: "City Library", type: "library", distance: 0.5 }
      ],
      crimeRate: "low",
      walkScore: 90
    }
  }
];

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+8801712345678",
    savedProperties: ["p1", "p4"],
    bookings: ["b1"],
    inquiries: ["i1", "i2"]
  }
];

export const MOCK_BOOKINGS: BookingRequest[] = [
  {
    id: "b1",
    propertyId: "p1",
    userId: "u1",
    date: "2023-05-10",
    timeSlot: "10:00 AM - 11:00 AM",
    status: "confirmed"
  }
];

// Add new mock data for Nirman AI
export const MOCK_AI_USER_PREFERENCES: AIUserPreference[] = [
  {
    budget: {
      min: 10000,
      max: 30000
    },
    location: ["Dhanmondi", "Mohakhali"],
    propertyType: ["apartment", "room"],
    bedrooms: 1,
    purpose: "rent",
    lifestyle: "bachelor",
    amenities: ["furnished", "securitySystem"]
  },
  {
    budget: {
      min: 15000000,
      max: 40000000
    },
    location: ["Gulshan", "Banani", "Baridhara"],
    propertyType: ["apartment", "house"],
    bedrooms: 3,
    purpose: "buy",
    lifestyle: "family",
    amenities: ["parking", "garden", "securitySystem"]
  }
];

// Admin user
export const ADMIN_USER = {
  id: "admin1",
  username: "admin",
  password: "nirman360admin", // In a real app, this would be hashed
  name: "Admin User",
  email: "admin@nirman360.com",
  role: "admin"
};

// Add property analytics for admin dashboard
export const PROPERTY_ANALYTICS = {
  totalListings: 178,
  verifiedListings: 142,
  pendingVerification: 36,
  premiumListings: 24,
  mostViewedAreas: ["Gulshan", "Dhanmondi", "Banani", "Uttara"],
  listingsPerCategory: {
    buy: 97,
    rent: 81
  },
  listingsPerType: {
    apartment: 102,
    house: 43,
    commercial: 12,
    room: 21
  },
  recentTransactions: [
    {
      id: "t1",
      propertyId: "p2",
      amount: 25000000,
      commission: 250000,
      date: "2023-04-28T10:15:00Z",
      type: "buy"
    },
    {
      id: "t2",
      propertyId: "p5",
      amount: 25000,
      commission: 2500,
      date: "2023-04-26T14:30:00Z",
      type: "rent"
    }
  ]
};
