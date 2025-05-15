
export interface AreaSnapshot {
  id: string;
  areaName: string;
  city: string;
  averagePrice: number;
  priceHistory: {
    date: string;
    price: number;
  }[];
  nearbyPlaces: {
    name: string;
    type: string;
    distance: number;
  }[];
  crimeRate: 'low' | 'medium' | 'high';
  walkScore: number;
  demographics: {
    population: number;
    averageAge: number;
    incomeLevel: 'low' | 'medium' | 'high';
  };
}
