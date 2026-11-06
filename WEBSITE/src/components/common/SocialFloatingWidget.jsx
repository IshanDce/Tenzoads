import React, { useState } from 'react';
import { MessageSquare, X, ChevronUp, Share2 } from 'lucide-react';

export const SocialFloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(true);

  const socialChannels = [
    {
      name: 'WhatsApp',
      url: 'https://wa.me/916352340501',
      tooltip: 'Chat on WhatsApp',
      bg: 'bg-[#25D366] hover:bg-[#20bd5a]',
      shadow: 'shadow-[0_4px_16px_rgba(37,211,102,0.35)]',
      icon: (
        <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.119.553 4.186 1.606 6.009L.05 24l6.166-1.616a11.96 11.96 0 005.815 1.503h.005c6.632 0 12.026-5.395 12.026-12.032A12.007 12.007 0 0012.031 0zm0 21.884h-.004a9.92 9.92 0 01-5.06-1.386l-.363-.215-3.76.986.999-3.666-.237-.377a9.924 9.924 0 01-1.524-5.195c0-5.485 4.464-9.948 9.953-9.948a9.907 9.907 0 017.039 2.914 9.907 9.907 0 012.91 7.04c-.004 5.487-4.467 9.947-9.953 9.947zm5.454-7.447c-.299-.149-1.77-.873-2.044-.972-.274-.1-.473-.149-.672.15-.199.299-.772.972-.947 1.171-.174.2-.349.224-.648.075-.299-.15-1.262-.465-2.404-1.484-.889-.793-1.49-1.773-1.664-2.072-.175-.299-.019-.461.13-.61.135-.134.299-.349.449-.523.15-.175.2-.299.299-.498.1-.2.05-.374-.025-.524-.075-.149-.672-1.62-.922-2.218-.243-.583-.49-.504-.672-.513l-.573-.01c-.199 0-.524.075-.798.374s-1.047 1.022-1.047 2.493 1.072 2.892 1.222 3.092c.15.199 2.11 3.221 5.111 4.519.714.309 1.272.493 1.706.631.717.228 1.37.196 1.887.119.577-.086 1.77-.723 2.019-1.421.25-.698.25-1.296.175-1.421-.075-.125-.274-.199-.573-.349z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/tenzo_ads/',
      tooltip: 'Follow on Instagram',
      bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95',
      shadow: 'shadow-[0_4px_16px_rgba(220,39,67,0.35)]',
      icon: (
        <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Twitter / X',
      url: 'https://x.com/TenzoAds',
      tooltip: 'Follow on X (Twitter)',
      bg: 'bg-black hover:bg-neutral-900 border border-neutral-800',
      shadow: 'shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
      icon: (
        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1CJ5Ffb3Ne/',
      tooltip: 'Connect on Facebook',
      bg: 'bg-[#1877F2] hover:bg-[#166fe5]',
      shadow: 'shadow-[0_4px_16px_rgba(24,119,242,0.35)]',
      icon: (
        <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      aria-label="Social media channels"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none"
    >
      {/* Expanded Social Icons Stack */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {socialChannels.map((item) => (
          <div key={item.name} className="flex items-center gap-2 group">
            {/* Tooltip Label */}
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-700/60 whitespace-nowrap -translate-x-1 group-hover:translate-x-0">
              {item.tooltip}
            </span>

            {/* Social Circle Button */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.tooltip}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 active:scale-95 ${item.bg} ${item.shadow}`}
            >
              {item.icon}
            </a>
          </div>
        ))}
      </div>

      {/* Main Sticky Toggle Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close social channels' : 'Open social channels'}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
          isOpen
            ? 'bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 shadow-slate-900/40'
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_8px_25px_rgba(37,99,235,0.45)] ring-4 ring-blue-500/20'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 stroke-[2.5]" />
            {/* Pulsing Attention Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
            </span>
          </>
        )}
      </button>
    </aside>
  );
};

export default SocialFloatingWidget;
