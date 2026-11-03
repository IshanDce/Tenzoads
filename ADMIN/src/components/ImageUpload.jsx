import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, X, Link, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api, { formatImageUrl } from '../lib/api';

export const ImageUpload = ({
  value = '',
  onChange,
  label = 'Image',
  helperText = 'Upload JPG, PNG, WEBP, or SVG (max 5MB)',
}) => {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImgError(false);
  }, [value]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setImgError(false);
    try {
      const res = await api.post('/admin/media', formData);
      if (res.data?.success && res.data.data?.url) {
        onChange(res.data.data.url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error uploading image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleManualUrlSubmit = (e) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setManualUrl('');
      setShowUrlInput(false);
      setImgError(false);
    }
  };

  const formattedUrl = formatImageUrl(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 transition-colors"
        >
          <Link className="w-3.5 h-3.5" />
          {showUrlInput ? 'Upload file instead' : 'Enter URL instead'}
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://example.com/image.png"
            className="flex-1 px-3 py-2 text-sm rounded-xl border border-borderCream bg-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="button"
            onClick={handleManualUrlSubmit}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-ink text-sm font-semibold rounded-xl"
          >
            Apply
          </button>
        </div>
      ) : value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-borderCream bg-[#FBF7EE] h-60 w-full flex items-center justify-center p-3 select-none">
          {imgError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-400">
              <ImageIcon className="w-8 h-8 mb-2 text-neutral-300" />
              <p className="text-xs font-semibold text-neutral-600">Image preview unavailable</p>
              <p className="text-[10px] text-neutral-400 break-all max-w-xs mt-1">{value}</p>
            </div>
          ) : (
            <>
              {/* Soft ambient blur backdrop */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-md scale-105 pointer-events-none"
                style={{ backgroundImage: `url(${formattedUrl})` }}
              />
              <img
                src={formattedUrl}
                alt="Preview"
                className="relative z-10 max-h-52 max-w-full w-auto h-auto object-contain rounded-lg drop-shadow-sm"
                onError={() => setImgError(true)}
              />
            </>
          )}

          <div className="absolute inset-0 z-20 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white text-ink rounded-xl shadow-md hover:bg-amber-400 transition-colors text-xs font-semibold flex items-center gap-1"
            >
              <UploadCloud className="w-4 h-4" /> Replace
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setImgError(false);
              }}
              className="p-2 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition-colors text-xs font-semibold flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-borderCream hover:border-amber-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white/60 hover:bg-amber-50/20 group"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-amber-600 py-4">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-xs font-semibold">Uploading to ImageKit...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-ink">
                Click to upload <span className="font-normal text-muted">or drag & drop</span>
              </p>
              <p className="text-xs text-muted">{helperText}</p>
            </div>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
