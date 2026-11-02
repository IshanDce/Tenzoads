import React from 'react';

export const LoadingState = ({ message = 'Loading content...' }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-cream-soft" />
        <div className="absolute inset-0 rounded-full border-4 border-amber border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-semibold text-muted tracking-wide">{message}</p>
    </div>
  );
};

export default LoadingState;

