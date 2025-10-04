import { useEffect } from 'react';

export const useForceBottomDropdown = () => {
  useEffect(() => {
    // Function to aggressively force all dropdowns to appear from bottom
    const forceBottomPositioning = () => {
      const dropdowns = document.querySelectorAll('[data-radix-dropdown-menu-content]');
      
      dropdowns.forEach((dropdown) => {
        const element = dropdown as HTMLElement;
        
        // Find the trigger button (look for data-radix-dropdown-menu-trigger)
        const triggers = document.querySelectorAll('[data-radix-dropdown-menu-trigger]');
        let trigger: HTMLElement | null = null;
        
        // Find the associated trigger for this dropdown
        triggers.forEach((t) => {
          const triggerElement = t as HTMLElement;
          if (triggerElement.getAttribute('aria-expanded') === 'true') {
            trigger = triggerElement;
          }
        });
        
        if (!trigger) return;
        
        const triggerRect = (trigger as HTMLElement).getBoundingClientRect();
        
        // AGGRESSIVE POSITIONING - Always force bottom unless literally no space
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        const minSpaceNeeded = 50; // Minimum space needed below
        
        if (spaceBelow >= minSpaceNeeded) {
          // Force position from bottom of trigger
          const leftPosition = triggerRect.left;
          const topPosition = triggerRect.bottom + 8; // 8px offset
          
          // Apply positioning immediately
          element.style.position = 'fixed';
          element.style.top = `${topPosition}px`;
          element.style.left = `${leftPosition}px`;
          element.style.bottom = 'auto';
          element.style.right = 'auto';
          element.style.transformOrigin = 'top center';
          element.style.zIndex = '9999';
          
          // Override data attributes
          element.setAttribute('data-side', 'bottom');
          
          // Remove any transform that might interfere
          element.style.transform = 'none';
          
          // Force the correct classes
          element.classList.add('data-[side=bottom]:slide-in-from-top-2');
        }
      });
    };

    // NUCLEAR POSITIONING - Completely prevent first-click slide animation
    const runImmediately = () => {
      // Find dropdowns that just appeared or are appearing
      const dropdowns = document.querySelectorAll('[data-radix-dropdown-menu-content]');
      
      dropdowns.forEach((dropdown) => {
        const dropdownEl = dropdown as HTMLElement;
        
        // Find expanded triggers
        const triggers = document.querySelectorAll('[data-radix-dropdown-menu-trigger][aria-expanded="true"]');
        
        triggers.forEach((trigger) => {
          const triggerEl = trigger as HTMLElement;
          const rect = triggerEl.getBoundingClientRect();
          
          // Calculate position immediately
          const targetTop = rect.bottom + 8;
          const targetLeft = rect.left;
          
          // OVERRIDE EVERYTHING - No mercy for slide animations
          dropdownEl.style.cssText = `
            position: fixed !important;
            top: ${targetTop}px !important;
            left: ${targetLeft}px !important;
            bottom: auto !important;
            right: auto !important;
            transform: none !important;
            transform-origin: top center !important;
            z-index: 9999 !important;
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
          `;
          
          // Remove ALL slide animation classes
          const badClasses = [
            'slide-in-from-top-1', 'slide-in-from-top-2', 'slide-in-from-top-4', 'slide-in-from-top-8',
            'slide-in-from-bottom-1', 'slide-in-from-bottom-2', 'slide-in-from-bottom-4',
            'slide-in-from-left-1', 'slide-in-from-left-2', 'slide-in-from-right-1', 'slide-in-from-right-2',
            'animate-in', 'fade-in-0', 'zoom-in-95', 'duration-150', 'ease-out'
          ];
          
          badClasses.forEach(cls => dropdownEl.classList.remove(cls));
          
          // Force correct attributes
          dropdownEl.setAttribute('data-side', 'bottom');
          dropdownEl.setAttribute('data-positioned-immediately', 'true');
          
          console.log('🚀 PREVENTED FIRST-CLICK SLIDE:', {
            trigger: rect,
            dropdown: { top: targetTop, left: targetLeft }
          });
        });
      });
      
      // Also run the original positioning
      forceBottomPositioning();
      // Only one very fast retry for edge cases
      setTimeout(forceBottomPositioning, 1);
    };

    // Run on mount
    runImmediately();
    
    // Use MutationObserver to catch dynamically added dropdowns
    const observer = new MutationObserver((mutations) => {
      let foundDropdown = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.matches('[data-radix-dropdown-menu-content]') ||
                  element.querySelector('[data-radix-dropdown-menu-content]')) {
                foundDropdown = true;
              }
            }
          });
        }
        
        // Also check for attribute changes that might indicate dropdown state change
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'aria-expanded' &&
            (mutation.target as Element).getAttribute('aria-expanded') === 'true') {
          foundDropdown = true;
        }
      });
      
      if (foundDropdown) {
        runImmediately();
      }
    });

    // Observe the entire document with more comprehensive options
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-expanded', 'data-state']
    });
    
    // Also run on various events
    const events = ['resize', 'scroll', 'click'];
    events.forEach(event => {
      window.addEventListener(event, forceBottomPositioning);
    });
    
    return () => {
      observer.disconnect();
      events.forEach(event => {
        window.removeEventListener(event, forceBottomPositioning);
      });
    };
  }, []);
};