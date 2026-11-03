import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Normalizes any relative or absolute image path to a full URL
 */
export const formatImageUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }
  const backendBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${backendBase}${cleanPath}`;
};

// Projects API
export const getProjects = async (params = {}) => {
  const response = await apiClient.get('/projects', { params });
  return response.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await apiClient.get(`/projects/${slug}`);
  return response.data;
};

// Posts API
export const getPosts = async (params = {}) => {
  const response = await apiClient.get('/posts', { params });
  return response.data;
};

export const getFeaturedPost = async () => {
  const response = await apiClient.get('/posts/featured');
  return response.data;
};

export const getPostBySlug = async (slug) => {
  const response = await apiClient.get(`/posts/${slug}`);
  return response.data;
};

// Contact Form API
export const sendContactMessage = async (formData) => {
  const response = await apiClient.post('/contact', formData);
  return response.data;
};

// Newsletter Subscription API
export const subscribeNewsletter = async (email) => {
  const response = await apiClient.post('/newsletter', { email });
  return response.data;
};
