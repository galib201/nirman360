
export interface AIUserPreference {
  budget: {
    min: number;
    max: number;
  };
  location: string[];
  propertyType: string[];
  bedrooms: number;
  purpose: 'buy' | 'rent';
  lifestyle: 'bachelor' | 'family';
  amenities: string[];
}

export interface AIRecommendation {
  propertyId: string;
  matchScore: number;
  matchReason: string;
}
