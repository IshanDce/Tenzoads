import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Share2, Check, Linkedin, Twitter, Facebook, Link2 } from 'lucide-react';
import { getPostBySlug } from '../services/api';
import LoadingState from '../components/common/LoadingState';
import CtaBand from '../components/common/CtaBand';

export const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('the-short-answer');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await getPostBySlug(slug);
        if (res?.data) {
          setPost(res.data);
        } else {
          // Default fallback data for Flutter vs React Native matching Image 2
          setPost({
            title: 'Flutter vs React Native in 2026: Which should you choose?',
            category: 'Mobile Apps',
            author: 'TenzoAds Team',
            readTime: '9 min read',
            date: 'Oct 2026',
          });
        }
      } catch (err) {
        setPost({
          title: 'Flutter vs React Native in 2026: Which should you choose?',
          category: 'Mobile Apps',
          author: 'TenzoAds Team',
          readTime: '9 min read',
          date: 'Oct 2026',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <LoadingState message="Loading article..." />;
  }

  const sections = [
    { id: 'the-short-answer', label: 'The short answer' },
    { id: 'performance-and-ui', label: 'Performance and UI' },
    { id: 'cost-hiring-and-maintenance', label: 'Cost, hiring and maintenance' },
    { id: 'quick-comparison', label: 'Quick comparison' },
    { id: 'our-recommendation', label: 'Our recommendation' },
  ];

  const relatedArticles = [
    {
      slug: 'native-vs-cross-platform-app-development',
      title: 'Native vs Cross-Platform App Development: Decision Framework',
      category: 'MOBILE APPS',
      excerpt: 'When Kotlin and Swift win, and when one codebase saves months.',
      meta: 'TenzoAds Team · 7 min read',
      style: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white',
    },
    {
      slug: '10-ux-principles-that-increase-app-retention',
      title: '10 UX Principles That Increase App Retention',
      category: 'UI/UX DESIGN',
      excerpt: 'Simple onboarding, clear navigation and feedback loops that retain users.',
      meta: 'TenzoAds Team · 7 min read',
      style: 'bg-[#EAF5FC] text-slate-500',
    },
    {
      slug: 'how-to-add-ai-to-your-app',
      title: 'How to Add AI to Your App: A Guide for Small Businesses',
      category: 'AI INTEGRATION',
      excerpt: 'Chatbots, search and automation you can ship in weeks, with real costs.',
      meta: 'TenzoAds Team · 7 min read',
      style: 'bg-[#E6F7ED] text-slate-500',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{post?.title || 'Flutter vs React Native in 2026'} | TenzoAds Blog</title>
        <meta
          name="description"
          content="Choosing between Flutter and React Native in 2026. Detailed comparison on performance, cost, hiring and ecosystem."
        />
      </Helmet>

      {/* 1. TOP ARTICLE HEADER (Light background matching Image 2) */}
      <section className="bg-white pt-10 pb-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          {/* Breadcrumb */}
          <nav className="text-xs font-semibold text-slate-400 tracking-wider flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-500">{post?.category || 'Mobile Apps'}</span>
          </nav>

          {/* Category Chip */}
          <div>
            <span className="inline-block bg-blue-50 text-blue-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post?.category || 'Mobile Apps'}
            </span>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] max-w-3xl mx-auto">
            {post?.title || 'Flutter vs React Native in 2026: Which should you choose?'}
          </h1>

          {/* Author · Read Time */}
          <div className="text-xs sm:text-sm text-slate-500 font-medium pt-1">
            {post?.author || 'TenzoAds Team'} · {post?.readTime || '9 min read'} · {post?.date || '2026'}
          </div>
        </div>

        {/* 2. DUAL PHONE "VS" HERO ILLUSTRATION BANNER */}
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-3xl p-6 sm:p-12 flex items-center justify-center relative overflow-hidden shadow-xl shadow-blue-500/15">
            <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-8">
              {/* Left Phone (Flutter) */}
              <div className="w-[130px] sm:w-[160px] h-[260px] sm:h-[310px] bg-slate-900 rounded-[28px] p-2 shadow-2xl border-2 border-slate-800 flex flex-col justify-between">
                <div className="w-10 h-2 bg-black rounded-full mx-auto" />
                <div className="w-full h-[88%] bg-white rounded-[20px] p-2 space-y-2">
                  <div className="w-full h-10 bg-blue-600 rounded-lg p-1.5 flex flex-col justify-between">
                    <div className="w-6 h-1.5 bg-white/70 rounded" />
                    <div className="w-12 h-2 bg-white rounded font-bold" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="w-full h-3 bg-slate-100 rounded" />
                    <div className="w-full h-3 bg-slate-100 rounded" />
                    <div className="w-full h-3 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>

              {/* Center VS Badge */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-blue-600 font-black text-xs sm:text-sm flex items-center justify-center shadow-xl border border-white z-20 flex-shrink-0">
                VS
              </div>

              {/* Right Phone (React Native) */}
              <div className="w-[130px] sm:w-[160px] h-[260px] sm:h-[310px] bg-slate-900 rounded-[28px] p-2 shadow-2xl border-2 border-slate-800 flex flex-col justify-between">
                <div className="w-10 h-2 bg-black rounded-full mx-auto" />
                <div className="w-full h-[88%] bg-white rounded-[20px] p-2 space-y-2">
                  <div className="w-full h-10 bg-cyan-500 rounded-lg p-1.5 flex flex-col justify-between">
                    <div className="w-6 h-1.5 bg-white/70 rounded" />
                    <div className="w-12 h-2 bg-white rounded font-bold" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="w-full h-3 bg-slate-100 rounded" />
                    <div className="w-full h-3 bg-slate-100 rounded" />
                    <div className="w-full h-3 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN ARTICLE BODY WITH STICKY TOC SIDEBAR */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Sticky Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  IN THIS ARTICLE
                </span>
                <nav className="space-y-2">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={() => setActiveSection(sec.id)}
                      className={`block text-xs font-semibold transition-colors duration-200 ${
                        activeSection === sec.id
                          ? 'text-blue-600 font-bold border-l-2 border-blue-600 pl-2.5'
                          : 'text-slate-600 hover:text-slate-900 pl-2.5'
                      }`}
                    >
                      {sec.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Column: Article Text & Content */}
            <main className="lg:col-span-9 max-w-3xl space-y-10 text-slate-700 relative">
              {/* Floating Share Icons on desktop margin */}
              <div className="hidden xl:flex flex-col gap-2.5 absolute -left-16 top-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">SHARE</span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Share on LinkedIn"
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Share on X"
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors shadow-sm"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Share on Facebook"
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors shadow-sm"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Introduction Paragraph */}
              <p className="text-base sm:text-lg leading-relaxed text-slate-800">
                Choosing between Flutter and React Native is one of the first big decisions in any cross-platform mobile project. Both can ship polished iOS and Android apps from one codebase, so the right choice depends on your team and goals.
              </p>

              {/* Section 1: The short answer */}
              <div id="the-short-answer" className="space-y-3 pt-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  The short answer
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  If your team already writes JavaScript or TypeScript, React Native is often the faster path. If you want one consistent UI across platforms and strong control over animation, Flutter is hard to beat. Neither is wrong for most projects.
                </p>
              </div>

              {/* Section 2: Performance and UI */}
              <div id="performance-and-ui" className="space-y-4 pt-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Performance and UI
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  Flutter draws its own interface with its own rendering engine, which gives pixel-level consistency across devices. React Native renders real native components, so apps feel closer to each platform's default look and behavior.
                </p>

                {/* Quote Callout Box */}
                <div className="p-5 sm:p-6 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-2xl font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Pick the tool your team can ship and maintain well. A great app in either framework beats a perfect plan in the wrong one.
                </div>
              </div>

              {/* Section 3: Cost, hiring and maintenance */}
              <div id="cost-hiring-and-maintenance" className="space-y-3 pt-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Cost, hiring and maintenance
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  React Native shares skills with web teams, which can make hiring and onboarding easier. Flutter uses Dart, which is quick to learn but has a smaller talent pool. Long-term cost depends more on code quality and planning than on the framework.
                </p>
              </div>

              {/* Section 4: Quick comparison Table */}
              <div id="quick-comparison" className="space-y-4 pt-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Quick comparison
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0B0F19] text-white font-bold">
                        <th className="py-3.5 px-4 font-bold">Topic</th>
                        <th className="py-3.5 px-4 font-bold">Flutter</th>
                        <th className="py-3.5 px-4 font-bold">React Native</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-slate-900">Language</td>
                        <td className="py-3.5 px-4 text-slate-600">Dart</td>
                        <td className="py-3.5 px-4 text-slate-600">JavaScript / TypeScript</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3.5 px-4 font-bold text-slate-900">UI rendering</td>
                        <td className="py-3.5 px-4 text-slate-600">Own rendering engine</td>
                        <td className="py-3.5 px-4 text-slate-600">Native components</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-slate-900">Best for</td>
                        <td className="py-3.5 px-4 text-slate-600">Custom, consistent UI</td>
                        <td className="py-3.5 px-4 text-slate-600">Teams with web skills</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3.5 px-4 font-bold text-slate-900">Hiring pool</td>
                        <td className="py-3.5 px-4 text-slate-600">Smaller</td>
                        <td className="py-3.5 px-4 text-slate-600">Larger</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 5: Our recommendation */}
              <div id="our-recommendation" className="space-y-3 pt-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Our recommendation
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                  At TenzoAds we build with both, plus native Android and iOS. We pick based on your product, timeline and team, not on trend. Tell us what you are building and we will recommend the best fit.
                </p>
              </div>

              {/* Tags Row */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                {['Flutter', 'React Native', 'Mobile Apps'].map((t) => (
                  <span
                    key={t}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
                  T
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Written by TenzoAds Team</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Designers and engineers building mobile apps, websites and AI products.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* 4. RELATED ARTICLES (Matching Image 2) */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Related articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedArticles.map((rel) => (
              <article
                key={rel.slug}
                className="group bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all hover:-translate-y-1"
              >
                <div>
                  <Link to={`/blogs/${rel.slug}`} className="block mb-4 overflow-hidden rounded-2xl">
                    <div className={`h-40 w-full rounded-2xl flex items-center justify-center font-bold text-xs tracking-wider uppercase transition-transform duration-300 group-hover:scale-[1.02] ${rel.style}`}>
                      IMAGE 16:9
                    </div>
                  </Link>

                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
                    {rel.category}
                  </span>

                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    <Link to={`/blogs/${rel.slug}`}>{rel.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {rel.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
                  {rel.meta}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REUSABLE GLOBAL CTA */}
      <CtaBand />
    </>
  );
};

export default BlogDetail;
