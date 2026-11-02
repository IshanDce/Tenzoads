import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('admin_token');
      try {
        if (token) {
          const res = await api.get('/admin/auth/me');
          if (res.data?.success && res.data.admin) {
            setAdmin(res.data.admin);
            localStorage.setItem('admin_user', JSON.stringify(res.data.admin));
          }
        } else {
          // Attempt refresh via httpOnly cookie
          const res = await api.post('/admin/auth/refresh');
          if (res.data?.success && res.data.accessToken) {
            localStorage.setItem('admin_token', res.data.accessToken);
            setAdmin(res.data.admin);
            localStorage.setItem('admin_user', JSON.stringify(res.data.admin));
          }
        }
      } catch (err) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/admin/auth/login', { email, password });
      if (data?.success) {
        localStorage.setItem('admin_token', data.accessToken);
        localStorage.setItem('admin_user', JSON.stringify(data.admin));
        setAdmin(data.admin);
        toast.success(`Welcome back, ${data.admin.name || 'Admin'}!`);
        navigate('/dashboard');
        return { success: true };
      }
      return { success: false, message: data?.message || 'Login failed' };
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials or server error';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await api.post('/admin/auth/logout');
    } catch (e) {
      // Continue cleanup even if server logout errored
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      setAdmin(null);
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, login, logout }}>
      {loading ? (
        <div className="min-h-screen bg-[#FBF7EE] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-muted">Loading TenzoAds Admin...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
