import React from 'react';

export const PlaceholderImage16x9 = ({
  label = 'IMAGE 16:9',
  badge = '',
  className = '',
}) => {
  return (
    <div
      className={`relative aspect-video w-full bg-slate-100 border-b border-slate-200 flex flex-col items-center justify-center p-4 text-center overflow-hidden ${className}`}
    >
      {/* Subtle modern tech grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 text-slate-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="tech-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
      </svg>

      {badge && (
        <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
          {badge}
        </span>
      )}

      {/* Center Camera / Image Icon */}
      <div className="relative z-10 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-2 shadow-sm">
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <span className="relative z-10 text-xs font-bold text-slate-500 tracking-wider">
        {label}
      </span>
    </div>
  );
};

export default PlaceholderImage16x9;
