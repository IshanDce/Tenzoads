import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, LogOut, ShieldCheck, User } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../lib/auth';

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBF7EE] flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-borderCream h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-ink rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold text-muted">Management Dashboard</span>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 text-left p-1.5 rounded-xl hover:bg-neutral-100 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 text-ink flex items-center justify-center font-bold text-xs shadow-xs">
                {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-bold text-ink leading-tight group-hover:text-amber-700 transition-colors">
                  {admin?.name || 'Admin'}
                </div>
                <div className="text-[10px] text-muted flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  <span className="capitalize">{admin?.role || 'Editor'}</span>
                </div>
              </div>
            </button>

            <div className="w-[1px] h-6 bg-borderCream hidden sm:block" />

            <button
              onClick={logout}
              title="Sign Out"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

