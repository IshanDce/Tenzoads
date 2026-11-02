import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  CheckCircle2,
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
import { siteConfig } from '../config/site';
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
    heroEyebrow: 'IT SERVICES & DIGITAL PRODUCT STUDIO',
    heroTitle: 'We build Apps, Websites & AI Products that grow your business.',
    heroDescription:
      'TenzoAds is a full-service IT company delivering native and cross-platform mobile apps, high-performance websites and custom AI integrations, UI/UX and graphic design all under one roof.',
    buttonStart: 'Start Project',
    buttonWork: 'View Our Work',
    techTitle: 'TECHNOLOGIES WE BUILD WITH',
    servicesTitle: 'End-To-End IT Services For Modern Businesses',
    servicesSubtitle:
      'From First Idea Sketch To The Final Release: One Team Handles Design, Development And AI So You Focus On Growth.',
    whyUsTitle: 'ONE PARTNER FOR DESIGN, DEVELOPMENT AND AI',
    whyUsSubtitle:
      'We combine product strategy, design and cutting-edge engineering so you can launch fast and scale without friction.',
    processTitle: 'A SIMPLE, PROVEN PROCESS FROM IDEA TO LAUNCH',
    projectsTitle: "PROJECTS WE'RE PROUD OF",
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

      {/* 1. HERO SECTION (Cream background) */}
      <section className="bg-cream pt-12 pb-20 md:pt-16 md:pb-28 border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Chip */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-ink text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-amber flex-shrink-0 animate-ping" />
                <span>{homeContent.heroEyebrow || 'IT SERVICES & DIGITAL PRODUCT STUDIO'}</span>
              </div>

              {/* H1 Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.12]">
                {homeContent.heroTitle || 'We build Apps, Websites & AI Products that grow your business.'}
              </h1>

              {/* Short Paragraph */}
              <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                {homeContent.heroDescription ||
                  'TenzoAds is a full-service IT company delivering native and cross-platform mobile apps, high-performance websites and custom AI integrations, UI/UX and graphic design all under one roof.'}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-ink text-white hover:bg-neutral-800 rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  {homeContent.buttonStart || 'Start Project'}
                </Link>
                <Link
                  to="/portfolio"
                  className="px-8 py-3.5 border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full font-bold text-sm sm:text-base transition-all duration-200"
                >
                  {homeContent.buttonWork || 'View Our Work'}
                </Link>
              </div>

              {/* Three Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-neutral-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber flex-shrink-0" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber flex-shrink-0" />
                  <span>Transparent pricing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber flex-shrink-0" />
                  <span>Agile delivery</span>
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
      <section className="py-14 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-muted block">
            {homeContent.techTitle || 'TECHNOLOGIES WE BUILD WITH'}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
              {
                technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-amber hover:bg-amber-hover text-ink text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow-sm transition-all duration-200 cursor-default hover:scale-105"
                  >
                    {tech}
                  </span>
                ))
              }
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="py-20 md:py-28 bg-cream-light border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <SectionHeading
            eyebrow="● OUR SERVICES"
            title={homeContent.servicesTitle || 'End-To-End IT Services For Modern Businesses'}
            description={
              homeContent.servicesSubtitle ||
              'From First Idea Sketch To The Final Release: One Team Handles Design, Development And AI So You Focus On Growth.'
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {
                services.map((service) => (
                  <ServiceCard key={service._id || service.id || service.title} service={service} />
                ))
              }
          </div>
        </div>
      </section>

      {/* 4. WHY TENZOADS (Black Section) */}
      <section className="py-20 md:py-28 bg-ink text-white">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span>WHY TENZOADS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18]">
                {homeContent.whyUsTitle || 'ONE PARTNER FOR DESIGN, DEVELOPMENT AND AI'}
              </h2>

              <p className="text-base text-neutral-400 leading-relaxed max-w-md">
                {homeContent.whyUsSubtitle ||
                  'We combine product strategy, design and cutting-edge engineering so you can launch fast and scale without friction.'}
              </p>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber hover:text-amber-hover transition-colors"
                >
                  <span>Learn more about our team & philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right 2x2 Grid of dark cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {
                  whyUsItems.map((item) => {
                    const IconComponent = whyIcons[item.icon] || Box;
                    return (
                      <div
                        key={item.title}
                        className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 hover:border-amber/50 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber text-ink flex items-center justify-center font-bold mb-4 shadow-sm">
                          <IconComponent className="w-5 h-5 stroke-[2]" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })
                }
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW WE WORK */}
      <section className="py-20 md:py-28 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            eyebrow="● HOW WE WORK"
            title={homeContent.processTitle || 'A SIMPLE, PROVEN PROCESS FROM IDEA TO LAUNCH'}
            description="Clear phases with predictable milestones, transparent progress updates, and zero surprises."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {
                steps.map((step) => (
                  <div
                    key={step.number || step.order}
                    className="bg-cream-light border border-borderCream rounded-2xl p-6 sm:p-7 relative transition-all duration-300 hover:shadow-soft hover:border-amber-300"
                  >
                    {/* Amber number circle */}
                    <div className="w-10 h-10 rounded-full bg-amber text-ink font-extrabold text-base flex items-center justify-center mb-5 shadow-sm">
                      {step.number || step.order}
                    </div>

                    <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                  </div>
                ))
              }
          </div>
        </div>
      </section>

      {/* 6. PROJECTS WE'RE PROUD OF */}
      <section className="py-20 md:py-28 bg-cream-light border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-ink text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span>OUR WORK</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                {homeContent.projectsTitle || "PROJECTS WE'RE PROUD OF"}
              </h2>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-ink text-ink hover:bg-ink hover:text-white rounded-full font-bold text-sm transition-all duration-200 self-start md:self-auto"
            >
              View all projects
            </Link>
          </div>

          {/* 3 Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {loadingProjects ? (
              <div className="col-span-3 text-center py-12 text-muted font-medium">
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
      <section className="py-20 md:py-28 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-ink text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span>FAQ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
                Frequently asked questions
              </h2>

              <p className="text-base text-muted leading-relaxed">
                Got questions? Here's what you need to know. Can't find your question? Ask us.
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-7 py-3 bg-ink text-white hover:bg-neutral-800 rounded-full font-bold text-sm transition-all duration-200 shadow-sm"
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

