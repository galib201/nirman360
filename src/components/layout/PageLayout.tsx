
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeaderBanner?: boolean;
}

const PageLayout = ({ children, title, subtitle, showHeaderBanner = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {title && (
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-nirman-navy">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground mt-2">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
