
export class SoundManager {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    this.isMuted = localStorage.getItem('vampire_slots_muted') === 'true';
  }

  private async initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  async loadAll() {
    await this.initContext();
    console.log("Gothic Sound Engine Primed.");
  }

  play(name: string, loop: boolean = false): any {
    if (this.isMuted) return null;
    this.initContext();

    const ctx = this.audioContext!;
    const now = ctx.currentTime;

    switch (name) {
      case 'click':
        this.playClick(ctx, now);
        return null;
      case 'bet_adjust':
        this.playBetAdjust(ctx, now);
        return null;
      case 'spin':
        return this.startSpin(ctx, now);
      case 'win':
        this.playWin(ctx, now);
        return null;
      case 'loss':
        this.playLoss(ctx, now);
        return null;
      case 'bonus_start':
        this.playBonusStart(ctx, now);
        return null;
      case 'coffin_open':
        this.playStoneGrind(ctx, now);
        return null;
      case 'bat_swarm':
        this.playBatSwarm(ctx, now);
        return null;
      case 'hunter_found':
        this.playHunterSting(ctx, now);
        return null;
      default:
        return null;
    }
  }

  private playClick(ctx: AudioContext, now: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  private playBetAdjust(ctx: AudioContext, now: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  private startSpin(ctx: AudioContext, now: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    mod.type = 'sine';
    mod.frequency.setValueAtTime(8, now);
    modGain.gain.setValueAtTime(20, now);
    mod.connect(modGain);
    modGain.connect(osc.frequency);
    gain.gain.setValueAtTime(0.05, now);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    mod.start(now);
    return {
      stop: () => {
        const stopNow = ctx.currentTime;
        gain.gain.exponentialRampToValueAtTime(0.001, stopNow + 0.2);
        osc.stop(stopNow + 0.2);
        mod.stop(stopNow + 0.2);
      }
    };
  }

  private playWin(ctx: AudioContext, now: number) {
    const notes = [220, 261.63, 329.63, 440, 523.25];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const time = now + (i * 0.1);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.2, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 1.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 2);
    });
  }

  private playLoss(ctx: AudioContext, now: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 1.5);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.5);
  }

  private playBonusStart(ctx: AudioContext, now: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 1);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1);
  }

  private playStoneGrind(ctx: AudioContext, now: number) {
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.5);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  }

  private playBatSwarm(ctx: AudioContext, now: number) {
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const time = now + (i * 0.05);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 500, time);
      osc.frequency.exponentialRampToValueAtTime(2000, time + 0.2);
      gain.gain.setValueAtTime(0.05, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.2);
    }
  }

  private playHunterSting(ctx: AudioContext, now: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.linearRampToValueAtTime(40, now + 1);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('vampire_slots_muted', String(this.isMuted));
    return this.isMuted;
  }

  get muted() { return this.isMuted; }
  get context() { return this.audioContext; }
}

export const soundManager = new SoundManager();
