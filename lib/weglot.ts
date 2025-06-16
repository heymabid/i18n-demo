// Weglot Integration
declare global {
  interface Window {
    Weglot?: {
      initialize: (config: { api_key: string; [key: string]: unknown }) => void;
      switchTo: (languageCode: string) => void;
      getCurrentLang: () => string;
      getLanguages: () => Array<{ code: string; name: string }>;
    };
  }
}

export interface WeglotConfig {
  api_key: string;
  originalLanguage?: string;
  destinationLanguages?: string[];
  cache?: boolean;
  autoSwitch?: boolean;
}

export class WeglotService {
  private config: WeglotConfig;
  private isInitialized = false;

  constructor(config: WeglotConfig) {
    this.config = config;
  }

  // Load Weglot script dynamically
  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.Weglot) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.weglot.com/weglot.min.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Weglot script'));
      document.head.appendChild(script);
    });
  }

  // Initialize Weglot
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.loadScript();
      
      if (window.Weglot) {
        window.Weglot.initialize({
          api_key: this.config.api_key,
          original_language: this.config.originalLanguage || 'en',
          destination_languages: this.config.destinationLanguages || ['fr', 'es', 'de'],
          cache: this.config.cache ?? true,
          auto_switch: this.config.autoSwitch ?? false
        });
        
        this.isInitialized = true;
        console.log('✅ Weglot initialized successfully');
      } else {
        throw new Error('Weglot script loaded but Weglot object not available');
      }
    } catch (error) {
      console.error('❌ Failed to initialize Weglot:', error);
      throw error;
    }
  }

  // Switch language
  switchLanguage(languageCode: string): void {
    if (!this.isInitialized || !window.Weglot) {
      console.warn('⚠️ Weglot not initialized');
      return;
    }
    window.Weglot.switchTo(languageCode);
  }

  // Get current language
  getCurrentLanguage(): string {
    if (!this.isInitialized || !window.Weglot) {
      return 'en'; // default
    }
    return window.Weglot.getCurrentLang();
  }

  // Get available languages
  getAvailableLanguages(): Array<{ code: string; name: string }> {
    if (!this.isInitialized || !window.Weglot) {
      return [{ code: 'en', name: 'English' }]; // default
    }
    return window.Weglot.getLanguages();
  }
}

// Create singleton instance
export const weglotService = new WeglotService({
  api_key: process.env.NEXT_PUBLIC_WEGLOT_API_KEY || 'wg_ee88fe9620369bb6fc8ecdabbcc819301',
  originalLanguage: 'en',
  destinationLanguages: ['fr', 'es', 'de', 'it'],
  cache: true,
  autoSwitch: false
});

// Hook for React components
export const useWeglot = () => {
  const initializeWeglot = async () => {
    await weglotService.initialize();
  };

  const switchLanguage = (languageCode: string) => {
    weglotService.switchLanguage(languageCode);
  };

  const getCurrentLanguage = () => {
    return weglotService.getCurrentLanguage();
  };

  const getAvailableLanguages = () => {
    return weglotService.getAvailableLanguages();
  };

  return {
    initializeWeglot,
    switchLanguage,
    getCurrentLanguage,
    getAvailableLanguages
  };
}; 
