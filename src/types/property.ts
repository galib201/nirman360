
/**
 * Property-related type definitions
 * Centralized location for all property types and interfaces
 */

export interface PropertyImageGalleryProps {
  images: string[];
  title: string;
  activeImageIndex: number;
  onImageSelect: (index: number) => void;
}

export interface PropertyHeaderProps {
  property: Property;
}

export interface PropertyFeaturesProps {
  features: Property['features'];
}

export interface PropertyActionsProps {
  property: Property;
  onAreaSnapshot: () => void;
  onROICalculator: () => void;
  onEMICalculator: () => void;
  onCompareProperty: () => void;
}

// Re-export main Property type from models
export type { Property } from '@/models';
