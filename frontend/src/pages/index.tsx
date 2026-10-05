import { useEffect, useState } from 'react';
import apiClient from '@/api/client';
import { HeroContent } from '@/types';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/api/hero')
      .then((res) => setHero(res.data))
      .catch((err) => setError(err?.message || 'Failed to load hero content'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center">
          <p className="text-sm text-rose-700 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <section className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Portfolio Overview
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage and preview your portfolio hero content.
          </p>
        </div>
      </section>

      {/* Hero Section Preview */}
      {hero && <HeroSection hero={hero} />}
    </div>
  );
}