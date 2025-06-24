
import React from 'react';
import { Button } from './button';

const SkipLink = () => {
  const skipToContent = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      variant="outline"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-background border-2 border-primary"
      onClick={skipToContent}
    >
      Skip to main content
    </Button>
  );
};

export default SkipLink;
