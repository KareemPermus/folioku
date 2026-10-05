import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import apiClient from '@/api/client';
import { HeroContent } from '@/types';
import HeroBanner from '@/components/HeroBanner';
import CTAButtons from '@/components/CTAButtons';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function HeroSection() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    headline: '',
    subheadline: '',
    ctaText: '',
    ctaLink: '',
    backgroundImageUrl: '',
  });

  const fetchHero = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/api/hero');
      const data: HeroContent = res.data;
      setHero(data);
      setForm({
        headline: data.headline || '',
        subheadline: data.subheadline || '',
        ctaText: data.ctaText || '',
        ctaLink: data.ctaLink || '',
        backgroundImageUrl: data.backgroundImageUrl || '',
      });
    } catch {
      setError('Failed to load hero content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await apiClient.put('/api/hero', {
        headline: form.headline,
        subheadline: form.subheadline || undefined,
        ctaText: form.ctaText || undefined,
        ctaLink: form.ctaLink || undefined,
        backgroundImageUrl: form.backgroundImageUrl || undefined,
      });
      setHero(res.data);
      setSuccess('Hero content saved successfully.');
    } catch {
      setError('Failed to save hero content.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error && !hero) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Hero Section Editor | Folioku</title>
      </Head>

      <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hero Section Editor</h2>
            <p className="text-slate-500 text-sm mt-1">Customize the first impression visitors see on your portfolio.</p>
          </div>
          <CTAButtons saving={saving} onSave={handleSave} />
        </div>

        {/* Feedback */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl p-3">{success}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-6 border-b border-slate-200/80">
              <h3 className="text-lg font-bold text-slate-900">Content Fields</h3>
              <p className="text-slate-500 text-xs mt-0.5">Edit your hero section content below.</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Headline *</label>
                <input
                  type="text"
                  value={form.headline}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                  placeholder="Enter your headline"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subheadline</label>
                <textarea
                  value={form.subheadline}
                  onChange={(e) => handleChange('subheadline', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all resize-none"
                  placeholder="A short description about yourself"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CTA Button Text</label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => handleChange('ctaText', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                    placeholder="e.g. View Work"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CTA Link URL</label>
                  <input
                    type="text"
                    value={form.ctaLink}
                    onChange={(e) => handleChange('ctaLink', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                    placeholder="e.g. /projects"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Background Image URL</label>
                <input
                  type="text"
                  value={form.backgroundImageUrl}
                  onChange={(e) => handleChange('backgroundImageUrl', e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Live Preview
              </h3>
              <span className="text-[10px] text-slate-400">Updates as you type</span>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
                <HeroBanner
                  headline={form.headline}
                  subheadline={form.subheadline}
                  ctaText={form.ctaText}
                  ctaLink={form.ctaLink}
                  backgroundImageUrl={form.backgroundImageUrl}
                />
              </div>
            </div>

            {/* API Info Card */}
            <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <h4 className="text-sm font-bold text-slate-900">API Endpoint</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">This content is served via the REST API.</p>
              <div className="mt-3 bg-slate-900 rounded-lg p-3">
                <code className="text-[10px] text-indigo-300 block">PUT /api/hero</code>
                <code className="text-[10px] text-slate-400 block mt-1">Content-Type: application/json</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}