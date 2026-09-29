export type Language = 'ur' | 'en';

export interface Scene {
  id: number;
  slug: string;
  titleEn: string;
  titleUr: string;
  locationEn: string;
  locationUr: string;
  timeOfDay: string;
  image: string;
  narrativeEn: string;
  narrativeUr: string;
  keyDialogueEn: {
    speaker: string;
    parenthetical?: string;
    line: string;
  }[];
  keyDialogueUr: {
    speaker: string;
    parenthetical?: string;
    line: string;
  }[];
  directorNotes: {
    camera: string;
    lighting: string;
    vfx: string;
    soundDesign: string;
  };
  soundPreset: 'forest' | 'palace' | 'exile' | 'battle';
}

export interface Character {
  id: string;
  nameEn: string;
  nameUr: string;
  titleEn: string;
  titleUr: string;
  quoteEn: string;
  quoteUr: string;
  descriptionEn: string;
  descriptionUr: string;
  traits: string[];
  signatureWeaponEn: string;
  signatureWeaponUr: string;
  avatarSeed: string;
}
