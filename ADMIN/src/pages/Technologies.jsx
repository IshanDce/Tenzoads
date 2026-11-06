import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Cpu, Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

export const Technologies = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-technologies'],
    queryFn: async () => {
      const res = await api.get('/admin/technologies');
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      order: 0,
      isActive: true,
    },
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      name: '',
      order: (data?.data?.length || 0) + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (tech) => {
    setEditingItem(tech);
    reset({
      name: tech.name || '',
      order: tech.order ?? 0,
      isActive: tech.isActive ?? true,
    });
    setModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingItem) {
        return api.put(`/admin/technologies/${editingItem._id}`, payload);
      }
      return api.post('/admin/technologies', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-technologies']);
      toast.success(editingItem ? 'Technology updated' : 'Technology added');
      setModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save technology');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async (tech) => {
      return api.put(`/admin/technologies/${tech._id}`, { isActive: !tech.isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-technologies']);
      toast.success('Technology status updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/technologies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-technologies']);
      toast.success('Technology deleted');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete technology'),
  });

  const onSubmit = (formData) => {
    saveMutation.mutate({
      ...formData,
      order: Number(formData.order) || 0,
    });
  };

  const technologies = data?.data || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-7 h-7 text-blue-600" />
            Technologies We Build With
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The marquee pill badges displayed right beneath the Homepage hero.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Technology
        </button>
      </div>

      {/* Pill Preview Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Live Homepage Preview
        </h2>
        <div className="flex flex-wrap gap-2.5 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
          {technologies
            .filter((t) => t.isActive)
            .map((t) => (
              <span
                key={t._id}
                className="px-4 py-1.5 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-2xs tracking-wider uppercase"
              >
                {t.name}
              </span>
            ))}
        </div>
      </div>

      {/* Technologies Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-6">Name</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6 text-center">Order</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-600 mb-2" />
                    Loading technologies...
                  </td>
                </tr>
              ) : technologies.length > 0 ? (
                technologies.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      <button
                        onClick={() => toggleActiveMutation.mutate(t)}
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          t.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {t.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>

                    <td className="py-3.5 px-6 text-center font-mono text-slate-500">
                      #{t.order}
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(t)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(t)}
                          className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    No technologies added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
          <div
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 space-y-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                {editingItem ? 'Edit Technology' : 'Add Technology'}
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
                <label className="text-xs font-bold text-slate-900">Technology Name *</label>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="e.g. Flutter"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900">Display Order</label>
                <input
                  type="number"
                  {...register('order')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="techActive"
                  {...register('isActive')}
                  className="w-4 h-4 rounded text-blue-600 border-slate-200/80"
                />
                <label htmlFor="techActive" className="text-xs font-bold text-slate-900 cursor-pointer">
                  Show on Homepage
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
                  {saveMutation.isPending ? 'Saving...' : 'Save Technology'}
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
        title="Delete Technology"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
        confirmText="Delete"
      />
    </div>
  );
};

export default Technologies;

