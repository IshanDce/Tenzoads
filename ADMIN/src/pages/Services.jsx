import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  XCircle,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

export const Services = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const res = await api.get('/admin/services');
      return res.data;
    },
  });

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      icon: 'Smartphone',
      tech: '',
      order: 0,
      isActive: true,
    },
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      title: '',
      description: '',
      icon: 'Smartphone',
      tech: '',
      order: (data?.data?.length || 0) + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (svc) => {
    setEditingItem(svc);
    reset({
      title: svc.title || '',
      description: svc.description || '',
      icon: svc.icon || 'Smartphone',
      tech: svc.tech || '',
      order: svc.order ?? 0,
      isActive: svc.isActive ?? true,
    });
    setModalOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingItem) {
        return api.put(`/admin/services/${editingItem._id}`, payload);
      }
      return api.post('/admin/services', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-services']);
      toast.success(editingItem ? 'Service updated' : 'Service created');
      setModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save service');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async (svc) => {
      return api.put(`/admin/services/${svc._id}`, { isActive: !svc.isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-services']);
      toast.success('Service status updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-services']);
      toast.success('Service deleted');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete service'),
  });

  const onSubmit = (formData) => {
    saveMutation.mutate({
      ...formData,
      order: Number(formData.order) || 0,
    });
  };

  const services = data?.data || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-amber-500" />
            Core IT Services
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Displayed on the Homepage services grid, About page, and website footer.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-muted">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-500 mb-2" />
            Loading services...
          </div>
        ) : services.length > 0 ? (
          services.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl p-6 border border-borderCream shadow-soft flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-xs">
                    {s.icon || 'Icon'}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActiveMutation.mutate(s)}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        s.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {s.isActive ? 'Active' : 'Hidden'}
                    </button>
                    <span className="text-[11px] text-muted font-mono">#{s.order}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-ink">{s.title}</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-3">
                  {s.description}
                </p>

                {s.tech && (
                  <div className="pt-2 text-[11px] font-semibold text-amber-700 bg-amber-50/60 px-2.5 py-1 rounded-lg inline-block">
                    {s.tech}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-borderCream">
                <button
                  onClick={() => handleOpenEdit(s)}
                  className="p-1.5 text-muted hover:text-ink rounded-lg hover:bg-neutral-100"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(s)}
                  className="p-1.5 text-muted hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted">
            No services configured yet.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-borderCream p-6 space-y-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-borderCream pb-3">
              <h2 className="text-base font-bold text-ink">
                {editingItem ? 'Edit Service' : 'Add Service'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-muted hover:text-ink p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Service Title *</label>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  placeholder="e.g. Mobile App Development"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Icon Name</label>
                <input
                  type="text"
                  {...register('icon')}
                  placeholder="Smartphone, Globe, Layout, Bot, Palette"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Description *</label>
                <textarea
                  rows={3}
                  {...register('description', { required: true })}
                  placeholder="Service summary paragraph..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Key Technologies / Subtext</label>
                <input
                  type="text"
                  {...register('tech')}
                  placeholder="Flutter, React Native, Swift, Kotlin"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink">Display Order</label>
                  <input
                    type="number"
                    {...register('order')}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    {...register('isActive')}
                    className="w-4 h-4 rounded text-amber-500 border-borderCream"
                  />
                  <label htmlFor="isActive" className="text-xs font-bold text-ink cursor-pointer">
                    Show on Site
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-borderCream">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-ink text-xs font-bold"
                >
                  {saveMutation.isPending ? 'Saving...' : 'Save Service'}
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
        title="Delete Service"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
        confirmText="Delete Service"
      />
    </div>
  );
};

export default Services;

