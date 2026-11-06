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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            New
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
            In Progress
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Contacted
          </span>
        );
      case 'closed':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, <span className="font-bold text-slate-800">{admin?.name}</span>. Here's what's
            happening with your website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects/new"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
          <Link
            to="/posts/new"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs transition-all hover:border-slate-300"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            New Post
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-3 hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Projects
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.totalProjects}</div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <Link to="/projects" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              View portfolio <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Blog Posts Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-3 hover:border-emerald-200 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Blog Articles
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.totalPosts}</div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <Link to="/posts" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              Manage articles <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* New Quotes Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-3 hover:border-cyan-200 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              New Quotes
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.newQuoteRequests}</div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>{stats.totalQuoteRequests} total received</span>
            <Link to="/quote-requests" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Active Subscribers Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-3 hover:border-indigo-200 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Subscribers
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.totalSubscribers}</div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <Link to="/subscribers" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
              View subscribers <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Quotes Chart & Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quote Requests Trend Chart (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Quote Inquiries Activity</h2>
              <p className="text-xs text-slate-500">Requests received over the last 6 months</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            {monthlyQuotes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyQuotes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="shortMonth" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#070B19',
                      border: '1px solid #1E293B',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#0084FF', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="quotes" fill="#0084FF" radius={[6, 6, 0, 0]} name="Quote Requests" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                No activity records yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Links / Content status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Quick Management</h2>
            <p className="text-xs text-slate-500 mb-4">Jump straight to edit core sections</p>

            <div className="space-y-2">
              <Link
                to="/services"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-xs font-semibold text-slate-800 group"
              >
                <span>Services Catalog (6)</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </Link>
              <Link
                to="/technologies"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-xs font-semibold text-slate-800 group"
              >
                <span>Tech Stack Chips (16)</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </Link>
              <Link
                to="/faqs"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-xs font-semibold text-slate-800 group"
              >
                <span>FAQs (Home & Contact)</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </Link>
              <Link
                to="/pages"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-xs font-semibold text-slate-800 group"
              >
                <span>Page Headlines & Copy</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Need to update company details? Head over to{' '}
            <Link to="/settings" className="font-bold text-blue-600 hover:underline">
              Site Settings
            </Link>
            .
          </div>
        </div>
      </div>

      {/* Recent Quote Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Inquiries</h2>
            <p className="text-xs text-slate-500">Latest lead submissions from the website contact form</p>
          </div>
          <Link
            to="/quote-requests"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all ({stats.totalQuoteRequests})
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Service</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentQuotes.length > 0 ? (
                recentQuotes.map((q) => (
                  <tr key={q._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-slate-900">{q.name}</div>
                      <div className="text-slate-400 text-[11px]">{q.email}</div>
                    </td>
                    <td className="py-3.5 px-6 font-medium text-slate-800">{q.service}</td>
                    <td className="py-3.5 px-6">{getStatusBadge(q.status)}</td>
                    <td className="py-3.5 px-6 text-slate-500">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        to="/quote-requests"
                        className="text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
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
