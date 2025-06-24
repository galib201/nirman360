
import React, { Suspense, ComponentType } from 'react';
import { LoadingSkeleton } from './loading-skeleton';

interface LazyComponentProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const LazyComponent = ({ fallback, children }: LazyComponentProps) => {
  const defaultFallback = <LoadingSkeleton type="card" count={1} />;
  
  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) => {
  return (props: P) => (
    <LazyComponent fallback={fallback}>
      <Component {...props} />
    </LazyComponent>
  );
};

export default LazyComponent;
