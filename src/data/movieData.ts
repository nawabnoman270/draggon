import { Scene, Character } from '../types/movie';

export const MOVIE_INFO = {
  titleEn: 'The Dragon Guardian & The Kingdom’s Love',
  titleUr: 'دی ڈریگن گارڈین اینڈ دی کینگڈمز لو',
  taglineEn: 'An outcast warrior. A wounded titan of the skies. A forbidden royal love that will save an entire realm.',
  taglineUr: 'ایک جلاوطن جنگجو، آسمانوں کا زخمی دیوہیکل محافظ، اور وہ مقدس محبت جو ایک برباد ہوتی سلطنت کو نئی زندگی بخشے گی!',
  leadHeroEn: 'Nawab',
  leadHeroUr: 'نواب',
  genreEn: 'Epic Hollywood Fantasy · Romantic Action Drama',
  genreUr: 'ہالی ووڈ فینٹسی · رومانوی جنگی ڈراما',
  runtime: '142 Minutes',
  aspectRatio: '2.39:1 Anamorphic Cinema',
  heroPoster: '/src/assets/images/movie_poster_hero_1790687047475.jpg',
};

export const MOVIE_SCENES: Scene[] = [
  {
    id: 1,
    slug: 'misty-forest-wounded-dragon',
    titleEn: 'Mysterious Forest Encounter & The Wounded Dragon',
    titleUr: 'گھنے جنگل میں پراسرار ملاقات اور زخمی ڈریگن',
    locationEn: 'EXT. ENCHANTED MISTY FOREST - DUSK',
    locationUr: 'طلسماتی کہرے سے ڈھکا جنگل - شام کا وقت',
    timeOfDay: 'Twilight / Mist',
    image: '/src/assets/images/scene_1_forest_dragon_1790687060585.jpg',
    narrativeUr:
      'کہانی کا آغاز ایک طلسماتی اور گھنے جنگل سے ہوتا ہے جہاں ہر طرف کہرا چھایا ہوا ہے۔ نواب (جو اپنے شاہانہ سیاہ لباس، چمڑے کے زرہ بکتر، کاندھے پر موجود فر کے کوٹ اور کالی عینک میں ملبوس ہے) ہاتھ میں بجلی کی کڑکتی ہوئی تلوار لیے اس خوفناک جنگل سے گزر رہا ہے۔ اچانک، گھنی جھاڑیوں اور کائی سے ڈھکے درختوں کے درمیان اسے ایک نیلے رنگ کا دیوہیکل ڈریگن زخمی حالت میں پڑا ہوا ملتا ہے۔ نواب ڈریگن کے زخموں پر مرہم پٹی کرتا ہے، اور کچھ دنوں کی دیکھ بھال کے بعد ڈریگن مکمل صحت یاب ہو کر اس کا پکا ساتھی بن جاتا ہے۔',
    narrativeEn:
      'The story begins in an enchanted, mist-draped forest shrouded in eerie vapor. Nawab—draped in royal black leather armor, a fur mantle slung over his shoulder, wearing sleek dark shades and gripping a sword crackling with raw electrical lightning—navigates through the treacherous woods. Suddenly, amidst the dense moss-covered trees, he discovers a colossal azure dragon lying wounded and helpless. With patient valor, Nawab binds and treats its injuries with healing elixirs. Nursed back to full majesty, the azure dragon awakens to become his indomitable guardian and loyal lifelong companion.',
    keyDialogueEn: [
      {
        speaker: 'NAWAB',
        parenthetical: 'approaching slowly, holstering the lightning blade',
        line: 'Easy now, ancient one. The storm brought you down, but my blade will not harm you.',
      },
      {
        speaker: 'THE AZURE DRAGON',
        parenthetical: 'a low, resonant purr echoes through the trees as its sapphire eyes glow',
        line: '[Rumbles softly, bowing its crested head in solemn trust]',
      },
      {
        speaker: 'NAWAB',
        parenthetical: 'applying herbal salve across the fractured wing',
        line: 'Together, we will rule the skies once more.',
      },
    ],
    keyDialogueUr: [
      {
        speaker: 'نواب',
        parenthetical: 'آہستہ قدموں سے آگے بڑھتے ہوئے، بجلی والی تلوار کی چمک مدہم کرتے ہوئے',
        line: 'گھبراؤ مت دوست... طوفان نے تمہیں گرا دیا، لیکن میری تلوار تمہیں نقصان نہیں پہنچائے گی۔',
      },
      {
        speaker: 'نیلا ڈریگن',
        parenthetical: 'اپنی گہری نیلی آنکھوں سے دیکھ کر شکرگزاری سے ہلکی گرج پیدا کرتا ہے',
        line: '[احترام اور وفا کے ساتھ اپنے دیوہیکل سر کو نواب کے سامنے جھکا دیتا ہے]',
      },
      {
        speaker: 'نواب',
        parenthetical: 'ڈریگن کے پروں پر مرہم لگاتے ہوئے',
        line: 'اب تم اکیلے نہیں ہو... ہم دونوں مل کر اس آسمان پر اپنا راج قائم کریں گے۔',
      },
    ],
    directorNotes: {
      camera: 'Wide-angle 35mm anamorphic tracking shot pushing through heavy fog, slowly tilting up to reveal the scale of the colossal dragon.',
      lighting: 'Cold atmospheric blue daylight diffused through dense canopy, accented by electric blue sparks from the blade and dragon scales.',
      vfx: 'Volumetric mist dynamics, bioluminescent blue dragon blood, and procedural electrical arcs swirling along Nawab’s blade.',
      soundDesign: 'Whispering wind through pine needles, distant crackling lightning, deep sub-bass dragon breathing resonance.',
    },
    soundPreset: 'forest',
  },
  {
    id: 2,
    slug: 'palace-garden-royal-romance',
    titleEn: 'Meeting The Princess & The Spark of Royal Love',
    titleUr: 'شہزادی سے ملاقات اور محبت کا آغاز',
    locationEn: 'EXT. ROYAL CITADEL ROSE GARDENS - TWILIGHT',
    locationUr: 'شاہی قلعہ کے گلاب کے باغات - سنہری شام',
    timeOfDay: 'Golden Hour / Twilight',
    image: '/src/assets/images/scene_2_palace_romance_1790687073584.jpg',
    narrativeUr:
      'ایک دن نواب اپنے اسی نیلے ڈریگن پر سوار ہو کر قریبی سلطنت کے شاہی محل کے اوپر سے گزرتا ہے، جہاں شاہی باغ میں سلطنت کی خوبصورت شہزادی موجود ہوتی ہے۔ ڈریگن کی ہیت اور نواب کے شاندار انداز کو دیکھ کر شہزادی متوجہ ہوتی ہے۔ جب نواب زمین پر اترتا ہے تو اس کی اور شہزادی کی نظریں ملتی ہیں، اور دونوں کے درمیان پہلی ہی ملاقات میں ایک انوکھا جذباتی تعلق اور محبت جنم لے لیتی ہے۔ وہ دونوں محل کے خفیہ گوشوں میں ملنے لگتے ہیں، جہاں ان کی یہ محبت دن بدن گہری ہوتی جاتی ہے۔',
    narrativeEn:
      'Soaring high upon the azure dragon’s back, Nawab glides over the high towers of the royal palace. Below in the imperial rose garden stands the breathtaking Princess of the realm. Struck by the majestic beast and Nawab’s commanding presence, her breath catches. As the dragon lands silently on the marble terrace, their gazes meet—igniting an undeniable spark of forbidden, profound love. Secret meetings in twilight cloisters and secluded palace balconies soon forge a deep, unbreakable romantic bond.',
    keyDialogueEn: [
      {
        speaker: 'PRINCESS ISABELLA',
        parenthetical: 'stepping forward without fear, gazing up into Nawab’s dark glasses',
        line: 'They say dragons belong only to forgotten myth. Yet here you stand, master of thunder.',
      },
      {
        speaker: 'NAWAB',
        parenthetical: 'dismounting with royal grace, lowering his shades slightly',
        line: 'A guardian answers to no myth, Princess. Only to the heart that calls across the horizon.',
      },
      {
        speaker: 'PRINCESS ISABELLA',
        parenthetical: 'gently placing her palm on the dragon’s warm scales',
        line: 'Then promise me, warrior... when the kingdom sleeps, you will return to these gardens.',
      },
    ],
    keyDialogueUr: [
      {
        speaker: 'شہزادی',
        parenthetical: 'خوف کے بغیر آگے بڑھتے ہوئے، نواب کے پروقار انداز کو دیکھتے ہوئے',
        line: 'لوگ کہتے تھے کہ ڈریگن صرف قصوں میں ہوتے ہیں... لیکن تم تو آسمان کے طوفانوں کو ساتھ لے کر اترے ہو۔',
      },
      {
        speaker: 'نواب',
        parenthetical: 'شائستگی سے عینک تھوڑی نیچے کرتے ہوئے، آنکھوں میں مسکراہٹ کے ساتھ',
        line: 'قصے تب حقیقت بنتے ہیں شہزادی، جب دل کسی خوبصورت حقیقت سے ٹکرا جائے...',
      },
      {
        speaker: 'شہزادی',
        parenthetical: 'ہاتھ بڑھا کر نیلے ڈریگن کو چھوتے ہوئے',
        line: 'مجھ سے وعدہ کرو جنگجو، جب محل کی روشنیاں مدہم پڑیں گی، تم اسی باغ میں مجھ سے ملو گے...',
      },
    ],
    directorNotes: {
      camera: 'Romantic 85mm portrait framing with creamy bokeh. Slow orbital crane shot as Nawab dismounts and approaches the fountain.',
      lighting: 'Golden hour sunset spilling across ivory balustrades, warm amber lanterns contrasting with the dragon’s cool sapphire hue.',
      vfx: 'Drifting rose petal physics caught in the updraft of dragon wings, soft twilight atmospheric glow.',
      soundDesign: 'Gentle classical strings blending into ambient nightingale calls and splashing marble fountain waters.',
    },
    soundPreset: 'palace',
  },
  {
    id: 3,
    slug: 'secret-unveiled-royal-banishment',
    titleEn: 'The Unveiled Secret & Heartbreaking Exile',
    titleUr: 'راز کا افشا اور کٹھن مشکلات',
    locationEn: 'INT. ROYAL THRONE ROOM / EXT. WILDERNESS - NIGHT',
    locationUr: 'شاہی دربار اور ویران برفیلے جنگلات - اندھیری رات',
    timeOfDay: 'Midnight Storm',
    image: '/src/assets/images/scene_3_exile_wilderness_1790687084424.jpg',
    narrativeUr:
      'نواب اور شہزادی کی محبت کا یہ قصہ زیادہ دیر چھپا نہیں رہ سکتا تھا۔ جب سلطنت کے بادشاہ اور شاہی دربار کو اس عام جنگجو (نواب) اور شہزادی کے رشتے کا پتہ چلتا ہے، تو وہ سخت مخالفت کرتے ہیں۔ بادشاہ غصے میں آ کر نواب کو محل سے نکال دیتا ہے اور شہزادی پر پابندیاں لگا دیتا ہے۔ نواب دل برداشتہ ہو کر اپنے ڈریگن کے ساتھ جنگلوں میں واپس چلا جاتا ہے، لیکن شہزادی کی یاد ہر لمحہ اس کے دل میں رہتی ہے۔',
    narrativeEn:
      'Whispers cannot remain contained in high towers. When the imperious King and the royal court uncover the clandestine love between an untamed warrior and the royal heir, fury erupts. Denouncing Nawab as an unworthy outsider, the King exiles him under threat of death and confines the weeping Princess to her chambers. Brokenhearted yet proud, Nawab retreats into the lonely wild mountains with his faithful dragon, keeping her radiant memory burning in his heart through cold, starless nights.',
    keyDialogueEn: [
      {
        speaker: 'THE KING',
        parenthetical: 'slamming the gold scepter upon the throne steps',
        line: 'A wandering outcast has no seat at the throne of kings! Begone from our realm, or feed the palace executioners!',
      },
      {
        speaker: 'PRINCESS ISABELLA',
        parenthetical: 'tears glistening, held back by royal guards',
        line: 'Father, no! He has more honor and courage in his heart than all your courtiers combined!',
      },
      {
        speaker: 'NAWAB',
        parenthetical: 'sheathing his sword with cold dignity, turning his back to the throne',
        line: 'Castles may hold stone and gold, Your Majesty. But no walls on earth can banish what has been forged in the heart.',
      },
    ],
    keyDialogueUr: [
      {
        speaker: 'بادشاہ',
        parenthetical: 'غصے سے عصائے شاہی فرش پر پٹختے ہوئے',
        line: 'ایک آوارہ جنگجو کی یہ مجال کہ وہ میری بیٹی کی طرف دیکھے؟! اس سلطنت سے ابھی دفع ہو جاؤ ورنہ تمہارا سر قلم کر دیا جائے گا!',
      },
      {
        speaker: 'شہزادی',
        parenthetical: 'روتے ہوئے محافظوں کی گرفت سے چھڑانے کی کوشش کرتے ہوئے',
        line: 'بابا حضور! ان کی وفاداری اور شجاعت پر شک نہ کریں... ان کا دل آپ کے تمام درباریوں سے زیادہ سچا ہے!',
      },
      {
        speaker: 'نواب',
        parenthetical: 'پروقار انداز میں تلوار میان میں ڈالتے ہوئے، بغیر کسی خوف کے دربار کو الوداع کہتے ہوئے',
        line: 'بادشاہ سلامت! آپ مجھے محل سے تو نکال سکتے ہیں، لیکن ان دلوں سے محبت کو کبھی بے دخل نہیں کر سکتے...',
      },
    ],
    directorNotes: {
      camera: 'Split contrast framing: Dutch-angle high tension in the claustrophobic throne room transitioning to vast, melancholic wide shots of the lonely mountain campfire.',
      lighting: 'Dramatic chiaroscuro shadows, flickering torchlight in the palace, contrasting with the cold icy moonlight and warm ember glow at Nawab’s campsite.',
      vfx: 'Simulated embers, falling snow flurries, dragon breathing gentle warm vapor to protect Nawab from the mountain frost.',
      soundDesign: 'Booming royal echo of the King’s voice, crackling campfire logs, mournful cello melody underscored by howling wind.',
    },
    soundPreset: 'exile',
  },
  {
    id: 4,
    slug: 'climax-battle-triumph-of-love',
    titleEn: 'The Climax Battle of Sky & Fire, and Triumph of Love',
    titleUr: 'شاندار جنگ اور محبت کی جیت (کلائمیکس)',
    locationEn: 'EXT. CITADEL BATTLEFIELD / THE SKIES - DAWN',
    locationUr: 'شاہی قلعہ کا میدان جنگ اور آسمانی محاذ - صبح صادق',
    timeOfDay: 'Blood Red Dawn / Storm',
    image: '/src/assets/images/scene_4_climax_battle_1790687095921.jpg',
    narrativeUr:
      'کچھ عرصے بعد، ایک ظالم اور طاقتور دشمن فوج اس پوری سلطنت پر حملہ کر دیتی ہے تاکہ اسے تباہ و برباد کر سکے۔ شاہی فوج دشمن کے سامنے کمزور پڑ جاتی ہے اور محل خطرے میں آ جاتا ہے۔ ایسے نازک وقت میں نواب اپنے اسی وفادار نیلے ڈریگن پر سوار ہو کر طوفان کی طرح میدانِ جنگ میں اترتا ہے۔ ڈریگن آسمان سے آگ کی بارش کرتا ہے اور نواب اپنی بجلی والی تلوار سے دشمنوں کے لشکر کے چھکے چھڑا دیتا ہے۔ جنگ جیتنے کے بعد، نواب سلطنت کا سب سے بڑا ہیرو بن جاتا ہے۔ بادشاہ اپنی غلطی تسلیم کرتا ہے اور خوشی خوشی اپنی بیٹی (شہزادی) کا ہاتھ نواب کے ہاتھ میں دے دیتا ہے۔ اس طرح کہانی نواب، اس کے وفادار ڈریگن اور اس کی محبت (شہزادی) کی ہمیشہ کی خوشگوار زندگی کے ساتھ ختم ہوتی ہے۔',
    narrativeEn:
      'Desolation descends upon the kingdom when an invincible, ruthless dark army breaches the outer walls. The royal defenders crumble, the fortress gates buckle, and doom looms over the royal court. In this darkest hour, thunder shakes the sky: Nawab descends from the heavens astride the titanic azure dragon! The dragon rains celestial blue fire upon the invading legions while Nawab charges into the fray, his lightning sword sundering armor and crushing the siege with thunderous fury! With victory secured, the humbled King bows before Nawab, proclaiming him the Realm’s Savior and joining Nawab and the Princess’s hands in eternal matrimony. Under the dragon’s soaring blessing, their happily ever after begins.',
    keyDialogueEn: [
      {
        speaker: 'SHADOW WARLORD',
        parenthetical: 'raising a cursed blade toward the broken castle gates',
        line: 'Burn the castle to ash! There is no one left to save this kingdom!',
      },
      {
        speaker: 'NAWAB',
        parenthetical: 'diving down at supersonic speed through storm clouds, lightning sword blazing',
        line: 'You forgot the sky belongs to the Dragon Guardian! For the Princess! For the Realm!',
      },
      {
        speaker: 'THE KING',
        parenthetical: 'kneeling amidst the smoking ruins, joining Nawab and the Princess’s hands',
        line: 'I was blind to true nobility. You have saved my people, my crown, and my daughter. Take her hand, my Champion.',
      },
    ],
    keyDialogueUr: [
      {
        speaker: 'دشمن لشکر کا سردار',
        parenthetical: 'قلعہ کے ٹوٹے ہوئے دروازے کی طرف تلوار لہراتے ہوئے',
        line: 'اس محل کو جلا کر راکھ کر دو! اس سلطنت کو بچانے والا کوئی نہیں بچا!',
      },
      {
        speaker: 'نواب',
        parenthetical: 'بادلوں کو چیرتے ہوئے بجلی کی رفتار سے نیلے ڈریگن پر حملہ آور ہوتے ہوئے',
        line: 'تم بھول گئے کہ یہ آسمان اور یہ سلطنت ڈریگن گارڈین کی پناہ میں ہے! شہزادی اور سلطنت کے لیے... حملہ!',
      },
      {
        speaker: 'بادشاہ',
        parenthetical: 'میدانِ جنگ میں سر جھکاتے ہوئے، شہزادی کا ہاتھ نواب کے ہاتھ میں دیتے ہوئے',
        line: 'میری آنکھوں پر غرور کا پردہ تھا۔ تم نے سلطنت کو نئی زندگی دی ہے۔ نواب، تم ہی اس سلطنت کے اصلی ہیرو اور میری بیٹی کے سچے جیون ساتھی ہو!',
      },
    ],
    directorNotes: {
      camera: 'Ultra dynamic high-octane camera work: 360-degree aerial roll matching the dragon’s dive-bomb trajectory, high-speed shutter combat choreography.',
      lighting: 'Apocalyptic stormy morning skies pierced by blazing streams of azure dragon-fire and blinding lightning arcs.',
      vfx: 'Full particle simulation of dragon breath consuming siege towers, hyper-realistic lightning arcing through dozens of enemy weapons, cloth simulation of Nawab’s fur cloak billowing in wind.',
      soundDesign: 'Deafening thunderclaps, dragon screech that shakes the earth, heavy orchestral war horns shifting into a majestic, triumphant love theme.',
    },
    soundPreset: 'battle',
  },
];

export const CHARACTERS: Character[] = [
  {
    id: 'nawab',
    nameEn: 'Nawab',
    nameUr: 'نواب (دی ڈریگن گارڈین)',
    titleEn: 'The Dragon Guardian & Lightning Swordmaster',
    titleUr: 'ڈریگن گارڈین اور بجلی والی تلوار کا ماہر جنگجو',
    quoteEn: '“Castles may crumble to dust, but the bond between warrior, dragon, and true love is eternal.”',
    quoteUr: '“محل مٹی میں مل سکتے ہیں، لیکن ایک جنگجو، اس کے ڈریگن اور سچی محبت کا رشتہ ہمیشہ زندہ رہتا ہے۔”',
    descriptionEn:
      'A fearless, mysterious warrior clad in iconic black leather armor, shoulder fur mantle, and signature dark sunglasses. Armed with an ancient blade crackling with pure lightning, Nawab commands respect through quiet honor, supreme loyalty, and unmatched martial prowess.',
    descriptionUr:
      'شاہانہ سیاہ لباس، چمڑے کے زرہ بکتر، کاندھے پر فر کے کوٹ اور سدا بہار کالی عینک میں ملبوس پُراسرار جنگجو۔ ہاتھ میں بجلی کی کڑکتی ہوئی تلوار لیے، نواب اپنی وفاداری، جرات اور رحم دلی کی وجہ سے سلطنت کا عظیم ترین محافظ بنتا ہے۔',
    traits: ['Lightning Sword Arts', 'Dragon Rider Master', 'Regal Black Armor', 'Fearless Protector'],
    signatureWeaponEn: 'Thunderstrike Arc Blade (بجلی کی تلوار)',
    signatureWeaponUr: 'بجلی کی کڑکتی ہوئی تلوار',
    avatarSeed: 'Nawab',
  },
  {
    id: 'azure-dragon',
    nameEn: 'The Azure Dragon',
    nameUr: 'نیلا ڈریگن (آسمانی محافظ)',
    titleEn: 'The Celestial Azure Titan & Faithful Steed',
    titleUr: 'آسمانوں کا دیوہیکل محافظ اور نواب کا وفادار ساتھی',
    quoteEn: '“[Rumbles with the force of mountain thunder, wings casting deep shadows over darkness]”',
    quoteUr: '“[پہاڑوں جیسی گرج کے ساتھ فضا میں نیلی آگ برساتا ہے اور نواب کے اشارے پر اڑان بھرتا ہے]”',
    descriptionEn:
      'A mythical titan of the heavens with shimmering azure scales and wings that generate storm winds. Wounded and left to perish in the misty woods, it was healed by Nawab and formed a telepathic covenant of eternal brotherhood, raining celestial azure flames upon evil.',
    descriptionUr:
      'ایک دیوہیکل، نیلے رنگ کا طلسماتی ڈریگن جس کے پروں سے طوفان جنم لیتے ہیں اور منہ سے نیلی آگ برستی ہے۔ جنگل میں زخمی حالت میں نواب کی مرہم پٹی نے اسے نئی زندگی دی، جس کے بعد یہ نواب کا سب سے وفادار اور طاقتور ساتھی بن گیا۔',
    traits: ['Azure Celestial Flame', 'Supersonic Aerial Agility', 'Scale Armor Impervious to Steel', 'Ancient Empathic Bond'],
    signatureWeaponEn: 'Celestial Azure Hellfire Breath',
    signatureWeaponUr: 'نیلی آسمانی آگ کا طوفان',
    avatarSeed: 'Dragon',
  },
  {
    id: 'princess-isabella',
    nameEn: 'Princess Isabella',
    nameUr: 'شہزادی (سلطنت کی روح)',
    titleEn: 'The Rose of the Citadel & Heir to the Realm',
    titleUr: 'شاہی محل کی خوبصورت شہزادی اور سلطنت کی وارث',
    quoteEn: '“I saw no beast in the skies—I saw the heartbeat of a savior.”',
    quoteUr: '“میں نے آسمان میں کوئی بلا نہیں دیکھی، میں نے اپنی سلطنت کا سچا محافظ دیکھا تھا!”',
    descriptionEn:
      'Graceful, courageous, and fiercely empathetic. The royal princess sees beyond courtly superficiality into Nawab’s true heroic soul. Despite severe royal prohibitions, her unwavering devotion inspires Nawab to return and save the kingdom from annihilation.',
    descriptionUr:
      'بے پناہ خوبصورت، ذہین اور باحوصلہ شہزادی۔ شاہی دربار کے دکھاوے سے دور، وہ نواب کی سادگی، جرات اور نیک دلی پر فریفتہ ہو جاتی ہے۔ اس کی لازوال محبت ہی نواب کے لیے سب سے بڑی طاقت ثابت ہوتی ہے۔',
    traits: ['Imperial Diplomacy', 'Courage Under Fire', 'True Empathy', 'Royal Lineage'],
    signatureWeaponEn: 'Ring of Sovereign Light',
    signatureWeaponUr: 'شاہی انگشتری اور روشن استقامت',
    avatarSeed: 'Princess',
  },
  {
    id: 'the-king',
    nameEn: 'The Monarch',
    nameUr: 'بادشاہ (شاہی دربار کا والی)',
    titleEn: 'King of the Silver Spire Citadel',
    titleUr: 'سلطنت کا تاجدار اور شاہی دربار کا سربراہ',
    quoteEn: '“Pride made me blind to the hero who held our fate in his hands.”',
    quoteUr: '“غرور نے مجھے اس ہیرو سے غافل کر دیا تھا جس کے ہاتھ میں ہماری بقا تھی۔”',
    descriptionEn:
      'A proud sovereign fiercely protective of his ancient bloodline and citadel. Blinded by pride when exiling Nawab, his spirit is humbled when Nawab saves his daughter and kingdom from the brink of absolute ruin.',
    descriptionUr:
      'ایک بارعب اور مغرور بادشاہ جو ابتدا میں نواب کو عام جنگجو سمجھ کر محل سے بے دخل کر دیتا ہے، مگر جنگ کی تباہی میں نواب کے کارناموں کو دیکھ کر اپنی غلطی کا اعتراف کرتا ہے اور نواب کو بیٹی کا ہاتھ سونپتا ہے۔',
    traits: ['Crown Authority', 'Royal Legion Commander', 'Humbled Sovereign'],
    signatureWeaponEn: 'Imperial Golden Scepter',
    signatureWeaponUr: 'شاہی عصا اور تاج و تخت',
    avatarSeed: 'King',
  },
];
