import React, { useState } from 'react';
import { MOVIE_SCENES } from '../data/movieData';
import { Language } from '../types/movie';
import { Sparkles, Clapperboard, Send, Copy, Check, Volume2, Square, Wand2 } from 'lucide-react';
import { speakNarrative, stopSpeaking } from '../utils/audioEngine';

interface DirectorStudioProps {
  language: Language;
}

export const DirectorStudio: React.FC<DirectorStudioProps> = ({ language }) => {
  const [selectedSceneId, setSelectedSceneId] = useState(1);
  const [actionMode, setActionMode] = useState<'generate_dialogue' | 'expand_scene' | 'trailer_voiceover' | 'lore'>('generate_dialogue');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSpeakingResult, setIsSpeakingResult] = useState(false);

  const selectedScene = MOVIE_SCENES.find((s) => s.id === selectedSceneId) || MOVIE_SCENES[0];

  const presets = [
    {
      titleEn: 'Emotional Secret Garden Dialogue',
      titleUr: 'شہزادی اور نواب کے درمیان جذباتی مکالمہ',
      action: 'generate_dialogue',
      sceneId: 2,
      prompt: 'Write an intimate, poetic dialogue between Nawab and Princess Isabella in the twilight garden as they discuss their different worlds and the looming storm.',
    },
    {
      titleEn: 'Epic Theatrical Movie Trailer Narration',
      titleUr: 'ہالی ووڈ مووی ٹریلر کی جاندار وائس اوور',
      action: 'trailer_voiceover',
      sceneId: 4,
      prompt: 'Create a goosebump-inducing theatrical trailer monologue in dramatic Urdu and English with music cues and sound design directions.',
    },
    {
      titleEn: 'Climax Battle: Director’s Extended Cut',
      titleUr: 'شاندار جنگ کا ڈائریکٹرز ایکسٹینڈڈ کٹ',
      action: 'expand_scene',
      sceneId: 4,
      prompt: 'Detail the aerial dogfight maneuvers as Nawab and the Azure Dragon counter an invading shadow leviathan with lightning arcs.',
    },
    {
      titleEn: 'The Legend: Forging of the Lightning Blade',
      titleUr: 'بجلی والی تلوار کے بننے کی داستان',
      action: 'lore',
      sceneId: 1,
      prompt: 'Reveal the mystical origin of Nawab’s crackling lightning sword and how it was quenched in dragon thunder.',
    },
  ];

  const handleRunGenerator = async (actionToRun = actionMode, promptToRun = customPrompt, sId = selectedSceneId) => {
    setIsLoading(true);
    setErrorMsg(null);
    setGeneratedResult(null);
    stopSpeaking();
    setIsSpeakingResult(false);

    try {
      const response = await fetch('/api/gemini/screenplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionToRun,
          sceneId: sId,
          sceneTitle: selectedScene.titleEn,
          prompt: promptToRun,
          language: language === 'ur' ? 'urdu' : 'both',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate content from AI Studio.');
      }

      setGeneratedResult(data.text);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong while generating the scene.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (p: typeof presets[0]) => {
    setActionMode(p.action as any);
    setSelectedSceneId(p.sceneId);
    setCustomPrompt(p.prompt);
    handleRunGenerator(p.action as any, p.prompt, p.sceneId);
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeak = () => {
    if (isSpeakingResult) {
      stopSpeaking();
      setIsSpeakingResult(false);
    } else if (generatedResult) {
      setIsSpeakingResult(true);
      speakNarrative(
        generatedResult,
        language,
        () => setIsSpeakingResult(false),
        () => setIsSpeakingResult(false)
      );
    }
  };

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 md:px-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'ہدایت کار کا اے آئی پروڈکشن اسٹوڈیو' : "Director's Screenplay Studio"}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-cinzel">
            {language === 'ur' ? 'جیمنائی اسکرپٹ و سین ایکسپینشن' : 'AI Scene & Dialogue Workshop'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {language === 'ur'
              ? 'نواب کی فلم کے نئے مکالمے، ٹریلر وائس اوور اور ڈائریکٹرز کٹ تخلیق کریں'
              : 'Generate custom bilingual dialogues, theatrical trailer scripts, and expanded lore powered by Gemini.'}
          </p>
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="mb-6 space-y-2">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          {language === 'ur' ? 'فوری تجویز کردہ اسکرپٹ آئیڈیاز:' : 'Director Quick Prompts:'}
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(p)}
              className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/70 text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{language === 'ur' ? p.titleUr : p.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Console */}
      <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-5 mb-8">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActionMode('generate_dialogue')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              actionMode === 'generate_dialogue'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {language === 'ur' ? 'نئے مکالمے (Dialogue)' : 'New Scene Dialogue'}
          </button>
          <button
            onClick={() => setActionMode('expand_scene')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              actionMode === 'expand_scene'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {language === 'ur' ? 'ڈائریکٹرز ایکسٹینڈڈ کٹ' : "Director's Cut"}
          </button>
          <button
            onClick={() => setActionMode('trailer_voiceover')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              actionMode === 'trailer_voiceover'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {language === 'ur' ? 'ٹریلر وائس اوور (Trailer)' : 'Theatrical Trailer'}
          </button>
          <button
            onClick={() => setActionMode('lore')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              actionMode === 'lore'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {language === 'ur' ? 'سلطنت کی نئی داستان (Lore)' : 'Custom Scene / Lore'}
          </button>
        </div>

        {/* Scene Selection Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-xs font-semibold text-neutral-400 shrink-0">
            {language === 'ur' ? 'مطلوبہ منظر کا انتخاب کریں:' : 'Target Scene:'}
          </label>
          <select
            value={selectedSceneId}
            onChange={(e) => setSelectedSceneId(Number(e.target.value))}
            className="bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 rounded-lg px-3 py-2 outline-none focus:border-amber-500"
          >
            {MOVIE_SCENES.map((s) => (
              <option key={s.id} value={s.id}>
                {language === 'ur' ? `منظر ${s.id}: ${s.titleUr}` : `Scene ${s.id}: ${s.titleEn}`}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Prompt Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-400">
            {language === 'ur' ? 'اپنی ہدایات یا خاص نوٹ درج کریں (اختیاری):' : 'Custom Director Notes (Optional):'}
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'مثلاً: نواب اور شہزادی کے درمیان جنگ سے قبل ایک وعدے کا اضافہ کریں...'
                : 'e.g. Add a thrilling pre-battle confrontation between Nawab and the Shadow Warlord atop the crumbling citadel...'
            }
            rows={3}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs md:text-sm text-neutral-200 placeholder-neutral-600 focus:border-amber-500 outline-none transition-colors"
          />
        </div>

        {/* Generate Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => handleRunGenerator()}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Wand2 className="w-4 h-4 animate-spin" />
                <span>{language === 'ur' ? 'تخلیق ہو رہا ہے...' : 'Directing Scene...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{language === 'ur' ? 'جیمنائی سے منظر تیار کریں' : 'Generate with Gemini'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {errorMsg && (
        <div className="p-4 mb-6 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-xl">
          {errorMsg}
        </div>
      )}

      {/* Generated Result Container */}
      {generatedResult && (
        <div className="p-6 md:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {language === 'ur' ? 'پروڈکشن کٹ اسکرپٹ تیار ہے' : 'AI Generated Screenplay Cut'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSpeak}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs rounded-lg transition-colors cursor-pointer"
              >
                {isSpeakingResult ? <Square className="w-3.5 h-3.5 fill-current text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
                <span>{isSpeakingResult ? (language === 'ur' ? 'آواز روکیں' : 'Stop') : (language === 'ur' ? 'سنیں' : 'Listen')}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'ur' ? 'کاپی ہوگیا!' : 'Copied!') : (language === 'ur' ? 'کاپی متن' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* Formatted Script Body */}
          <div className="font-mono text-xs md:text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto p-4 bg-neutral-950/80 rounded-xl border border-neutral-800/80">
            {generatedResult}
          </div>
        </div>
      )}
    </section>
  );
};
