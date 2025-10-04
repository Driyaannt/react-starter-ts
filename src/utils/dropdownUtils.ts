// Utility function to get consistent dropdown props that force bottom positioning
export const getForceBottomDropdownProps = (options?: {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}) => {
  const { align = "start", sideOffset = 8, className = "" } = options || {};

  return {
    side: "bottom" as const,
    align,
    sideOffset,
    avoidCollisions: false,
    sticky: "always" as const,
    className,
    // Additional props to force bottom positioning
    onPointerDownOutside: (event: Event) => {
      // Allow outside clicks to close dropdown
      // This can be overridden by individual components
    },
    style: {
      transformOrigin: "top center",
      zIndex: 9999,
    },
  };
};

// Alternative approach - CSS in JS for forcing positioning
export const forceBottomDropdownStyles = {
  transformOrigin: "top center !important" as const,
  zIndex: 9999,
} as const;
