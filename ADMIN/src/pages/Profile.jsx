import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { User, Lock, ShieldCheck, Key, Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import { useAuth } from '../lib/auth';

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const Profile = () => {
  const { admin } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload) => api.put('/admin/auth/change-password', payload),
    onSuccess: () => {
      toast.success('Password changed successfully');
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to change password');
    },
  });

  const onSubmit = (data) => {
    changePasswordMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-2">
          <User className="w-7 h-7 text-amber-500" />
          Administrator Profile
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Review your account information and update your security credentials.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
          Current Credentials
        </h2>

        <div className="flex items-center gap-4 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-ink font-extrabold text-2xl flex items-center justify-center shadow-soft">
            {admin?.name?.charAt(0) || 'A'}
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-ink">{admin?.name}</h3>
            <p className="text-xs text-muted font-medium">{admin?.email}</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
              <ShieldCheck className="w-3 h-3 text-amber-600" />
              Role: {admin?.role}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-600" /> Change Security Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ink">Current Password *</label>
            <input
              type="password"
              {...register('oldPassword')}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white text-xs focus:outline-none focus:border-amber-500"
            />
            {errors.oldPassword && (
              <p className="text-xs text-red-600 font-medium">{errors.oldPassword.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ink">New Password *</label>
            <input
              type="password"
              {...register('newPassword')}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white text-xs focus:outline-none focus:border-amber-500"
            />
            {errors.newPassword && (
              <p className="text-xs text-red-600 font-medium">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ink">Confirm New Password *</label>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Re-enter new password"
              className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white text-xs focus:outline-none focus:border-amber-500"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-xs shadow-soft transition-all disabled:opacity-60"
            >
              {changePasswordMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

