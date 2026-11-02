import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | TenzoAds</title>
      </Helmet>
      <div className="min-h-[70vh] bg-cream flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-amber flex items-center justify-center font-black text-3xl text-ink mx-auto shadow-md">
            404
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Page Not Found
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            The page you are looking for doesn't exist or has been moved to another URL.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full font-bold text-sm hover:bg-neutral-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink rounded-full font-bold text-sm hover:bg-ink hover:text-white transition-colors"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

