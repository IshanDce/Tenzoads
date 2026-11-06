import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ImageUpload from '../components/ImageUpload';

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  techTag: z.string().optional(),
  shortDescription: z.string().min(5, 'Short description is required'),
  fullDescription: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  mockupStyle: z.string().default('browser'),
  bgColor: z.string().default('cream'),
  thumbnail: z.string().optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.string().default('published'),
  order: z.number().default(0),
});

export const ProjectForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [resultsList, setResultsList] = useState(['']);
  const [featuresList, setFeaturesList] = useState(['']);
  const [tagsList, setTagsList] = useState(['']);

  const categories = [
    'Mobile App',
    'Website',
    'AI Solutions',
    'UI/UX Design',
    'Graphic Design',
  ];

  const mockupStyles = [
    { value: 'phone', label: 'Phone Mockup (Mobile)' },
    { value: 'browser', label: 'Browser Window (Website)' },
    { value: 'dashboard', label: 'Dashboard Screen (SaaS / Charts)' },
    { value: 'brand', label: 'Brand Identity / Logo' },
    { value: 'chat', label: 'Chat / AI Assistant' },
  ];

  const bgColors = [
    { value: 'cream', label: 'Light Slate / White' },
    { value: 'amber', label: 'Electric Blue' },
    { value: 'black', label: 'Dark Navy' },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'Mobile App',
      techTag: '',
      shortDescription: '',
      fullDescription: '',
      challenge: '',
      solution: '',
      mockupStyle: 'browser',
      bgColor: 'cream',
      thumbnail: '',
      liveUrl: '',
      featured: false,
      status: 'published',
      order: 0,
    },
  });

  const titleValue = watch('title');
  const thumbnailValue = watch('thumbnail');

  // Auto-generate slug on title change for new projects
  useEffect(() => {
    if (!isEditing && titleValue) {
      const generated = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setValue('slug', generated);
    }
  }, [titleValue, isEditing, setValue]);

  // Load project if editing
  const { isLoading: isLoadingData } = useQuery({
    queryKey: ['admin-project', id],
    queryFn: async () => {
      const res = await api.get(`/admin/projects/${id}`);
      return res.data?.data;
    },
    enabled: isEditing,
    onSuccess: (data) => {
      if (data) {
        reset({
          title: data.title || '',
          slug: data.slug || '',
          category: data.category || 'Mobile App',
          techTag: data.techTag || '',
          shortDescription: data.shortDescription || data.description || '',
          fullDescription: data.fullDescription || '',
          challenge: data.challenge || '',
          solution: data.solution || '',
          mockupStyle: data.mockupStyle || data.mockupType || 'browser',
          bgColor: data.bgColor || 'cream',
          thumbnail: data.thumbnail || '',
          liveUrl: data.liveUrl || '',
          featured: Boolean(data.featured),
          status: data.status || 'published',
          order: data.order ?? data.sortOrder ?? 0,
        });

        if (Array.isArray(data.results) && data.results.length > 0) {
          setResultsList(data.results);
        }
        if (Array.isArray(data.features) && data.features.length > 0) {
          setFeaturesList(data.features);
        }
        if (Array.isArray(data.tags) && data.tags.length > 0) {
          setTagsList(data.tags);
        }
      }
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (isEditing) {
        return api.put(`/admin/projects/${id}`, payload);
      }
      return api.post('/admin/projects', payload);
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Project updated successfully' : 'Project created successfully');
      navigate('/projects');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Error saving project');
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      results: resultsList.filter((item) => item.trim() !== ''),
      features: featuresList.filter((item) => item.trim() !== ''),
      tags: tagsList.filter((item) => item.trim() !== ''),
    };
    saveMutation.mutate(payload);
  };

  if (isEditing && isLoadingData) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 text-sm font-semibold">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          Loading project data...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fade-in max-w-5xl">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-4">
          <Link
            to="/projects"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isEditing ? 'Edit Project' : 'New Project'}
            </h1>
            <p className="text-xs text-slate-500">
              Configure details, illustrations, tags, and client deliverables.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            className="px-4 py-2 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-xs shadow-soft transition-all disabled:opacity-60"
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Project
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left (2 cols), Meta Right (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Basics */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Basic Details
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Project Title *</label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g. Bloom Finance App"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.title && (
                <p className="text-xs text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900">URL Slug</label>
                <input
                  type="text"
                  {...register('slug')}
                  placeholder="bloom-finance-app"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-xs font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900">Category *</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900">Tech Badge / Tag</label>
                <input
                  type="text"
                  {...register('techTag')}
                  placeholder="Flutter, iOS, Node.js"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900">Live URL (optional)</label>
                <input
                  type="url"
                  {...register('liveUrl')}
                  placeholder="https://client-demo.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Short Summary / Description *</label>
              <textarea
                rows={3}
                {...register('shortDescription')}
                placeholder="One or two sentences describing the product..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.shortDescription && (
                <p className="text-xs text-red-600">{errors.shortDescription.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Full Overview</label>
              <textarea
                rows={4}
                {...register('fullDescription')}
                placeholder="In-depth explanation of the scope, client objectives, and tech stack..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Card 2: Case Study Details (Challenge & Solution) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Case Study Breakdown
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">The Challenge</label>
              <textarea
                rows={3}
                {...register('challenge')}
                placeholder="What hurdles did the startup or enterprise face prior to the project?"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Our Solution</label>
              <textarea
                rows={3}
                {...register('solution')}
                placeholder="How did our engineering & design team tackle the challenge?"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Card 3: Dynamic Features & Results */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Results & Metrics
                </label>
                <button
                  type="button"
                  onClick={() => setResultsList([...resultsList, ''])}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Result
                </button>
              </div>
              <div className="space-y-2">
                {resultsList.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const copy = [...resultsList];
                        copy[idx] = e.target.value;
                        setResultsList(copy);
                      }}
                      placeholder="e.g. 100k+ downloads within 30 days"
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-white"
                    />
                    {resultsList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setResultsList(resultsList.filter((_, i) => i !== idx))}
                        className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Highlighted Features
                </label>
                <button
                  type="button"
                  onClick={() => setFeaturesList([...featuresList, ''])}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {featuresList.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const copy = [...featuresList];
                        copy[idx] = e.target.value;
                        setFeaturesList(copy);
                      }}
                      placeholder="e.g. Real-time portfolio sync with biometric security"
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-white"
                    />
                    {featuresList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setFeaturesList(featuresList.filter((_, i) => i !== idx))}
                        className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Mockup Settings & Publishing */}
        <div className="space-y-6">
          {/* Publishing Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Publishing Options
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Status</label>
              <select
                {...register('status')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="w-4 h-4 rounded text-blue-600 focus:ring-amber-400 border-slate-200/80"
              />
              <label htmlFor="featured" className="text-xs font-bold text-slate-900 cursor-pointer">
                Feature on Homepage Showcase
              </label>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-900">Display Order</label>
              <input
                type="number"
                {...register('order', { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200/80 bg-slate-50/60 text-xs font-mono"
              />
              <p className="text-[11px] text-slate-500">Lower numbers appear first.</p>
            </div>
          </div>

          {/* Visual Presentation Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Visual Illustration
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Mockup Shape</label>
              <select
                {...register('mockupStyle')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {mockupStyles.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">
                Renders a stylized SVG graphic if no uploaded thumbnail is provided.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Card Background Accent</label>
              <select
                {...register('bgColor')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {bgColors.map((bg) => (
                  <option key={bg.value} value={bg.value}>
                    {bg.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <ImageUpload
                label="Custom Thumbnail / Screenshot"
                value={thumbnailValue}
                onChange={(url) => setValue('thumbnail', url)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;

