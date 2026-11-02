import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useSettings } from '../../hooks/useSiteData';

export const TopBar = () => {
  const { topBarPhone, topBarEmail } = useSettings();

  return (
    <div className="bg-ink text-amber py-2 px-4 text-xs font-medium border-b border-neutral-900 transition-colors">
      <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${topBarPhone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 hover:text-amber-hover transition-colors"
            aria-label={`Call us at ${topBarPhone}`}
          >
            <Phone className="w-3.5 h-3.5 text-amber flex-shrink-0" />
            <span>{topBarPhone}</span>
          </a>
          <a
            href={`mailto:${topBarEmail}`}
            className="flex items-center gap-2 hover:text-amber-hover transition-colors"
            aria-label={`Email us at ${topBarEmail}`}
          >
            <Mail className="w-3.5 h-3.5 text-amber flex-shrink-0" />
            <span>{topBarEmail}</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-neutral-400 text-[11px]">
          <span>Fast Turnaround • Free Initial Consultation</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

