import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ className = '', inverted = false, showTagline = false }) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none ${className}`}
      aria-label="TenzoAds Home"
    >
      {/* 3D Isometric Hex Cube Icon */}
      <div className="relative w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Top diamond facet */}
          <polygon
            points="18,3 31,10.5 18,18 5,10.5"
            fill="#F5A93B"
          />
          {/* Left diamond facet */}
          <polygon
            points="5,10.5 18,18 18,33 5,25.5"
            fill="#E8962A"
          />
          {/* Right diamond facet */}
          <polygon
            points="18,18 31,10.5 31,25.5 18,33"
            fill="#0D0D0D"
          />
          {/* Subtle top facet highlight */}
          <polygon
            points="18,7 26,11.5 18,16 10,11.5"
            fill="#FFE1A8"
            opacity="0.45"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-extrabold text-xl md:text-2xl tracking-tight leading-none ${
            inverted ? 'text-white' : 'text-ink'
          }`}
        >
          Tenzo<span className={inverted ? 'text-amber' : 'text-ink'}>Ads</span>
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-wider uppercase text-muted font-semibold mt-0.5">
            Digital Product Studio
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;

