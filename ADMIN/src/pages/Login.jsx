import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../lib/auth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const Login = () => {
  const { admin, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (admin) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await login(data.email, data.password);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FDF6E4] flex flex-col justify-center items-center p-4 selection:bg-amber-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-borderCream p-8 sm:p-10 space-y-8 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-ink shadow-md text-amber-500 mb-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amber-500">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Tenzo<span className="text-amber-500">Ads</span>
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Admin Control Center
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ink flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              Email Address
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="admin@tenzoads.com"
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none bg-[#FBF7EE]/40 focus:bg-white ${
                errors.email
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-borderCream focus:border-amber-500 focus:ring-2 focus:ring-amber-100'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ink flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm transition-all outline-none bg-[#FBF7EE]/40 focus:bg-white ${
                  errors.password
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-borderCream focus:border-amber-500 focus:ring-2 focus:ring-amber-100'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 font-medium">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-sm shadow-amber-glow hover:shadow-soft-hover transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In to Admin
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-muted">
          Protected area. Authorized personnel only.
        </div>
      </div>
    </div>
  );
};

export default Login;

