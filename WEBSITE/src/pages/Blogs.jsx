import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import FilterPills from '../components/common/FilterPills';
import LoadingState from '../components/common/LoadingState';
import { getPosts, subscribeNewsletter, formatImageUrl } from '../services/api';
import { usePageContent } from '../hooks/useSiteData';

const filterCategories = [
  'All',
  'Mobile Apps',
  'Web Development',
  'AI Integration',
  'UI/UX',
  'Graphic Design',
];

// Pre-defined static fallback articles matching Image 1 exactly if DB returns empty
const defaultArticles = [
  {
    slug: 'why-nextjs-is-best-for-seo',
    title: 'Why Next.js Is the Best Choice for SEO-Friendly Business Websites',
    categoryDisplay: 'WEB DEVELOPMENT',
    excerpt: 'Server rendering, speed and clean URLs that help your site rank and convert.',
    author: 'TenzoAds Team',
    readTime: '7 min read',
    mediaStyle: 'gradient-blue',
  },
  {
    slug: 'how-to-add-ai-to-your-app',
    title: 'How to Add AI to Your App: A Guide for Small Businesses',
    categoryDisplay: 'AI INTEGRATION',
    excerpt: 'Chatbots, search and automation you can ship in weeks, with real costs.',
    author: 'TenzoAds Team',
    readTime: '7 min read',
    mediaStyle: 'soft-mint',
  },
  {
    slug: '10-ux-principles-that-increase-app-retention',
    title: '10 UX Principles That Increase App Retention',
    categoryDisplay: 'UI/UX DESIGN',
    excerpt: 'Simple onboarding, clear navigation and feedback loops that retain users.',
    author: 'TenzoAds Team',
    readTime: '7 min read',
    mediaStyle: 'soft-ice',
  },
  {
    slug: 'wordpress-vs-webflow-vs-custom-code',
    title: 'WordPress vs Webflow vs Custom Code: What Fits Your Budget?',
    categoryDisplay: 'WEB DEVELOPMENT',
    excerpt: 'Cost, flexibility, speed and scalability compared in plain language.',
    author: 'TenzoAds Team',
    readTime: '7 min read',
    mediaStyle: 'soft-ice',
  },
  {
    slug: 'native-vs-cross-platform-app-development',
    title: 'Native vs Cross-Platform App Development: Decision Framework',
    categoryDisplay: 'MOBILE APPS',
    excerpt: 'When Kotlin and Swift win, and when one codebase saves months.',
    author: 'TenzoAds Team',
    readTime: '7 min read',
    mediaStyle: 'soft-ice',
  },
  {
    slug: 'brand-identity-basics-logo-color-type',
    title: 'Brand Identity Basics: Logo, Color and Type for New Brands',
    categoryDisplay: 'GRAPHIC DESIGN',
    excerpt: 'Build a consistent look from day one with a simple brand system.',
    author: 'TenzoAds Team',
    readTime: '7 min read',
    mediaStyle: 'dark-navy',
  },
];

export const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const { content: blogsContent } = usePageContent('blogs', {
    heroTitle: 'Ideas on apps, web and AI',
    heroDescription: 'Practical guides from our team on mobile, web, AI and design.',
  });

  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await getPosts({
          category: activeCategory === 'All' ? undefined : (activeCategory === 'UI/UX' ? 'UI/UX Design' : activeCategory),
          limit: 12,
        });

        if (res?.data && res.data.length > 0) {
          // Find featured or first
          const featured = res.data.find((p) => p.featured) || res.data[0];
          setFeaturedPost(featured);
          setPosts(res.data.filter((p) => p._id !== featured?._id));
        } else {
          // Use default static fallbacks matching Image 1
          setFeaturedPost({
            slug: 'flutter-vs-react-native-2026',
            title: 'Flutter vs React Native in 2026: Which should you choose?',
            categoryDisplay: 'FEATURED · MOBILE APPS',
            excerpt:
              'Performance, cost, hiring and long-term maintenance compared to pick the right framework.',
            author: 'TenzoAds Team',
            readTime: '9 min read',
          });
          setPosts(defaultArticles);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setFeaturedPost({
          slug: 'flutter-vs-react-native-2026',
          title: 'Flutter vs React Native in 2026: Which should you choose?',
          categoryDisplay: 'FEATURED · MOBILE APPS',
          excerpt:
            'Performance, cost, hiring and long-term maintenance compared to pick the right framework.',
          author: 'TenzoAds Team',
          readTime: '9 min read',
        });
        setPosts(defaultArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setNewsletterStatus({ state: 'loading', message: '' });
    try {
      const res = await subscribeNewsletter(newsletterEmail);
      setNewsletterStatus({ state: 'success', message: res.message || 'Thank you for subscribing!' });
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterStatus({
        state: 'error',
        message: err.response?.data?.message || 'Subscription failed. Please try again.',
      });
    }
  };

  // Helper to render media placeholder box with exact colors from Image 1
  const renderCardMedia = (post, index) => {
    const formattedCover = formatImageUrl(post.coverImage);
    if (formattedCover) {
      return (
        <div className="h-44 w-full bg-slate-50 overflow-hidden rounded-2xl flex items-center justify-center p-2 relative">
          <img
            src={formattedCover}
            alt={post.title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      );
    }

    // Styles matching Image 1:
    // Card 1: Blue gradient
    // Card 2: Soft mint green
    // Card 3, 4, 5: Soft ice blue
    // Card 6: Dark navy
    const styles = [
      'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white',
      'bg-[#E6F7ED] text-slate-500',
      'bg-[#EAF5FC] text-slate-500',
      'bg-[#EAF5FC] text-slate-500',
      'bg-[#EAF5FC] text-slate-500',
      'bg-[#151C2E] text-slate-400',
    ];
    const styleClass = post.mediaStyle === 'gradient-blue'
      ? styles[0]
      : post.mediaStyle === 'soft-mint'
      ? styles[1]
      : post.mediaStyle === 'dark-navy'
      ? styles[5]
      : styles[index % styles.length];

    return (
      <div className={`h-44 w-full rounded-2xl flex items-center justify-center font-bold text-xs tracking-wider uppercase transition-transform duration-300 group-hover:scale-[1.02] ${styleClass}`}>
        IMAGE 16:9
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Ideas on apps, web and AI | TenzoAds Blog</title>
        <meta
          name="description"
          content="Practical guides from our team on mobile, web, AI and design."
        />
      </Helmet>

      {/* 1. HERO SECTION (Dark Navy with Ambient Blue Glow) */}
      <section className="relative bg-[#070B19] text-white pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-900">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4 relative z-10">
          <nav className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>{' '}
            / <span className="text-white">Blog</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.14]">
            {blogsContent.heroTitle || 'Ideas on apps, web and AI'}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed pt-2">
            {blogsContent.heroDescription ||
              'Practical guides from our team on mobile, web, AI and design.'}
          </p>
        </div>
      </section>

      {/* 2. FILTER PILLS & ARTICLES */}
      <section className="py-12 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Centered Category Filter Pills */}
          <div className="flex justify-center">
            <FilterPills
              options={filterCategories}
              activeOption={activeCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {/* 3. FEATURED ARTICLE CARD (Matching Image 1) */}
          {featuredPost && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Blue gradient container with Phone Mockup */}
                <div className="lg:col-span-5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl h-64 sm:h-72 flex items-center justify-center p-4 overflow-hidden relative shadow-md shadow-blue-500/20 group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-[140px] h-[260px] bg-slate-900 rounded-[28px] p-2 shadow-2xl border-2 border-slate-800 flex flex-col justify-between">
                    <div className="w-10 h-2 bg-black rounded-full mx-auto" />
                    <div className="w-full h-[88%] bg-white rounded-[20px] p-2 space-y-2">
                      <div className="w-full h-10 bg-blue-600 rounded-lg p-1.5 flex flex-col justify-between">
                        <div className="w-6 h-1.5 bg-white/70 rounded" />
                        <div className="w-10 h-2 bg-white rounded font-bold" />
                      </div>
                      <div className="space-y-1 pt-1">
                        <div className="w-full h-3 bg-slate-100 rounded" />
                        <div className="w-full h-3 bg-slate-100 rounded" />
                        <div className="w-full h-3 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Featured Text & Read Article CTA */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block">
                    {featuredPost.categoryDisplay || 'FEATURED · MOBILE APPS'}
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                    <Link to={`/blogs/${featuredPost.slug || 'flutter-vs-react-native-2026'}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-500">
                      {featuredPost.author || 'TenzoAds Team'} · {featuredPost.readTime || '9 min read'}
                    </div>

                    <Link
                      to={`/blogs/${featuredPost.slug || 'flutter-vs-react-native-2026'}`}
                      className="inline-flex items-center justify-center px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm transition-all duration-300 shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95"
                    >
                      Read article
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. LATEST ARTICLES (3x2 Grid Matching Image 1) */}
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest articles
            </h2>

            {loading ? (
              <LoadingState message="Loading articles..." />
            ) : posts.length === 0 ? (
              <div className="py-16 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-100">
                No articles found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.slice(0, 6).map((post, idx) => (
                  <article
                    key={post.slug || idx}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 hover:-translate-y-2"
                  >
                    <div>
                      {/* 16:9 Colored Box Media */}
                      <Link to={`/blogs/${post.slug || 'article'}`} className="block mb-4 overflow-hidden rounded-2xl">
                        {renderCardMedia(post, idx)}
                      </Link>

                      {/* Category Label */}
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
                        {post.categoryDisplay || post.category || 'WEB DEVELOPMENT'}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                        <Link to={`/blogs/${post.slug || 'article'}`}>{post.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta Footer */}
                    <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
                      {post.author || 'TenzoAds Team'} · {post.readTime || '7 min read'}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER CARD (Dark Navy Card Matching Image 1) */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#070B19] rounded-3xl p-8 sm:p-12 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Get new articles in your inbox
                </h2>
                <p className="text-sm sm:text-base text-slate-400 font-medium">
                  One practical email a month. No spam.
                </p>
              </div>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 w-full lg:max-w-md"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-[#151D2F] border border-slate-700/80 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus.state === 'loading'}
                  className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full transition-all duration-200 shadow-md shadow-blue-500/25 flex-shrink-0 disabled:opacity-70"
                >
                  {newsletterStatus.state === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>

            {newsletterStatus.message && (
              <p
                className={`text-xs font-bold pt-4 text-center ${
                  newsletterStatus.state === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {newsletterStatus.message}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
