import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const TopBar = () => {
  const { phone, phoneHref, email, emailHref } = siteConfig.contact;

  return (
    <div className="bg-ink text-amber py-2 px-4 text-xs font-medium border-b border-neutral-900 transition-colors">
      <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <a
            href={phoneHref}
            className="flex items-center gap-2 hover:text-amber-hover transition-colors"
            aria-label={`Call us at ${phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-amber flex-shrink-0" />
            <span>{phone}</span>
          </a>
          <a
            href={emailHref}
            className="flex items-center gap-2 hover:text-amber-hover transition-colors"
            aria-label={`Email us at ${email}`}
          >
            <Mail className="w-3.5 h-3.5 text-amber flex-shrink-0" />
            <span>{email}</span>
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
