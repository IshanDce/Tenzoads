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
          `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            isActive
              ? 'bg-amber-100/70 text-ink border-l-4 border-amber-500 font-bold shadow-xs'
              : 'text-muted hover:text-ink hover:bg-neutral-100'
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
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-borderCream flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-borderCream">
          <NavLink to="/dashboard" className="flex items-center gap-2.5">
            {/* Hexagon Logo */}
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center text-amber-500 shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-amber-500"
              >
                <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-ink">
                Tenzo<span className="text-amber-500">Ads</span>
              </span>
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                Admin
              </span>
            </div>
          </NavLink>
          <button
            onClick={onClose}
            className="lg:hidden text-muted hover:text-ink p-1 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted/80 px-3 mb-2">
              Main
            </div>
            <div className="space-y-1">
              {mainNav.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted/80 px-3 mb-2">
              Website Content
            </div>
            <div className="space-y-1">
              {contentNav.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted/80 px-3 mb-2">
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
        <div className="p-4 border-t border-borderCream bg-[#FBF7EE]/60 space-y-2">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-ink bg-white border border-borderCream hover:border-amber-500 transition-colors shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Website
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-muted" />
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
