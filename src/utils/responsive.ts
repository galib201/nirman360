
/**
 * Responsive design utilities and breakpoint management
 */

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const useResponsive = () => {
  const getBreakpointClasses = (config: Partial<Record<Breakpoint, string>>) => {
    return Object.entries(config)
      .map(([breakpoint, classes]) => {
        if (breakpoint === 'xs') return classes;
        return `${breakpoint}:${classes}`;
      })
      .join(' ');
  };

  return { getBreakpointClasses };
};

export const containerClasses = "w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl";
export const gridResponsive = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6";
export const flexResponsive = "flex flex-col sm:flex-row gap-4 sm:gap-6";
