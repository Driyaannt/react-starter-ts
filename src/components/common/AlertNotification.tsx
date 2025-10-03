import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const AlertNotification: React.FC = () => {
  const { alert, clearAlert } = useAuth();
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  if (!alert) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const offset = currentX - startX.current;
    if (offset > 0) {
      // Only allow dragging to the right
      setDragOffset(offset);
    }
  };

  const handleMouseUp = () => {
    if (dragOffset > 100) {
      // If dragged more than 100px, dismiss
      clearAlert();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - startX.current;
    if (offset > 0) {
      // Only allow dragging to the right
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 100) {
      // If dragged more than 100px, dismiss
      clearAlert();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const getIcon = () => {
    switch (alert.type) {
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "error":
        return <XCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (alert.type) {
      case "success":
        return "success" as const;
      case "error":
        return "destructive" as const;
      case "warning":
        return "warning" as const;
      case "info":
      default:
        return "default" as const;
    }
  };

  return (
    <div
      className="fixed top-20 right-4 z-50 w-96 animate-in slide-in-from-right-full cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateX(${dragOffset}px)`,
        opacity: Math.max(0.3, 1 - dragOffset / 200),
        transition: isDragging
          ? "none"
          : "transform 0.3s ease-out, opacity 0.3s ease-out",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Alert
        variant={getVariant()}
        className="relative pr-6 shadow-lg border-0 rounded-lg"
      >
        {getIcon()}
        <AlertTitle className="font-semibold">{alert.title}</AlertTitle>
        <AlertDescription>{alert.message}</AlertDescription>
        {dragOffset > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            {dragOffset > 50 ? "Release to dismiss" : "Drag right to dismiss"}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-1 right-4 h-4 w-4 p-0 hover:bg-black/10 hover:text-gray-700 transition-colors rounded-full flex items-center justify-center"
          onClick={clearAlert}
        >
          <X className="h-2.5 w-2.5" />
        </Button>
      </Alert>
    </div>
  );
};

export default AlertNotification;
