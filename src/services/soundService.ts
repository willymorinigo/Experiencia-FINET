/* POLISHED SOUNDS FROM CDN (Minimalist / Clean) */
const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  transition: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'
};

class SoundManager {
  private static instance: SoundManager;
  private audios: Map<string, HTMLAudioElement> = new Map();

  private constructor() {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.3;
      this.audios.set(key, audio);
    });
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public play(key: keyof typeof SOUNDS) {
    const audio = this.audios.get(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Handle browser autoplay policies
      });
    }
  }
}

export const soundManager = SoundManager.getInstance();
