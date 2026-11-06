import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjectBySlug, formatImageUrl } from '../services/api';
import LoadingState from '../components/common/LoadingState';
import ProjectCard from '../components/cards/ProjectCard';
import CtaBand from '../components/common/CtaBand';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      setImgError(false);
      try {
        const res = await getProjectBySlug(slug);
        if (res?.data) {
          setProject(res.data);
          setRelated(res.related || []);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <LoadingState message="Loading project case study..." />;
  }

  if (error || !project) {
    return (
      <div className="py-24 max-w-site mx-auto px-4 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-900">Project Not Found</h2>
        <p className="text-slate-500">The project case study you requested could not be located.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  const formattedThumbnail = formatImageUrl(project.thumbnail);
  const showRealImage = Boolean(formattedThumbnail && !imgError);

  // Default features for Bloom Finance or fallback
  const defaultFeatures = [
    { number: '01', title: 'Spending insights', desc: 'See where money goes with clear categories and trends.' },
    { number: '02', title: 'Savings goals', desc: 'Set goals and track progress with gentle nudges.' },
    { number: '03', title: 'Secure access', desc: 'Biometric login and encrypted data for peace of mind.' },
    { number: '04', title: 'Smart notifications', desc: 'Timely alerts for bills, limits and unusual activity.' },
    { number: '05', title: 'Multi-account view', desc: 'All accounts and cards in one simple dashboard.' },
    { number: '06', title: 'Dark & light mode', desc: 'Comfortable use day and night on iOS and Android.' },
  ];

  const featuresToDisplay = project.features && project.features.length > 0
    ? project.features.map((f, i) => ({
        number: String(i + 1).padStart(2, '0'),
        title: typeof f === 'string' ? f : f.title || `Feature ${i + 1}`,
        desc: typeof f === 'object' && f.desc ? f.desc : 'Engineered for optimal speed, security, and fluid usability.',
      }))
    : defaultFeatures;

  const techChips = project.tags && project.tags.length > 0
    ? project.tags
    : [project.techTag || 'Flutter', 'Node.js', 'iOS', 'Android'];

  return (
    <>
      <Helmet>
        <title>{`${project.title} | TenzoAds Case Study`}</title>
        <meta name="description" content={project.shortDescription || project.description} />
      </Helmet>

      {/* 1. TOP HEADER & HERO SPLIT (White background matching Image 5) */}
      <section className="bg-white pt-10 pb-16 md:pt-14 md:pb-20 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/portfolio" className="hover:text-blue-600 transition-colors">
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-slate-900">{project.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Info & Specs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Chips */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-blue-50 text-blue-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {project.categoryTag || project.category || 'Mobile App'}
                </span>
                <span className="bg-slate-100 text-slate-700 px-3.5 py-1 rounded-full text-xs font-bold">
                  {project.techTag || 'Flutter'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                {project.fullDescription ||
                  project.description ||
                  'A cross-platform finance app that helps people track spending, build savings goals and make everyday money decisions with confidence.'}
              </p>

              {/* 2x2 Meta Grid */}
              <div className="pt-2 grid grid-cols-2 gap-y-4 gap-x-8 max-w-lg border-t border-slate-100 pt-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    INDUSTRY
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {project.industry || 'Finance'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    PLATFORMS
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {project.platforms || 'iOS · Android'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    SERVICES
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {project.servicesDelivered || 'Design & Development'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    TECH
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {project.techDetails || `${project.techTag || 'Flutter'} · Node.js`}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
                >
                  Start a similar project
                </Link>
                <Link
                  to="/portfolio"
                  className="px-7 py-3.5 border border-slate-300 hover:border-slate-800 text-slate-800 rounded-full font-bold text-sm transition-all"
                >
                  Back to portfolio
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Dual Phone in Blue Gradient Container */}
            <div className="lg:col-span-5 flex justify-center">
              {showRealImage ? (
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-2 bg-slate-50">
                  <img
                    src={formattedThumbnail}
                    alt={project.title}
                    className="w-full h-auto max-h-[480px] object-contain rounded-2xl"
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                <div className="relative w-full max-w-[420px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 rounded-3xl p-6 sm:p-8 flex items-center justify-center overflow-visible shadow-xl shadow-blue-500/20">
                  {/* Floating badge 1: Spending insights */}
                  <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Spending insights</span>
                  </div>

                  {/* Overlapping Dual Phones */}
                  <div className="relative z-10 flex items-center justify-center gap-3 py-4">
                    {/* Left phone */}
                    <div className="w-[140px] sm:w-[155px] h-[280px] sm:h-[310px] bg-slate-900 rounded-[28px] p-2 shadow-2xl border-2 border-slate-800 flex flex-col justify-between">
                      <div className="w-10 h-2.5 bg-black rounded-full mx-auto" />
                      <div className="w-full h-[85%] bg-white rounded-[20px] p-2 space-y-2">
                        <div className="w-full h-10 bg-blue-600 rounded-lg p-1.5 flex flex-col justify-between">
                          <div className="w-6 h-1.5 bg-white/70 rounded" />
                          <div className="w-12 h-2 bg-white rounded font-bold" />
                        </div>
                        <div className="space-y-1 pt-1">
                          <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                          <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                          <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Right phone */}
                    <div className="w-[140px] sm:w-[155px] h-[280px] sm:h-[310px] bg-slate-900 rounded-[28px] p-2 shadow-2xl border-2 border-slate-800 flex flex-col justify-between transform translate-y-3">
                      <div className="w-10 h-2.5 bg-black rounded-full mx-auto" />
                      <div className="w-full h-[85%] bg-white rounded-[20px] p-2 space-y-2">
                        <div className="w-full h-10 bg-cyan-500 rounded-lg p-1.5 flex flex-col justify-between">
                          <div className="w-8 h-1.5 bg-white/70 rounded" />
                          <div className="w-10 h-2 bg-white rounded font-bold" />
                        </div>
                        <div className="space-y-1 pt-1">
                          <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                          <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                          <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge 2: Savings goal reached */}
                  <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Savings goal reached</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION (Challenge & Solution) */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left title */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Overview</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Making money simple for everyone
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                A closer look at the problem we solved and how we solved it.
              </p>
            </div>

            {/* Right Cards: 01 The Challenge & 02 The Solution */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm space-y-3">
                <div className="inline-block bg-blue-50 text-blue-600 font-bold text-xs px-2.5 py-0.5 rounded-full">
                  01
                </div>
                <h3 className="text-lg font-bold text-slate-900">The Challenge</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.challenge ||
                    'Users struggled to see where their money went across accounts, and existing tools felt complicated and cluttered. The goal was a simple, trustworthy app that makes everyday money decisions easier.'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm space-y-3">
                <div className="inline-block bg-blue-50 text-blue-600 font-bold text-xs px-2.5 py-0.5 rounded-full">
                  02
                </div>
                <h3 className="text-lg font-bold text-slate-900">The Solution</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.solution ||
                    'We designed a clean, goal-focused experience and built it in Flutter for iOS and Android from one codebase, with clear spending insights, savings goals and secure, fast performance.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APP SCREENS SHOWCASE (Dark Navy Full Band) */}
      <section className="py-20 md:py-28 bg-[#070B19] text-white border-b border-slate-900">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-14">
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>App Screens</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Designed for clarity on every screen
            </h2>
          </div>

          {/* 4 App screens side-by-side */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-center max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((scr) => (
              <div
                key={scr}
                className="bg-slate-900 rounded-[28px] p-2.5 border-2 border-slate-800 shadow-2xl flex flex-col"
              >
                <div className="w-10 h-2 bg-black rounded-full mx-auto mb-2" />
                <div className="w-full h-72 sm:h-80 bg-white rounded-[20px] p-2.5 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-2">
                    <div
                      className={`w-full h-10 rounded-xl p-2 ${
                        scr % 2 === 1 ? 'bg-blue-600' : 'bg-cyan-500'
                      }`}
                    >
                      <div className="w-8 h-1.5 bg-white/70 rounded" />
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                      <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                      <div className="w-full h-4 bg-slate-50 border border-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-around border-t border-slate-100">
                    <div className="w-3.5 h-3.5 rounded bg-blue-600" />
                    <div className="w-3.5 h-3.5 rounded bg-slate-200" />
                    <div className="w-3.5 h-3.5 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES (3x2 Grid) */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>What We Built</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Key features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuresToDisplay.map((feat) => (
              <div
                key={feat.number}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all space-y-3"
              >
                <div className="inline-block bg-blue-50 text-blue-600 font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {feat.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Built with Tags */}
          <div className="pt-10 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-bold text-slate-900 mr-2">Built with</span>
            {techChips.map((tech) => (
              <span
                key={tech}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MORE PROJECTS */}
      {related.length > 0 && (
        <section className="py-20 bg-slate-50 border-b border-slate-100">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                More mobile app projects
              </h2>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-300 text-slate-800 hover:border-slate-900 rounded-full font-bold text-xs shadow-sm self-start sm:self-auto"
              >
                View all projects
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.slice(0, 3).map((relProj) => (
                <ProjectCard key={relProj._id || relProj.slug} project={relProj} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global CTA Band */}
      <CtaBand />
    </>
  );
};

export default ProjectDetail;
