
export interface Filter {
  location?: string;
  category?: 'buy' | 'rent';
  type?: 'apartment' | 'house' | 'villa' | 'office' | 'commercial' | 'room';
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
