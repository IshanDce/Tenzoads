import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

export const Faqs = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-faqs', activeTab],
    queryFn: async () => {
      const url = activeTab === 'all' ? '/admin/faqs' : `/admin/faqs?page=${activeTab}`;
      const res = await api.get(url);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      question: '',
      answer: '',
      page: 'home',
      order: 0,
      isActive: true,
    },
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      question: '',
      answer: '',
      page: activeTab === 'contact' ? 'contact' : 'home',
      order: (data?.data?.length || 0) + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingItem(faq);
    reset({
      question: faq.question || '',
      answer: faq.answer || '',
      page: faq.page || 'home',
      order: faq.order ?? 0,
      isActive: faq.isActive ?? true,
    });
    setModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingItem) {
        return api.put(`/admin/faqs/${editingItem._id}`, payload);
      }
      return api.post('/admin/faqs', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-faqs']);
      toast.success(editingItem ? 'FAQ updated' : 'FAQ created');
      setModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save FAQ');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async (faq) => {
      return api.put(`/admin/faqs/${faq._id}`, { isActive: !faq.isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-faqs']);
      toast.success('FAQ status toggled');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/faqs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-faqs']);
      toast.success('FAQ removed');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete FAQ'),
  });

  const onSubmit = (formData) => {
    saveMutation.mutate({
      ...formData,
      order: Number(formData.order) || 0,
    });
  };

  const faqs = data?.data || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Questions and answers appearing on the Homepage and Contact page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
        {[
          { key: 'all', label: 'All FAQs' },
          { key: 'home', label: 'Homepage FAQs' },
          { key: 'contact', label: 'Contact Page FAQs' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="py-12 text-center text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
            Loading FAQs...
          </div>
        ) : faqs.length > 0 ? (
          faqs.map((f) => (
            <div
              key={f._id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-400 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-50 text-blue-700 border border-blue-200">
                    {f.page} page
                  </span>
                  <span className="text-xs font-mono text-slate-500">#{f.order}</span>
                  <button
                    onClick={() => toggleActiveMutation.mutate(f)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      f.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {f.isActive ? 'Active' : 'Hidden'}
                  </button>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{f.question}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{f.answer}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleOpenEdit(f)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(f)}
                  className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-500">No FAQs found for this section.</div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 space-y-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                {editingItem ? 'Edit FAQ' : 'Add FAQ'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900">Question *</label>
                <input
                  type="text"
                  {...register('question', { required: true })}
                  placeholder="e.g. How much does it cost to build a mobile app?"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900">Answer *</label>
                <textarea
                  rows={4}
                  {...register('answer', { required: true })}
                  placeholder="Detailed answer explaining the timeline or cost..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-900">Target Page</label>
                  <select
                    {...register('page')}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-white"
                  >
                    <option value="home">Home Page</option>
                    <option value="contact">Contact Page</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-900">Display Order</label>
                  <input
                    type="number"
                    {...register('order')}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="faqActive"
                  {...register('isActive')}
                  className="w-4 h-4 rounded text-blue-600 border-slate-200/80"
                />
                <label htmlFor="faqActive" className="text-xs font-bold text-slate-900 cursor-pointer">
                  Active (visible on website)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 text-xs font-bold"
                >
                  {saveMutation.isPending ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
        loading={deleteMutation.isPending}
        title="Delete FAQ"
        message={`Are you sure you want to remove "${deleteTarget?.question}"?`}
        confirmText="Delete FAQ"
      />
    </div>
  );
};

export default Faqs;

