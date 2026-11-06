import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
        <div className="w-full h-56 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden rounded-t-2xl relative p-3">
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
          <div className="absolute top-3 right-3 z-20 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {project.techTag || project.category}
          </div>
        </div>
      );
    }

    switch (project.mockupType) {
      case 'phone':
        return (
          <div className="w-full h-56 bg-blue-50/50 flex items-center justify-center p-3 overflow-hidden rounded-t-2xl">
            <div className="transform scale-[0.62] origin-top sm:scale-[0.68]">
              <PhoneMockup title={project.title} />
            </div>
          </div>
        );
      case 'browser':
        return (
          <div className="w-full h-56 bg-cyan-50/40 flex items-center justify-center p-4 overflow-hidden rounded-t-2xl border-b border-slate-100">
            <div className="transform scale-[0.78] sm:scale-[0.85] w-full">
              <BrowserMockup title={project.slug + '.com'} />
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="w-full h-56 bg-[#0B1120] flex items-center justify-center p-4 overflow-hidden rounded-t-2xl">
            <div className="transform scale-[0.8] sm:scale-[0.85] w-full">
              <DashboardMockup dark />
            </div>
          </div>
        );
      case 'brand':
        return (
          <div className="w-full h-56 bg-blue-50/60 flex items-center justify-center p-4 overflow-hidden rounded-t-2xl">
            <div className="transform scale-[0.82] w-full">
              <BrandMockup title={project.title} />
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="w-full h-56 bg-sky-50 flex items-center justify-center p-4 overflow-hidden rounded-t-2xl">
            <div className="transform scale-[0.82] w-full">
              <ChatMockup title={project.title} />
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-56 bg-slate-50 flex items-center justify-center p-4 rounded-t-2xl">
            <BrowserMockup title={project.slug} />
          </div>
        );
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1">
      <Link to={`/portfolio/${project.slug}`} className="block overflow-hidden">
        {renderIllustration()}
      </Link>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {project.categoryTag || project.category}
            </span>
            <span className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full">
              {project.techTag}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
            <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Footer row with Round Arrow */}
        <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/portfolio/${project.slug}`}
            className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Case Study Details
          </Link>

          <Link
            to={`/portfolio/${project.slug}`}
            aria-label={`View ${project.title}`}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shadow-sm"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
