import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { getProjectBySlug } from '../services/api';
import LoadingState from '../components/common/LoadingState';
import ProjectCard from '../components/cards/ProjectCard';
import CtaBand from '../components/common/CtaBand';
import PhoneMockup from '../components/mockups/PhoneMockup';
import BrowserMockup from '../components/mockups/BrowserMockup';
import DashboardMockup from '../components/mockups/DashboardMockup';
import BrandMockup from '../components/mockups/BrandMockup';
import ChatMockup from '../components/mockups/ChatMockup';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
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
        <h2 className="text-3xl font-extrabold text-ink">Project Not Found</h2>
        <p className="text-muted">The project case study you requested could not be located.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  const renderMockup = () => {
    switch (project.mockupType) {
      case 'phone':
        return <PhoneMockup title={project.title} className="transform scale-95 sm:scale-105" />;
      case 'browser':
        return <BrowserMockup title={project.slug + '.com'} className="w-full max-w-md sm:max-w-lg" />;
      case 'dashboard':
        return <DashboardMockup dark className="w-full max-w-md sm:max-w-lg" />;
      case 'brand':
        return <BrandMockup title={project.title} className="w-full max-w-md" />;
      case 'chat':
        return <ChatMockup title={project.title} className="w-full max-w-md" />;
      default:
        return <BrowserMockup title={project.slug} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${project.title} | TenzoAds Case Study`}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-cream pt-10 pb-16 md:pt-14 md:pb-20 border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-2">
            <Link to="/portfolio" className="inline-flex items-center gap-1 hover:text-ink">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>
            <span>/</span>
            <span className="text-ink">{project.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-amber px-3 py-1 rounded-full text-xs font-extrabold text-ink uppercase tracking-wider">
              {project.categoryTag || project.category}
            </span>
            <span className="bg-white border border-borderCream px-3 py-1 rounded-full text-xs font-bold text-neutral-600">
              {project.techTag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight max-w-4xl leading-[1.16]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            {project.fullDescription || project.description}
          </p>
        </div>
      </section>

      {/* Main Case Study Body */}
      <section className="py-16 md:py-24 bg-white border-b border-borderCream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Visual Showcase Card */}
          <div className="bg-cream-light rounded-3xl p-6 sm:p-12 border border-borderCream flex items-center justify-center overflow-hidden">
            {renderMockup()}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              {/* Challenge */}
              {project.challenge && (
                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-ink">The Challenge</h3>
                  <p className="text-base text-muted leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-ink">Our Technical Solution</h3>
                  <p className="text-base text-muted leading-relaxed">{project.solution}</p>
                </div>
              )}

              {/* Features List */}
              {project.features?.length > 0 && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-xl font-extrabold text-ink">Key Features & Engineering</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-light border border-borderCream"
                      >
                        <div className="w-5 h-5 rounded-full bg-amber flex items-center justify-center text-ink flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-sm font-bold text-ink">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Results */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-cream-light border border-borderCream rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-extrabold text-ink">Measurable Results</h3>
                <ul className="space-y-3">
                  {project.results?.map((res, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm font-semibold text-neutral-800">
                      <span className="w-2 h-2 rounded-full bg-amber mt-2 flex-shrink-0" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-borderCream">
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber hover:bg-amber-hover text-ink rounded-full font-bold text-sm transition-all duration-200 shadow-sm"
                  >
                    <span>Start a similar project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="pt-16 border-t border-borderCream space-y-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Related Work in {project.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {related.map((relProj) => (
                  <ProjectCard key={relProj.slug} project={relProj} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand />
    </>
  );
};

export default ProjectDetail;
