import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`space-y-3 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            dark
              ? 'bg-blue-950/70 text-blue-400 border border-blue-800/50'
              : 'bg-blue-50 text-blue-600 border border-blue-100'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              dark ? 'bg-cyan-400 animate-pulse' : 'bg-blue-600'
            }`}
          />
          <span>{eyebrow.replace(/^●\s*/, '')}</span>
        </div>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] ${
            dark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            dark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
