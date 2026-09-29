import React, { useState } from 'react';
import { MOVIE_SCENES, MOVIE_INFO } from '../data/movieData';
import { Language } from '../types/movie';
import { Download, Copy, Check, FileText, SplitSquareVertical } from 'lucide-react';

interface ScreenplayTabProps {
  language: Language;
}

export const ScreenplayTab: React.FC<ScreenplayTabProps> = ({ language }) => {
  const [scriptMode, setScriptMode] = useState<'bilingual' | 'ur' | 'en'>('bilingual');
  const [copied, setCopied] = useState(false);

  const getFullScriptMarkdown = () => {
    let script = `# ${MOVIE_INFO.titleEn} / ${MOVIE_INFO.titleUr}\n\n`;
    script += `GENRE: ${MOVIE_INFO.genreEn}\n`;
    script += `WRITTEN FOR SCREEN BY: Nawab Story Legend\n\n`;
    script += `---\n\n`;

    MOVIE_SCENES.forEach((scene) => {
      script += `## SCENE ${scene.id}: ${scene.titleEn}\n`;
      script += `${scene.locationEn}\n\n`;
      script += `[URDU NARRATIVE]\n${scene.narrativeUr}\n\n`;
      script += `[ENGLISH NARRATIVE]\n${scene.narrativeEn}\n\n`;
      script += `[DIALOGUE EXCERPTS]\n`;
      scene.keyDialogueEn.forEach((d) => {
        script += `${d.speaker}\n`;
        if (d.parenthetical) script += `(${d.parenthetical})\n`;
        script += `"${d.line}"\n\n`;
      });
      script += `---\n\n`;
    });

    return script;
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(getFullScriptMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadScript = () => {
    const element = document.createElement('a');
    const file = new Blob([getFullScriptMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'The_Dragon_Guardian_Screenplay.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="py-12 max-w-5xl mx-auto px-4 md:px-8">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
        <div>
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            {language === 'ur' ? 'ہالی ووڈ پروڈکشن اسکرپٹ' : 'Official Screenplay Manuscript'}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-cinzel">
            {language === 'ur' ? 'مکمل اسکرین پلے اسکرپٹ' : 'The Complete Motion Picture Script'}
          </h2>
        </div>

        {/* View Mode & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Script Language View */}
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setScriptMode('bilingual')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                scriptMode === 'bilingual'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {language === 'ur' ? 'مشترکہ (دونوں)' : 'Bilingual'}
            </button>
            <button
              onClick={() => setScriptMode('ur')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                scriptMode === 'ur'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setScriptMode('en')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                scriptMode === 'en'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          <button
            onClick={handleCopyScript}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'ur' ? 'کاپی ہوگیا!' : 'Copied!') : (language === 'ur' ? 'کاپی اسکرپٹ' : 'Copy')}</span>
          </button>

          <button
            onClick={handleDownloadScript}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'ڈاؤنلوڈ اسکرپٹ' : 'Download (.md)'}</span>
          </button>
        </div>
      </div>

      {/* Screenplay Document (Vintage Hollywood Typewriter Manuscript) */}
      <div className="bg-neutral-950 border border-neutral-800/80 rounded-2xl p-6 md:p-12 shadow-2xl space-y-12">
        {/* Title Page Block */}
        <div className="text-center border-b border-neutral-800 pb-10 space-y-3">
          <div className="font-cinzel text-2xl md:text-4xl font-extrabold text-white tracking-widest uppercase">
            {MOVIE_INFO.titleEn}
          </div>
          <div className="font-urdu text-2xl text-amber-300">
            {MOVIE_INFO.titleUr}
          </div>
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono pt-2">
            Written by Nawab Storyteller · Screen Draft 1.0
          </div>
        </div>

        {/* Scene by Scene Screenplay Render */}
        {MOVIE_SCENES.map((scene) => (
          <article key={scene.id} className="space-y-6 pt-4">
            {/* Slugline */}
            <div className="font-mono text-sm md:text-base font-bold text-amber-400 tracking-wider bg-neutral-900/60 p-3 rounded-lg border-l-4 border-amber-500">
              {scene.locationEn}
            </div>

            {/* Urdu Scene Narrative */}
            {(scriptMode === 'bilingual' || scriptMode === 'ur') && (
              <div className="bg-neutral-900/30 p-5 rounded-xl border border-neutral-800/60">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest block mb-2 font-mono">
                  [منظر {scene.id}: اردو بیانیہ]
                </span>
                <p className="font-urdu text-xl text-neutral-100 text-right leading-[2.3]">
                  {scene.narrativeUr}
                </p>
              </div>
            )}

            {/* English Screenplay Action Lines */}
            {(scriptMode === 'bilingual' || scriptMode === 'en') && (
              <div className="font-mono text-xs md:text-sm text-neutral-300 leading-relaxed space-y-2 pl-4 border-l-2 border-neutral-800">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest block font-mono">
                  [SCENE {scene.id}: ACTION]
                </span>
                <p>{scene.narrativeEn}</p>
              </div>
            )}

            {/* Screenplay Dialogues */}
            <div className="py-4 space-y-5">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest block font-mono">
                [KEY DIALOGUE EXCHANGES]
              </span>

              {/* Show English Dialogue if chosen or bilingual */}
              {(scriptMode === 'bilingual' || scriptMode === 'en') && (
                <div className="space-y-4">
                  {scene.keyDialogueEn.map((d, dIdx) => (
                    <div key={dIdx} className="font-mono text-xs md:text-sm max-w-xl mx-auto space-y-1">
                      <div className="text-center font-bold text-amber-300 tracking-wider">
                        {d.speaker}
                      </div>
                      {d.parenthetical && (
                        <div className="text-center text-neutral-400 italic text-xs">
                          ({d.parenthetical})
                        </div>
                      )}
                      <div className="text-center text-neutral-100 leading-relaxed px-4">
                        "{d.line}"
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Show Urdu Dialogue if chosen */}
              {scriptMode === 'ur' && (
                <div className="space-y-4">
                  {scene.keyDialogueUr.map((d, dIdx) => (
                    <div key={dIdx} className="font-urdu max-w-xl mx-auto text-right p-3 bg-neutral-900/40 rounded-xl space-y-1">
                      <div className="font-bold text-amber-300 text-lg">
                        {d.speaker}:
                      </div>
                      {d.parenthetical && (
                        <div className="text-neutral-400 text-sm italic">
                          ({d.parenthetical})
                        </div>
                      )}
                      <div className="text-neutral-100 text-lg leading-[2.1]">
                        "{d.line}"
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-neutral-800/80 pt-4" />
          </article>
        ))}

        {/* The End Card */}
        <div className="text-center py-8">
          <div className="font-cinzel text-xl md:text-2xl font-bold text-neutral-400 tracking-widest">
            FADE OUT.
          </div>
          <div className="font-urdu text-xl text-amber-300 mt-2">
            تمت بالخیر (دی اینڈ)
          </div>
        </div>
      </div>
    </section>
  );
};
