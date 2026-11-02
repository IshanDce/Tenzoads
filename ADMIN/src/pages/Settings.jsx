import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  Settings as SettingsIcon,
  Save,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const Settings = () => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      siteName: 'TenzoAds',
      tagline: '',
      topBarPhone: '+91 00000 00000',
      topBarEmail: 'hello@yourdomain.com',
      workingHours: 'Mon - Fri: 9:00 - 18:00 (Time zone)',
      footerDescription: '',
      googleMapsEmbedUrl: '',
      indiaOffice: {
        title: 'India Office',
        address: '[Street address]',
        city: '[City]',
        country: 'India',
        phone: '',
        email: '',
      },
      usaOffice: {
        title: 'USA Office',
        address: '[Street address]',
        city: '[City]',
        country: 'United States',
        phone: '',
        email: '',
      },
      socialLinks: {
        linkedin: '',
        twitter: '',
        instagram: '',
        facebook: '',
        github: '',
      },
      seoDefaults: {
        title: 'TenzoAds - Mobile Apps, Websites & AI Products',
        description: 'We build high-performance mobile apps, web applications and AI products.',
        ogImage: '',
      },
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const res = await api.get('/admin/settings');
      return res.data?.data;
    },
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      return api.put('/admin/settings', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-settings']);
      toast.success('Site settings saved successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save settings');
    },
  });

  const onSubmit = (formData) => {
    saveMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-borderCream pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-2">
            <SettingsIcon className="w-7 h-7 text-amber-500" />
            Global Site Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Configure contact details, office locations, social profiles, and SEO defaults.
          </p>
        </div>

        <button
          type="submit"
          disabled={saveMutation.isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-xs shadow-soft transition-all disabled:opacity-60"
        >
          {saveMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Settings
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-muted">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-500 mb-2" />
          Loading settings...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section 1: Contact Details & Top Bar */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600" /> Top Bar & Header Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink">Top Bar Phone Number</label>
                <input
                  type="text"
                  {...register('topBarPhone')}
                  placeholder="+91 00000 00000"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink">Top Bar Email</label>
                <input
                  type="email"
                  {...register('topBarEmail')}
                  placeholder="hello@yourdomain.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Working Hours Notice</label>
              <input
                type="text"
                {...register('workingHours')}
                placeholder="Mon - Fri: 9:00 - 18:00 (Time zone)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Section 2: Physical Offices */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" /> Office Locations (Displayed on Contact & Footer)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* India Office */}
              <div className="p-4 bg-[#FBF7EE]/40 rounded-xl border border-borderCream space-y-3">
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Primary / India Office
                </h3>
                <input
                  type="text"
                  {...register('indiaOffice.title')}
                  placeholder="India Office"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-borderCream bg-white font-bold"
                />
                <input
                  type="text"
                  {...register('indiaOffice.address')}
                  placeholder="Street / Building Address"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-borderCream bg-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    {...register('indiaOffice.city')}
                    placeholder="City / Region"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-borderCream bg-white"
                  />
                  <input
                    type="text"
                    {...register('indiaOffice.country')}
                    placeholder="Country"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-borderCream bg-white"
                  />
                </div>
              </div>

              {/* USA Office */}
              <div className="p-4 bg-[#FBF7EE]/40 rounded-xl border border-borderCream space-y-3">
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  International / USA Office
                </h3>
                <input
                  type="text"
                  {...register('usaOffice.title')}
                  placeholder="USA Office"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-borderCream bg-white font-bold"
                />
                <input
                  type="text"
                  {...register('usaOffice.address')}
                  placeholder="Street / Building Address"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-borderCream bg-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    {...register('usaOffice.city')}
                    placeholder="City / Region"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-borderCream bg-white"
                  />
                  <input
                    type="text"
                    {...register('usaOffice.country')}
                    placeholder="Country"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-borderCream bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Google Maps Embed URL</label>
              <input
                type="text"
                {...register('googleMapsEmbedUrl')}
                placeholder="https://www.google.com/maps/embed?..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Section 3: Footer Paragraph */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
              Footer Brand Statement
            </h2>
            <textarea
              rows={3}
              {...register('footerDescription')}
              placeholder="TenzoAds is an IT services company helping startups and growing businesses turn ideas into reliable mobile apps, websites and AI-powered products."
              className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30 focus:bg-white"
            />
          </div>

          {/* Section 4: Social Media Links */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-600" /> Social Media Profiles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="url"
                {...register('socialLinks.linkedin')}
                placeholder="LinkedIn Profile URL"
                className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30"
              />
              <input
                type="url"
                {...register('socialLinks.twitter')}
                placeholder="Twitter / X Profile URL"
                className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30"
              />
              <input
                type="url"
                {...register('socialLinks.instagram')}
                placeholder="Instagram Profile URL"
                className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30"
              />
              <input
                type="url"
                {...register('socialLinks.facebook')}
                placeholder="Facebook Page URL"
                className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30"
              />
            </div>
          </div>

          {/* Section 5: Global SEO Defaults */}
          <div className="bg-white p-6 rounded-2xl border border-borderCream shadow-soft space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-600" /> Default SEO Meta Tags
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Default Page Title</label>
              <input
                type="text"
                {...register('seoDefaults.title')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink">Default Description</label>
              <textarea
                rows={2}
                {...register('seoDefaults.description')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-borderCream bg-[#FBF7EE]/30"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-bold text-sm shadow-soft transition-all disabled:opacity-60"
            >
              {saveMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save All Settings
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Settings;

