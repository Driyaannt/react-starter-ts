/**
 * Utility to handle aria-hidden focus conflicts in Radix UI dropdowns
 * This prevents the console warning: "Blocked aria-hidden on an element because its descendant retained focus"
 */

export const fixDropdownAriaHidden = () => {
  // This function should be called when dropdowns open to prevent aria-hidden conflicts

  // Find all dropdown triggers that are currently expanded (open)
  const expandedTriggers = document.querySelectorAll(
    '[data-radix-dropdown-menu-trigger][aria-expanded="true"]'
  );

  expandedTriggers.forEach((trigger) => {
    // Ensure the trigger and its parents are not hidden from assistive technology
    let element = trigger as HTMLElement;

    while (element && element !== document.body) {
      // If the element has aria-hidden="true" and contains focus, remove it temporarily
      if (
        element.getAttribute("aria-hidden") === "true" &&
        (element.contains(document.activeElement) ||
          element === document.activeElement)
      ) {
        // Store original value for restoration
        element.setAttribute("data-original-aria-hidden", "true");
        element.removeAttribute("aria-hidden");

        console.log(
          "Temporarily removed aria-hidden from focused element to prevent accessibility warning"
        );
      }

      element = element.parentElement as HTMLElement;
    }
  });
};

export const restoreDropdownAriaHidden = () => {
  // Restore aria-hidden attributes when dropdowns close
  const elementsToRestore = document.querySelectorAll(
    '[data-original-aria-hidden="true"]'
  );

  elementsToRestore.forEach((element) => {
    element.setAttribute("aria-hidden", "true");
    element.removeAttribute("data-original-aria-hidden");
  });
};

// Simple function to be called on dropdown state changes
export const handleDropdownAriaHidden = (open: boolean) => {
  if (open) {
    // Delay slightly to ensure DOM is updated
    setTimeout(fixDropdownAriaHidden, 10);
  } else {
    setTimeout(restoreDropdownAriaHidden, 100);
  }
};

export default {
  fixDropdownAriaHidden,
  restoreDropdownAriaHidden,
  handleDropdownAriaHidden,
};
