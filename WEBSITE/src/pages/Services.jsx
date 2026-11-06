import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CtaBand from '../components/common/CtaBand';

const servicesData = [
  {
    number: '01',
    title: 'Mobile App Development',
    description: 'Native Android & iOS plus Flutter and React Native apps built for scale.',
    bullets: ['Native Android', 'Native iOS', 'Flutter', 'React Native'],
    contactService: 'Mobile App Development',
  },
  {
    number: '02',
    title: 'Website Development',
    description: 'Fast, SEO-friendly websites and web apps on modern JavaScript and PHP stacks.',
    bullets: ['React & Next.js', 'Vue.js & Angular', 'Node.js & Nest.js', 'PHP & Laravel'],
    contactService: 'Website Development',
  },
  {
    number: '03',
    title: 'CMS & No-Code Websites',
    description: 'Launch quickly with clean design, easy editing and solid on-page SEO.',
    bullets: ['WordPress', 'Wix', 'Webflow', 'SEO-ready setup'],
    contactService: 'CMS & No-Code',
  },
  {
    number: '04',
    title: 'AI Integration',
    description: 'Chatbots, automation and smart search added to your product, practically.',
    bullets: ['Chatbots', 'Workflow automation', 'Smart search', 'Recommendations'],
    contactService: 'AI Integration',
  },
  {
    number: '05',
    title: 'UI/UX Design',
    description: 'Research, wireframes and prototypes that are easy to use and a joy to look at.',
    bullets: ['Research', 'Wireframes', 'Prototypes', 'Design systems'],
    contactService: 'UI/UX Design',
  },
  {
    number: '06',
    title: 'Graphic Design',
    description: 'Logos, brand identity and social creatives that make your brand memorable.',
    bullets: ['Logos', 'Brand identity', 'Social creatives', 'Marketing visuals'],
    contactService: 'Graphic Design',
  },
];

export const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | TenzoAds - Mobile Apps, Web Development & AI</title>
        <meta
          name="description"
          content="End-to-end IT services for modern businesses: Mobile Apps, Website Development, CMS & No-Code, AI Integration, UI/UX and Graphic Design."
        />
      </Helmet>

      {/* 1. HERO SECTION (Dark Navy with Ambient Blue Glow) */}
      <section className="relative bg-[#070B19] text-white pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-900">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>{' '}
            / <span className="text-white">Services</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.14]">
            End-to-end IT services for modern businesses
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed pt-2">
            Design, development and AI under one roof. Pick a single service or let us own the whole product.
          </p>
        </div>
      </section>

      {/* 2. SERVICES GRID (3x2 Large Cards) */}
      <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((svc) => (
              <div
                key={svc.number}
                className="group bg-white rounded-2xl border border-slate-100 p-8 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Number Badge */}
                  <div className="inline-block bg-blue-50 text-blue-600 font-bold text-xs px-3 py-1 rounded-full">
                    {svc.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {svc.description}
                  </p>

                  {/* Bullet Points with Cyan/Teal Dots */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-100">
                    {svc.bullets.map((b) => (
                      <div key={b} className="flex items-center gap-2.5 text-sm font-medium text-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to={`/contact?service=${encodeURIComponent(svc.contactService)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Get a quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Global CTA */}
      <CtaBand />
    </>
  );
};

export default Services;

