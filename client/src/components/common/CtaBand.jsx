import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CtaBand = ({ className = '' }) => {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-amber-glow">
          {/* Subtle geometric background shapes */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-400/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 right-1/4 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-ink block">
                READY WHEN YOU ARE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.15]">
                Have an idea? Let's build it together.
              </h2>
              <p className="text-base sm:text-lg text-ink/80 font-medium pt-1 max-w-xl">
                Tell us about your project and get a free consultation with our team within 24 hours.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink text-white hover:bg-neutral-800 rounded-full font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
