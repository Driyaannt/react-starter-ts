// Test script for dropdown positioning
// Paste this in browser console to test dropdown behavior

console.log("🧪 Testing Dropdown Animation Fix...");

// Function to test dropdown positioning
function testDropdownPosition() {
  // Find all dropdown triggers
  const triggers = document.querySelectorAll(
    "[data-radix-dropdown-menu-trigger]"
  );
  console.log(`Found ${triggers.length} dropdown triggers`);

  triggers.forEach((trigger, index) => {
    console.log(`\n🎯 Testing trigger ${index + 1}:`, trigger);

    // Add click listener to each trigger for testing
    trigger.addEventListener("click", function () {
      console.log("🖱️ Trigger clicked, monitoring dropdown...");

      // Monitor for dropdown appearance
      const checkDropdown = () => {
        const dropdowns = document.querySelectorAll(
          "[data-radix-dropdown-menu-content]"
        );

        dropdowns.forEach((dropdown) => {
          const rect = dropdown.getBoundingClientRect();
          const triggerRect = trigger.getBoundingClientRect();

          console.log("📊 Dropdown position check:", {
            trigger: {
              top: triggerRect.top,
              bottom: triggerRect.bottom,
              left: triggerRect.left,
              right: triggerRect.right,
            },
            dropdown: {
              top: rect.top,
              bottom: rect.bottom,
              left: rect.left,
              right: rect.right,
            },
            isBelow: rect.top > triggerRect.bottom,
            distance: rect.top - triggerRect.bottom,
            animation: window.getComputedStyle(dropdown).animation,
            transform: window.getComputedStyle(dropdown).transform,
          });

          // Check if dropdown is sliding from wrong position
          if (rect.top < triggerRect.bottom - 20) {
            console.log(
              "⚠️ WARNING: Dropdown might be sliding from wrong position!"
            );

            // Apply immediate fix
            const correctTop = triggerRect.bottom + 8;
            dropdown.style.position = "fixed";
            dropdown.style.top = correctTop + "px";
            dropdown.style.left = triggerRect.left + "px";
            dropdown.style.transform = "none";
            dropdown.style.animation = "dropdown-appear 150ms ease-out";

            console.log("🔧 Applied immediate fix");
          } else {
            console.log("✅ Dropdown appears to be in correct position");
          }
        });
      };

      // Check immediately and after short delays
      setTimeout(checkDropdown, 0);
      setTimeout(checkDropdown, 10);
      setTimeout(checkDropdown, 50);
    });
  });
}

// Run the test
testDropdownPosition();

console.log(
  "✅ Test setup complete. Now click any dropdown to see detailed positioning info."
);
console.log(
  '📝 Look for "⚠️ WARNING" messages if dropdowns are still sliding from wrong position.'
);

// Add global function for manual testing
window.fixAllDropdowns = function () {
  const dropdowns = document.querySelectorAll(
    "[data-radix-dropdown-menu-content]"
  );
  const triggers = document.querySelectorAll(
    '[data-radix-dropdown-menu-trigger][aria-expanded="true"]'
  );

  console.log(`🔧 Manually fixing ${dropdowns.length} dropdowns...`);

  triggers.forEach((trigger) => {
    const triggerRect = trigger.getBoundingClientRect();

    dropdowns.forEach((dropdown) => {
      const correctTop = triggerRect.bottom + 8;
      dropdown.style.position = "fixed";
      dropdown.style.top = correctTop + "px";
      dropdown.style.left = triggerRect.left + "px";
      dropdown.style.transform = "none";
      dropdown.style.animation = "dropdown-appear 150ms ease-out";
      dropdown.style.transformOrigin = "top center";
      dropdown.style.zIndex = "9999";
    });
  });

  console.log("✅ Manual fix applied");
};

console.log(
  "🛠️ Use window.fixAllDropdowns() to manually fix any misbehaving dropdowns"
);
