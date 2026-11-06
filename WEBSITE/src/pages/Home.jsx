import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Box,
  Zap,
  Bot,
  ShieldCheck,
  Layers,
  Cpu,
  Headphones,
} from 'lucide-react';
import HeroIllustration from '../components/mockups/HeroIllustration';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/cards/ServiceCard';
import ProjectCard from '../components/cards/ProjectCard';
import FaqAccordion from '../components/common/FaqAccordion';
import CtaBand from '../components/common/CtaBand';
import TypewriterWords from '../components/common/TypewriterWords';
import CountUpNumber from '../components/common/CountUpNumber';
import { getProjects } from '../services/api';
import {
  usePageContent,
  useTechnologies,
  useServices,
  useWhyUs,
  useProcessSteps,
  useFaqs,
} from '../hooks/useSiteData';

const whyIcons = {
  Box,
  Zap,
  Bot,
  ShieldCheck,
  Layers,
  Cpu,
  Headphones,
};

export const Home = () => {
  const { content: homeContent } = usePageContent('home', {
    heroEyebrow: 'IT Services & Digital Product Studio',
    heroTitle: 'We build apps, websites & AI products that grow your business.',
    heroDescription:
      'TenzoAds is a full-service IT company delivering mobile apps, websites, AI integration, UI/UX and graphic design, all under one roof.',
    buttonStart: 'Start a Project',
    buttonWork: 'View Our Work',
    techTitle: 'Technologies we build with',
    servicesTitle: 'End-to-end IT services for modern businesses',
    servicesSubtitle:
      'From first sketch to final release, one team handles design, development and AI',
    whyUsTitle: 'One partner for design, development and AI',
    whyUsSubtitle:
      'We combine product thinking, design craft and engineering depth so you never juggle vendors.',
    processTitle: 'A simple, proven process from idea to launch',
    projectsTitle: "Projects we're proud of",
  });

  const { technologies } = useTechnologies();
  const { services } = useServices();
  const { items: whyUsItems } = useWhyUs();
  const { steps } = useProcessSteps();
  const { faqs } = useFaqs('home');

  const { data: projectsData, isLoading: loadingProjects } = useQuery({
    queryKey: ['home-featured-projects'],
    queryFn: async () => {
      const res = await getProjects({ limit: 3 });
      return res?.data || [];
    },
    staleTime: 60 * 1000,
  });

  const featuredProjects = projectsData && projectsData.length > 0 ? projectsData : [];

  // Staggered reveal for "How We Work" section: steps 1-4 view with 2s gap
  const [visibleStepCount, setVisibleStepCount] = useState(1);
  const processSectionRef = useRef(null);
  const hasTriggeredProcessRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredProcessRef.current) {
          hasTriggeredProcessRef.current = true;
          // Step 1 shown immediately (count=1)
          // Step 2 revealed at 2 seconds
          const t1 = setTimeout(() => setVisibleStepCount(2), 2000);
          // Step 3 revealed at 4 seconds
          const t2 = setTimeout(() => setVisibleStepCount(3), 4000);
          // Step 4 revealed at 6 seconds
          const t3 = setTimeout(() => setVisibleStepCount(4), 6000);

          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
          };
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = processSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>TenzoAds | Mobile Apps, Websites & AI Products Studio</title>
        <meta
          name="description"
          content="We build high-converting mobile apps, modern websites, and custom AI products for ambitious startups and growing businesses."
        />
        <meta property="og:title" content="TenzoAds | Modern IT Services & Product Studio" />
        <meta
          property="og:description"
          content="End-to-end mobile apps, web development, and AI integration under one roof."
        />
      </Helmet>

      {/* 1. HERO SECTION (Dark Navy with Ambient Blue Glow) */}
      <section className="relative bg-[#070B19] text-white pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-slate-900">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-20 left-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Chip */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{homeContent.heroEyebrow || 'IT Services & Digital Product Studio'}</span>
              </div>

              {/* H1 Title with Typewriter & Erase Animation */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.16]">
                We build{' '}
                <TypewriterWords
                  words={['Apps', 'Websites', 'AI Products', 'Automation']}
                  typingSpeed={85}
                  deletingSpeed={45}
                  pauseTime={1600}
                />
                <br className="hidden sm:inline" /> that grow your business.
              </h1>

              {/* Short Paragraph */}
              <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
                {homeContent.heroDescription ||
                  'TenzoAds is a full-service IT company delivering mobile apps, websites, AI integration, UI/UX and graphic design, all under one roof.'}
              </p>

              {/* CTA Buttons with enhanced hover */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0"
                >
                  {homeContent.buttonStart || 'Start a Project'}
                </Link>
                <Link
                  to="/portfolio"
                  className="px-8 py-3.5 border border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 text-white rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1"
                >
                  {homeContent.buttonWork || 'View Our Work'}
                </Link>
              </div>

              {/* Three Stat Badges with Dynamic Count-Up Animations */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg">
                <div className="group transition-transform hover:-translate-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">
                    <CountUpNumber start={1} end={24} duration={1500} suffix=" Hours" />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Quote turnaround</div>
                </div>
                <div className="group transition-transform hover:-translate-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-blue-400 transition-colors">
                    Free
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Consultation</div>
                </div>
                <div className="group transition-transform hover:-translate-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">
                    <CountUpNumber start={1} end={5} duration={1200} />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Core services</div>
                </div>
              </div>
            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECHNOLOGIES WE BUILD WITH */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block">
            {homeContent.techTitle || 'Technologies we build with'}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-xs hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-default hover:scale-105 active:scale-95"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <SectionHeading
            eyebrow="● Our Services"
            title={homeContent.servicesTitle || 'End-to-end IT services for modern businesses'}
            description={
              homeContent.servicesSubtitle ||
              'From first sketch to final release, one team handles design, development and AI'
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={service._id || service.id || service.title}
                service={service}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY TENZOADS (Dark Navy Section) */}
      <section className="py-20 md:py-28 bg-[#070B19] text-white border-b border-slate-900">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Why TenzoAds</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18]">
                {homeContent.whyUsTitle || 'One partner for design, development and AI'}
              </h2>

              <p className="text-base text-slate-400 leading-relaxed max-w-md">
                {homeContent.whyUsSubtitle ||
                  'We combine product thinking, design craft and engineering depth so you never juggle vendors.'}
              </p>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Learn more about our team & philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right 2x2 Grid of dark cards with enhanced hover lift */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyUsItems.map((item) => {
                const IconComponent = whyIcons[item.icon] || Box;
                return (
                  <div
                    key={item.title}
                    className="bg-[#111827]/80 border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 hover:-translate-y-1.5 group cursor-default"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-4 shadow-md shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW WE WORK (Sequential 2-Second Step Reveal) */}
      <section ref={processSectionRef} className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            eyebrow="● How We Work"
            title={homeContent.processTitle || 'A simple, proven process from idea to launch'}
            description="Clear phases with predictable milestones, transparent progress updates, and zero surprises."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => {
              const isVisible = idx < visibleStepCount;

              return (
                <div
                  key={step.number || step.order}
                  className={`rounded-2xl p-6 sm:p-7 relative transition-all duration-500 ease-out transform ${
                    isVisible
                      ? 'opacity-100 visible translate-y-0 scale-100 bg-slate-50 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-2 hover:bg-white'
                      : 'opacity-0 invisible translate-y-6 scale-95 pointer-events-none'
                  }`}
                >
                  {/* Step Header with Number Circle */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full font-extrabold text-base flex items-center justify-center shadow-md bg-blue-600 text-white shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110">
                      {step.number || step.order}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PROJECTS WE'RE PROUD OF */}
      <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Selected Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {homeContent.projectsTitle || "Projects we're proud of"}
              </h2>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-300 text-slate-800 hover:border-slate-900 hover:text-slate-900 rounded-full font-bold text-sm transition-all duration-200 self-start md:self-auto"
            >
              View all projects
            </Link>
          </div>

          {/* 3 Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {loadingProjects ? (
              <div className="col-span-3 text-center py-12 text-slate-400 font-medium">
                Loading featured projects...
              </div>
            ) : (
              featuredProjects.slice(0, 3).map((proj) => (
                <ProjectCard key={proj.slug || proj._id} project={proj} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>FAQ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Frequently asked questions
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Got questions? Here's what you need to know. Can't find your question? Ask us.
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm transition-all duration-200 shadow-md shadow-blue-500/20"
                >
                  Ask a question
                </Link>
              </div>
            </div>

            {/* Right column: Accordion */}
            <div className="lg:col-span-7">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. REUSABLE CTA BAND */}
      <CtaBand />
    </>
  );
};

export default Home;
