import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini client strictly on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Screenplay & Scene AI Studio Endpoint
app.post('/api/gemini/screenplay', async (req, res) => {
  try {
    const { action, sceneId, sceneTitle, prompt, language } = req.body;

    let systemInstruction = `You are an elite Hollywood fantasy movie screenplay writer, creative director, and bilingual Urdu/English scriptwriter.
The movie is: "The Dragon Guardian and The Kingdom's Love" (دی ڈریگن گارڈین اینڈ دی کینگڈمز لو).
Main Characters:
- Nawab (نواب): Charismatic heroic dragon guardian in black leather armor, dark fur cloak, stylish black sunglasses/shades, wielding a crackling lightning sword.
- The Azure Dragon (نیلا ڈریگن): Colossal, majestic wounded blue dragon healed by Nawab in an enchanted misty forest; breathes celestial blue fire and creates thunderstorms with its wings.
- The Princess (شہزادی): Elegant royal princess who fell deeply in love with Nawab in the secret corners of the royal palace rose gardens.
- The King (بادشاہ): Proud royal monarch who initially exiled Nawab due to class division, but later crowns him savior of the realm.
- Shadow Horde Warlord: Ruthless invader threatening the kingdom.

Generate authentic, rich, dramatic content. Provide both Urdu (in clean Urdu script) and English translations or bilingual format where appropriate.`;

    let contents = '';

    if (action === 'generate_dialogue') {
      contents = `Generate an intense, emotional, and cinematic dialogue scene for Scene ${sceneId}: "${sceneTitle}".
Context / specific note: ${prompt || 'Create cinematic dialogue between Nawab and the other characters.'}
Language preference: ${language || 'both'}.
Include character emotions, parentheticals [e.g., (whispering), (gazing at the dragon)], sound FX cues, and both Urdu dialogue and English translation.`;
    } else if (action === 'expand_scene') {
      contents = `Write an expanded Hollywood Director's Cut for Scene ${sceneId}: "${sceneTitle}".
Include:
1. Cinematic Slugline (e.g. EXT. MISTY ENCHANTED FOREST - DUSK)
2. Director's Visual Tone & Lighting Notes (camera shots, anamorphic lens details, atmosphere)
3. Extended Dramatic Urdu Narrative Prose (اردو متن)
4. English Screenplay Action Lines
5. Stunt & Special Effects (VFX) breakdown (Dragon flight dynamics, lightning sword physics)
Prompt customization: ${prompt || 'Deepen the emotional and visual stakes.'}`;
    } else if (action === 'trailer_voiceover') {
      contents = `Write an epic Hollywood theatrical movie trailer voiceover (2 minutes narration) for "The Dragon Guardian and The Kingdom's Love" starring Nawab.
Format with:
- Deep Voiceover lines in both dramatic Urdu and English
- Music cues (WAR DRUMS SWELL, BRASS RISER, THUNDER CRACK)
- Cut to black moments and title reveal.
Prompt context: ${prompt || 'Make it exhilarating, romantic, and heroic.'}`;
    } else {
      contents = `Create a custom movie scene or lore expansion for "The Dragon Guardian and The Kingdom's Love":
${prompt || 'Tell the legend of how the lightning sword was forged in the dragon storm.'}
Provide high quality bilingual Urdu & English text.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    res.json({
      success: true,
      text: response.text || 'No response generated.',
    });
  } catch (error: any) {
    console.error('Gemini screenplay error:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate screenplay content.',
    });
  }
});

// Setup Vite in dev mode or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
