/**
 * Synthesizes cinematic audio soundscapes via Web Audio API
 * and provides speech synthesis narration for bilingual Urdu & English.
 */

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentPreset: string | null = null;
  private nodes: AudioNode[] = [];
  private intervalIds: number[] = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    } else if (this.currentPreset) {
      this.playPreset(this.currentPreset as any);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public stop() {
    // Clear all scheduled intervals
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];

    // Stop and disconnect nodes
    this.nodes.forEach((n) => {
      try {
        if ('stop' in n && typeof (n as any).stop === 'function') {
          (n as any).stop();
        }
        if ('disconnect' in n && typeof (n as any).disconnect === 'function') {
          (n as any).disconnect();
        }
      } catch (e) {
        // ignore already stopped
      }
    });
    this.nodes = [];
  }

  public playPreset(preset: 'forest' | 'palace' | 'exile' | 'battle') {
    this.currentPreset = preset;
    if (this.isMuted) return;

    this.initCtx();
    if (!this.ctx) return;

    this.stop();

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.35, now + 1.5);
    masterGain.connect(this.ctx.destination);
    this.nodes.push(masterGain);

    if (preset === 'forest') {
      // 1. Mystical Forest Drone (55Hz and 110Hz warm sine waves with lowpass)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now); // A1

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, now); // A2

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);
      filter.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      this.nodes.push(osc1, osc2, filter, gain);

      // Rain / foliage pink-noise simulation
      this.createNoiseLayer(masterGain, 0.05, 800, 'bandpass');
    } else if (preset === 'palace') {
      // 2. Royal Palace Courtyard - Gentle crystalline harp / chime arpeggios
      const padOsc = this.ctx.createOscillator();
      padOsc.type = 'sine';
      padOsc.frequency.setValueAtTime(146.83, now); // D3

      const padGain = this.ctx.createGain();
      padGain.gain.setValueAtTime(0.12, now);
      padOsc.connect(padGain);
      padGain.connect(masterGain);
      padOsc.start(now);
      this.nodes.push(padOsc, padGain);

      // Periodic gentle harp note
      const notes = [293.66, 369.99, 440.0, 587.33, 739.99]; // D major pentatonic
      let noteIndex = 0;
      const interval = window.setInterval(() => {
        if (!this.ctx || this.isMuted) return;
        const curTime = this.ctx.currentTime;
        const noteOsc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(notes[noteIndex % notes.length], curTime);
        noteIndex++;

        noteGain.gain.setValueAtTime(0.001, curTime);
        noteGain.gain.exponentialRampToValueAtTime(0.08, curTime + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, curTime + 2.2);

        noteOsc.connect(noteGain);
        noteGain.connect(masterGain);
        noteOsc.start(curTime);
        noteOsc.stop(curTime + 2.3);
      }, 1600);
      this.intervalIds.push(interval);
    } else if (preset === 'exile') {
      // 3. Heartbreaking Exile Campfire - low cello drone + wind sweep + campfire crackle
      const cello = this.ctx.createOscillator();
      cello.type = 'sawtooth';
      cello.frequency.setValueAtTime(65.41, now); // C2

      const celloFilter = this.ctx.createBiquadFilter();
      celloFilter.type = 'lowpass';
      celloFilter.frequency.setValueAtTime(180, now);

      const celloGain = this.ctx.createGain();
      celloGain.gain.setValueAtTime(0.15, now);

      cello.connect(celloFilter);
      celloFilter.connect(celloGain);
      celloGain.connect(masterGain);
      cello.start(now);
      this.nodes.push(cello, celloFilter, celloGain);

      // Campfire crackle bursts
      const crackleInterval = window.setInterval(() => {
        if (!this.ctx || this.isMuted) return;
        if (Math.random() > 0.4) {
          const t = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(400 + Math.random() * 800, t);
          g.gain.setValueAtTime(0.04, t);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
          osc.connect(g);
          g.connect(masterGain);
          osc.start(t);
          osc.stop(t + 0.09);
        }
      }, 250);
      this.intervalIds.push(crackleInterval);
    } else if (preset === 'battle') {
      // 4. Climax War of Sky & Fire - Mighty War Drum pulse + Lightning Surge
      const subBass = this.ctx.createOscillator();
      subBass.type = 'triangle';
      subBass.frequency.setValueAtTime(48, now);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.2, now);
      subBass.connect(subGain);
      subGain.connect(masterGain);
      subBass.start(now);
      this.nodes.push(subBass, subGain);

      // War drum rhythm (beats every 800ms)
      const drumInterval = window.setInterval(() => {
        if (!this.ctx || this.isMuted) return;
        const t = this.ctx.currentTime;
        // Strike 1: Heavy sub thud
        const drumOsc = this.ctx.createOscillator();
        const drumGain = this.ctx.createGain();
        drumOsc.type = 'sine';
        drumOsc.frequency.setValueAtTime(120, t);
        drumOsc.frequency.exponentialRampToValueAtTime(32, t + 0.3);

        drumGain.gain.setValueAtTime(0.4, t);
        drumGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        drumOsc.connect(drumGain);
        drumGain.connect(masterGain);
        drumOsc.start(t);
        drumOsc.stop(t + 0.55);
      }, 900);
      this.intervalIds.push(drumInterval);
    }
  }

  // Helper for ambient noise layers (rain, wind, mist)
  private createNoiseLayer(destination: AudioNode, volume: number, freq: number, type: BiquadFilterType) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    noise.start();
    this.nodes.push(noise, filter, gain);
  }

  // Trigger a lightning electric crackle sound effect
  public playLightningSFX() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.linearRampToValueAtTime(120, t + 0.4);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(400, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.5);
  }
}

export const audioEngine = new CinematicAudioEngine();

// Speech Synthesis Helper
export function speakNarrative(
  text: string,
  lang: 'ur' | 'en',
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (!('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = lang === 'ur' ? 0.9 : 0.95;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  if (lang === 'ur') {
    const urVoice = voices.find((v) => v.lang.startsWith('ur') || v.lang.startsWith('ar') || v.name.toLowerCase().includes('urdu'));
    if (urVoice) {
      utterance.voice = urVoice;
    }
    utterance.lang = 'ur-PK';
  } else {
    const enVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Google')));
    if (enVoice) {
      utterance.voice = enVoice;
    }
    utterance.lang = 'en-US';
  }

  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
