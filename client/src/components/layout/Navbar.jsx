import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';
import { siteConfig } from '../../config/site';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-borderCream/80 transition-all">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {siteConfig.navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-ink after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-amber after:rounded-full'
                    : 'text-neutral-600 hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-ink bg-amber hover:bg-amber-hover rounded-full transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-ink hover:bg-cream-soft transition-colors focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-white z-50 overflow-y-auto px-6 py-8 flex flex-col justify-between border-t border-borderCream animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4">
            {siteConfig.navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-cream text-ink border-l-4 border-amber'
                      : 'text-neutral-700 hover:bg-cream-light'
                  }`
                }
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </NavLink>
            ))}
          </nav>

          <div className="pt-8 border-t border-borderCream flex flex-col gap-4">
            <Link
              to="/contact"
              className="w-full text-center py-3.5 px-6 font-bold text-base text-ink bg-amber hover:bg-amber-hover rounded-full transition-all shadow-md active:scale-95"
            >
              Get a Free Quote
            </Link>

            <div className="text-center text-xs text-muted mt-2">
              <p>Email: {siteConfig.contact.email}</p>
              <p className="mt-1">Phone: {siteConfig.contact.phone}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
