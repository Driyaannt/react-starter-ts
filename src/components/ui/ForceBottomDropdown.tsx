import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ForceBottomDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const ForceBottomDropdown: React.FC<ForceBottomDropdownProps> = ({
  trigger,
  children,
  className,
  align = "start",
  sideOffset = 8,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(className)}
        align={align}
        side="bottom"
        sideOffset={sideOffset}
        avoidCollisions={false}
        sticky="always"
        style={{
          // Force positioning from bottom using inline styles as last resort
          transformOrigin: "top center",
        }}
        onCloseAutoFocus={(e) => {
          // Prevent focus issues that might cause repositioning
          e.preventDefault();
        }}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ForceBottomDropdown, DropdownMenuItem };
