import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { siteConfig } from '../../config/site';
import { useSettings } from '../../hooks/useSiteData';

export const Footer = () => {
  const { description, topBarPhone, topBarEmail, indiaOffice, usaOffice } = useSettings();

  return (
    <footer className="bg-[#070B19] text-slate-400 pt-16 pb-12 border-t border-slate-900 transition-colors">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo inverted />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {description ||
                'IT services studio building mobile apps, websites and AI products for startups and growing businesses.'}
            </p>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.path}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${topBarEmail}`}
                  className="hover:text-blue-400 transition-colors break-all"
                >
                  {topBarEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${topBarPhone.replace(/\s+/g, '')}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {topBarPhone}
                </a>
              </li>
              <li className="pt-1 text-xs text-slate-400 leading-normal">
                <span className="font-semibold text-slate-300 block mb-0.5">India Office</span>
                {indiaOffice?.address || 'Tower B, Tech Park, Sector 62, Noida, Delhi NCR, India'}
              </li>
              <li className="pt-1 text-xs text-slate-400 leading-normal">
                <span className="font-semibold text-slate-300 block mb-0.5">USA Office</span>
                {usaOffice?.address || '548 Market St, Suite 34291, San Francisco, CA 94104'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} TenzoAds. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
