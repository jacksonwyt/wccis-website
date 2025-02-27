// frontend/src/components/FormSkeleton.tsx
import React from "react";

const FormSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
      
      <div className="space-y-4 mt-8">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
        
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded mt-6"></div>
      </div>
    </div>
  );
};

export default FormSkeleton;

