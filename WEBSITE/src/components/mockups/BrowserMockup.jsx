import React from 'react';

export const BrowserMockup = ({ className = '', title = 'tenzoads.com' }) => {
  return (
    <div
      className={`mx-auto w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden ${className}`}
    >
      {/* Browser Controls */}
      <div className="h-8 bg-slate-50 border-b border-slate-100 px-3.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="bg-white border border-slate-200 px-3 py-0.5 rounded-full text-[10px] text-slate-500 font-medium max-w-[180px] truncate text-center">
          https://{title}
        </div>
        <div className="w-10" />
      </div>

      {/* Browser Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Navigation placeholder */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="w-16 h-3 bg-blue-600 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-2 bg-slate-200 rounded" />
            <div className="w-10 h-2 bg-slate-200 rounded" />
            <div className="w-12 h-4 bg-blue-50 text-blue-600 rounded-full" />
          </div>
        </div>

        {/* Hero section inside mockup */}
        <div className="grid grid-cols-12 gap-3 items-center pt-1">
          <div className="col-span-7 space-y-2">
            <div className="w-32 h-4 bg-slate-900 rounded" />
            <div className="w-full h-2 bg-slate-200 rounded" />
            <div className="w-3/4 h-2 bg-slate-200 rounded" />
            <div className="pt-1 flex gap-2">
              <div className="w-16 h-5 bg-blue-600 rounded-full" />
              <div className="w-16 h-5 border border-slate-200 rounded-full" />
            </div>
          </div>
          <div className="col-span-5 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-xl h-24 p-2 flex items-end">
            <div className="w-full bg-white/30 backdrop-blur-sm rounded-lg p-1.5 text-white text-[9px] font-bold">
              Active Project
            </div>
          </div>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[1, 2, 3].map((card) => (
            <div key={card} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 space-y-1.5">
              <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center text-[9px] text-blue-600 font-bold">
                ✓
              </div>
              <div className="w-12 h-2 bg-slate-800 rounded" />
              <div className="w-full h-1 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowserMockup;
