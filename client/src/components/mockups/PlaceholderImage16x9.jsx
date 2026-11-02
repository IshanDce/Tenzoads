import React from 'react';

export const PlaceholderImage16x9 = ({
  className = '',
  label = 'IMAGE 16:9',
  featured = false,
  badge = '',
}) => {
  return (
    <div
      className={`relative w-full aspect-video bg-cream rounded-2xl overflow-hidden border border-borderCream/80 flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-[1.01] ${className}`}
    >
      {/* Subtle geometric pattern SVG */}
      <svg
        className="absolute inset-0 w-full h-full text-amber-200/40 opacity-70 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <pattern
            id={`grid-pattern-${label.replace(/\s+/g, '-')}`}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="2 3"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-pattern-${label.replace(/\s+/g, '-')})`}
        />
      </svg>

      {/* Center geometric element */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-borderCream flex items-center justify-center shadow-sm">
          <svg
            className="w-6 h-6 text-amber"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-900/70 font-mono">
          {label}
        </span>
      </div>

      {badge && (
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-ink border border-borderCream">
          {badge}
        </div>
      )}
    </div>
  );
};

export default PlaceholderImage16x9;

