import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

export const LegalPage = () => {
  const { pathname } = useLocation();
  const isPrivacy = pathname.includes('privacy');
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';

  return (
    <>
      <Helmet>
        <title>{`${title} | TenzoAds`}</title>
      </Helmet>
      <section className="relative bg-[#070B19] text-white pt-14 pb-16 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Link to="/" className="hover:text-blue-400">Home</Link> / <span className="text-white">{title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{title}</h1>
          <p className="text-xs text-slate-400">Last updated: October 2026</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral">
          <p className="text-base text-slate-700 leading-relaxed">
            Welcome to TenzoAds. This {title} explains our practices regarding your information and the terms governing your use of our digital engineering and product design services.
          </p>
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">1. Overview</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We value your confidentiality. Any information submitted via our quote form is protected by strict non-disclosure obligations and will never be shared or sold to third parties.
          </p>
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">2. Intellectual Property</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            All custom source code, design assets, and digital artifacts engineered for our clients become the exclusive intellectual property of the client upon final milestone delivery and payment settlement.
          </p>
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">3. Contact Inquiries</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            For questions regarding our privacy practices or terms, please contact our legal and administrative team directly at hello@tenzoads.com.
          </p>
        </div>
      </section>
    </>
  );
};

export default LegalPage;
