import React from 'react';

export const Background = React.memo(() => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-black" />
    <div 
      className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-blue-400/10 blur-3xl"
      style={{ willChange: 'transform' }}  // Optimize GPU rendering
    />
  </div>
));

Background.displayName = 'Background';

export default Background;
