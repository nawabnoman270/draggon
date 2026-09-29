import React from 'react';
import { Language } from '../types/movie';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface TopNavProps {
  currentTab: 'scenes' | 'screenplay' | 'characters' | 'studio';
  onSelectTab: (tab: 'scenes' | 'screenplay' | 'characters' | 'studio') => void;
  language: Language;
  onToggleLanguage: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenCinema: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  isAudioMuted,
  onToggleAudio,
  onOpenCinema,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('scenes');
            }}
            className="group flex items-center gap-2.5 text-lg md:text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8] group-hover:scale-125 transition-transform" />
            <span className={language === 'ur' ? 'font-urdu text-xl text-amber-300' : 'font-cinzel tracking-wider'}>
              {language === 'ur' ? 'دی ڈریگن گارڈین' : 'THE DRAGON GUARDIAN'}
            </span>
          </a>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onSelectTab('scenes')}
            className={`transition-colors hover:text-white py-1 ${
              currentTab === 'scenes'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'text-neutral-400'
            }`}
          >
            {language === 'ur' ? 'مناظر و اسٹوری بورڈ' : 'Story Scenes'}
          </button>
          <button
            onClick={() => onSelectTab('screenplay')}
            className={`transition-colors hover:text-white py-1 ${
              currentTab === 'screenplay'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'text-neutral-400'
            }`}
          >
            {language === 'ur' ? 'اسکرین پلے اسکرپٹ' : 'Screenplay'}
          </button>
          <button
            onClick={() => onSelectTab('characters')}
            className={`transition-colors hover:text-white py-1 ${
              currentTab === 'characters'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'text-neutral-400'
            }`}
          >
            {language === 'ur' ? 'کردار و تعارف' : 'Characters'}
          </button>
          <button
            onClick={() => onSelectTab('studio')}
            className={`transition-colors hover:text-white py-1 ${
              currentTab === 'studio'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'text-neutral-400'
            }`}
          >
            {language === 'ur' ? 'ڈائریکٹر اسٹوڈیو' : 'Director Studio'}
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Audio atmosphere toggle */}
          <button
            onClick={onToggleAudio}
            title={isAudioMuted ? 'Turn Sound ON' : 'Mute Atmospheric Audio'}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors"
            aria-label="Toggle soundscape"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" />}
          </button>

          {/* Bilingual Language Selector */}
          <button
            onClick={onToggleLanguage}
            className="px-3 py-1.5 text-xs font-semibold bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-amber-400 hover:border-neutral-700 rounded-lg transition-colors whitespace-nowrap"
          >
            {language === 'ur' ? 'English (EN)' : 'اردو (Urdu)'}
          </button>

          {/* Launch Fullscreen Cinema Mode */}
          <button
            onClick={onOpenCinema}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] whitespace-nowrap cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'ur' ? 'سینما شو' : 'Play Cinema'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
