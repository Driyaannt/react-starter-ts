/**
 * Aggressive first-click dropdown handler
 * This completely prevents the slide-from-top animation on first click
 */

export class DropdownFirstClickFixer {
  private static instance: DropdownFirstClickFixer;
  private observer: MutationObserver | null = null;
  private clickHandler: ((event: Event) => void) | null = null;

  static getInstance(): DropdownFirstClickFixer {
    if (!DropdownFirstClickFixer.instance) {
      DropdownFirstClickFixer.instance = new DropdownFirstClickFixer();
    }
    return DropdownFirstClickFixer.instance;
  }

  init() {
    this.setupClickHandler();
    this.setupMutationObserver();
    console.log("🎯 Dropdown First-Click Fixer initialized");
  }

  private setupClickHandler() {
    this.clickHandler = (event: Event) => {
      const target = event.target as HTMLElement;

      // Check if click is on dropdown trigger
      const trigger = target.closest(
        "[data-radix-dropdown-menu-trigger]"
      ) as HTMLElement;
      if (!trigger) return;

      console.log("🖱️ Dropdown trigger clicked, preventing slide animation...");

      // IMMEDIATELY position any dropdown that appears
      this.preventSlideAnimation();

      // Keep checking for a few milliseconds to catch delayed rendering
      setTimeout(() => this.preventSlideAnimation(), 0);
      setTimeout(() => this.preventSlideAnimation(), 1);
      setTimeout(() => this.preventSlideAnimation(), 5);
      setTimeout(() => this.preventSlideAnimation(), 10);
    };

    document.addEventListener("click", this.clickHandler, true);
  }

  private setupMutationObserver() {
    this.observer = new MutationObserver((mutations) => {
      let shouldCheck = false;

      mutations.forEach((mutation) => {
        // Check for new dropdown content being added
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (
                node.matches("[data-radix-dropdown-menu-content]") ||
                node.querySelector("[data-radix-dropdown-menu-content]")
              ) {
                shouldCheck = true;
              }
            }
          });
        }

        // Check for attribute changes on dropdown content
        if (
          mutation.type === "attributes" &&
          mutation.target instanceof HTMLElement
        ) {
          if (mutation.target.matches("[data-radix-dropdown-menu-content]")) {
            shouldCheck = true;
          }
        }
      });

      if (shouldCheck) {
        console.log("🔍 DOM change detected, checking for dropdowns...");
        this.preventSlideAnimation();
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state", "data-side", "style", "class"],
    });
  }

  private preventSlideAnimation() {
    // Find all dropdown content elements
    const dropdowns = document.querySelectorAll(
      "[data-radix-dropdown-menu-content]"
    );

    dropdowns.forEach((dropdown) => {
      const dropdownEl = dropdown as HTMLElement;

      // Find associated trigger
      const triggers = document.querySelectorAll(
        '[data-radix-dropdown-menu-trigger][aria-expanded="true"]'
      );

      triggers.forEach((trigger) => {
        const triggerEl = trigger as HTMLElement;
        const rect = triggerEl.getBoundingClientRect();

        // Only position if trigger is visible
        if (rect.width === 0 || rect.height === 0) return;

        const targetTop = rect.bottom + 8;
        const targetLeft = rect.left;

        // NUCLEAR OVERRIDE - completely replace all positioning
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
          margin: 0 !important;
          translate: none !important;
          scale: none !important;
          rotate: none !important;
        `;

        // Remove ALL potential animation classes
        const animationClasses = [
          "slide-in-from-top-1",
          "slide-in-from-top-2",
          "slide-in-from-top-4",
          "slide-in-from-top-8",
          "slide-in-from-bottom-1",
          "slide-in-from-bottom-2",
          "slide-in-from-bottom-4",
          "slide-in-from-left-1",
          "slide-in-from-left-2",
          "slide-in-from-right-1",
          "slide-in-from-right-2",
          "animate-in",
          "animate-out",
          "fade-in-0",
          "fade-out-0",
          "zoom-in-95",
          "zoom-out-95",
          "duration-150",
          "duration-200",
          "duration-300",
          "ease-in",
          "ease-out",
          "ease-in-out",
        ];

        animationClasses.forEach((cls) => {
          dropdownEl.classList.remove(cls);
        });

        // Force correct data attributes
        dropdownEl.setAttribute("data-side", "bottom");
        dropdownEl.setAttribute("data-positioned-immediately", "true");
        dropdownEl.removeAttribute("data-slide-direction");

        console.log("💥 NUCLEAR positioning applied:", {
          trigger: rect,
          dropdown: { top: targetTop, left: targetLeft },
          element: dropdownEl,
        });
      });
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.clickHandler) {
      document.removeEventListener("click", this.clickHandler, true);
      this.clickHandler = null;
    }

    console.log("🗑️ Dropdown First-Click Fixer destroyed");
  }
}

// Auto-initialize
const fixer = DropdownFirstClickFixer.getInstance();
fixer.init();

// Export for manual control if needed
export default fixer;
