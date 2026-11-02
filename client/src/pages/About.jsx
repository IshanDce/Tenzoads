import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Sparkles,
  Compass,
  Award,
  Eye,
  Zap,
  HeartHandshake,
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import CtaBand from '../components/common/CtaBand';
import PhoneMockup from '../components/mockups/PhoneMockup';
import BrowserMockup from '../components/mockups/BrowserMockup';

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | TenzoAds - IT Services & Digital Product Studio</title>
        <meta
          name="description"
          content="We are a dedicated team of software engineers, product designers and AI specialists building high-performing digital products for startups and enterprises."
        />
      </Helmet>

      {/* 1. HERO SECTION (Cream background) */}
      <section className="bg-cream pt-12 pb-16 md:pt-16 md:pb-24 border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
          {/* Breadcrumb */}
          <nav className="text-xs font-bold text-muted uppercase tracking-wider">
            <Link to="/" className="hover:text-ink transition-colors">
              Home
            </Link>{' '}
            / <span className="text-ink">About Us</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight max-w-4xl leading-[1.14]">
            We're a team of builders, designers and problem-solvers
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed pt-2">
            TenzoAds is an IT services company helping startups and growing businesses turn ideas
            into reliable mobile apps, websites and AI-powered products.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="py-20 md:py-28 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Mockup Graphic */}
            <div className="lg:col-span-6">
              <div className="bg-cream rounded-3xl p-6 sm:p-10 border border-borderCream relative overflow-hidden flex items-center justify-center">
                <div className="relative w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Phone Mockup */}
                  <div className="transform scale-[0.72] sm:scale-[0.78] z-10 flex-shrink-0">
                    <PhoneMockup title="Tenzo Mobile" />
                  </div>
                  {/* Browser Mockup overlapping */}
                  <div className="transform scale-[0.75] sm:scale-[0.8] -mt-16 sm:mt-8 sm:-ml-12 z-20 flex-shrink-0 w-full sm:w-[280px]">
                    <BrowserMockup title="tenzoads.com" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-ink text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span>OUR STORY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-[1.2]">
                Built to be the only tech partner you need
              </h2>

              <div className="space-y-4 text-base text-muted leading-relaxed">
                <p>
                  We started TenzoAds with a simple idea: great digital products need design,
                  engineering and strategy working together, not scattered across different vendors.
                </p>
                <p>
                  Today we design and build native and cross-platform mobile apps, high-performance
                  websites and practical AI integrations for clients who value clear communication
                  and quality work.
                </p>
              </div>

              {/* 4 Amber-Check Bullets */}
              <div className="pt-2 space-y-3">
                {[
                  'Mobile, web and AI under one roof',
                  'Design-led, engineering-driven process',
                  'Clear communication and honest timelines',
                  'Support that continues after launch',
                ].map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber flex items-center justify-center text-ink flex-shrink-0 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-ink">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Side by Side) */}
      <section className="py-16 md:py-20 bg-cream-light border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission: Amber card with black icon square */}
            <div className="bg-amber rounded-3xl p-8 sm:p-10 text-ink shadow-sm space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-ink text-amber flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Mission</h3>
              <p className="text-base sm:text-lg font-medium text-ink/85 leading-relaxed">
                To help businesses grow by delivering digital products that are fast, reliable and a
                pleasure to use.
              </p>
            </div>

            {/* Vision: Black card with amber icon square */}
            <div className="bg-ink rounded-3xl p-8 sm:p-10 text-white shadow-sm space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber text-ink flex items-center justify-center shadow-md">
                <Compass className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Vision</h3>
              <p className="text-base sm:text-lg font-medium text-neutral-300 leading-relaxed">
                To be the most trusted technology partner for startups and growing companies, known
                for quality, honesty and long-term relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR VALUES */}
      <section className="py-20 md:py-28 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            eyebrow="● OUR VALUES"
            title="The principles behind every project"
            description="How we write code, organize sprints, and partner with your team."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Quality first',
                desc: 'We care about clean code, polished design and details others skip.',
              },
              {
                icon: Eye,
                title: 'Radical transparency',
                desc: 'Clear scope, honest timelines and no surprises along the way.',
              },
              {
                icon: Zap,
                title: 'Fast, yet stable',
                desc: 'Agile delivery with regular demos, testing and reliable releases.',
              },
              {
                icon: HeartHandshake,
                title: 'Partnership',
                desc: 'We treat your product like our own and stay beyond launch day.',
              },
            ].map((v) => {
              const IconComp = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-cream-light border border-borderCream rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-soft hover:border-amber-300"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
                      <IconComp className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-lg font-extrabold text-ink mb-2">{v.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHAT WE DO (Expertise at a glance) */}
      <section className="py-20 md:py-28 bg-cream-light border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            eyebrow="● WHAT WE DO"
            title="Our expertise at a glance"
            description="Proven technical depth across mobile platforms, web infrastructure, content management and AI integration."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Mobile Apps',
                items: ['Native Android', 'Native iOS', 'Flutter', 'React Native'],
              },
              {
                title: 'Web Development',
                items: [
                  'React & Next.js',
                  'Vue.js & Angular',
                  'Node.js & Express',
                  'PHP & Laravel',
                ],
              },
              {
                title: 'CMS & No-Code',
                items: ['WordPress', 'Wix', 'Webflow'],
              },
              {
                title: 'AI & Design',
                items: ['AI Integration', 'UI/UX Design', 'Graphic Design'],
              },
            ].map((col) => (
              <div
                key={col.title}
                className="bg-white rounded-2xl border border-borderCream p-6 sm:p-7 space-y-4"
              >
                <h3 className="text-lg font-extrabold text-ink pb-2 border-b border-cream-light">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-neutral-700">
                      <div className="w-4 h-4 rounded-full bg-amber flex items-center justify-center text-ink flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REUSABLE CTA BAND */}
      <CtaBand />
    </>
  );
};

export default About;

