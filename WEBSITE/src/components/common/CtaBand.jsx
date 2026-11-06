import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageContent } from '../../hooks/useSiteData';

export const CtaBand = ({ className = '' }) => {
  const { content } = usePageContent('cta', {
    eyebrow: '',
    heading: "Have an idea? Let's build it together.",
    text: 'Tell us about your project and get a free consultation within 24 hours.',
    buttonText: 'Start Your Project',
  });

  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-3xl p-8 sm:p-12 md:p-14 relative overflow-hidden shadow-xl shadow-blue-500/15">
          {/* Subtle geometric background shapes */}
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 right-16 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none" />
          {/* Decorative subtle ring */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/10 hidden md:block pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-2.5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {content.heading || "Have an idea? Let's build it together."}
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-medium max-w-xl">
                {content.text ||
                  'Tell us about your project and get a free consultation within 24 hours.'}
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-slate-900 hover:bg-slate-50 rounded-full font-extrabold text-base transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 active:scale-95 group cursor-pointer"
              >
                <span>{content.buttonText || 'Start Your Project'}</span>
                <ArrowRight className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
