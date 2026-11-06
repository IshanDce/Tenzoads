import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  MessageSquare,
  Search,
  Download,
  Mail,
  Phone,
  Calendar,
  Clock,
  Trash2,
  X,
  ExternalLink,
  CheckCircle,
  Save,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';

export const QuoteRequests = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-quote-requests', { search, status, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status && status !== 'all') params.append('status', status);
      params.append('page', page);
      params.append('limit', 15);

      const res = await api.get(`/admin/quote-requests?${params.toString()}`);
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }) => {
      return api.put(`/admin/quote-requests/${id}`, updates);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(['admin-quote-requests']);
      queryClient.invalidateQueries(['dashboard-stats']);
      if (selectedQuote && res.data?.data) {
        setSelectedQuote(res.data.data);
      }
      toast.success('Quote updated');
    },
    onError: () => toast.error('Failed to update quote request'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/quote-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-quote-requests']);
      queryClient.invalidateQueries(['dashboard-stats']);
      toast.success('Inquiry removed');
      setDeleteTarget(null);
      setSelectedQuote(null);
    },
    onError: () => toast.error('Failed to delete quote request'),
  });

  const handleOpenDetail = async (quote) => {
    setSelectedQuote(quote);
    setInternalNotes(quote.internalNotes || '');
    if (!quote.isRead) {
      try {
        await api.get(`/admin/quote-requests/${quote._id}`);
        queryClient.invalidateQueries(['admin-quote-requests']);
        queryClient.invalidateQueries(['dashboard-stats']);
      } catch (e) {}
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await api.get('/admin/quote-requests/export-csv', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `quotes-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('CSV downloaded');
    } catch (err) {
      toast.error('Failed to export CSV');
    }
  };

  const quotes = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  const getStatusBadge = (st) => {
    switch (st) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-amber-300">
            New
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            In Progress
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Contacted
          </span>
        );
      case 'closed':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-neutral-200">
            Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-blue-600" />
            Quote Requests & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Client leads submitted through "Get a Free Quote" and contact forms.
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

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, or service..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/70 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['all', 'new', 'in-progress', 'contacted', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatus(st);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                status === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200/80 text-slate-500 hover:text-slate-900'
              }`}
            >
              {st === 'all' ? 'All Inquiries' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-6">Sender</th>
                <th className="py-3.5 px-6">Service Requested</th>
                <th className="py-3.5 px-6">Budget Range</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      Loading inquiries...
                    </div>
                  </td>
                </tr>
              ) : quotes.length > 0 ? (
                quotes.map((q) => (
                  <tr
                    key={q._id}
                    onClick={() => handleOpenDetail(q)}
                    className={`cursor-pointer transition-colors ${
                      !q.isRead
                        ? 'bg-blue-50/50 hover:bg-blue-50/80 font-medium'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {!q.isRead && (
                          <span
                            className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
                            title="Unread"
                          />
                        )}
                        <div>
                          <div className={`text-sm ${!q.isRead ? 'font-bold text-slate-900' : 'font-semibold text-neutral-800'}`}>
                            {q.name}
                          </div>
                          <div className="text-slate-500 text-[11px]">{q.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-900">{q.service}</span>
                    </td>

                    <td className="py-4 px-6 text-slate-500">
                      {q.budget || 'Not specified'}
                    </td>

                    <td className="py-4 px-6 text-center">{getStatusBadge(q.status)}</td>

                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(q)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-100 text-slate-900 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setDeleteTarget(q)}
                          className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No quote requests found.
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

      {/* Quote Details Slide-over Drawer / Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-ink/40 backdrop-blur-xs">
          <div
            className="w-full max-w-lg h-full bg-white shadow-2xl border-l border-slate-200/80 flex flex-col animate-slide-left overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200/80 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {selectedQuote.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selectedQuote.name}</h2>
                  <p className="text-xs text-slate-500">
                    Received on {new Date(selectedQuote.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Status Selector */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Lead Status
                </label>
                <select
                  value={selectedQuote.status}
                  onChange={(e) =>
                    updateMutation.mutate({
                      id: selectedQuote._id,
                      updates: { status: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200/80 bg-white text-xs font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="new">New (Unprocessed)</option>
                  <option value="in-progress">In Progress</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed / Archived</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Client Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-blue-600" /> Email
                    </span>
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="text-xs font-semibold text-blue-600 hover:underline block truncate"
                    >
                      {selectedQuote.email}
                    </a>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-blue-600" /> Phone
                    </span>
                    <span className="text-xs font-semibold text-slate-900 block truncate">
                      {selectedQuote.phone || 'N/A'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Service</span>
                    <span className="text-xs font-bold text-slate-900 block">
                      {selectedQuote.service}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Budget</span>
                    <span className="text-xs font-bold text-slate-900 block">
                      {selectedQuote.budget || 'Open'}
                    </span>
                  </div>
                </div>

                {selectedQuote.preferredDateTime && (
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs font-medium text-amber-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Preferred Discussion Time: <strong>{selectedQuote.preferredDateTime}</strong></span>
                  </div>
                )}
              </div>

              {/* Message Details */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Project Requirements Message
                </h3>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-900 whitespace-pre-wrap leading-relaxed">
                  {selectedQuote.message || 'No additional message was provided.'}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Internal Team Notes
                  </h3>
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: selectedQuote._id,
                        updates: { internalNotes },
                      })
                    }
                    disabled={updateMutation.isPending}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Note
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record phone call notes, proposal status, or next steps..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
              <button
                onClick={() => setDeleteTarget(selectedQuote)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Delete Inquiry
              </button>

              <a
                href={`mailto:${selectedQuote.email}?subject=Regarding your TenzoAds Project Inquiry (${selectedQuote.service})`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-xs shadow-soft transition-all"
              >
                <Mail className="w-4 h-4" /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
        loading={deleteMutation.isPending}
        title="Delete Quote Request"
        message={`Are you sure you want to permanently delete the inquiry from ${deleteTarget?.name}?`}
        confirmText="Delete Inquiry"
      />
    </div>
  );
};

export default QuoteRequests;

