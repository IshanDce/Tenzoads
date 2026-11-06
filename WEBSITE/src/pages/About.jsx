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
import { usePageContent } from '../hooks/useSiteData';

export const About = () => {
  const { content } = usePageContent('about', {
    heroTitle: 'Builders, designers and problem-solvers',
    heroDescription:
      'TenzoAds helps startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products.',
    storyHeading: 'Built to be the only tech partner you need',
    storyParagraph1:
      'Our team handles design, development and AI under one roof, so you work with one accountable partner from the first sketch to launch and long after.',
    storyParagraph2:
      'Today we design and build native and cross-platform mobile apps, high-performance websites and practical AI integrations for clients who value clear communication and quality work.',
    missionTitle: 'Our Mission',
    missionText:
      'Deliver reliable apps, websites and AI products that help businesses grow, with honest timelines, clear communication and engineering quality we are proud to stand behind.',
    visionTitle: 'Our Vision',
    visionText:
      'To be the one technology partner startups and growing businesses trust from idea to launch, known for craft, transparency and long-term support.',
    valuesTitle: 'The principles behind everything we build',
  });

  return (
    <>
      <Helmet>
        <title>About Us | TenzoAds - IT Services & Digital Product Studio</title>
        <meta
          name="description"
          content="We are a dedicated team of software engineers, product designers and AI specialists building high-performing digital products for startups and enterprises."
        />
      </Helmet>

      {/* 1. HERO SECTION (Dark Navy with Ambient Glow) */}
      <section className="relative bg-[#070B19] text-white pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-900">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>{' '}
            / <span className="text-white">About us</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.14]">
            {content.heroTitle || 'Builders, designers and problem-solvers'}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed pt-2">
            {content.heroDescription ||
              'TenzoAds helps startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products.'}
          </p>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Mockup Graphic */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent rounded-3xl p-6 sm:p-10 border border-blue-100 relative overflow-hidden flex items-center justify-center">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Our Story</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                {content.storyHeading || 'Built to be the only tech partner you need'}
              </h2>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  {content.storyParagraph1 ||
                    'Our team handles design, development and AI under one roof, so you work with one accountable partner from the first sketch to launch and long after.'}
                </p>
                <p>
                  {content.storyParagraph2 ||
                    'Today we design and build native and cross-platform mobile apps, high-performance websites and practical AI integrations for clients who value clear communication and quality work.'}
                </p>
              </div>

              {/* 4 Blue-Check Bullets */}
              <div className="pt-2 space-y-3">
                {[
                  'Mobile, web and AI under one roof',
                  'Design-led, engineering-driven process',
                  'Clear communication and honest timelines',
                  'Support that continues after launch',
                ].map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-slate-800">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Stats Row (24h, 5, 2, 4) */}
          <div className="pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">24h</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">Quote turnaround</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">5</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">Core services</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">2</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">Offices: India & USA</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">4</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">Step delivery process</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Side by Side) */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission: Light card with blue icon square */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 text-slate-900 border border-slate-200/80 shadow-sm space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Sparkles className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {content.missionTitle || 'Our Mission'}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                {content.missionText ||
                  'Deliver reliable apps, websites and AI products that help businesses grow, with honest timelines, clear communication and engineering quality we are proud to stand behind.'}
              </p>
            </div>

            {/* Vision: Dark Navy card with blue icon square */}
            <div className="bg-[#070B19] rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-md space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Compass className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {content.visionTitle || 'Our Vision'}
              </h3>
              <p className="text-base text-slate-400 leading-relaxed">
                {content.visionText ||
                  'To be the one technology partner startups and growing businesses trust from idea to launch, known for craft, transparency and long-term support.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR VALUES */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            eyebrow="● Our Values"
            title={content.valuesTitle || 'The principles behind everything we build'}
            description="How we write code, organize sprints, and partner with your team."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Quality first',
                desc: 'We sweat the details so your product feels polished, fast and dependable.',
              },
              {
                icon: Eye,
                title: 'Radical transparency',
                desc: 'Clear scope, honest timelines and open communication at every stage of the project.',
              },
              {
                icon: Zap,
                title: 'Fast, yet stable',
                desc: 'Agile delivery without cutting corners on testing or long-term maintainability.',
              },
              {
                icon: HeartHandshake,
                title: 'Partnership',
                desc: 'We work as an extension of your team, not just another vendor on the invoice.',
              },
            ].map((v) => {
              const IconComp = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-200"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-sm shadow-blue-500/20">
                      <IconComp className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global CTA Band */}
      <CtaBand />
    </>
  );
};

export default About;
