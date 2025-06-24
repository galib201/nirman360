
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
  },
  {
    id: "p8",
    title: "Cozy 2-Bedroom Apartment in Old Dhaka",
    description: "Traditional style apartment with modern renovations. Perfect for those who appreciate heritage architecture with contemporary comforts.",
    price: 18000,
    location: {
      address: "89 Heritage Lane",
      city: "Dhaka",
      area: "Old Dhaka",
      coordinates: {
        latitude: 23.7104,
        longitude: 90.4074
      }
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: 900,
      furnished: true,
      parking: false,
      petFriendly: true,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: true,
      familiesAllowed: true,
      womenOnly: false,
      additionalFeatures: ["Traditional Architecture", "Rooftop Access", "Heritage Building"]
    },
    type: "apartment",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be"
    ],
    isVerified: true,
    isPremium: false,
    postedAt: "2023-04-22T08:45:00Z",
    areaSnapshot: {
      averagePrice: 17000,
      nearbyPlaces: [
        { name: "Historic Mosque", type: "cultural", distance: 0.2 },
        { name: "Traditional Market", type: "shopping", distance: 0.1 },
        { name: "Heritage Museum", type: "cultural", distance: 0.4 }
      ],
      crimeRate: "medium",
      walkScore: 88
    }
  },
  {
    id: "p9",
    title: "Premium Penthouse with City Skyline View",
    description: "Luxurious penthouse featuring panoramic city views, premium finishes, and exclusive rooftop terrace. The epitome of urban luxury living.",
    price: 75000000,
    location: {
      address: "1 Sky Tower",
      city: "Dhaka",
      area: "Gulshan",
      coordinates: {
        latitude: 23.7805,
        longitude: 90.4156
      }
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      area: 3500,
      furnished: true,
      parking: true,
      petFriendly: true,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: true,
      womenOnly: false,
      additionalFeatures: ["Private Elevator", "Rooftop Terrace", "Smart Home", "Concierge Service"]
    },
    type: "apartment",
    category: "buy",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      "https://images.unsplash.com/photo-1616047006789-b7af710a5387",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0"
    ],
    isVerified: true,
    isPremium: true,
    postedAt: "2023-04-08T12:15:00Z",
    areaSnapshot: {
      averagePrice: 65000000,
      nearbyPlaces: [
        { name: "Luxury Shopping Center", type: "shopping", distance: 0.3 },
        { name: "Five Star Hotel", type: "hospitality", distance: 0.4 },
        { name: "Embassy Quarter", type: "government", distance: 0.6 }
      ],
      crimeRate: "low",
      walkScore: 92
    }
  },
  {
    id: "p10",
    title: "Affordable Student Housing Near Campus",
    description: "Budget-friendly shared accommodation designed for students. Clean, safe, and conveniently located near major universities.",
    price: 8000,
    location: {
      address: "156 Student Avenue",
      city: "Dhaka",
      area: "Shahbag",
      coordinates: {
        latitude: 23.7389,
        longitude: 90.3958
      }
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      area: 250,
      furnished: true,
      parking: false,
      petFriendly: false,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: true,
      familiesAllowed: false,
      womenOnly: false,
      additionalFeatures: ["Study Desk", "High-Speed WiFi", "Shared Kitchen", "Laundry Facility"]
    },
    type: "room",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221"
    ],
    isVerified: false,
    isPremium: false,
    postedAt: "2023-04-28T15:30:00Z",
    areaSnapshot: {
      averagePrice: 9000,
      nearbyPlaces: [
        { name: "Dhaka University", type: "school", distance: 0.2 },
        { name: "Student Cafeteria", type: "restaurant", distance: 0.1 },
        { name: "Library", type: "library", distance: 0.3 }
      ],
      crimeRate: "medium",
      walkScore: 95
    }
  },
  {
    id: "p11",
    title: "Spacious Duplex with Modern Design",
    description: "Contemporary duplex apartment with open-plan living, floor-to-ceiling windows, and premium fixtures throughout.",
    price: 35000000,
    location: {
      address: "78 Modern Heights",
      city: "Dhaka",
      area: "Bashundhara",
      coordinates: {
        latitude: 23.8223,
        longitude: 90.4254
      }
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      furnished: false,
      parking: true,
      petFriendly: true,
      garden: true,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: true,
      womenOnly: false,
      additionalFeatures: ["Double Height Ceiling", "Private Balcony", "Modern Kitchen", "Storage Room"]
    },
    type: "apartment",
    category: "buy",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4"
    ],
    isVerified: true,
    isPremium: false,
    postedAt: "2023-04-14T11:20:00Z",
    areaSnapshot: {
      averagePrice: 32000000,
      nearbyPlaces: [
        { name: "Shopping Complex", type: "shopping", distance: 0.5 },
        { name: "International School", type: "school", distance: 0.7 },
        { name: "Medical Center", type: "hospital", distance: 0.4 }
      ],
      crimeRate: "low",
      walkScore: 78
    }
  },
  {
    id: "p12",
    title: "Executive Office Space with River View",
    description: "Premium office space overlooking the Buriganga River. Ideal for corporate headquarters or upscale business operations.",
    price: 180000,
    location: {
      address: "25 River Plaza",
      city: "Dhaka",
      area: "Sadarghat",
      coordinates: {
        latitude: 23.7057,
        longitude: 90.4125
      }
    },
    features: {
      bedrooms: 0,
      bathrooms: 3,
      area: 3000,
      furnished: false,
      parking: true,
      petFriendly: false,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: false,
      womenOnly: false,
      additionalFeatures: ["Conference Rooms", "Executive Lounge", "Server Room", "Reception Area"]
    },
    type: "commercial",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1564069114553-7215e1ff1890"
    ],
    isVerified: true,
    isPremium: true,
    postedAt: "2023-04-11T09:00:00Z",
    areaSnapshot: {
      averagePrice: 150000,
      nearbyPlaces: [
        { name: "Port Authority", type: "government", distance: 0.2 },
        { name: "Business Center", type: "commercial", distance: 0.3 },
        { name: "Executive Hotel", type: "hospitality", distance: 0.1 }
      ],
      crimeRate: "low",
      walkScore: 85
    }
  },
  {
    id: "p13",
    title: "Suburban Family Villa with Pool",
    description: "Elegant family villa in a gated community with private swimming pool, landscaped gardens, and premium amenities.",
    price: 45000000,
    location: {
      address: "12 Garden Estate",
      city: "Dhaka",
      area: "Dhanmondi",
      coordinates: {
        latitude: 23.7465,
        longitude: 90.3700
      }
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      furnished: true,
      parking: true,
      petFriendly: true,
      garden: true,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: true,
      womenOnly: false,
      additionalFeatures: ["Private Pool", "Landscaped Garden", "Maid's Quarter", "Generator Backup"]
    },
    type: "villa",
    category: "buy",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
    ],
    isVerified: true,
    isPremium: true,
    postedAt: "2023-04-07T14:30:00Z",
    areaSnapshot: {
      averagePrice: 42000000,
      nearbyPlaces: [
        { name: "Dhanmondi Lake", type: "park", distance: 0.3 },
        { name: "Upscale Restaurant", type: "restaurant", distance: 0.4 },
        { name: "Private School", type: "school", distance: 0.6 }
      ],
      crimeRate: "low",
      walkScore: 72
    }
  },
  {
    id: "p14",
    title: "Modern 1-Bedroom Apartment for Professionals",
    description: "Sleek and contemporary apartment perfect for working professionals. Features smart home technology and premium finishes.",
    price: 22000,
    location: {
      address: "99 Tech Park Road",
      city: "Dhaka",
      area: "Tejgaon",
      coordinates: {
        latitude: 23.7644,
        longitude: 90.3912
      }
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      furnished: true,
      parking: true,
      petFriendly: false,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: true,
      familiesAllowed: false,
      womenOnly: false,
      additionalFeatures: ["Smart Home System", "Gym Access", "Co-working Space", "High-Speed Internet"]
    },
    type: "apartment",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
    ],
    isVerified: true,
    isPremium: false,
    postedAt: "2023-04-24T10:45:00Z",
    areaSnapshot: {
      averagePrice: 21000,
      nearbyPlaces: [
        { name: "Tech Companies", type: "commercial", distance: 0.2 },
        { name: "Modern Cafe", type: "restaurant", distance: 0.1 },
        { name: "Fitness Center", type: "gym", distance: 0.3 }
      ],
      crimeRate: "low",
      walkScore: 88
    }
  },
  {
    id: "p15",
    title: "Boutique Retail Space in Shopping District",
    description: "Prime retail location in the heart of the shopping district. Perfect for fashion boutiques, cafes, or specialty stores.",
    price: 85000,
    location: {
      address: "201 Fashion Street",
      city: "Dhaka",
      area: "New Market",
      coordinates: {
        latitude: 23.7337,
        longitude: 90.3854
      }
    },
    features: {
      bedrooms: 0,
      bathrooms: 1,
      area: 800,
      furnished: false,
      parking: false,
      petFriendly: false,
      garden: false,
      securitySystem: true,
      bachelorsAllowed: false,
      familiesAllowed: false,
      womenOnly: false,
      additionalFeatures: ["Street Frontage", "Display Windows", "Customer Parking", "Loading Area"]
    },
    type: "commercial",
    category: "rent",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      "https://images.unsplash.com/photo-1571624436279-b272aff752b5"
    ],
    isVerified: true,
    isPremium: false,
    postedAt: "2023-04-19T13:15:00Z",
    areaSnapshot: {
      averagePrice: 75000,
      nearbyPlaces: [
        { name: "Shopping Mall", type: "shopping", distance: 0.1 },
        { name: "Food Court", type: "restaurant", distance: 0.2 },
        { name: "Metro Station", type: "transport", distance: 0.3 }
      ],
      crimeRate: "medium",
      walkScore: 95
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
  totalListings: 235,
  verifiedListings: 198,
  pendingVerification: 37,
  premiumListings: 32,
  mostViewedAreas: ["Gulshan", "Dhanmondi", "Banani", "Uttara", "Bashundhara"],
  listingsPerCategory: {
    buy: 134,
    rent: 101
  },
  listingsPerType: {
    apartment: 142,
    house: 51,
    commercial: 18,
    villa: 15,
    room: 9
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

// Add mock data needed by admin components
export interface MockUser extends User {
  joinDate: string;
  lastActive: string;
  propertiesViewed: number;
  bookingsMade: number;
}

export interface MockUserActivity {
  id: string;
  userEmail: string;
  propertyTitle: string;
  action: string;
  date: string;
}

export interface MockProperty extends Property {
  ownerName: string;
  ownerEmail: string;
  trustScore: number;
  verificationStatus: 'pending' | 'approved' | 'rejected';
}

export interface MockLawFirm {
  id: string;
  name: string;
  contact: string;
  email: string;
  specialization: string;
  status: 'active' | 'inactive';
}

// Mock users with additional admin fields
export const mockUsers: MockUser[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+8801712345678",
    savedProperties: ["p1", "p4"],
    bookings: ["b1"],
    inquiries: ["i1", "i2"],
    joinDate: "2023-03-15T10:30:00Z",
    lastActive: "2023-04-28T15:45:00Z",
    propertiesViewed: 12,
    bookingsMade: 3
  },
  {
    id: "u2",
    name: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    phone: "+8801687654321",
    savedProperties: ["p2", "p3"],
    bookings: [],
    inquiries: ["i3"],
    joinDate: "2023-04-01T09:15:00Z",
    lastActive: "2023-04-29T11:20:00Z",
    propertiesViewed: 8,
    bookingsMade: 1
  }
];

// Mock user activities
export const mockUserActivities: MockUserActivity[] = [
  {
    id: "a1",
    userEmail: "john.doe@example.com",
    propertyTitle: "Luxury Apartment with Ocean View",
    action: "visited",
    date: "2023-04-28T10:30:00Z"
  },
  {
    id: "a2",
    userEmail: "sarah.ahmed@example.com",
    propertyTitle: "Modern Family Home in Green Suburbs",
    action: "unlocked",
    date: "2023-04-27T14:15:00Z"
  },
  {
    id: "a3",
    userEmail: "john.doe@example.com",
    propertyTitle: "Studio Apartment for Bachelors",
    action: "booked",
    date: "2023-04-26T16:45:00Z"
  }
];

// Mock properties with admin fields
export const mockProperties: MockProperty[] = MOCK_PROPERTIES.map((property, index) => ({
  ...property,
  ownerName: `Owner ${index + 1}`,
  ownerEmail: `owner${index + 1}@example.com`,
  trustScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
  verificationStatus: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'approved' | 'rejected'
}));

// Mock law firms
export const mockLawFirms: MockLawFirm[] = [
  {
    id: "lf1",
    name: "Rahman & Associates",
    contact: "+8801711111111",
    email: "info@rahmanlaw.com",
    specialization: "Property Law",
    status: "active"
  },
  {
    id: "lf2",
    name: "Legal Excellence Ltd.",
    contact: "+8801722222222", 
    email: "contact@legalexcellence.com",
    specialization: "Real Estate",
    status: "active"
  },
  {
    id: "lf3",
    name: "City Law Chambers",
    contact: "+8801733333333",
    email: "hello@citylawchambers.com", 
    specialization: "Property Disputes",
    status: "inactive"
  }
];
