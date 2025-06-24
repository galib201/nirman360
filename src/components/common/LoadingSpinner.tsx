
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * LoadingSpinner - Reusable loading spinner component
 * @param size - Size variant of the spinner
 * @param className - Additional CSS classes
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4'
  };

  return (
    <div className={`animate-spin rounded-full border-nirman-navy border-t-transparent ${sizeClasses[size]} ${className}`} />
  );
};

export default LoadingSpinner;
