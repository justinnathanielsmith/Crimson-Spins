
import { GoogleGenAI, Modality } from "@google/genai";

const CACHE_KEY = 'vampire_oracle_fortune_cache';
const MAX_CACHE_PER_TYPE = 20;

type FortuneType = 'win' | 'loss' | 'bargain_offer' | 'bargain_win' | 'bargain_loss';

interface CachedFortunes {
  win: string[];
  loss: string[];
  bargain_offer: string[];
  bargain_win: string[];
  bargain_loss: string[];
}

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  public enabled: boolean = false; // Disabled by default
  private cache: CachedFortunes = { 
    win: [
      "The blood moon smiles upon your greed.",
      "Lifeblood flows into your coffers.",
      "A crimson harvest for a dark soul.",
      "The night rewards those who dare."
    ], 
    loss: [
      "The abyss hungers for your remaining soul.",
      "Empty chalices, empty veins.",
      "Fate turns its cold gaze away.",
      "Not a drop for the thirsty."
    ],
    bargain_offer: [
      "Two chalices. One doubles the feast, one drains the soul. Choose.",
      "Will you risk your essence for a greater harvest?",
      "The shadows offer a deal. Do you accept?"
    ],
    bargain_win: [
      "Fate is your slave this night.",
      "You have outsmarted the shadows.",
      "The blood runs sweet and double."
    ],
    bargain_loss: [
      "The shadows have claimed their due.",
      "Greed was your undoing.",
      "Drained of all your worth."
    ]
  };

  constructor() {
    this.loadCache();
  }

  private initAI() {
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
  }

  private loadCache() {
    try {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.cache = {
          win: [...new Set([...this.cache.win, ...(parsed.win || [])])],
          loss: [...new Set([...this.cache.loss, ...(parsed.loss || [])])],
          bargain_offer: [...new Set([...this.cache.bargain_offer, ...(parsed.bargain_offer || [])])],
          bargain_win: [...new Set([...this.cache.bargain_win, ...(parsed.bargain_win || [])])],
          bargain_loss: [...new Set([...this.cache.bargain_loss, ...(parsed.bargain_loss || [])])],
        };
      }
    } catch (e) {
      // Silent fail
    }
  }

  private saveCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
    } catch (e) {
      // Silent fail
    }
  }

  private getFromCache(type: FortuneType): string {
    const list = this.cache[type];
    return list[Math.floor(Math.random() * list.length)];
  }

  private addToCache(type: FortuneType, fortune: string) {
    if (fortune && !this.cache[type].includes(fortune)) {
      this.cache[type].unshift(fortune);
      this.cache[type] = this.cache[type].slice(0, MAX_CACHE_PER_TYPE);
      this.saveCache();
    }
  }

  async getVampireOracleFortune(winAmount: number, symbols: string[]): Promise<string> {
    const type: FortuneType = winAmount > 0 ? 'win' : 'loss';
    if (!this.enabled) return this.getFromCache(type);

    this.initAI();
    const prompt = `You are a cryptic, ancient, and sinister Vampire Oracle in a gothic slot machine game. 
    Symbols landed: ${symbols.join(', ')}. Payout: ${winAmount} coins.
    ${winAmount > 0 ? 'Give a dark blessing.' : 'Give a mocking, thirsty remark.'}
    Max 20 words, medieval-gothic style. No emojis.`;

    try {
      const response = await this.ai!.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { temperature: 0.9, topP: 0.9 }
      });
      const text = response.text?.trim();
      if (text) {
        this.addToCache(type, text);
        return text;
      }
    } catch (error) {
      console.warn("Gemini Oracle unavailable (Quota or Network). Using cache.");
    }
    return this.getFromCache(type);
  }

  async getBargainPrompt(amount: number): Promise<string> {
    if (!this.enabled) return this.getFromCache('bargain_offer');

    this.initAI();
    const prompt = `Sinister Vampire Oracle. Player won ${amount}. Invite them to "Dark Bargain" (double or nothing).
    Choice: "Chalice of Sanguine" or "Chalice of Shadow". Gothic, max 15 words.`;

    try {
      const response = await this.ai!.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { temperature: 1 }
      });
      const text = response.text?.trim();
      if (text) {
        this.addToCache('bargain_offer', text);
        return text;
      }
    } catch (e) {
      // Silent fail
    }
    return this.getFromCache('bargain_offer');
  }

  async getBargainOutcome(won: boolean, amount: number): Promise<string> {
    const type: FortuneType = won ? 'bargain_win' : 'bargain_loss';
    if (!this.enabled) return this.getFromCache(type);

    this.initAI();
    const prompt = `Vampire Oracle. Player ${won ? 'won' : 'lost'} gamble of ${amount}. ${won ? 'Sinister congrats' : 'Cruel mockery'}. Max 12 words, gothic.`;

    try {
      const response = await this.ai!.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { temperature: 1 }
      });
      const text = response.text?.trim();
      if (text) {
        this.addToCache(type, text);
        return text;
      }
    } catch (e) {
      // Silent fail
    }
    return this.getFromCache(type);
  }

  async generateOracleVoice(text: string): Promise<string | null> {
    if (!this.enabled || !text) return null;
    
    this.initAI();
    try {
      const response = await this.ai!.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Deep, ancient vampire voice: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Charon' },
            },
          },
        },
      });
      return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    } catch (error) {
      return null;
    }
  }
}

export const geminiService = new GeminiService();

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
