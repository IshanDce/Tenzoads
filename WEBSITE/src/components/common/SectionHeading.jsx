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
              ? 'bg-neutral-800 text-amber'
              : 'bg-amber-100/70 text-ink'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0 animate-pulse" />
          <span>{eyebrow.replace(/^●\s*/, '')}</span>
        </div>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            dark ? 'text-neutral-400' : 'text-muted'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;

