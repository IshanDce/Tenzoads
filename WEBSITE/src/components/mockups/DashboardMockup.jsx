import React from 'react';

export const DashboardMockup = ({ className = '', dark = true }) => {
  return (
    <div
      className={`mx-auto w-full rounded-2xl shadow-2xl border overflow-hidden ${
        dark ? 'bg-[#0F172A] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      } ${className}`}
    >
      {/* Top window bar */}
      <div className={`h-8 px-4 flex items-center justify-between border-b ${
        dark ? 'bg-[#0B1120] border-slate-800/80' : 'bg-slate-50 border-slate-100'
      }`}>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
        </div>
        <div className="text-[10px] font-bold text-slate-400">Clarity AI Dashboard</div>
        <div className="w-6" />
      </div>

      {/* Main dashboard body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="text-[9px] text-slate-400">Total Users</div>
            <div className="text-sm font-bold text-white">48,250</div>
            <div className="text-[8px] text-cyan-400">+12% vs last mo</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="text-[9px] text-slate-400">AI Tokens</div>
            <div className="text-sm font-bold text-white">1.82M</div>
            <div className="text-[8px] text-blue-400">Fast 28ms</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="text-[9px] text-slate-400">Accuracy</div>
            <div className="text-sm font-bold text-white">99.8%</div>
            <div className="text-[8px] text-emerald-400">Optimal</div>
          </div>
        </div>

        {/* Bar chart graphic */}
        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3 text-[10px] text-slate-400">
            <span>Weekly Throughput</span>
            <span className="text-cyan-400 font-bold">Live Stream</span>
          </div>
          <div className="flex items-end justify-between h-20 gap-2 px-2">
            {[
              { h: '45%', color: 'bg-cyan-400' },
              { h: '65%', color: 'bg-blue-500' },
              { h: '85%', color: 'bg-emerald-400' },
              { h: '60%', color: 'bg-blue-600' },
              { h: '95%', color: 'bg-cyan-300' },
              { h: '75%', color: 'bg-emerald-400' },
              { h: '90%', color: 'bg-blue-500' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full ${bar.color} rounded-t-md transition-all duration-300 hover:brightness-125`}
                  style={{ height: bar.h }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
