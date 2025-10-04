// Debugging script untuk dropdown positioning
// Copy paste ke browser console untuk debug

(function debugDropdowns() {
  console.log('🔍 Debugging dropdown positioning...');
  
  // Function to monitor dropdown appearances
  const monitorDropdowns = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Check if this is a dropdown
              if (element.matches('[data-radix-dropdown-menu-content]')) {
                console.log('📦 Dropdown detected:', element);
                
                // Get position info
                const rect = element.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(element);
                
                console.log('📍 Position info:', {
                  top: rect.top,
                  left: rect.left,
                  bottom: rect.bottom,
                  right: rect.right,
                  width: rect.width,
                  height: rect.height,
                  'data-side': element.getAttribute('data-side'),
                  'computed position': computedStyle.position,
                  'computed top': computedStyle.top,
                  'computed left': computedStyle.left,
                  'computed transform': computedStyle.transform,
                  'computed transform-origin': computedStyle.transformOrigin,
                });
                
                // Find the trigger
                const triggers = document.querySelectorAll('[data-radix-dropdown-menu-trigger][aria-expanded="true"]');
                triggers.forEach((trigger) => {
                  const triggerRect = trigger.getBoundingClientRect();
                  console.log('🎯 Trigger position:', {
                    top: triggerRect.top,
                    bottom: triggerRect.bottom,
                    left: triggerRect.left,
                    right: triggerRect.right,
                  });
                  
                  // Check if dropdown is actually below trigger
                  const isBelow = rect.top > triggerRect.bottom;
                  const isAbove = rect.bottom < triggerRect.top;
                  
                  console.log('✅ Position check:', {
                    'is below trigger': isBelow,
                    'is above trigger': isAbove,
                    'distance from trigger': isBelow ? rect.top - triggerRect.bottom : triggerRect.top - rect.bottom,
                  });
                  
                  if (!isBelow && !isAbove) {
                    console.log('⚠️ Dropdown is overlapping with trigger!');
                  }
                  
                  if (isAbove) {
                    console.log('❌ PROBLEM: Dropdown is appearing ABOVE trigger instead of below!');
                    
                    // Try to fix it
                    const newTop = triggerRect.bottom + 8;
                    (element as HTMLElement).style.top = newTop + 'px';
                    (element as HTMLElement).style.transformOrigin = 'top center';
                    element.setAttribute('data-side', 'bottom');
                    
                    console.log('🔧 Applied fix - moved dropdown to:', newTop);
                  }
                });
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('👀 Observer started - now try opening a dropdown...');
    
    return observer;
  };
  
  // Start monitoring
  const observer = monitorDropdowns();
  
  // Add to window for manual control
  window.dropdownDebugger = {
    stop: () => {
      observer.disconnect();
      console.log('🛑 Dropdown debugging stopped');
    },
    forceFixAll: () => {
      const dropdowns = document.querySelectorAll('[data-radix-dropdown-menu-content]');
      console.log(`🔧 Force fixing ${dropdowns.length} dropdowns...`);
      
      dropdowns.forEach((dropdown) => {
        const triggers = document.querySelectorAll('[data-radix-dropdown-menu-trigger][aria-expanded="true"]');
        triggers.forEach((trigger) => {
          const triggerRect = trigger.getBoundingClientRect();
          const newTop = triggerRect.bottom + 8;
          
          (dropdown as HTMLElement).style.position = 'fixed';
          (dropdown as HTMLElement).style.top = newTop + 'px';
          (dropdown as HTMLElement).style.left = triggerRect.left + 'px';
          (dropdown as HTMLElement).style.transformOrigin = 'top center';
          (dropdown as HTMLElement).style.zIndex = '9999';
          dropdown.setAttribute('data-side', 'bottom');
          
          console.log('🔧 Fixed dropdown position');
        });
      });
    }
  };
  
  console.log('🎮 Use window.dropdownDebugger.stop() to stop monitoring');
  console.log('🎮 Use window.dropdownDebugger.forceFixAll() to fix all visible dropdowns');
})();