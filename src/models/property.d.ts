
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'buy' | 'rent';
  type: 'apartment' | 'house' | 'villa' | 'office' | 'commercial';
  location: {
    address: string;
    area: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  beds: number;
  baths: number;
  size: number;
  images: string[];
  amenities: string[];
  isVerified: boolean;
  isPremium: boolean;
  postedAt: string;
  postedBy: {
    id: string;
    name: string;
    type: 'owner' | 'agent';
    image?: string;
  };
}
