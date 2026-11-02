import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  UserCog,
  Plus,
  Edit2,
  Trash2,
  Key,
  ShieldCheck,
  CheckCircle,
  XCircle,
  X,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useAuth } from '../lib/auth';
import ConfirmModal from '../components/ConfirmModal';

export const UsersPage = () => {
  const queryClient = useQueryClient();
  const { admin: currentAdmin } = useAuth();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [passwordTarget, setPasswordTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await api.get('/admin/users');
      return res.data;
    },
  });

  // Forms
  const addForm = useForm({
    defaultValues: { name: '', email: '', password: '', role: 'editor' },
  });

  const editForm = useForm({
    defaultValues: { name: '', role: 'editor', isActive: true },
  });

  const passwordForm = useForm({
    defaultValues: { newPassword: '' },
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (payload) => api.post('/admin/users', payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
      toast.success('Admin user created successfully');
      setAddModalOpen(false);
      addForm.reset();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error creating user'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => api.put(`/admin/users/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
      toast.success('Admin user updated');
      setEditTarget(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error updating user'),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ id, newPassword }) =>
      api.put(`/admin/users/${id}/reset-password`, { newPassword }),
    onSuccess: () => {
      toast.success('Password updated successfully');
      setPasswordTarget(null);
      passwordForm.reset();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error resetting password'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
      toast.success('Admin user removed');
      setDeleteTarget(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error deleting user'),
  });

  const handleOpenEdit = (user) => {
    setEditTarget(user);
    editForm.reset({
      name: user.name || '',
      role: user.role || 'editor',
      isActive: user.isActive ?? true,
    });
  };

  const users = data?.data || [];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-2">
            <UserCog className="w-7 h-7 text-amber-500" />
            Admin Users Management
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Manage admin credentials, roles (superadmin / editor), and account statuses.
          </p>
        </div>

        <button
          onClick={() => {
            addForm.reset();
            setAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Administrator
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-borderCream shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBF7EE]/60 text-muted uppercase tracking-wider font-semibold border-b border-borderCream">
              <tr>
                <th className="py-3.5 px-6">Name</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6 text-center">Role</th>
                <th className="py-3.5 px-6 text-center">Status</th>
                <th className="py-3.5 px-6">Last Login</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderCream">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-amber-500 mb-2" />
                    Loading users...
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isCurrent = currentAdmin?.id === u._id || currentAdmin?._id === u._id;
                  return (
                    <tr key={u._id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-ink flex items-center gap-2">
                          {u.name}
                          {isCurrent && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                              You
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-muted">{u.email}</td>

                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                            u.role === 'superadmin'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}
                        >
                          <ShieldCheck className="w-3 h-3" />
                          {u.role}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            u.isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {u.isActive ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-600" /> Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-neutral-500" /> Inactive
                            </>
                          )}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-muted">
                        {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(u)}
                            className="p-1.5 text-muted hover:text-ink rounded-lg hover:bg-neutral-100"
                            title="Edit Role/Status"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              passwordForm.reset();
                              setPasswordTarget(u);
                            }}
                            className="p-1.5 text-muted hover:text-amber-700 rounded-lg hover:bg-amber-50"
                            title="Reset Password"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                          {!isCurrent && (
                            <button
                              onClick={() => setDeleteTarget(u)}
                              className="p-1.5 text-muted hover:text-red-600 rounded-lg hover:bg-red-50"
                              title="Delete Admin"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-borderCream p-6 space-y-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-borderCream pb-3">
              <h2 className="text-base font-bold text-ink">Add New Administrator</h2>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-muted hover:text-ink p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={addForm.handleSubmit((d) => createMutation.mutate(d))}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Full Name *</label>
                <input
                  type="text"
                  {...addForm.register('name', { required: true })}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Email Address *</label>
                <input
                  type="email"
                  {...addForm.register('email', { required: true })}
                  placeholder="alex@tenzoads.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Initial Password *</label>
                <input
                  type="password"
                  {...addForm.register('password', { required: true, minLength: 6 })}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Role</label>
                <select
                  {...addForm.register('role')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-white font-medium"
                >
                  <option value="editor">Editor (Can edit all website content)</option>
                  <option value="superadmin">Super Admin (Can manage users and settings)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-borderCream">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-ink text-xs font-bold"
                >
                  {createMutation.isPending ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-borderCream p-6 space-y-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-borderCream pb-3">
              <h2 className="text-base font-bold text-ink">Edit Admin: {editTarget.name}</h2>
              <button
                onClick={() => setEditTarget(null)}
                className="text-muted hover:text-ink p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={editForm.handleSubmit((d) =>
                updateMutation.mutate({ id: editTarget._id, payload: d })
              )}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Name</label>
                <input
                  type="text"
                  {...editForm.register('name')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Role</label>
                <select
                  {...editForm.register('role')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-white"
                >
                  <option value="editor">Editor</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  {...editForm.register('isActive')}
                  className="w-4 h-4 rounded text-amber-500 border-borderCream"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-bold text-ink cursor-pointer">
                  Account Active (Able to sign in)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-borderCream">
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  className="px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-ink text-xs font-bold"
                >
                  {updateMutation.isPending ? 'Updating...' : 'Update Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {passwordTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
          <div
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-borderCream p-6 space-y-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-borderCream pb-3">
              <h2 className="text-base font-bold text-ink">
                Reset Password for {passwordTarget.name}
              </h2>
              <button
                onClick={() => setPasswordTarget(null)}
                className="text-muted hover:text-ink p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={passwordForm.handleSubmit((d) =>
                resetPasswordMutation.mutate({
                  id: passwordTarget._id,
                  newPassword: d.newPassword,
                })
              )}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">New Password *</label>
                <input
                  type="password"
                  {...passwordForm.register('newPassword', { required: true, minLength: 6 })}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-borderCream">
                <button
                  type="button"
                  onClick={() => setPasswordTarget(null)}
                  className="px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetPasswordMutation.isPending}
                  className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-ink text-xs font-bold"
                >
                  {resetPasswordMutation.isPending ? 'Resetting...' : 'Save Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirm */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
        loading={deleteMutation.isPending}
        title="Delete Administrator"
        message={`Are you sure you want to delete admin account "${deleteTarget?.email}"?`}
        confirmText="Delete Admin"
      />
    </div>
  );
};

export default UsersPage;

