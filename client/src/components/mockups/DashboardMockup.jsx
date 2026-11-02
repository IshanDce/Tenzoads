import React from 'react';

export const DashboardMockup = ({ className = '', dark = false }) => {
  return (
    <div
      className={`w-full max-w-[340px] sm:max-w-[400px] rounded-2xl overflow-hidden shadow-xl border border-borderCream mx-auto ${
        dark ? 'bg-ink text-white' : 'bg-white text-ink'
      } ${className}`}
    >
      {/* Top dashboard nav */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between border-b ${
          dark ? 'border-neutral-800 bg-neutral-900' : 'border-borderCream bg-cream-light'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber flex items-center justify-center text-[10px] font-bold text-ink">
            C
          </div>
          <span className="text-[11px] font-bold tracking-tight">Clarity Analytics</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 font-bold">
            Live 99.9%
          </span>
          <div className="w-5 h-5 rounded-full bg-neutral-300 overflow-hidden" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Metric cards row */}
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`p-2 rounded-xl border ${
              dark
                ? 'bg-neutral-900 border-neutral-800'
                : 'bg-cream-light border-borderCream'
            }`}
          >
            <span className="text-[8px] text-muted uppercase font-bold block">MRR</span>
            <span className="text-xs font-black text-amber">$128.4K</span>
            <span className="text-[8px] text-emerald-500 block font-semibold">+18.2%</span>
          </div>
          <div
            className={`p-2 rounded-xl border ${
              dark
                ? 'bg-neutral-900 border-neutral-800'
                : 'bg-cream-light border-borderCream'
            }`}
          >
            <span className="text-[8px] text-muted uppercase font-bold block">Active Users</span>
            <span className="text-xs font-black">42,910</span>
            <span className="text-[8px] text-emerald-500 block font-semibold">+6.4%</span>
          </div>
          <div
            className={`p-2 rounded-xl border ${
              dark
                ? 'bg-neutral-900 border-neutral-800'
                : 'bg-cream-light border-borderCream'
            }`}
          >
            <span className="text-[8px] text-muted uppercase font-bold block">Retention</span>
            <span className="text-xs font-black">94.8%</span>
            <span className="text-[8px] text-amber-500 block font-semibold">Top 5%</span>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div
          className={`p-3 rounded-xl border ${
            dark ? 'bg-neutral-900 border-neutral-800' : 'bg-cream-light border-borderCream'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold">Activity Velocity</span>
            <span className="text-[8px] text-muted">Weekly</span>
          </div>
          <div className="flex items-end justify-between h-20 pt-2 px-1 gap-1.5">
            {[
              { h: '40%', amber: false },
              { h: '65%', amber: true },
              { h: '50%', amber: false },
              { h: '85%', amber: true },
              { h: '70%', amber: false },
              { h: '95%', amber: true },
              { h: '60%', amber: false },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  style={{ height: col.h }}
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    col.amber ? 'bg-amber' : dark ? 'bg-neutral-700' : 'bg-ink'
                  }`}
                />
                <span className="text-[7px] text-muted">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;

