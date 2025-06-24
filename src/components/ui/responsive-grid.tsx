
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
}

const ResponsiveGrid = ({ 
  children, 
  cols = { default: 1, sm: 2, lg: 3, xl: 4 },
  gap = "gap-4 sm:gap-6",
  className 
}: ResponsiveGridProps) => {
  const gridClasses = Object.entries(cols)
    .map(([breakpoint, colCount]) => {
      if (breakpoint === 'default') return `grid-cols-${colCount}`;
      return `${breakpoint}:grid-cols-${colCount}`;
    })
    .join(' ');

  return (
    <div className={cn('grid', gridClasses, gap, className)}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
