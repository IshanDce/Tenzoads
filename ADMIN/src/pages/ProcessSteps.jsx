import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { GitBranch, Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

export const ProcessSteps = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-process-steps'],
    queryFn: async () => {
      const res = await api.get('/admin/process-steps');
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      number: 1,
      title: '',
      description: '',
      icon: '',
      order: 0,
    },
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    const count = data?.data?.length || 0;
    reset({
      number: count + 1,
      title: '',
      description: '',
      icon: '',
      order: count + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (step) => {
    setEditingItem(step);
    reset({
      number: step.number ?? 1,
      title: step.title || '',
      description: step.description || '',
      icon: step.icon || '',
      order: step.order ?? 0,
    });
    setModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingItem) {
        return api.put(`/admin/process-steps/${editingItem._id}`, payload);
      }
      return api.post('/admin/process-steps', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-process-steps']);
      toast.success(editingItem ? 'Step updated' : 'Step created');
      setModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save process step');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/process-steps/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-process-steps']);
      toast.success('Step deleted');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete step'),
  });

  const onSubmit = (formData) => {
    saveMutation.mutate({
      ...formData,
      number: Number(formData.number) || 1,
      order: Number(formData.order) || 0,
    });
  };

  const steps = data?.data || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <GitBranch className="w-7 h-7 text-blue-600" />
            "How We Work" Process Steps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Numbered stages shown on the Homepage (Discover, Design, Develop, Launch).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Step
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
            Loading process steps...
          </div>
        ) : steps.length > 0 ? (
          steps.map((st) => (
            <div
              key={st._id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors relative"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                  {st.number ?? st.order}
                </div>
                <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{st.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200/80">
                <span className="text-[11px] font-mono text-slate-500">Order: #{st.order}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(st)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                    title="Edit Step"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(st)}
                    className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete Step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500">
            No process steps configured.
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
                {editingItem ? 'Edit Step' : 'Add Process Step'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-900">Step Number *</label>
                  <input
                    type="number"
                    {...register('number', { required: true })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 font-bold"
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
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900">Title *</label>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  placeholder="e.g. Discover & Blueprint"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900">Description *</label>
                <textarea
                  rows={3}
                  {...register('description', { required: true })}
                  placeholder="Step description..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  {saveMutation.isPending ? 'Saving...' : 'Save Step'}
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
        title="Delete Step"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
        confirmText="Delete"
      />
    </div>
  );
};

export default ProcessSteps;

