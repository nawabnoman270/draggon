import React, { useState, useEffect } from 'react';
import { Scene, Language } from '../types/movie';
import { MOVIE_SCENES } from '../data/movieData';
import { Volume2, VolumeX, Mic, Square, ChevronRight, ChevronLeft, Film, Eye, Sparkles, MessageSquare } from 'lucide-react';
import { audioEngine, speakNarrative, stopSpeaking } from '../utils/audioEngine';

interface SceneViewerProps {
  language: Language;
  onOpenCinemaWithScene?: (sceneIndex: number) => void;
}

export const SceneViewer: React.FC<SceneViewerProps> = ({
  language,
  onOpenCinemaWithScene,
}) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [activeSoundPreset, setActiveSoundPreset] = useState<string | null>(null);

  const scene = MOVIE_SCENES[selectedSceneIndex];

  // When changing scene, play its ambient soundscape automatically if not muted
  useEffect(() => {
    stopSpeaking();
    setIsNarrating(false);
    audioEngine.playPreset(scene.soundPreset);
    setActiveSoundPreset(scene.soundPreset);
  }, [selectedSceneIndex]);

  const handleNext = () => {
    setSelectedSceneIndex((prev) => (prev + 1) % MOVIE_SCENES.length);
  };

  const handlePrev = () => {
    setSelectedSceneIndex((prev) => (prev - 1 + MOVIE_SCENES.length) % MOVIE_SCENES.length);
  };

  const toggleNarration = () => {
    if (isNarrating) {
      stopSpeaking();
      setIsNarrating(false);
    } else {
      const text = language === 'ur' ? scene.narrativeUr : scene.narrativeEn;
      setIsNarrating(true);
      speakNarrative(
        text,
        language,
        () => setIsNarrating(false),
        () => setIsNarrating(false)
      );
    }
  };

  const toggleSoundscape = () => {
    if (audioEngine.getIsMuted()) {
      audioEngine.setMuted(false);
      audioEngine.playPreset(scene.soundPreset);
      setActiveSoundPreset(scene.soundPreset);
    } else {
      audioEngine.setMuted(true);
      setActiveSoundPreset(null);
    }
  };

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <span>{language === 'ur' ? 'مکمل چار مناظر' : 'Cinematic Storyboard'}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">
              {language === 'ur'
                ? `منظر ${scene.id} از 4`
                : `Scene ${scene.id} of ${MOVIE_SCENES.length}`}
            </span>
          </div>
          <h2
            className={`text-2xl md:text-4xl font-bold text-white tracking-tight ${
              language === 'ur' ? 'font-urdu' : 'font-cinzel'
            }`}
          >
            {language === 'ur' ? scene.titleUr : scene.titleEn}
          </h2>
        </div>

        {/* Scene Switcher Segmented Control */}
        <div className="flex items-center gap-2 bg-neutral-900/90 p-1.5 rounded-xl border border-neutral-800 shrink-0">
          {MOVIE_SCENES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSelectedSceneIndex(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedSceneIndex === idx
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              {language === 'ur' ? `منظر ${s.id}` : `Scene ${s.id}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scene Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Artwork Frame & Atmosphere Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl">
            {/* Visual Frame */}
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
              <img
                src={scene.image}
                alt={scene.titleEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

              {/* Badges on image overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-mono font-medium px-2.5 py-1 bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-amber-300 rounded-md">
                  {scene.locationEn}
                </span>

                <button
                  onClick={() => onOpenCinemaWithScene && onOpenCinemaWithScene(selectedSceneIndex)}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-neutral-950/80 hover:bg-amber-500 hover:text-neutral-950 backdrop-blur-md border border-neutral-700/80 text-white rounded-md transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'فل اسکرین' : 'Fullscreen'}</span>
                </button>
              </div>

              {/* Bottom bar inside image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                <span className="font-medium text-amber-400">
                  {scene.timeOfDay}
                </span>
                <span className="text-neutral-400">
                  {scene.soundPreset === 'forest' && (language === 'ur' ? 'صوتی ماحول: بارش اور کہرا' : 'Audio: Rain & Mystic Forest')}
                  {scene.soundPreset === 'palace' && (language === 'ur' ? 'صوتی ماحول: شاہی سرود و نغمے' : 'Audio: Palace Chimes & Harp')}
                  {scene.soundPreset === 'exile' && (language === 'ur' ? 'صوتی ماحول: الاؤ اور تنہا ہوائیں' : 'Audio: Campfire & Lonely Wind')}
                  {scene.soundPreset === 'battle' && (language === 'ur' ? 'صوتی ماحول: جنگی نقارے و بجلی' : 'Audio: War Drums & Thunder')}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Playback & Soundscape Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-neutral-900/60 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2">
              {/* Voice Narration Button */}
              <button
                onClick={toggleNarration}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isNarrating
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                }`}
              >
                {isNarrating ? <Square className="w-3.5 h-3.5 fill-current" /> : <Mic className="w-3.5 h-3.5" />}
                <span>
                  {isNarrating
                    ? (language === 'ur' ? 'آواز بند کریں' : 'Stop Narration')
                    : (language === 'ur' ? 'کہانی سنیں (صوتی بیان)' : 'Read Aloud')}
                </span>
              </button>

              {/* Ambient Soundscape Toggle */}
              <button
                onClick={toggleSoundscape}
                className="flex items-center gap-2 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium border border-neutral-700 transition-colors cursor-pointer"
              >
                {activeSoundPreset ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                    <span>{language === 'ur' ? 'ماحول خاموش کریں' : 'Mute Ambient'}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{language === 'ur' ? 'صوتی ماحول چلائیں' : 'Play Ambient'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 transition-colors cursor-pointer"
                title="Previous Scene"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-neutral-400 px-1 font-mono">
                {selectedSceneIndex + 1} / {MOVIE_SCENES.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 transition-colors cursor-pointer"
                title="Next Scene"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Prose, Dialogues, and Director Technical Notes (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Narrative Story Card */}
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {language === 'ur' ? 'کہانی کا متن و بیانیہ' : 'Official Film Narrative'}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                {language === 'ur' ? 'اردو اوریجنل' : 'English Translation'}
              </span>
            </div>

            {/* Narrative Paragraph */}
            {language === 'ur' ? (
              <p className="font-urdu text-xl text-neutral-100 text-right leading-[2.2] antialiased">
                {scene.narrativeUr}
              </p>
            ) : (
              <p className="text-neutral-200 text-sm md:text-base leading-relaxed font-light">
                {scene.narrativeEn}
              </p>
            )}

            {/* Toggle show opposite translation */}
            <div className="pt-3 border-t border-neutral-800/60">
              <details className="group">
                <summary className="text-xs text-neutral-400 hover:text-amber-400 cursor-pointer font-medium list-none flex items-center justify-between">
                  <span>
                    {language === 'ur'
                      ? 'انگریزی ترجمہ دیکھیں (View English Script)'
                      : 'اردو اصل متن دیکھیں (View Original Urdu Text)'}
                  </span>
                  <span className="text-neutral-500 group-open:rotate-90 transition-transform">›</span>
                </summary>
                <div className="mt-3 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
                  {language === 'ur' ? (
                    <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                      {scene.narrativeEn}
                    </p>
                  ) : (
                    <p className="font-urdu text-lg text-amber-100/90 text-right leading-[2.1]">
                      {scene.narrativeUr}
                    </p>
                  )}
                </div>
              </details>
            </div>
          </div>

          {/* Key Dialogue Excerpt */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider pb-2 border-b border-neutral-800/70">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'منظر کے اہم مکالمے' : 'Key Scene Dialogue'}</span>
            </div>

            <div className="space-y-3 pt-1">
              {(language === 'ur' ? scene.keyDialogueUr : scene.keyDialogueEn).map((d, dIdx) => (
                <div
                  key={dIdx}
                  className={`text-xs p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60 ${
                    language === 'ur' ? 'text-right font-urdu' : 'text-left'
                  }`}
                >
                  <div className="font-bold text-amber-400 tracking-wide text-xs">
                    {d.speaker}
                  </div>
                  {d.parenthetical && (
                    <div className="text-neutral-400 italic text-[11px] my-0.5">
                      ({d.parenthetical})
                    </div>
                  )}
                  <div className="text-neutral-200 mt-1 font-medium">
                    "{d.line}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Director's Technical Specifications */}
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider pb-2 border-b border-neutral-800/70">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ur' ? 'ہدایت کار کے تکنیکی نوٹس' : "Director's Cinematography Notes"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800">
                <span className="text-neutral-400 font-semibold block mb-1">
                  {language === 'ur' ? 'کیمرا اینگل' : 'Camera Angle'}
                </span>
                <span className="text-neutral-300 font-mono text-[11px]">
                  {scene.directorNotes.camera}
                </span>
              </div>

              <div className="p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800">
                <span className="text-neutral-400 font-semibold block mb-1">
                  {language === 'ur' ? 'لائٹنگ و موڈ' : 'Lighting Tone'}
                </span>
                <span className="text-neutral-300 font-mono text-[11px]">
                  {scene.directorNotes.lighting}
                </span>
              </div>

              <div className="p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800">
                <span className="text-neutral-400 font-semibold block mb-1">
                  {language === 'ur' ? 'وی ایف ایکس' : 'VFX & Dynamics'}
                </span>
                <span className="text-neutral-300 font-mono text-[11px]">
                  {scene.directorNotes.vfx}
                </span>
              </div>

              <div className="p-2.5 bg-neutral-950/60 rounded-lg border border-neutral-800">
                <span className="text-neutral-400 font-semibold block mb-1">
                  {language === 'ur' ? 'صوتی ڈیزائن' : 'Sound Design'}
                </span>
                <span className="text-neutral-300 font-mono text-[11px]">
                  {scene.directorNotes.soundDesign}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
