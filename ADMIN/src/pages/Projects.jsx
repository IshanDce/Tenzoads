import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Star,
  Edit2,
  Trash2,
  ExternalLink,
  FolderKanban,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';

export const Projects = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const categories = [
    'All',
    'Mobile App',
    'Website',
    'AI Solutions',
    'UI/UX Design',
    'Graphic Design',
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['admin-projects', { search, category, status, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'All') params.append('category', category);
      if (status) params.append('status', status);
      params.append('page', page);
      params.append('limit', 15);

      const res = await api.get(`/admin/projects?${params.toString()}`);
      return res.data;
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }) => {
      return api.put(`/admin/projects/${id}`, { featured: !featured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-projects']);
      toast.success('Project featured status updated');
    },
    onError: () => toast.error('Failed to update featured status'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-projects']);
      toast.success('Project deleted');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete project'),
  });

  const projects = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-blue-600" />
            Projects Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your case studies, mockups, and client showcases.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-xs transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </Link>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-semibold shadow-xs cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-semibold shadow-xs cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/90 text-slate-500 uppercase tracking-wider font-bold text-[11px] border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-6">Project</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Mockup Style</th>
                <th className="py-3.5 px-6 text-center">Featured</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6 text-center">Order</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Loading projects...
                    </div>
                  </td>
                </tr>
              ) : projects.length > 0 ? (
                projects.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {p.thumbnail ? (
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-10 h-10 rounded-xl object-contain p-0.5 border border-slate-200 bg-slate-50 flex-shrink-0"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100/80 flex items-center justify-center text-blue-600 font-bold flex-shrink-0 shadow-2xs">
                            {p.mockupStyle?.charAt(0)?.toUpperCase() || 'P'}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            {p.title}
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-blue-600 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <div className="text-slate-500 text-[11px] truncate max-w-xs mt-0.5">
                            {p.techTag || p.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-500 capitalize">
                      {p.mockupStyle || p.mockupType || 'browser'}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() =>
                          toggleFeaturedMutation.mutate({ id: p._id, featured: p.featured })
                        }
                        title={p.featured ? 'Unmark featured' : 'Mark featured'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          p.featured
                            ? 'text-blue-600 hover:bg-blue-50'
                            : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${p.featured ? 'fill-blue-500 text-blue-600' : 'text-slate-300'}`} />
                      </button>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          p.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {p.status || 'published'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center font-mono text-slate-500">
                      {p.order ?? p.sortOrder ?? 0}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/projects/${p._id}/edit`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No projects found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={total}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
        loading={deleteMutation.isPending}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmText="Delete Project"
      />
    </div>
  );
};

export default Projects;
