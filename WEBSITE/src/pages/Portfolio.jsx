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
    heroTitle: 'Our work: Apps, Websites & digital products',
    heroDescription:
      "A selection of mobile apps, websites, AI solutions and designs we've delivered. Browse by category to see what we can build for you.",
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

      {/* 1. HERO SECTION (Cream background) */}
      <section className="bg-cream pt-12 pb-16 md:pt-16 md:pb-24 border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4">
          <nav className="text-xs font-bold text-muted uppercase tracking-wider">
            <Link to="/" className="hover:text-ink transition-colors">
              Home
            </Link>{' '}
            / <span className="text-ink">Portfolio</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight max-w-4xl leading-[1.14]">
            {portfolioContent.heroTitle || 'Our work: Apps, Websites & digital products'}
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed pt-2">
            {portfolioContent.heroDescription ||
              "A selection of mobile apps, websites, AI solutions and designs we've delivered. Browse by category to see what we can build for you."}
          </p>
        </div>
      </section>

      {/* 2. FILTER PILLS & PROJECTS GRID */}
      <section className="py-12 md:py-20 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Filter Pills */}
          <FilterPills
            options={filterCategories}
            activeOption={activeCategory}
            onChange={handleCategoryChange}
          />

          {/* Projects Grid */}
          {loading ? (
            <LoadingState message="Loading projects..." />
          ) : projects.length === 0 ? (
            <div className="py-16 text-center text-muted font-medium bg-cream-light rounded-2xl border border-borderCream">
              No projects found in this category. Select another filter to view our work.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
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
                className="px-8 py-3.5 border-2 border-ink text-ink hover:bg-ink hover:text-white rounded-full font-bold text-sm transition-all duration-200 disabled:opacity-50"
              >
                {loadingMore ? 'Loading...' : 'Load more projects'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. REUSABLE CTA BAND */}
      <CtaBand />
    </>
  );
};

export default Portfolio;

