'use client';

import { useState, useEffect } from 'react';
import { useWeglot } from '@/lib/weglot';

interface Language {
  code: string;
  name: string;
  flag?: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

interface LanguageSwitcherProps {
  service?: 'weglot' | 'crowdin';
  onLanguageChange?: (language: string) => void;
  className?: string;
}

export default function LanguageSwitcher({ 
  service = 'weglot', 
  onLanguageChange,
  className = '' 
}: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { initializeWeglot, switchLanguage, getCurrentLanguage } = useWeglot();

  useEffect(() => {
    if (service === 'weglot') {
      initializeWeglot().then(() => {
        setIsInitialized(true);
        setCurrentLanguage(getCurrentLanguage());
      }).catch(error => {
        console.warn('Weglot initialization failed:', error);
        setIsInitialized(false);
      });
    } else {
      setIsInitialized(true);
    }
  }, [service, initializeWeglot, getCurrentLanguage]);

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsOpen(false);

    switch (service) {
      case 'weglot':
        if (isInitialized) {
          switchLanguage(languageCode);
        }
        break;
      case 'crowdin':
        // Handle Crowdin language switching (would require page reload or custom implementation)
        console.log('Switching to', languageCode, 'with Crowdin');
        if (onLanguageChange) onLanguageChange(languageCode);
        break;

    }
  };

  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={!isInitialized && service === 'weglot'}
      >
        <span className="mr-2 text-lg">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center ${
                  currentLanguage === language.code
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700'
                }`}
                role="menuitem"
              >
                <span className="mr-3 text-lg">{language.flag}</span>
                <span>{language.name}</span>
                {currentLanguage === language.code && (
                  <svg
                    className="ml-auto h-4 w-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Service Status Indicator */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          isInitialized 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          <span className={`w-2 h-2 mr-1 rounded-full ${
            isInitialized ? 'bg-green-400' : 'bg-yellow-400'
          }`}></span>
          {service.charAt(0).toUpperCase() + service.slice(1)} {isInitialized ? 'Ready' : 'Loading'}
        </span>
      </div>
    </div>
  );
} 
