import React from 'react';

export const PhoneMockup = ({ className = '', title = 'Bloom Pay' }) => {
  return (
    <div
      className={`relative mx-auto w-[240px] sm:w-[260px] h-[480px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 ${className}`}
    >
      {/* Speaker / Dynamic Island */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
        <div className="w-2 h-2 rounded-full bg-slate-800" />
      </div>

      {/* Screen Container */}
      <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col pt-8 pb-4 px-4 relative">
        {/* App Topbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-[11px] font-bold text-slate-900">{title}</span>
          </div>
          <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-[9px] font-bold text-blue-600">●</span>
          </div>
        </div>

        {/* Balance / Hero Card in App */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-3.5 mb-3 text-white shadow-md shadow-blue-500/20">
          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-100 block">
            Total Balance
          </span>
          <div className="text-xl font-extrabold tracking-tight mt-0.5">$24,580.00</div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
            <span>+14.2% this month</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['Send', 'Receive', 'Invest'].map((act, i) => (
            <div
              key={act}
              className="bg-slate-50 border border-slate-100 rounded-xl p-2 text-center"
            >
              <div
                className={`w-5 h-5 mx-auto rounded-full mb-1 flex items-center justify-center text-[9px] font-bold ${
                  i === 0 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}
              >
                ✓
              </div>
              <span className="text-[9px] font-bold text-slate-800 block">{act}</span>
            </div>
          ))}
        </div>

        {/* Transaction Rows */}
        <div className="space-y-2 mt-auto">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Recent Activity
          </div>
          {[
            { name: 'Cloud Subscription', amt: '-$240.00', cat: 'Software' },
            { name: 'Wire Transfer In', amt: '+$4,200.00', cat: 'Income' },
            { name: 'API Server Nodes', amt: '-$89.50', cat: 'DevOps' },
          ].map((tx) => (
            <div
              key={tx.name}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px]"
            >
              <div>
                <div className="font-bold text-slate-800">{tx.name}</div>
                <div className="text-[8px] text-slate-400">{tx.cat}</div>
              </div>
              <span
                className={`font-bold ${
                  tx.amt.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'
                }`}
              >
                {tx.amt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
