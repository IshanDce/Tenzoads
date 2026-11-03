import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PhoneMockup from '../mockups/PhoneMockup';
import BrowserMockup from '../mockups/BrowserMockup';
import DashboardMockup from '../mockups/DashboardMockup';
import BrandMockup from '../mockups/BrandMockup';
import ChatMockup from '../mockups/ChatMockup';
import { formatImageUrl } from '../../services/api';

export const ProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false);
  const formattedThumbnail = formatImageUrl(project.thumbnail);
  const showRealImage = Boolean(formattedThumbnail && !imgError);

  // Determine illustration background and component
  const renderIllustration = () => {
    // If real image/thumbnail is uploaded, render safely fitted image
    if (showRealImage) {
      return (
        <div className="w-full h-56 bg-[#FBF7EE] border-b border-borderCream/60 flex items-center justify-center overflow-hidden rounded-t-2xl relative p-3">
          {/* Ambient blurred backdrop for letterbox areas */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-md scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${formattedThumbnail})` }}
          />
          <img
            src={formattedThumbnail}
            alt={project.title}
            className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-lg drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="absolute top-3 right-3 z-20 bg-ink/75 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {project.techTag || project.category}
          </div>
        </div>
      );
    }

    switch (project.mockupType) {
      case 'phone':
        return (
          <div className="w-full h-56 bg-cream flex items-center justify-center p-3 overflow-hidden rounded-t-2xl">
            <div className="transform scale-[0.62] origin-top sm:scale-[0.68]">
              <PhoneMockup title={project.title} />
            </div>
          </div>
        );
      case 'browser':
        return (
          <div className="w-full h-56 bg-cream-light flex items-center justify-center p-4 overflow-hidden rounded-t-2xl border-b border-borderCream">
            <div className="transform scale-[0.78] sm:scale-[0.85] w-full">
              <BrowserMockup title={project.slug + '.com'} />
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="w-full h-56 bg-neutral-900 flex items-center justify-center p-4 overflow-hidden rounded-t-2xl">
            <div className="transform scale-[0.8] sm:scale-[0.85] w-full">
              <DashboardMockup dark />
            </div>
          </div>
        );
      case 'brand':
        return (
          <div className="w-full h-56 bg-amber-50 flex items-center justify-center p-4 overflow-hidden rounded-t-2xl">
            <div className="transform scale-[0.82] w-full">
              <BrandMockup title={project.title} />
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="w-full h-56 bg-amber-100/60 flex items-center justify-center p-4 overflow-hidden rounded-t-2xl">
            <div className="transform scale-[0.82] w-full">
              <ChatMockup title={project.title} />
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-56 bg-cream flex items-center justify-center p-4 rounded-t-2xl">
            <BrowserMockup title={project.slug} />
          </div>
        );
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-borderCream overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-soft-hover hover:border-amber-300 hover:-translate-y-1">
      <Link to={`/portfolio/${project.slug}`} className="block overflow-hidden">
        {renderIllustration()}
      </Link>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {project.categoryTag || project.category}
            </span>
            <span className="text-[11px] font-medium text-neutral-500 bg-cream-light border border-borderCream px-2.5 py-0.5 rounded-full">
              {project.techTag}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2 group-hover:text-amber transition-colors">
            <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Footer row with Round Amber Arrow */}
        <div className="pt-5 mt-4 border-t border-cream-light flex items-center justify-between">
          <Link
            to={`/portfolio/${project.slug}`}
            className="text-xs font-bold text-ink hover:text-amber transition-colors"
          >
            Case Study Details
          </Link>

          <Link
            to={`/portfolio/${project.slug}`}
            aria-label={`View ${project.title}`}
            className="w-9 h-9 rounded-full bg-amber text-ink flex items-center justify-center transition-all duration-200 group-hover:bg-amber-hover group-hover:scale-110 shadow-sm"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
