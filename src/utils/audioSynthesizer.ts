/**
 * Procedural Web Audio API Synth Engine for Cinematic Ambient Reel Atmosphere.
 * Provides real-time synthesized cyberpunk ambient tones, chords, and frequency analysis
 * without requiring external audio asset files.
 */

class AmbientSynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private chordInterval: number | null = null;

  private chordProgressions = [
    [130.81, 196.00, 246.94, 293.66], // C min 9 (C3, G3, B3, D4)
    [116.54, 174.61, 220.00, 261.63], // Bb maj 7 (Bb2, F3, A3, C4)
    [103.83, 155.56, 196.00, 246.94], // Ab maj 7 (Ab2, Eb3, G3, B3)
    [146.83, 220.00, 261.63, 329.63], // D min 9 (D3, A3, C4, E4)
  ];
  private currentChordIndex = 0;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      // Lowpass Filter for warm, cinematic cyberpunk pad
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(480, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(3.5, this.ctx.currentTime);

      // Analyser for real-time visualizer waveform
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  public async toggle(): Promise<boolean> {
    this.init();
    if (!this.ctx || !this.masterGain || !this.filterNode) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  private start() {
    if (!this.ctx || !this.masterGain || !this.filterNode) return;
    this.isPlaying = true;

    // Fade in master gain smoothly
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.12, now + 1.2);

    this.playChord(this.currentChordIndex);

    // LFO to gently modulate filter cutoff for movement
    this.lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.lfo.frequency.setValueAtTime(0.2, now); // Slow breath
    lfoGain.gain.setValueAtTime(200, now);
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    this.lfo.start();

    // Loop through cinematic chords every 5.5 seconds
    this.chordInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgressions.length;
      this.playChord(this.currentChordIndex);
    }, 5500);
  }

  private playChord(index: number) {
    if (!this.ctx || !this.filterNode) return;

    // Stop old oscillators smoothly
    const now = this.ctx.currentTime;
    this.oscillators.forEach(osc => {
      try {
        osc.stop(now + 0.8);
      } catch {
        // ignore
      }
    });
    this.oscillators = [];

    const freqs = this.chordProgressions[index];
    freqs.forEach((freq, i) => {
      if (!this.ctx || !this.filterNode) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Alternate waveforms for warm texture
      osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      // Slight detune for analog cinematic warmth
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((i - 1.5) * 7, now);

      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(0.07 / freqs.length, now + 0.8);
      oscGain.gain.linearRampToValueAtTime(0.0001, now + 5.4);

      osc.connect(oscGain);
      oscGain.connect(this.filterNode);

      osc.start(now);
      this.oscillators.push(osc);
    });
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = false;
    const now = this.ctx.currentTime;

    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);

    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
    if (this.lfo) {
      try {
        this.lfo.stop(now + 0.7);
      } catch {
        // ignore
      }
      this.lfo = null;
    }
  }

  public getAudioFrequencyData(): Uint8Array {
    if (!this.analyser || !this.isPlaying) {
      return new Uint8Array(8).fill(0);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioSynth = new AmbientSynthEngine();
