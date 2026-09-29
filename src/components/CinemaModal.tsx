import React, { useState, useEffect } from 'react';
import { MOVIE_SCENES, MOVIE_INFO } from '../data/movieData';
import { Language } from '../types/movie';
import { X, Play, Pause, ChevronRight, ChevronLeft, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface CinemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialSceneIndex?: number;
}

export const CinemaModal: React.FC<CinemaModalProps> = ({
  isOpen,
  onClose,
  language,
  initialSceneIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSceneIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [subtitlesLanguage, setSubtitlesLanguage] = useState<Language>(language);

  const scene = MOVIE_SCENES[currentIndex];

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialSceneIndex);
      setIsPlaying(true);
      if (!isAudioMuted) {
        audioEngine.playPreset(scene.soundPreset);
      }
    } else {
      audioEngine.stop();
    }
  }, [isOpen, initialSceneIndex]);

  useEffect(() => {
    if (isOpen && !isAudioMuted) {
      audioEngine.playPreset(scene.soundPreset);
    }
  }, [currentIndex, isOpen, isAudioMuted]);

  // Slideshow auto-advance timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOVIE_SCENES.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % MOVIE_SCENES.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + MOVIE_SCENES.length) % MOVIE_SCENES.length);
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSound = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    audioEngine.setMuted(nextMuted);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none animate-fadeIn">
      {/* Top Bar (Cinema HUD) */}
      <div className="z-20 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <span className="font-cinzel text-sm md:text-base font-bold text-white tracking-widest">
            {subtitlesLanguage === 'ur' ? MOVIE_INFO.titleUr : MOVIE_INFO.titleEn}
          </span>
          <span className="hidden sm:inline text-xs text-neutral-500 font-mono">
            {scene.locationEn}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtitle language switcher */}
          <button
            onClick={() => setSubtitlesLanguage((l) => (l === 'ur' ? 'en' : 'ur'))}
            className="text-xs px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            {subtitlesLanguage === 'ur' ? 'Subtitles: اردو' : 'Subtitles: English'}
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className="p-2 text-neutral-300 hover:text-white bg-neutral-900/80 border border-neutral-700 rounded-lg transition-colors cursor-pointer"
            title="Toggle Sound"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-900/80 border border-neutral-700 rounded-lg hover:border-neutral-500 transition-colors cursor-pointer"
            title="Exit Cinema (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Screen Visual with Ken Burns zoom animation */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        <img
          key={scene.id}
          src={scene.image}
          alt={scene.titleEn}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] transition-all duration-[9000ms] ease-linear scale-100 animate-atmosphere"
        />

        {/* Cinematic Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

        {/* Navigation Arrows on edges */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + MOVIE_SCENES.length) % MOVIE_SCENES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/10 transition-all backdrop-blur-sm cursor-pointer"
          title="Previous Scene"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % MOVIE_SCENES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/10 transition-all backdrop-blur-sm cursor-pointer"
          title="Next Scene"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Subtitles & Control Deck */}
      <div className="z-20 p-4 md:p-8 bg-gradient-to-t from-black via-black/90 to-transparent space-y-4">
        {/* Subtitles Box */}
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-mono mb-1">
            {subtitlesLanguage === 'ur'
              ? `منظر ${scene.id}: ${scene.titleUr}`
              : `Scene ${scene.id}: ${scene.titleEn}`}
          </div>
          {subtitlesLanguage === 'ur' ? (
            <p className="font-urdu text-xl md:text-2xl text-amber-100 leading-[2.1] drop-shadow-[0_2px_15px_rgba(0,0,0,1)]">
              {scene.narrativeUr}
            </p>
          ) : (
            <p className="font-sans text-sm md:text-base text-neutral-200 leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,1)] font-medium">
              {scene.narrativeEn}
            </p>
          )}
        </div>

        {/* Playback Controls & Progress Bar */}
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4 pt-2">
          {/* Timeline progress ticks */}
          <div className="flex items-center gap-2 flex-1">
            {MOVIE_SCENES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full flex-1 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                    : 'bg-neutral-800 hover:bg-neutral-600'
                }`}
                title={`Scene ${s.id}`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="p-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-lg cursor-pointer shrink-0"
            title={isPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </div>
      </div>
    </div>
  );
};
