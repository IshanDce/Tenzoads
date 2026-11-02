import React from 'react';

export const BrowserMockup = ({ className = '', title = 'northstudio.design' }) => {
  return (
    <div
      className={`w-full max-w-[340px] sm:max-w-[400px] bg-white rounded-2xl overflow-hidden shadow-xl border border-borderCream mx-auto ${className}`}
    >
      {/* Browser Bar */}
      <div className="bg-cream-soft px-4 py-2.5 flex items-center gap-2 border-b border-borderCream">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 max-w-[200px] mx-auto bg-white rounded-md py-0.5 px-3 text-[10px] text-muted text-center border border-borderCream truncate font-mono">
          https://{title}
        </div>
      </div>

      {/* Website Body Preview */}
      <div className="p-4 sm:p-5 bg-cream-light space-y-3">
        {/* Nav header preview */}
        <div className="flex items-center justify-between pb-2 border-b border-borderCream/60">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded bg-ink" />
            <div className="w-12 h-2 rounded bg-ink/70" />
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-1.5 rounded bg-neutral-300" />
            <div className="w-8 h-1.5 rounded bg-neutral-300" />
            <div className="w-10 h-3 rounded-full bg-amber" />
          </div>
        </div>

        {/* Hero Preview */}
        <div className="grid grid-cols-3 gap-3 items-center pt-2">
          <div className="col-span-2 space-y-2">
            <div className="w-12 h-1.5 rounded bg-amber" />
            <div className="w-full h-3 rounded bg-ink font-bold" />
            <div className="w-4/5 h-3 rounded bg-ink font-bold" />
            <div className="w-full h-1.5 rounded bg-neutral-300" />
            <div className="w-2/3 h-1.5 rounded bg-neutral-300" />
            <div className="pt-1 flex gap-2">
              <div className="w-12 h-4 rounded-full bg-ink" />
              <div className="w-12 h-4 rounded-full bg-amber" />
            </div>
          </div>
          <div className="col-span-1 bg-amber rounded-xl h-24 flex items-center justify-center p-2 shadow-inner">
            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-amber-500" />
            </div>
          </div>
        </div>

        {/* Grid Preview */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-white p-2 rounded-lg border border-borderCream">
            <div className="w-full h-8 bg-cream rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-ink rounded" />
          </div>
          <div className="bg-white p-2 rounded-lg border border-borderCream">
            <div className="w-full h-8 bg-amber-100 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-ink rounded" />
          </div>
          <div className="bg-white p-2 rounded-lg border border-borderCream">
            <div className="w-full h-8 bg-neutral-100 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-ink rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserMockup;

