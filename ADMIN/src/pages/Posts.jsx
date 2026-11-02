import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Star,
  Edit2,
  Trash2,
  FileText,
  Calendar,
  User,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';

export const Posts = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const categories = [
    'All',
    'Web Development',
    'Mobile Apps',
    'AI Integration',
    'UI/UX Design',
    'Graphic Design',
    'Technology',
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['admin-posts', { search, category, status, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'All') params.append('category', category);
      if (status) params.append('status', status);
      params.append('page', page);
      params.append('limit', 15);

      const res = await api.get(`/admin/posts?${params.toString()}`);
      return res.data;
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }) => {
      return api.put(`/admin/posts/${id}`, { featured: !featured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-posts']);
      toast.success('Post featured status updated');
    },
    onError: () => toast.error('Failed to update featured status'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-posts']);
      toast.success('Post deleted successfully');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete post'),
  });

  const posts = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-2">
            <FileText className="w-7 h-7 text-amber-500" />
            Blog Articles
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Write, review, and publish technical insights and design guides.
          </p>
        </div>

        <Link
          to="/posts/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" />
          Create New Article
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-borderCream shadow-soft flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/40 focus:bg-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl border border-borderCream bg-white text-ink focus:outline-none focus:border-amber-500 font-medium"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl border border-borderCream bg-white text-ink focus:outline-none focus:border-amber-500 font-medium"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-borderCream shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBF7EE]/60 text-muted uppercase tracking-wider font-semibold border-b border-borderCream">
              <tr>
                <th className="py-3.5 px-6">Article</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Author</th>
                <th className="py-3.5 px-6 text-center">Featured</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderCream">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      Loading articles...
                    </div>
                  </td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((p) => (
                  <tr key={p._id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {p.coverImage ? (
                          <img
                            src={p.coverImage}
                            alt={p.title}
                            className="w-12 h-8 rounded-lg object-cover border border-borderCream bg-neutral-100 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-8 rounded-lg bg-cream border border-borderCream flex items-center justify-center text-[10px] font-bold text-amber-700 flex-shrink-0">
                            16:9
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-ink text-sm max-w-sm line-clamp-1">
                            {p.title}
                          </div>
                          <div className="text-muted text-[11px] line-clamp-1 max-w-sm">
                            {p.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-semibold text-ink">{p.category}</span>
                    </td>

                    <td className="py-4 px-6 text-muted">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-600" />
                        <span>{p.author || 'TenzoAds'}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() =>
                          toggleFeaturedMutation.mutate({ id: p._id, featured: p.featured })
                        }
                        title={p.featured ? 'Unmark featured hero' : 'Mark featured hero'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          p.featured
                            ? 'text-amber-500 hover:bg-amber-50'
                            : 'text-neutral-300 hover:text-neutral-500 hover:bg-neutral-100'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${p.featured ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          p.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                        }`}
                      >
                        {p.status || 'published'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-muted whitespace-nowrap">
                      {p.publishedAt
                        ? new Date(p.publishedAt).toLocaleDateString()
                        : new Date(p.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/posts/${p._id}/edit`}
                          className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-neutral-100 transition-colors"
                          title="Edit Article"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No articles found matching the criteria.
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

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
        loading={deleteMutation.isPending}
        title="Delete Article"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        confirmText="Delete Article"
      />
    </div>
  );
};

export default Posts;
