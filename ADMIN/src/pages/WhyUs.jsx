import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Award, Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

export const WhyUs = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-why-us'],
    queryFn: async () => {
      const res = await api.get('/admin/why-us');
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      icon: '',
      order: 0,
    },
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      title: '',
      description: '',
      icon: 'ShieldCheck',
      order: (data?.data?.length || 0) + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({
      title: item.title || '',
      description: item.description || '',
      icon: item.icon || 'ShieldCheck',
      order: item.order ?? 0,
    });
    setModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingItem) {
        return api.put(`/admin/why-us/${editingItem._id}`, payload);
      }
      return api.post('/admin/why-us', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-why-us']);
      toast.success(editingItem ? 'Card updated' : 'Card added');
      setModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save item');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/why-us/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-why-us']);
      toast.success('Card removed');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete item'),
  });

  const onSubmit = (formData) => {
    saveMutation.mutate({
      ...formData,
      order: Number(formData.order) || 0,
    });
  };

  const items = data?.data || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-7 h-7 text-blue-600" />
            "Why TenzoAds" Value Pillars
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Displayed on the Homepage dark section (End-to-end delivery, Agile, AI-ready, Post-launch support).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Pillar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
            Loading cards...
          </div>
        ) : items.length > 0 ? (
          items.map((it) => (
            <div
              key={it._id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                  {it.icon || 'Icon'}
                </div>
                <h3 className="text-base font-bold text-slate-900">{it.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{it.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-400">Order: #{it.order}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(it)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Edit Card"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(it)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500">
            No pillars configured.
          </div>
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
                {editingItem ? 'Edit Pillar' : 'Add Value Pillar'}
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
                <label className="text-xs font-bold text-slate-900">Title *</label>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  placeholder="e.g. End-to-end delivery"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900">Icon Name</label>
                <input
                  type="text"
                  {...register('icon')}
                  placeholder="Layers, Zap, Cpu, Headphones"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900">Description *</label>
                <textarea
                  rows={3}
                  {...register('description', { required: true })}
                  placeholder="Value proposition explanation..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900">Display Order</label>
                <input
                  type="number"
                  {...register('order')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60"
                />
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
                  {saveMutation.isPending ? 'Saving...' : 'Save Pillar'}
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
        title="Delete Pillar"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
        confirmText="Delete"
      />
    </div>
  );
};

export default WhyUs;

