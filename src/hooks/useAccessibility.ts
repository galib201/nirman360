
import { useEffect, useRef } from 'react';

interface UseAccessibilityOptions {
  announcePageChanges?: boolean;
  focusManagement?: boolean;
  skipLinks?: boolean;
}

export const useAccessibility = (options: UseAccessibilityOptions = {}) => {
  const {
    announcePageChanges = true,
    focusManagement = true,
    skipLinks = true
  } = options;

  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (announcePageChanges) {
      // Announce page changes to screen readers
      const announceElement = document.createElement('div');
      announceElement.setAttribute('aria-live', 'polite');
      announceElement.setAttribute('aria-atomic', 'true');
      announceElement.className = 'sr-only';
      document.body.appendChild(announceElement);

      return () => {
        document.body.removeChild(announceElement);
      };
    }
  }, [announcePageChanges]);

  const announceToScreenReader = (message: string) => {
    const announcer = document.querySelector('[aria-live="polite"]');
    if (announcer) {
      announcer.textContent = message;
    }
  };

  const skipToContent = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  const trapFocus = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        element.blur();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  };

  return {
    announceToScreenReader,
    skipToContent,
    trapFocus,
    skipLinkRef
  };
};
