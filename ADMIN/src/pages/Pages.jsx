import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookOpen, Save, Loader2, Sparkles, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const Pages = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({});

  const tabs = [
    { key: 'home', label: 'Homepage Hero & Headings' },
    { key: 'about', label: 'About Us Page Copy' },
    { key: 'portfolio', label: 'Portfolio Page Banner' },
    { key: 'blogs', label: 'Blog Listing Banner' },
    { key: 'contact', label: 'Contact & Free Quote' },
    { key: 'cta', label: 'Global CTA Band' },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['admin-page-content', activeTab],
    queryFn: async () => {
      const res = await api.get(`/admin/page-content/${activeTab}`);
      return res.data?.data || {};
    },
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      return api.put(`/admin/page-content/${activeTab}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-page-content', activeTab]);
      toast.success(`${tabs.find((t) => t.key === activeTab)?.label} saved`);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save page copy');
    },
  });

  const handleFieldChange = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleNestedChange = (parentKey, childKey, val) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...(prev[parentKey] || {}),
        [childKey]: val,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const renderField = (key, label, type = 'text') => {
    const val = formData[key] ?? '';
    return (
      <div key={key} className="space-y-1.5">
        <label className="text-xs font-bold text-slate-900">{label}</label>
        {type === 'textarea' ? (
          <textarea
            rows={3}
            value={val}
            onChange={(e) => handleFieldChange(key, e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={(e) => handleFieldChange(key, e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 focus:bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            Page Copy & Headlines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit text content across every section of the public website.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saveMutation.isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-xs shadow-soft transition-all disabled:opacity-60"
        >
          {saveMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/80 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
          Loading content...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'home' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Homepage Hero Section
              </h2>
              {renderField('heroEyebrow', 'Eyebrow Chip')}
              {renderField('heroTitle', 'Main H1 Heading')}
              {renderField('heroDescription', 'Hero Paragraph', 'textarea')}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField('buttonStart', 'Primary Button Label')}
                {renderField('buttonWork', 'Secondary Button Label')}
              </div>

              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 pt-4 border-t border-slate-200/80">
                Section Sub-Headlines
              </h2>
              {renderField('techTitle', 'Technologies Marquee Title')}
              {renderField('servicesTitle', 'Services Section Title')}
              {renderField('servicesSubtitle', 'Services Subtitle')}
              {renderField('whyUsTitle', 'Why TenzoAds Heading')}
              {renderField('whyUsSubtitle', 'Why TenzoAds Paragraph', 'textarea')}
              {renderField('processTitle', 'How We Work Heading')}
              {renderField('projectsTitle', 'Portfolio Section Title')}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                About Hero & Story
              </h2>
              {renderField('heroTitle', 'About H1 Title')}
              {renderField('heroDescription', 'About Hero Paragraph', 'textarea')}
              {renderField('storyHeading', 'Our Story Heading')}
              {renderField('storyParagraph1', 'Our Story Paragraph 1', 'textarea')}
              {renderField('storyParagraph2', 'Our Story Paragraph 2', 'textarea')}

              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 pt-4 border-t border-slate-200/80">
                Mission & Vision Blocks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField('missionTitle', 'Mission Title')}
                {renderField('visionTitle', 'Vision Title')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField('missionText', 'Mission Text', 'textarea')}
                {renderField('visionText', 'Vision Text', 'textarea')}
              </div>

              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 pt-4 border-t border-slate-200/80">
                Section Headings
              </h2>
              {renderField('valuesTitle', 'Our Values Heading')}
              {renderField('expertiseTitle', 'Our Expertise Heading')}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Portfolio Hero Header
              </h2>
              {renderField('heroTitle', 'H1 Heading')}
              {renderField('heroDescription', 'Sub-heading Paragraph', 'textarea')}
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Blog Listing Header
              </h2>
              {renderField('heroTitle', 'H1 Heading')}
              {renderField('heroDescription', 'Sub-heading Paragraph', 'textarea')}
              {renderField('newsletterTitle', 'Newsletter Box Heading')}
              {renderField('newsletterSubtitle', 'Newsletter Box Subtitle')}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Contact & Free Quote Page
              </h2>
              {renderField('heroEyebrow', 'Eyebrow Label')}
              {renderField('heroTitle', 'H1 Heading')}
              {renderField('heroDescription', 'Sub-heading Paragraph', 'textarea')}
              {renderField('formTitle', 'Form Title')}
              {renderField('directTitle', 'Reach Us Directly Title')}
              {renderField('faqTitle', 'FAQ Section Title')}
            </div>
          )}

          {activeTab === 'cta' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Yellow CTA Banner (Shown across Home, About & Portfolio)
              </h2>
              {renderField('eyebrow', 'Eyebrow Tag')}
              {renderField('heading', 'Big Banner Heading')}
              {renderField('text', 'Description Paragraph', 'textarea')}
              {renderField('buttonText', 'Button Label')}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 font-bold text-sm shadow-soft transition-all disabled:opacity-60"
            >
              {saveMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save All Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Pages;

