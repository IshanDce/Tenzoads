import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import FilterPills from '../components/common/FilterPills';
import ProjectCard from '../components/cards/ProjectCard';
import CtaBand from '../components/common/CtaBand';
import LoadingState from '../components/common/LoadingState';
import { getProjects } from '../services/api';
import { usePageContent } from '../hooks/useSiteData';

const filterCategories = [
  'All Work',
  'Mobile Apps',
  'Websites',
  'AI Solutions',
  'UI/UX Design',
  'Graphic Design',
];

export const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All Work';

  const { content: portfolioContent } = usePageContent('portfolio', {
    heroTitle: "Projects we're proud of",
    heroDescription:
      'A selection of apps, websites, AI tools and brand work designed and built by our team.',
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await getProjects({
          category: activeCategory === 'All Work' ? undefined : activeCategory,
          page: 1,
          limit: 9,
        });
        if (res?.data) {
          setProjects(res.data);
          setTotalPages(res.totalPages || 1);
          setPage(1);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    if (category === 'All Work') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleLoadMore = async () => {
    if (page >= totalPages) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await getProjects({
        category: activeCategory === 'All Work' ? undefined : activeCategory,
        page: nextPage,
        limit: 9,
      });
      if (res?.data) {
        setProjects((prev) => [...prev, ...res.data]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error('Error loading more projects:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Portfolio | TenzoAds - Mobile Apps, Websites & AI Projects</title>
        <meta
          name="description"
          content="Explore case studies of mobile apps, responsive websites, and AI systems built by TenzoAds for startups and growing businesses."
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
            / <span className="text-white">Portfolio</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.14]">
            {portfolioContent.heroTitle || "Projects we're proud of"}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed pt-2">
            {portfolioContent.heroDescription ||
              'A selection of apps, websites, AI tools and brand work designed and built by our team.'}
          </p>
        </div>
      </section>

      {/* 2. FILTER PILLS & PROJECTS GRID */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100 min-h-[600px]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Centered filter tabs */}
          <div className="flex justify-center">
            <FilterPills
              options={filterCategories}
              activeOption={activeCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {/* Grid of Projects */}
          {loading ? (
            <div className="py-20">
              <LoadingState message="Loading projects..." />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-24 space-y-3">
              <h3 className="text-xl font-bold text-slate-900">No projects found</h3>
              <p className="text-slate-500 text-sm">
                There are no published case studies in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((proj) => (
                <ProjectCard key={proj.slug || proj._id} project={proj} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {page < totalPages && (
            <div className="pt-8 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-300 text-slate-800 bg-white hover:border-slate-900 hover:text-slate-900 rounded-full font-bold text-sm shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50"
              >
                {loadingMore ? 'Loading...' : 'Load more projects'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Reusable Global CTA */}
      <CtaBand />
    </>
  );
};

export default Portfolio;
