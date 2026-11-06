import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users,
  Search,
  Download,
  Trash2,
  Mail,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';

export const Subscribers = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-subscribers', { search, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      params.append('page', page);
      params.append('limit', 20);

      const res = await api.get(`/admin/subscribers?${params.toString()}`);
      return res.data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id) => {
      return api.put(`/admin/subscribers/${id}/toggle`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-subscribers']);
      queryClient.invalidateQueries(['dashboard-stats']);
      toast.success('Subscriber status updated');
    },
    onError: () => toast.error('Failed to toggle subscriber status'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/subscribers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-subscribers']);
      queryClient.invalidateQueries(['dashboard-stats']);
      toast.success('Subscriber removed');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete subscriber'),
  });

  const handleExportCSV = async () => {
    try {
      const response = await api.get('/admin/subscribers/export-csv', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Subscribers CSV downloaded');
    } catch (err) {
      toast.error('Failed to export CSV');
    }
  };

  const subscribers = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            Newsletter Subscribers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Users who subscribed to your tech & product insights.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200/80 hover:border-blue-500 text-slate-900 font-bold text-xs shadow-soft transition-all"
        >
          <Download className="w-4 h-4 text-blue-600" />
          Export to CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search email address..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/70 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Subscribers: <strong className="text-slate-900">{total}</strong>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-6">Email Address</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6">Joined Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      Loading subscribers...
                    </div>
                  </td>
                </tr>
              ) : subscribers.length > 0 ? (
                subscribers.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-slate-900">{s.email}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => toggleMutation.mutate(s._id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          s.isActive
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-neutral-200'
                        }`}
                      >
                        {s.isActive ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-500" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-slate-500">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setDeleteTarget(s)}
                        className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    No subscribers found.
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
        title="Remove Subscriber"
        message={`Are you sure you want to remove ${deleteTarget?.email}?`}
        confirmText="Remove"
      />
    </div>
  );
};

export default Subscribers;

