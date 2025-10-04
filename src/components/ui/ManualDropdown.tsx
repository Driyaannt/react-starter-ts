import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ManualDropdownProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ManualDropdown: React.FC<ManualDropdownProps> = ({
  trigger,
  children,
  className,
  align = "start",
  sideOffset = 8,
  open,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = open !== undefined;
  const dropdownOpen = isControlled ? open : isOpen;

  const handleToggle = () => {
    const newOpen = !dropdownOpen;
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current?.offsetHeight || 200;
    const viewportHeight = window.innerHeight;

    // Always try to position from bottom first
    let top = triggerRect.bottom + sideOffset;
    let left = triggerRect.left;

    // Adjust horizontal alignment
    if (align === "end") {
      left = triggerRect.right - (dropdownRef.current?.offsetWidth || 140);
    } else if (align === "center") {
      left =
        triggerRect.left +
        triggerRect.width / 2 -
        (dropdownRef.current?.offsetWidth || 140) / 2;
    }

    // Only position from top if there's really no space below
    if (
      top + dropdownHeight > viewportHeight &&
      triggerRect.top > dropdownHeight
    ) {
      top = triggerRect.top - dropdownHeight - sideOffset;
    }

    // Ensure dropdown doesn't go off screen horizontally
    const dropdownWidth = dropdownRef.current?.offsetWidth || 140;
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    if (dropdownOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
      };
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          if (isControlled) {
            onOpenChange?.(false);
          } else {
            setIsOpen(false);
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen, isControlled, onOpenChange]);

  const triggerElement = React.cloneElement(trigger, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      trigger.props.onClick?.(e);
      handleToggle();
    },
    "aria-expanded": dropdownOpen,
    "aria-haspopup": "menu",
  });

  return (
    <>
      {triggerElement}
      {dropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={cn(
              "fixed z-[9999] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
              className
            )}
            style={{
              top: position.top,
              left: position.left,
              transformOrigin: "top center",
            }}
            role="menu"
            aria-orientation="vertical"
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
};

// Helper component for dropdown items
export const ManualDropdownItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={onClick}
      role="menuitem"
    >
      {children}
    </div>
  );
};
