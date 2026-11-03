import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { getProjectBySlug, formatImageUrl } from '../services/api';
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

  const formattedThumbnail = formatImageUrl(project.thumbnail);
  const showRealImage = Boolean(formattedThumbnail && !imgError);

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
          <div className="bg-[#FBF7EE] rounded-3xl p-4 sm:p-10 border border-borderCream flex items-center justify-center overflow-hidden relative min-h-[320px]">
            {showRealImage ? (
              <div className="relative w-full max-w-4xl flex items-center justify-center">
                {/* Soft ambient blur backdrop */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-xl scale-105 pointer-events-none"
                  style={{ backgroundImage: `url(${formattedThumbnail})` }}
                />
                <img
                  src={formattedThumbnail}
                  alt={project.title}
                  className="relative z-10 max-h-[560px] max-w-full w-auto h-auto object-contain rounded-2xl shadow-xl border border-borderCream/80"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              renderMockup()
            )}
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
              <div className="p-8 rounded-3xl bg-neutral-900 text-white space-y-6">
                <h3 className="text-xl font-extrabold text-amber tracking-tight">Key Outcomes</h3>
                {project.results?.length > 0 ? (
                  <div className="space-y-4">
                    {project.results.map((res, i) => (
                      <div key={i} className="border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
                        <div className="text-2xl font-black text-white">{res}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-400">
                    High engagement and scalability achieved under peak production loads.
                  </p>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-amber text-ink rounded-full font-bold text-sm hover:bg-amber-hover transition-colors"
                  >
                    <span>View Live Product</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-20 bg-cream-light/40 border-b border-borderCream">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              More Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((relProj) => (
                <ProjectCard key={relProj._id || relProj.slug} project={relProj} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global CTA */}
      <CtaBand />
    </>
  );
};

export default ProjectDetail;
