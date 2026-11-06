import React from 'react';

export const HeroIllustration = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[540px] mx-auto overflow-visible select-none ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/25 via-cyan-400/20 to-transparent rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center p-2 sm:p-4">
        {/* Browser Mockup (Desktop View) */}
        <div className="w-[340px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-100/90 overflow-hidden transform -translate-x-4 sm:-translate-x-8">
          {/* Browser Window Controls Header */}
          <div className="h-9 bg-slate-50 border-b border-slate-100 px-4 flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="ml-4 w-32 h-4 bg-slate-200/60 rounded-full" />
          </div>

          {/* Browser Body */}
          <div className="p-5 space-y-4">
            {/* Top row with wide card and blue highlight card */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-7 space-y-2.5">
                <div className="w-28 h-3.5 bg-slate-900 rounded-md" />
                <div className="w-40 h-2 bg-slate-200 rounded" />
                <div className="w-32 h-2 bg-slate-100 rounded" />
                <div className="pt-2">
                  <div className="w-20 h-6 bg-blue-600 rounded-lg" />
                </div>
              </div>
              <div className="col-span-5 bg-blue-500 rounded-xl p-3 flex flex-col justify-between text-white shadow-sm">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold">
                  ⚡
                </div>
                <div className="space-y-1">
                  <div className="w-12 h-1.5 bg-white/60 rounded" />
                  <div className="w-16 h-2 bg-white rounded" />
                </div>
              </div>
            </div>

            {/* Bottom 2 preview cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-full h-8 bg-blue-100/70 rounded-lg" />
                <div className="w-16 h-2 bg-slate-300 rounded" />
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="w-full h-8 bg-cyan-100/70 rounded-lg" />
                <div className="w-16 h-2 bg-slate-300 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping Phone Mockup (Mobile App) */}
        <div className="absolute right-0 sm:right-2 top-4 z-20 w-[150px] sm:w-[175px] h-[310px] sm:h-[350px] bg-slate-900 rounded-[32px] p-2.5 shadow-2xl border-2 border-slate-800 flex flex-col">
          {/* Dynamic island */}
          <div className="w-12 h-3 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          </div>

          {/* Screen Content */}
          <div className="w-full h-full bg-white rounded-[22px] p-2.5 flex flex-col justify-between overflow-hidden">
            <div className="space-y-2">
              {/* App banner */}
              <div className="w-full h-12 bg-blue-600 rounded-xl p-2 flex items-center justify-between">
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-[10px] text-white">
                  ✦
                </div>
                <div className="w-8 h-2 bg-white/80 rounded" />
              </div>

              {/* List items */}
              <div className="space-y-1.5 pt-1">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <div className="w-4 h-4 rounded-full bg-blue-100 flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="w-12 h-1.5 bg-slate-300 rounded" />
                      <div className="w-8 h-1 bg-slate-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-2 flex justify-around border-t border-slate-100">
              <div className="w-4 h-4 rounded bg-blue-600" />
              <div className="w-4 h-4 rounded bg-slate-200" />
              <div className="w-4 h-4 rounded bg-slate-200" />
            </div>
          </div>
        </div>

        {/* Floating AI-powered Pill */}
        <div className="absolute -bottom-2 sm:bottom-4 left-6 sm:left-12 z-30 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xl border border-slate-700/80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
          <span>AI-powered</span>
        </div>
      </div>
    </div>
  );
};

export default HeroIllustration;
