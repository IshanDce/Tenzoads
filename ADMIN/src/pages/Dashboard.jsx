import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
  Plus,
  ExternalLink,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import api from '../lib/api';
import { useAuth } from '../lib/auth';

export const Dashboard = () => {
  const { admin } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await api.get('/admin/dashboard');
      return res.data;
    },
  });

  const stats = data?.stats || {
    totalProjects: 0,
    totalPosts: 0,
    totalSubscribers: 0,
    newQuoteRequests: 0,
    totalQuoteRequests: 0,
  };

  const monthlyQuotes = data?.monthlyQuotes || [];
  const recentQuotes = data?.recentQuotes || [];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            New
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            In Progress
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Contacted
          </span>
        );
      case 'closed':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">
            Welcome back, <span className="font-bold text-ink">{admin?.name}</span>. Here's what's
            happening with your website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-xs shadow-soft transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
          <Link
            to="/posts/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-ink hover:bg-neutral-800 text-white font-bold text-xs shadow-soft transition-all"
          >
            <Plus className="w-4 h-4 text-amber-500" />
            New Post
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects Card */}
        <div className="bg-white rounded-2xl p-6 border border-borderCream shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Projects
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-ink">{stats.totalProjects}</div>
          <div className="text-xs text-muted flex items-center justify-between pt-1 border-t border-borderCream">
            <Link to="/projects" className="text-amber-700 hover:underline font-semibold flex items-center gap-1">
              View portfolio <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Blog Posts Card */}
        <div className="bg-white rounded-2xl p-6 border border-borderCream shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Blog Articles
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-ink">{stats.totalPosts}</div>
          <div className="text-xs text-muted flex items-center justify-between pt-1 border-t border-borderCream">
            <Link to="/posts" className="text-amber-700 hover:underline font-semibold flex items-center gap-1">
              Manage articles <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* New Quotes Card */}
        <div className="bg-white rounded-2xl p-6 border border-borderCream shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              New Quotes
            </span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-ink">{stats.newQuoteRequests}</div>
          <div className="text-xs text-muted flex items-center justify-between pt-1 border-t border-borderCream">
            <span>{stats.totalQuoteRequests} total received</span>
            <Link to="/quote-requests" className="text-amber-700 hover:underline font-semibold flex items-center gap-1">
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Active Subscribers Card */}
        <div className="bg-white rounded-2xl p-6 border border-borderCream shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Subscribers
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-ink">{stats.totalSubscribers}</div>
          <div className="text-xs text-muted flex items-center justify-between pt-1 border-t border-borderCream">
            <Link to="/subscribers" className="text-amber-700 hover:underline font-semibold flex items-center gap-1">
              View subscribers <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Quotes Chart & Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quote Requests Trend Chart (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-borderCream shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-ink">Quote Inquiries Activity</h2>
              <p className="text-xs text-muted">Requests received over the last 6 months</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            {monthlyQuotes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyQuotes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFE7D6" />
                  <XAxis dataKey="shortMonth" stroke="#5F5F5F" fontSize={12} tickLine={false} />
                  <YAxis stroke="#5F5F5F" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0D0D0D',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#F5A93B', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="quotes" fill="#F5A93B" radius={[6, 6, 0, 0]} name="Quote Requests" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted text-xs">
                No activity records yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Links / Content status */}
        <div className="bg-white rounded-2xl p-6 border border-borderCream shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-ink mb-1">Quick Management</h2>
            <p className="text-xs text-muted mb-4">Jump straight to edit core sections</p>

            <div className="space-y-2">
              <Link
                to="/services"
                className="flex items-center justify-between p-3 rounded-xl border border-borderCream hover:border-amber-400 hover:bg-cream/20 transition-all text-xs font-semibold text-ink group"
              >
                <span>Services Catalog (6)</span>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-ink" />
              </Link>
              <Link
                to="/technologies"
                className="flex items-center justify-between p-3 rounded-xl border border-borderCream hover:border-amber-400 hover:bg-cream/20 transition-all text-xs font-semibold text-ink group"
              >
                <span>Tech Stack Chips (16)</span>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-ink" />
              </Link>
              <Link
                to="/faqs"
                className="flex items-center justify-between p-3 rounded-xl border border-borderCream hover:border-amber-400 hover:bg-cream/20 transition-all text-xs font-semibold text-ink group"
              >
                <span>FAQs (Home & Contact)</span>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-ink" />
              </Link>
              <Link
                to="/pages"
                className="flex items-center justify-between p-3 rounded-xl border border-borderCream hover:border-amber-400 hover:bg-cream/20 transition-all text-xs font-semibold text-ink group"
              >
                <span>Page Headlines & Copy</span>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-ink" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-borderCream text-xs text-muted">
            Need to update company details? Head over to{' '}
            <Link to="/settings" className="font-bold text-amber-700 underline">
              Site Settings
            </Link>
            .
          </div>
        </div>
      </div>

      {/* Recent Quote Requests Table */}
      <div className="bg-white rounded-2xl border border-borderCream shadow-soft overflow-hidden">
        <div className="p-6 border-b border-borderCream flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-ink">Recent Inquiries</h2>
            <p className="text-xs text-muted">Latest lead submissions from the website contact form</p>
          </div>
          <Link
            to="/quote-requests"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            View all ({stats.totalQuoteRequests})
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBF7EE]/60 text-muted uppercase tracking-wider font-semibold border-b border-borderCream">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Service</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderCream">
              {recentQuotes.length > 0 ? (
                recentQuotes.map((q) => (
                  <tr key={q._id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-ink">{q.name}</div>
                      <div className="text-muted text-[11px]">{q.email}</div>
                    </td>
                    <td className="py-3.5 px-6 font-medium text-ink">{q.service}</td>
                    <td className="py-3.5 px-6">{getStatusBadge(q.status)}</td>
                    <td className="py-3.5 px-6 text-muted">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        to="/quote-requests"
                        className="text-xs font-semibold text-amber-700 hover:underline"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted">
                    No inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
