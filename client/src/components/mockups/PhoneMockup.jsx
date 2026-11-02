import React from 'react';

export const PhoneMockup = ({ className = '', title = 'Bloom Pay' }) => {
  return (
    <div
      className={`relative mx-auto w-[240px] sm:w-[260px] h-[480px] bg-ink rounded-[40px] p-3 shadow-2xl border-4 border-neutral-800 ${className}`}
    >
      {/* Speaker / Dynamic Island */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-900 rounded-full z-20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 mr-2" />
        <div className="w-2 h-2 rounded-full bg-neutral-800" />
      </div>

      {/* Screen Container */}
      <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col pt-8 pb-4 px-4 relative">
        {/* App Topbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber" />
            <span className="text-[11px] font-bold text-ink">{title}</span>
          </div>
          <div className="w-5 h-5 rounded-full bg-cream flex items-center justify-center">
            <span className="text-[9px] font-bold text-ink">●</span>
          </div>
        </div>

        {/* Balance / Hero Card in App */}
        <div className="bg-amber rounded-2xl p-3.5 mb-3 text-ink shadow-sm">
          <span className="text-[9px] font-bold uppercase tracking-wider text-ink/70 block">
            Total Balance
          </span>
          <div className="text-xl font-extrabold tracking-tight mt-0.5">$24,580.00</div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold bg-white/30 backdrop-blur-sm rounded-lg px-2 py-1">
            <span>+14.2% this month</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['Send', 'Receive', 'Invest'].map((act, i) => (
            <div
              key={act}
              className="bg-cream-light border border-borderCream rounded-xl p-2 text-center"
            >
              <div
                className={`w-5 h-5 mx-auto rounded-full mb-1 flex items-center justify-center text-[9px] font-bold ${
                  i === 0 ? 'bg-ink text-white' : 'bg-amber text-ink'
                }`}
              >
                ✓
              </div>
              <span className="text-[9px] font-bold text-ink block">{act}</span>
            </div>
          ))}
        </div>

        {/* Transaction Rows */}
        <div className="space-y-2 mt-auto">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Recent Activity
          </div>
          {[
            { name: 'App Development Sprint', amount: '+$3,200', color: 'bg-amber' },
            { name: 'Cloud Server Cluster', amount: '-$140', color: 'bg-neutral-800' },
            { name: 'UI Design Milestone', amount: '+$1,850', color: 'bg-amber-300' },
          ].map((tx, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-xl bg-cream-light border border-borderCream/60"
            >
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg ${tx.color} flex-shrink-0`} />
                <div className="text-left">
                  <div className="text-[10px] font-bold text-ink truncate w-24">{tx.name}</div>
                  <div className="text-[8px] text-muted">Completed</div>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-ink">{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
