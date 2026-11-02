import React from 'react';

export const BrandMockup = ({ className = '', title = 'Rooted Organics' }) => {
  return (
    <div
      className={`w-full max-w-[340px] sm:max-w-[400px] bg-white rounded-2xl overflow-hidden shadow-xl border border-borderCream mx-auto p-5 space-y-4 ${className}`}
    >
      {/* Brand Icon Showcase */}
      <div className="bg-cream rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Abstract Concentric Circles Logo */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-amber-300 opacity-60" />
          <div className="w-16 h-16 rounded-full bg-amber flex items-center justify-center shadow-md">
            <div className="w-8 h-8 rounded-full bg-ink" />
          </div>
        </div>
        <span className="mt-3 font-extrabold text-sm tracking-tight text-ink">{title}</span>
        <span className="text-[10px] text-muted tracking-widest uppercase font-semibold">
          Brand Identity System
        </span>
      </div>

      {/* Color Palette Swatches */}
      <div>
        <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">
          Color Guidelines
        </span>
        <div className="grid grid-cols-4 gap-2">
          <div className="space-y-1">
            <div className="h-8 rounded-lg bg-amber shadow-sm" />
            <span className="text-[8px] font-mono text-muted block text-center">#F5A93B</span>
          </div>
          <div className="space-y-1">
            <div className="h-8 rounded-lg bg-ink shadow-sm" />
            <span className="text-[8px] font-mono text-muted block text-center">#0D0D0D</span>
          </div>
          <div className="space-y-1">
            <div className="h-8 rounded-lg bg-cream border border-borderCream shadow-sm" />
            <span className="text-[8px] font-mono text-muted block text-center">#FDF6E4</span>
          </div>
          <div className="space-y-1">
            <div className="h-8 rounded-lg bg-neutral-100 border border-neutral-200 shadow-sm" />
            <span className="text-[8px] font-mono text-muted block text-center">#FFFFFF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandMockup;
