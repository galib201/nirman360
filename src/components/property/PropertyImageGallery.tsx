
import React from 'react';

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
  activeImageIndex: number;
  onImageSelect: (index: number) => void;
}

/**
 * PropertyImageGallery - Displays property images with thumbnail navigation
 * @param images - Array of image URLs
 * @param title - Property title for alt text
 * @param activeImageIndex - Currently selected image index
 * @param onImageSelect - Callback when thumbnail is clicked
 */
const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  title,
  activeImageIndex,
  onImageSelect
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
      {/* Main Image */}
      <div className="lg:col-span-3 rounded-lg overflow-hidden h-96">
        <img
          src={images[activeImageIndex]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnail Grid */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div 
            key={index}
            onClick={() => onImageSelect(index)}
            className={`cursor-pointer rounded-lg overflow-hidden h-44 ${
              activeImageIndex === index ? 'ring-4 ring-nirman-gold' : ''
            }`}
          >
            <img
              src={image}
              alt={`${title} image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyImageGallery;
