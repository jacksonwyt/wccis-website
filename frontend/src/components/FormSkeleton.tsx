import React from 'react';

// Simple loading skeleton for forms
const FormSkeleton = () => (
  <div className="w-full max-w-md mx-auto p-6 space-y-6">
    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-8 animate-pulse"></div>
    
    {/* Field skeletons */}
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-12 bg-gray-100 rounded-md animate-pulse"></div>
      </div>
    ))}
    
    {/* Button skeleton */}
    <div className="h-12 bg-blue-200 rounded-md w-full mt-8 animate-pulse"></div>
  </div>
);

export default FormSkeleton; 