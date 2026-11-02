import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import FilterPills from '../components/common/FilterPills';
import PostCard from '../components/cards/PostCard';
import PlaceholderImage16x9 from '../components/mockups/PlaceholderImage16x9';
import LoadingState from '../components/common/LoadingState';
import { getPosts, getFeaturedPost, subscribeNewsletter } from '../services/api';
import { usePageContent } from '../hooks/useSiteData';

const filterCategories = [
  'All',
  'Mobile Apps',
  'Websites',
  'AI Solutions',
  'UI/UX Design',
  'Graphic Design',
];

export const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const { content: blogsContent } = usePageContent('blogs', {
    heroTitle: 'Mobile App, Web & AI Development Insights',
    heroDescription:
      'Guides, comparisons and case studies on Flutter, React Native, Next.js, AI integration and UI/UX design.',
    newsletterTitle: 'Get new articles in your inbox',
    newsletterSubtitle: 'One practical email a month. No spam.',
  });

  const [featuredPost, setFeaturedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        // Fetch featured post
        const featRes = await getFeaturedPost().catch(() => null);
        if (featRes?.data) {
          setFeaturedPost(featRes.data);
        }

        // Fetch paginated posts
        const postsRes = await getPosts({
          category: activeCategory === 'All' ? undefined : activeCategory,
          excludeFeatured: activeCategory === 'All' ? 'true' : 'false',
          page: 1,
          limit: 6,
        });

        if (postsRes?.data) {
          setPosts(postsRes.data);
          setTotalPages(postsRes.totalPages || 1);
          setPage(1);
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleLoadMore = async () => {
    if (page >= totalPages) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await getPosts({
        category: activeCategory === 'All' ? undefined : activeCategory,
        excludeFeatured: activeCategory === 'All' ? 'true' : 'false',
        page: nextPage,
        limit: 6,
      });
      if (res?.data) {
        setPosts((prev) => [...prev, ...res.data]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error('Error loading more posts:', err);
    } finally {
      setLoadingMore(false);
    }
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
      setNewsletterStatus({
        state: 'success',
        message: res.message || 'Thank you for subscribing!',
      });
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterStatus({
        state: 'error',
        message: err.response?.data?.message || 'Subscription failed. Please try again.',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Engineering & Design Blogs | TenzoAds</title>
        <meta
          name="description"
          content="Practical guides, technical benchmarks, and architecture case studies on mobile app, web development, and AI engineering."
        />
      </Helmet>

      {/* 1. HERO SECTION (Cream background) */}
      <section className="bg-cream pt-12 pb-16 md:pt-16 md:pb-24 border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
          <nav className="text-xs font-bold text-muted uppercase tracking-wider">
            <Link to="/" className="hover:text-ink transition-colors">
              Home
            </Link>{' '}
            / <span className="text-ink">Blogs</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight max-w-4xl leading-[1.14]">
            {blogsContent.heroTitle || 'Mobile App, Web & AI Development Insights'}
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed pt-2">
            {blogsContent.heroDescription ||
              'Guides, comparisons and case studies on Flutter, React Native, Next.js, AI integration and UI/UX design.'}
          </p>
        </div>
      </section>

      {/* 2. FILTER PILLS & ARTICLES */}
      <section className="py-12 md:py-20 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Category Filter Pills */}
          <FilterPills
            options={filterCategories}
            activeOption={activeCategory}
            onChange={handleCategoryChange}
          />

          {/* 3. FEATURED ARTICLE (Wide white card) */}
          {activeCategory === 'All' && featuredPost && (
            <div className="bg-white rounded-3xl border border-borderCream overflow-hidden shadow-soft transition-all duration-300 hover:shadow-soft-hover hover:border-amber-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-4 sm:p-6 lg:p-8">
                {/* 16:9 Image Placeholder Left */}
                <div className="lg:col-span-6">
                  <Link to={`/blogs/${featuredPost.slug}`}>
                    <PlaceholderImage16x9
                      label="FEATURED IMAGE 16:9"
                      badge={featuredPost.categoryDisplay || 'FEATURED'}
                      className="rounded-2xl shadow-inner"
                    />
                  </Link>
                </div>

                {/* Content Right */}
                <div className="lg:col-span-6 space-y-4 p-2 sm:p-4 text-left">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 block">
                    {featuredPost.categoryDisplay || 'FEATURED · MOBILE APPS'}
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight leading-tight hover:text-amber transition-colors">
                    <Link to={`/blogs/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>

                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="text-xs font-semibold text-neutral-400 flex items-center gap-2 pt-1">
                    <span>{featuredPost.author}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span className="text-ink font-bold">{featuredPost.readTime}</span>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center justify-center px-7 py-3 bg-amber hover:bg-amber-hover text-ink rounded-full font-bold text-sm transition-all duration-200 shadow-sm"
                    >
                      Read article
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. LATEST ARTICLES GRID */}
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Latest articles
            </h2>

            {loading ? (
              <LoadingState message="Loading articles..." />
            ) : posts.length === 0 ? (
              <div className="py-16 text-center text-muted font-medium bg-cream-light rounded-2xl border border-borderCream">
                No articles found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* 5. EXPLORE MORE BUTTON */}
          {page < totalPages && (
            <div className="pt-6 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3.5 border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full font-bold text-sm transition-all duration-200 disabled:opacity-50"
              >
                {loadingMore ? 'Loading...' : 'Explore More'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. NEWSLETTER BAND (Amber) */}
      <section className="py-16 bg-cream-light border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber rounded-3xl p-8 sm:p-12 md:p-14 shadow-amber-glow relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                Get new articles in your inbox
              </h2>
              <p className="text-base text-ink/80 font-medium max-w-lg mx-auto">
                One practical email a month. No spam.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@company.com"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-white text-ink text-sm border-2 border-transparent placeholder:text-neutral-400 focus:outline-none focus:border-ink shadow-sm"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus.state === 'loading'}
                  className="w-full sm:w-auto px-8 py-3.5 bg-ink hover:bg-neutral-800 text-white font-bold text-sm rounded-full transition-all duration-200 shadow-md flex-shrink-0 disabled:opacity-70"
                >
                  {newsletterStatus.state === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>

              {newsletterStatus.message && (
                <p
                  className={`text-xs font-bold pt-2 ${
                    newsletterStatus.state === 'success' ? 'text-emerald-900' : 'text-red-900'
                  }`}
                >
                  {newsletterStatus.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;

