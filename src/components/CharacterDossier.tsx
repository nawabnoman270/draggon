import React from 'react';
import { CHARACTERS } from '../data/movieData';
import { Language, Character } from '../types/movie';
import { Shield, Zap, Flame, Crown, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface CharacterDossierProps {
  language: Language;
}

export const CharacterDossier: React.FC<CharacterDossierProps> = ({ language }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'nawab':
        return <Zap className="w-5 h-5 text-sky-400" />;
      case 'azure-dragon':
        return <Flame className="w-5 h-5 text-blue-400" />;
      case 'princess-isabella':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'the-king':
        return <Crown className="w-5 h-5 text-amber-400" />;
      default:
        return <Shield className="w-5 h-5 text-neutral-400" />;
    }
  };

  const playCharacterSFX = (id: string) => {
    if (id === 'nawab') {
      audioEngine.playLightningSFX();
    } else if (id === 'azure-dragon') {
      audioEngine.playPreset('battle');
    } else if (id === 'princess-isabella') {
      audioEngine.playPreset('palace');
    } else {
      audioEngine.playPreset('exile');
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 md:px-8">
      {/* Section Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          {language === 'ur' ? 'سلطنت اور کہانی کے کردار' : 'Dramatis Personae'}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-cinzel">
          {language === 'ur' ? 'مرکزی کردار اور ان کی داستان' : 'Legendary Characters'}
        </h2>
        <p className="text-sm text-neutral-400">
          {language === 'ur'
            ? 'نواب اور اس کے ساتھیوں کے اوصاف، ان کے ہتھیار اور ان کے تاریخی مکالمے'
            : 'Explore the champions, titans, and royalty who shape the fate of the realm.'}
        </p>
      </div>

      {/* Grid of Character Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CHARACTERS.map((char) => (
          <div
            key={char.id}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div>
              {/* Header with Icon and Title */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  {getIcon(char.id)}
                </div>
                <button
                  onClick={() => playCharacterSFX(char.id)}
                  className="text-[11px] font-medium text-neutral-400 hover:text-amber-400 px-2.5 py-1 bg-neutral-950 rounded-md border border-neutral-800 transition-colors cursor-pointer"
                  title="Play Character Theme"
                >
                  {language === 'ur' ? 'صوتی اثر' : 'Play SFX'}
                </button>
              </div>

              {/* Name and Subtitle */}
              <h3 className={`text-xl font-bold text-white mb-1 ${language === 'ur' ? 'font-urdu' : 'font-cinzel'}`}>
                {language === 'ur' ? char.nameUr : char.nameEn}
              </h3>
              <div className="text-xs text-amber-400/90 font-medium mb-4">
                {language === 'ur' ? char.titleUr : char.titleEn}
              </div>

              {/* Description */}
              <p
                className={`text-xs text-neutral-300 leading-relaxed mb-4 ${
                  language === 'ur' ? 'font-urdu text-sm text-right leading-[2]' : ''
                }`}
              >
                {language === 'ur' ? char.descriptionUr : char.descriptionEn}
              </p>

              {/* Signature Weapon / Artifact (NO PILLS: clean unboxed metadata with bullet/separator) */}
              <div className="pt-3 border-t border-neutral-800/80 mb-4 text-xs">
                <div className="text-neutral-400 font-semibold mb-1">
                  {language === 'ur' ? 'خاص ہتھیار یا شناخت:' : 'Signature Arsenal:'}
                </div>
                <div className="text-sky-300 font-medium">
                  {language === 'ur' ? char.signatureWeaponUr : char.signatureWeaponEn}
                </div>
              </div>

              {/* Traits List */}
              <div className="space-y-1.5 mb-4 text-xs text-neutral-400">
                {char.traits.map((trait, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                    <span>{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Iconic Quote */}
            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/60 mt-auto">
              <blockquote
                className={`text-xs italic text-neutral-300 ${
                  language === 'ur' ? 'font-urdu text-sm text-right' : ''
                }`}
              >
                {language === 'ur' ? char.quoteUr : char.quoteEn}
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
