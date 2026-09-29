import React from 'react';
import { MOVIE_INFO } from '../data/movieData';
import { Language } from '../types/movie';
import { Play, Zap, Compass, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface HeroBannerProps {
  language: Language;
  onExploreScenes: () => void;
  onOpenCinema: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  onExploreScenes,
  onOpenCinema,
}) => {
  const triggerLightning = () => {
    audioEngine.playLightningSFX();
  };

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-800">
      {/* Visual Container */}
      <div className="relative h-[480px] md:h-[580px] lg:h-[640px] w-full">
        <img
          src={MOVIE_INFO.heroPoster}
          alt={MOVIE_INFO.titleEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] transition-transform duration-1000 scale-100"
        />

        {/* Ambient Gradient Scrims ensuring WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent" />

        {/* Atmospheric lightning glow effect */}
        <div className="absolute inset-0 pointer-events-none bg-sky-500/5 mix-blend-overlay animate-lightning" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 md:px-8 pb-10 md:pb-16">
          <div className="max-w-3xl space-y-4">
            {/* Metadata Line (NO PILLS: clean text with typographic separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-neutral-400">
              <span className="text-amber-400 font-semibold uppercase tracking-wider">
                {language === 'ur' ? 'ہالی ووڈ فینٹسی سینما' : 'Hollywood Fantasy Cinema'}
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{language === 'ur' ? 'مرکزی کردار: نواب (ڈریگن گارڈین)' : 'Starring: Nawab (Dragon Guardian)'}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{MOVIE_INFO.runtime}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{MOVIE_INFO.aspectRatio}</span>
            </div>

            {/* Movie Title */}
            {language === 'ur' ? (
              <h1 className="font-urdu text-4xl md:text-6xl lg:text-7xl font-bold text-amber-200 leading-[1.6] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
                {MOVIE_INFO.titleUr}
              </h1>
            ) : (
              <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-wider leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                {MOVIE_INFO.titleEn}
              </h1>
            )}

            {/* Tagline */}
            <p className={`text-base md:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed drop-shadow-md ${language === 'ur' ? 'font-urdu text-lg' : ''}`}>
              {language === 'ur' ? MOVIE_INFO.taglineUr : MOVIE_INFO.taglineEn}
            </p>

            {/* Hero CTA Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenCinema}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-semibold text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{language === 'ur' ? 'مکمل مووی ٹریلر دیکھیں' : 'Launch Cinema Premiere'}</span>
              </button>

              <button
                onClick={onExploreScenes}
                className="flex items-center gap-2 px-5 py-3 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-200 font-medium text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-sky-400" />
                <span>{language === 'ur' ? '4 مناظر کی کہانی پڑھیں' : 'Explore 4-Scene Epic'}</span>
              </button>

              <button
                onClick={triggerLightning}
                className="flex items-center gap-2 px-4 py-3 bg-sky-950/70 hover:bg-sky-900/80 border border-sky-800/80 text-sky-300 text-xs font-semibold rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                title="Hear crackle of the Thunderstrike Blade"
              >
                <Zap className="w-4 h-4 text-sky-400 animate-bounce" />
                <span>{language === 'ur' ? 'بجلی کی تلوار کی جھنکار' : 'Unsheathe Lightning Blade'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
