import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ServiceCard = ({ service, index }) => {
  // Pad index to 01, 02, etc. if available, or extract from service
  const orderNumber = String((index !== undefined ? index + 1 : service.order || 1)).padStart(2, '0');

  // Format tech string with bullet dots
  const techDisplay = service.tech
    ? service.tech.split(',').map((t) => t.trim()).join(' · ')
    : '';

  return (
    <div className="relative group bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-600 before:to-cyan-400 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">
      <div>
        {/* Number badge (01, 02, etc.) */}
        <div className="inline-block bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 font-extrabold text-xs px-3.5 py-1 rounded-full mb-4 transition-all duration-300 shadow-2xs">
          {orderNumber}
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2.5 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tech row in blue */}
        {techDisplay && (
          <div className="text-xs font-bold text-blue-600 mb-6 bg-blue-50/60 rounded-lg px-3 py-1.5 w-fit border border-blue-100/60">
            {techDisplay}
          </div>
        )}
      </div>

      {/* Learn More link */}
      <div className="pt-3 border-t border-slate-100">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-all duration-200"
        >
          <span>Learn more</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5 text-blue-600" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
