import React, { useState, useEffect } from 'react';
import { Language } from './types/movie';
import { MOVIE_INFO } from './data/movieData';
import { TopNav } from './components/TopNav';
import { HeroBanner } from './components/HeroBanner';
import { SceneViewer } from './components/SceneViewer';
import { ScreenplayTab } from './components/ScreenplayTab';
import { CharacterDossier } from './components/CharacterDossier';
import { DirectorStudio } from './components/DirectorStudio';
import { CinemaModal } from './components/CinemaModal';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'scenes' | 'screenplay' | 'characters' | 'studio'>('scenes');
  // Default to Urdu since user's brief is in Urdu
  const [language, setLanguage] = useState<Language>('ur');
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [cinemaSceneIndex, setCinemaSceneIndex] = useState(0);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ur' ? 'en' : 'ur'));
  };

  const toggleAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    audioEngine.setMuted(nextMuted);
  };

  const handleOpenCinema = (sceneIndex: number = 0) => {
    setCinemaSceneIndex(sceneIndex);
    setIsCinemaOpen(true);
  };

  return (
    <div
      className={`min-h-screen bg-neutral-950 text-neutral-100 flex flex-col ${
        language === 'ur' ? 'dir-rtl' : 'dir-ltr'
      }`}
      dir={language === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Top Bar with 3-Zone Contract */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onToggleLanguage={toggleLanguage}
        isAudioMuted={isAudioMuted}
        onToggleAudio={toggleAudio}
        onOpenCinema={() => handleOpenCinema(0)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          language={language}
          onExploreScenes={() => setCurrentTab('scenes')}
          onOpenCinema={() => handleOpenCinema(0)}
        />

        {/* Tab Navigation Segmented Bar */}
        <div className="border-b border-neutral-800 bg-neutral-950/70 sticky top-[57px] z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between overflow-x-auto gap-4">
            <div className="flex items-center gap-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
              <button
                onClick={() => setCurrentTab('scenes')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  currentTab === 'scenes'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {language === 'ur' ? '🎬 فلم کے 4 مناظر' : '🎬 4 Story Scenes'}
              </button>

              <button
                onClick={() => setCurrentTab('screenplay')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  currentTab === 'screenplay'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {language === 'ur' ? '📜 اسکرین پلے اسکرپٹ' : '📜 Film Screenplay'}
              </button>

              <button
                onClick={() => setCurrentTab('characters')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  currentTab === 'characters'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {language === 'ur' ? '⚔️ نواب و دیگر کردار' : '⚔️ Character Dossier'}
              </button>

              <button
                onClick={() => setCurrentTab('studio')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  currentTab === 'studio'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {language === 'ur' ? '✨ اے آئی اسٹوڈیو و ٹریلر' : '✨ AI Director Studio'}
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-amber-400 font-medium">
                {language === 'ur' ? 'ہالی ووڈ پروڈکشن' : 'Hollywood Production'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{language === 'ur' ? '4 کے کوالٹی' : '4K Visuals'}</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'ur' ? 'صوتی بیانیہ' : 'Atmospheric Audio'}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Content Views */}
        {currentTab === 'scenes' && (
          <SceneViewer
            language={language}
            onOpenCinemaWithScene={handleOpenCinema}
          />
        )}

        {currentTab === 'screenplay' && <ScreenplayTab language={language} />}

        {currentTab === 'characters' && <CharacterDossier language={language} />}

        {currentTab === 'studio' && <DirectorStudio language={language} />}
      </main>

      {/* Fullscreen Cinema Modal */}
      <CinemaModal
        isOpen={isCinemaOpen}
        onClose={() => setIsCinemaOpen(false)}
        language={language}
        initialSceneIndex={cinemaSceneIndex}
      />

      {/* Editorial Footer (Strict anti-slop: no fake tickers or telemetry) */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-10 px-4 md:px-8 mt-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="font-bold text-white tracking-wider">
              {language === 'ur' ? 'دی ڈریگن گارڈین' : 'THE DRAGON GUARDIAN'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{language === 'ur' ? 'نواب کی کہانی' : 'A Nawab Story Production'}</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>{language === 'ur' ? 'جملہ حقوق محفوظ ہیں' : 'All Rights Reserved'}</span>
            <span aria-hidden="true">·</span>
            <span>{MOVIE_INFO.runtime}</span>
            <span aria-hidden="true">·</span>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
