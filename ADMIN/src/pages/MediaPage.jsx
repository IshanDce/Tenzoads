import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Image as ImageIcon,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';

export const MediaPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-media', page],
    queryFn: async () => {
      const res = await api.get(`/admin/media?page=${page}&limit=24`);
      return res.data;
    },
  });

  const uploadFile = async (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await api.post('/admin/media', formData);
      if (res.data?.success) {
        queryClient.invalidateQueries(['admin-media']);
        toast.success('Media uploaded successfully');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return api.delete(`/admin/media/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-media']);
      toast.success('Media deleted');
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete media'),
  });

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const mediaList = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-2">
            <ImageIcon className="w-7 h-7 text-amber-500" />
            Media Library
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Store and manage uploaded assets, screenshots, and graphics.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-xs shadow-soft transition-all"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          Upload Media
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-borderCream hover:border-amber-500 rounded-3xl p-8 text-center cursor-pointer transition-all bg-white hover:bg-amber-50/20 group shadow-soft"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            {uploading ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : (
              <UploadCloud className="w-7 h-7" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-ink">
              Drop images here, or <span className="text-amber-700 underline">browse</span>
            </p>
            <p className="text-xs text-muted mt-1">
              Supports PNG, JPG, WEBP, and SVG up to 5MB
            </p>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => uploadFile(e.target.files?.[0])}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />

      {/* Media Grid */}
      <div className="bg-white rounded-3xl border border-borderCream p-6 shadow-soft space-y-6">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            Total files: <strong className="text-ink">{total}</strong>
          </span>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-muted">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-500 mb-2" />
            Loading media library...
          </div>
        ) : mediaList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mediaList.map((m) => (
              <div
                key={m._id}
                className="group relative rounded-2xl border border-borderCream overflow-hidden bg-neutral-50 flex flex-col justify-between hover:shadow-soft transition-all"
              >
                {/* Image Box */}
                <div className="h-32 w-full bg-[#FBF7EE] flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={m.url}
                    alt={m.filename}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'><rect fill='%23fbf7ee' width='150' height='150'/><text fill='%23999' font-family='sans-serif' font-size='12' dy='5' font-weight='bold' x='50%' y='50%' text-anchor='middle'>Image Preview</text></svg>";
                    }}
                  />
                </div>

                {/* Metadata */}
                <div className="p-2.5 bg-white border-t border-borderCream">
                  <p className="text-[11px] font-bold text-ink truncate" title={m.filename}>
                    {m.filename}
                  </p>
                  <p className="text-[10px] text-muted">{formatSize(m.size)}</p>

                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-borderCream">
                    <button
                      onClick={() => handleCopyUrl(m.url, m._id)}
                      className="text-[10px] font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                      title="Copy URL"
                    >
                      {copiedId === m._id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(m)}
                      className="text-muted hover:text-red-600 p-0.5"
                      title="Delete File"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted">No media files uploaded yet.</div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={total}
        />
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
        loading={deleteMutation.isPending}
        title="Delete Media"
        message={`Are you sure you want to permanently delete "${deleteTarget?.filename}"?`}
        confirmText="Delete File"
      />
    </div>
  );
};

export default MediaPage;

