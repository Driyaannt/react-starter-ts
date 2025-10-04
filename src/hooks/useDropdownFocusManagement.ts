import { useEffect } from 'react';

/**
 * Simple hook to handle dropdown focus management without spam warnings
 * Uses CSS-first approach with minimal JavaScript intervention
 */
export const useDropdownFocusManagement = () => {
  useEffect(() => {
    let isHandling = false;
    let cleanupTimeout: number | null = null;

    const handleDropdownFocus = () => {
      // Prevent multiple simultaneous executions
      if (isHandling) return;
      isHandling = true;

      // Clear any existing cleanup
      if (cleanupTimeout) {
        clearTimeout(cleanupTimeout);
      }

      // Only handle if there's actually a focused dropdown-related element
      const activeElement = document.activeElement;
      if (!activeElement) {
        isHandling = false;
        return;
      }

      // Check if active element is dropdown-related
      const isDropdownRelated = 
        activeElement.closest('[data-radix-dropdown-menu-content]') ||
        activeElement.matches('[data-radix-dropdown-menu-trigger]') ||
        activeElement.closest('[data-radix-dropdown-menu-trigger]');

      if (isDropdownRelated) {
        // Find any aria-hidden parent that contains the focused element
        let parent = activeElement.parentElement;
        let foundConflict = false;

        while (parent && parent !== document.body && !foundConflict) {
          if (parent.getAttribute('aria-hidden') === 'true' && 
              !parent.hasAttribute('data-focus-accessible')) {
            
            // Mark element as temporarily accessible
            parent.removeAttribute('aria-hidden');
            parent.setAttribute('data-focus-accessible', 'true');
            foundConflict = true;

            // Set cleanup for when focus moves away
            cleanupTimeout = setTimeout(() => {
              if (parent && !parent.contains(document.activeElement)) {
                parent.setAttribute('aria-hidden', 'true');
                parent.removeAttribute('data-focus-accessible');
              }
            }, 300);
          }
          parent = parent.parentElement;
        }
      }

      isHandling = false;
    };

    // Use passive listeners to avoid performance issues
    const options = { passive: true, capture: true };
    
    document.addEventListener('focusin', handleDropdownFocus, options);
    document.addEventListener('focusout', handleDropdownFocus, options);

    return () => {
      document.removeEventListener('focusin', handleDropdownFocus, options);
      document.removeEventListener('focusout', handleDropdownFocus, options);
      
      if (cleanupTimeout) {
        clearTimeout(cleanupTimeout);
      }

      // Clean up any remaining marked elements
      const markedElements = document.querySelectorAll('[data-focus-accessible="true"]');
      markedElements.forEach((element) => {
        element.setAttribute('aria-hidden', 'true');
        element.removeAttribute('data-focus-accessible');
      });
    };
  }, []); // Empty dependency array - stable hook
};

export default useDropdownFocusManagement;