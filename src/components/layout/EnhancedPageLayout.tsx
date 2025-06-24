
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResponsiveContainer from './ResponsiveContainer';
import ErrorBoundary from '@/components/ui/error-boundary';
import { useViewport } from '@/hooks/useViewport';

interface EnhancedPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeaderBanner?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const EnhancedPageLayout = ({ 
  children, 
  title, 
  subtitle, 
  showHeaderBanner = true,
  containerSize = 'xl',
  className = ''
}: EnhancedPageLayoutProps) => {
  const { isMobile } = useViewport();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-grow">
          <ResponsiveContainer size={containerSize} className={`py-4 sm:py-6 lg:py-8 ${className}`}>
            {title && (
              <div className="mb-6 sm:mb-8">
                <h1 className={`font-display font-semibold text-nirman-navy ${
                  isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
                }`}>
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {children}
          </ResponsiveContainer>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default EnhancedPageLayout;
