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
    <div className="group bg-white rounded-2xl border border-slate-100 p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Number badge (01, 02, etc.) */}
        <div className="inline-block bg-blue-50 text-blue-600 font-bold text-xs px-3 py-1 rounded-full mb-4">
          {orderNumber}
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2.5">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tech row in blue */}
        {techDisplay && (
          <div className="text-xs font-semibold text-blue-600 mb-6">
            {techDisplay}
          </div>
        )}
      </div>

      {/* Learn More link */}
      <div className="pt-2 border-t border-slate-100">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>Learn more</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
