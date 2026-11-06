import React from 'react';

export const BrandMockup = ({ className = '', title = 'Rooted Brand' }) => {
  return (
    <div
      className={`mx-auto w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-md ${className}`}
    >
      {/* Concentric Circles Brand Logo Symbol */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <div className="w-8 h-8 rounded-full bg-cyan-300" />
          </div>
        </div>
      </div>

      {/* Brand title */}
      <h4 className="text-lg font-black text-slate-900 tracking-tight">{title}</h4>
      <p className="text-xs text-slate-500 mt-1">Design System & Brand Identity</p>

      {/* Palette swatches */}
      <div className="flex items-center gap-2 mt-5">
        <div className="w-5 h-5 rounded-full bg-blue-600 shadow-sm" />
        <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-sm" />
        <div className="w-5 h-5 rounded-full bg-slate-900 shadow-sm" />
        <div className="w-5 h-5 rounded-full bg-slate-200 shadow-sm" />
      </div>
    </div>
  );
};

export default BrandMockup;
