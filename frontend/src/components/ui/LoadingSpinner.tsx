// frontend/src/components/ui/LoadingSpinner.tsx
import React from "react";

export const LoadingSpinner = () => (
  <div className="flex justify-center">
    <div className="w-8 h-8 border-t-2 border-b-2 border-futuristic-accent rounded-full animate-spin"></div>
  </div>
);
