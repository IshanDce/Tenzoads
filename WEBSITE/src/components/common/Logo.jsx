import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ className = '', inverted = false, showTagline = false }) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none ${className}`}
      aria-label="TenzoAds Home"
    >
      {/* Modern Blue Rounded Badge with stylized "T" */}
      <div className="relative w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          {/* Stylized Modern T */}
          <path
            d="M5 6.5C5 5.67157 5.67157 5 6.5 5H17.5C18.3284 5 19 5.67157 19 6.5C19 7.32843 18.3284 8 17.5 8H13.5V18C13.5 18.8284 12.8284 19.5 12 19.5C11.1716 19.5 10.5 18.8284 10.5 18V8H6.5C5.67157 8 5 7.32843 5 6.5Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-black text-xl md:text-2xl tracking-tight leading-none ${
            inverted ? 'text-white' : 'text-slate-900'
          }`}
        >
          Tenzo<span className={inverted ? 'text-blue-400' : 'text-slate-900'}>Ads</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
            IT Services & AI Studio
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
