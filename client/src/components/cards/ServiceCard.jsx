import React from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Globe,
  Layers,
  Sparkles,
  Palette,
  PenTool,
  ArrowRight,
} from 'lucide-react';

const iconMap = {
  Smartphone,
  Globe,
  Layers,
  Sparkles,
  Palette,
  PenTool,
};

export const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <div className="group bg-white rounded-2xl border border-borderCream p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-soft-hover hover:border-amber-300 hover:-translate-y-1">
      <div>
        {/* Amber Icon Badge */}
        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-6 group-hover:bg-amber group-hover:text-ink transition-colors duration-300">
          <IconComponent className="w-6 h-6 stroke-[2]" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold text-ink tracking-tight mb-2.5">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tech tags */}
        {service.tech && (
          <div className="text-xs font-semibold text-neutral-400 mb-6 flex flex-wrap gap-1.5">
            {service.tech.split(',').map((t) => (
              <span
                key={t}
                className="bg-cream-light border border-borderCream px-2 py-0.5 rounded-md text-[11px] text-neutral-600"
              >
                {t.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Learn More link */}
      <div className="pt-2 border-t border-cream-light">
        <Link
          to={`/portfolio`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-amber transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;

