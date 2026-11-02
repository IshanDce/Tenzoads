import React from 'react';
import PhoneMockup from './PhoneMockup';

export const HeroIllustration = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full max-w-[480px] lg:max-w-[520px] mx-auto bg-amber rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl overflow-visible ${className}`}
    >
      {/* Decorative blurred backdrop glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-300/40 via-amber-500/20 to-transparent rounded-3xl pointer-events-none" />

      {/* Main Centered Phone Mockup */}
      <div className="relative z-10 flex items-center justify-center py-2">
        <PhoneMockup className="transform scale-[0.92] sm:scale-100 transition-transform duration-300" />
      </div>

      {/* Floating Top Right Dark Pill */}
      <div className="absolute top-6 sm:top-10 right-2 sm:-right-4 z-20 bg-ink text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xl border border-neutral-700 flex items-center gap-1.5 animate-bounce-subtle">
        <span className="w-2 h-2 rounded-full bg-amber" />
        <span>Top Rated IT Studio</span>
      </div>

      {/* Floating Bottom Right Card */}
      <div className="absolute -bottom-4 right-2 sm:-right-6 z-20 bg-white rounded-2xl p-4 shadow-2xl border border-borderCream max-w-[210px] hidden sm:block">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center text-xs font-bold text-ink">
            ★
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-ink leading-tight">Client Trust</div>
            <div className="text-[9px] text-muted">99.4% On-Time Delivery</div>
          </div>
        </div>
        <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden">
          <div className="bg-amber h-full rounded-full w-[94%]" />
        </div>
      </div>

      {/* Floating Left Notification Pill */}
      <div className="absolute bottom-16 -left-3 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-borderCream flex items-center gap-2.5 hidden sm:flex">
        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">
          ⚡
        </div>
        <div>
          <div className="text-xs font-bold text-ink">Agile Sprints</div>
          <div className="text-[10px] text-muted">Weekly review builds</div>
        </div>
      </div>
    </div>
  );
};

export default HeroIllustration;
