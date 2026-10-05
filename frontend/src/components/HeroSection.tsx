import { HeroContent } from '@/types';
import Link from 'next/link';

interface Props {
  hero: HeroContent;
}

export default function HeroSection({ hero }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main content card */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Hero Section Content</h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Control the first impression of your website.
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Data Snapshot */}
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Main Headline
                </label>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  {hero.headline}
                </p>
              </div>
              {hero.subheadline && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Subheadline
                  </label>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    {hero.subheadline}
                  </p>
                </div>
              )}
              <div className="flex gap-4">
                {hero.ctaText && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      CTA Text
                    </label>
                    <p className="text-xs font-semibold text-slate-800">{hero.ctaText}</p>
                  </div>
                )}
                {hero.ctaLink && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      CTA Link
                    </label>
                    <p className="text-xs font-semibold text-slate-800 truncate max-w-[160px]">
                      {hero.ctaLink}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Mini Preview */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
              <div className="relative bg-white border border-slate-200/80 rounded-xl aspect-[16/10] overflow-hidden flex flex-col items-center justify-center text-center p-4">
                {hero.backgroundImageUrl && (
                  <div
                    className="w-full h-full absolute inset-0 opacity-10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${hero.backgroundImageUrl})` }}
                  />
                )}
                <div className="relative z-10 space-y-2">
                  <div className="h-1.5 w-12 bg-indigo-600 rounded-full mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-slate-700 max-w-[180px] truncate">
                    {hero.headline}
                  </p>
                  {hero.subheadline && (
                    <p className="text-[8px] text-slate-400 max-w-[150px] truncate">
                      {hero.subheadline}
                    </p>
                  )}
                  {hero.ctaText && (
                    <div className="h-5 px-3 bg-indigo-600 rounded-md mx-auto mt-3 flex items-center justify-center">
                      <span className="text-[8px] text-white font-medium">{hero.ctaText}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar info */}
      <div className="space-y-8">
        {/* API Info */}
        <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h4 className="text-sm font-bold text-slate-900">Developer API</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Access your hero content via REST endpoints.
          </p>
          <div className="mt-4 bg-slate-900 rounded-lg p-3">
            <code className="text-[10px] text-indigo-300 block">GET /api/hero</code>
            <code className="text-[10px] text-slate-400 block mt-1">200 OK</code>
          </div>
        </div>

        {/* Status card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Content Status</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50 border border-green-100">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-green-800 font-medium">Hero section configured</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50 border border-green-100">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-green-800 font-medium">
                {hero.ctaText ? 'CTA button active' : 'Headline set'}
              </span>
            </div>
            {!hero.backgroundImageUrl && (
              <div className="flex items-center gap-3 p-2 rounded-lg bg-orange-50 border border-orange-100">
                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
                </svg>
                <span className="text-xs text-orange-800 font-medium">Add background image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}