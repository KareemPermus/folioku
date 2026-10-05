import AnimatedBackground from './AnimatedBackground';

interface HeroBannerProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImageUrl?: string;
}

export default function HeroBanner({ headline, subheadline, ctaText, ctaLink, backgroundImageUrl }: HeroBannerProps) {
  return (
    <div className="relative min-h-[320px] flex flex-col items-center justify-center text-center p-8 bg-slate-900 overflow-hidden">
      <AnimatedBackground />
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div className="relative z-10 space-y-4 max-w-lg">
        <div className="h-1.5 w-12 bg-indigo-500 rounded-full mx-auto" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {headline || 'Your Headline Here'}
        </h1>
        {subheadline && (
          <p className="text-sm text-slate-300 leading-relaxed italic">{subheadline}</p>
        )}
        {ctaText && (
          <a
            href={ctaLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm shadow-indigo-400/30 transition-all"
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
}