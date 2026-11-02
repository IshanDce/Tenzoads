import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { siteConfig } from '../../config/site';
import { useSettings } from '../../hooks/useSiteData';

export const Footer = () => {
  const { description, topBarPhone, topBarEmail, indiaOffice, usaOffice } = useSettings();

  return (
    <footer className="bg-ink text-neutral-300 pt-16 pb-12 border-t border-neutral-900 transition-colors">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-neutral-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo inverted />
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              {description}
            </p>
            <div className="pt-2 text-xs text-neutral-500">
              Transforming ambitious business ideas into high-converting digital products.
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.path}
                    className="text-neutral-400 hover:text-amber transition-colors duration-200"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-amber transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-amber transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-neutral-400 hover:text-amber transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-neutral-400 hover:text-amber transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-amber transition-colors">
                  Get a Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in touch Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Get in touch</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href={`mailto:${topBarEmail}`}
                  className="hover:text-amber transition-colors block text-amber-400"
                >
                  {topBarEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${topBarPhone.replace(/\s+/g, '')}`}
                  className="hover:text-amber transition-colors block"
                >
                  {topBarPhone}
                </a>
              </li>
              <li className="pt-1">
                <span className="block font-semibold text-neutral-200">
                  {indiaOffice?.title || 'India Office'}
                </span>
                <span className="text-xs text-neutral-400">
                  {indiaOffice?.address || '[Street address], [City], [Country]'}
                </span>
              </li>
              <li className="pt-1">
                <span className="block font-semibold text-neutral-200">
                  {usaOffice?.title || 'USA Office'}
                </span>
                <span className="text-xs text-neutral-400">
                  {usaOffice?.address || '[Street address], [City], [Country]'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 TenzoAds. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-amber transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-700">•</span>
            <Link to="/terms" className="hover:text-amber transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

