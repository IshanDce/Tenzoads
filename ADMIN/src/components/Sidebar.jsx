import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
  Briefcase,
  HelpCircle,
  Cpu,
  GitBranch,
  Award,
  BookOpen,
  Image as ImageIcon,
  Settings,
  UserCog,
  User,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../lib/auth';

export const Sidebar = ({ isOpen, onClose }) => {
  const { admin } = useAuth();
  const isSuperAdmin = admin?.role === 'superadmin';

  const mainNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Blog Posts', path: '/posts', icon: FileText },
    { name: 'Quote Requests', path: '/quote-requests', icon: MessageSquare },
    { name: 'Subscribers', path: '/subscribers', icon: Users },
  ];

  const contentNav = [
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'FAQs', path: '/faqs', icon: HelpCircle },
    { name: 'Technologies', path: '/technologies', icon: Cpu },
    { name: 'Process Steps', path: '/process-steps', icon: GitBranch },
    { name: 'Why Us Items', path: '/why-us', icon: Award },
    { name: 'Page Content', path: '/pages', icon: BookOpen },
    { name: 'Media Library', path: '/media', icon: ImageIcon },
  ];

  const adminNav = [
    ...(isSuperAdmin
      ? [
          { name: 'Site Settings', path: '/settings', icon: Settings },
          { name: 'Admin Users', path: '/users', icon: UserCog },
        ]
      : []),
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <NavLink
        to={item.path}
        onClick={onClose}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            isActive
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`
        }
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{item.name}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
            {/* Modern Blue Rounded Badge with stylized "T" */}
            <div className="relative w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
              >
                <path
                  d="M5 6.5C5 5.67157 5.67157 5 6.5 5H17.5C18.3284 5 19 5.67157 19 6.5C19 7.32843 18.3284 8 17.5 8H13.5V18C13.5 18.8284 12.8284 19.5 12 19.5C11.1716 19.5 10.5 18.8284 10.5 18V8H6.5C5.67157 8 5 7.32843 5 6.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Tenzo<span className="text-blue-600">Ads</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60">
                Admin
              </span>
            </div>
          </NavLink>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Main
            </div>
            <div className="space-y-1">
              {mainNav.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Website Content
            </div>
            <div className="space-y-1">
              {contentNav.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              System
            </div>
            <div className="space-y-1">
              {adminNav.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer info & website link */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all shadow-xs"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Website
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
