import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ImageUpload from '../components/ImageUpload';
import RichTextEditor from '../components/RichTextEditor';

const postSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  author: z.string().default('TenzoAds Team'),
  readTime: z.string().default('5 min read'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.string().default('published'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const PostForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [editorHtml, setEditorHtml] = useState('');
  const [tagsList, setTagsList] = useState(['']);

  const categories = [
    'Web Development',
    'Mobile Apps',
    'AI Integration',
    'UI/UX Design',
    'Graphic Design',
    'Technology',
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'Web Development',
      author: 'TenzoAds Team',
      readTime: '5 min read',
      excerpt: '',
      coverImage: '',
      featured: false,
      status: 'published',
      seoTitle: '',
      seoDescription: '',
    },
  });

  const titleValue = watch('title');
  const coverImageValue = watch('coverImage');

  useEffect(() => {
    if (!isEditing && titleValue) {
      const generated = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setValue('slug', generated);
    }
  }, [titleValue, isEditing, setValue]);

  const { isLoading: isLoadingData } = useQuery({
    queryKey: ['admin-post', id],
    queryFn: async () => {
      const res = await api.get(`/admin/posts/${id}`);
      return res.data?.data;
    },
    enabled: isEditing,
    onSuccess: (data) => {
      if (data) {
        reset({
          title: data.title || '',
          slug: data.slug || '',
          category: data.category || 'Web Development',
          author: data.author || 'TenzoAds Team',
          readTime: data.readTime || '5 min read',
          excerpt: data.excerpt || '',
          coverImage: data.coverImage || '',
          featured: Boolean(data.featured),
          status: data.status || 'published',
          seoTitle: data.seoTitle || '',
          seoDescription: data.seoDescription || '',
        });
        setEditorHtml(data.content || '');
        if (Array.isArray(data.tags) && data.tags.length > 0) {
          setTagsList(data.tags);
        }
      }
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (isEditing) {
        return api.put(`/admin/posts/${id}`, payload);
      }
      return api.post('/admin/posts', payload);
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Article updated' : 'Article created');
      navigate('/posts');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Error saving article');
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      content: editorHtml,
      tags: tagsList.filter((t) => t.trim() !== ''),
    };
    saveMutation.mutate(payload);
  };

  if (isEditing && isLoadingData) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted text-sm font-semibold">
          <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
          Loading article data...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fade-in max-w-5xl">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-borderCream pb-5">
        <div className="flex items-center gap-4">
          <Link
            to="/posts"
            className="p-2 rounded-xl text-muted hover:text-ink hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">
              {isEditing ? 'Edit Article' : 'Write New Article'}
            </h1>
            <p className="text-xs text-muted">
              Compose blog posts with headings, formatting, cover media, and SEO meta.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/posts"
            className="px-4 py-2 rounded-xl border border-borderCream text-xs font-semibold text-muted hover:text-ink hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-xs shadow-soft transition-all disabled:opacity-60"
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Article
          </button>
        </div>
      </div>

      {/* Form Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Article Content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Article Headline *</label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g. Flutter vs React Native in 2026: Which Should You Choose?"
                className="w-full px-4 py-3 rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white text-base font-bold focus:outline-none focus:border-amber-500"
              />
              {errors.title && (
                <p className="text-xs text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink">Slug</label>
                <input
                  type="text"
                  {...register('slug')}
                  placeholder="flutter-vs-react-native-2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-[#FBF7EE]/30 text-xs font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink">Category *</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-white text-xs font-medium focus:outline-none focus:border-amber-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Short Excerpt / Intro *</label>
              <textarea
                rows={3}
                {...register('excerpt')}
                placeholder="Brief summary that shows on the blog listing cards..."
                className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white text-sm focus:outline-none focus:border-amber-500"
              />
              {errors.excerpt && (
                <p className="text-xs text-red-600">{errors.excerpt.message}</p>
              )}
            </div>
          </div>

          {/* TipTap Rich Content Editor */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">
              Article Content (Rich Text)
            </label>
            <RichTextEditor
              content={editorHtml}
              onChange={setEditorHtml}
              placeholder="Write the full post here..."
            />
          </div>

          {/* SEO Meta Box */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
              Search Engine Optimization (SEO)
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Meta Title</label>
              <input
                type="text"
                {...register('seoTitle')}
                placeholder="Custom title tag for Google search results"
                className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-[#FBF7EE]/30 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Meta Description</label>
              <textarea
                rows={2}
                {...register('seoDescription')}
                placeholder="Search engine preview snippet..."
                className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-[#FBF7EE]/30 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Options (1 col) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
              Publishing Info
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Status</label>
              <select
                {...register('status')}
                className="w-full px-4 py-2.5 rounded-xl border border-borderCream bg-white text-xs font-semibold focus:outline-none focus:border-amber-500"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="postFeatured"
                {...register('featured')}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-borderCream"
              />
              <label htmlFor="postFeatured" className="text-xs font-bold text-ink cursor-pointer">
                Feature as Hero Card on Blog Page
              </label>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-ink">Author Byline</label>
              <input
                type="text"
                {...register('author')}
                placeholder="TenzoAds Team"
                className="w-full px-4 py-2 rounded-xl border border-borderCream bg-[#FBF7EE]/30 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Estimated Read Time</label>
              <input
                type="text"
                {...register('readTime')}
                placeholder="7 min read"
                className="w-full px-4 py-2 rounded-xl border border-borderCream bg-[#FBF7EE]/30 text-xs"
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-4">
            <ImageUpload
              label="Cover Image (16:9)"
              value={coverImageValue}
              onChange={(url) => setValue('coverImage', url)}
              helperText="Shows on article preview and banner"
            />
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">
                Article Tags
              </label>
              <button
                type="button"
                onClick={() => setTagsList([...tagsList, ''])}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Tag
              </button>
            </div>
            <div className="space-y-2">
              {tagsList.map((t, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={t}
                    onChange={(e) => {
                      const copy = [...tagsList];
                      copy[idx] = e.target.value;
                      setTagsList(copy);
                    }}
                    placeholder="e.g. Flutter"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-borderCream bg-white"
                  />
                  {tagsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setTagsList(tagsList.filter((_, i) => i !== idx))}
                      className="p-1.5 text-muted hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
