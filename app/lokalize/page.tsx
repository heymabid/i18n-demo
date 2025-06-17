'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'


// Define types for Lokalise
interface TranslationObject {
  key: string
  translation: string
  locale: string
  success?: boolean
  skipped?: boolean
  errorMessage?: string | null
}

interface UserInfo {
  name: string
  email: string
}

// Define the window interface for Lokalise
declare global {
  interface Window {
    LOKALISE_CONFIG: {
      projectId: string
      locale: string
      plainKey?: boolean
      plainKeyLeftWrapper?: string
      plainKeyRightWrapper?: string
      disableAdvancedHtml?: boolean
      usePanelOffset?: boolean
      onSave?: (
        updatedTranslations: TranslationObject[],
        skippedTranslations: TranslationObject[],
        dismissedTranslations: TranslationObject[],
        errorMessage: string | null
      ) => void
    }
  }
}

export default function LokalizeDemo() {
  const [isInContextMode, setIsInContextMode] = useState(false)
  const [currentLocale, setCurrentLocale] = useState('en')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isDropdownOpen && !target.closest('.relative')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Initialize Lokalise LiveJS
  useEffect(() => {
    // Configure Lokalise LiveJS
    window.LOKALISE_CONFIG = {
      projectId: "2737462568503fbe1a3da6.74461504", // Replace with your actual project ID
      locale: currentLocale,
      plainKey: false, // Using data attributes instead of plain keys
      usePanelOffset: true,

      onSave: (
        updatedTranslations,
        skippedTranslations,
        dismissedTranslations,
        errorMessage
      ) => {
        console.log("Translations updated:", updatedTranslations);
        console.log("Translations skipped:", skippedTranslations);
        console.log("Translations dismissed:", dismissedTranslations);
        if (errorMessage) {
          console.error("Error saving translations:", errorMessage);
        }

        // Here you could send the updates to your backend
        updatedTranslations.forEach((translation) => {
          // Example: Update your local database or files
          console.log(
            `Updating ${translation.key}: ${translation.translation}`
          );
        });
      },
    };

    // Listen for Lokalise events
    const handleLokaliseInitialized = () => {
      console.log('Lokalise LiveJS initialized')
      setIsInContextMode(true)
    }

    const handleLokaliseError = (event: CustomEvent) => {
      console.error('Lokalise Error:', event.detail)
      console.error('Full error event:', event)
      alert(`Lokalise Error: ${JSON.stringify(event.detail)}`)
    }

    const handleAuthStateChange = (event: CustomEvent) => {
      setIsAuthenticated(event.detail.authenticated)
      setUserInfo(event.detail.user)
    }

    const handleOnSave = (event: CustomEvent) => {
      console.log('Translation saved via event:', event.detail)
    }

    // Add event listeners
    document.addEventListener('lokalise-initialized', handleLokaliseInitialized)
    document.addEventListener('lokalise-on-auth-state-change', handleAuthStateChange as EventListener)
    document.addEventListener('lokalise-on-save', handleOnSave as EventListener)
    document.addEventListener('lokalise-on-save-error', handleLokaliseError as EventListener)

    // Check auth state
    const checkAuthState = () => {
      document.dispatchEvent(new Event('lokalise-check-auth-state'))
    }

    // Small delay to ensure script is loaded
    setTimeout(checkAuthState, 1000)

    return () => {
      document.removeEventListener('lokalise-initialized', handleLokaliseInitialized)
      document.removeEventListener('lokalise-on-auth-state-change', handleAuthStateChange as EventListener)
      document.removeEventListener('lokalise-on-save', handleOnSave as EventListener)
      document.removeEventListener('lokalise-on-save-error', handleLokaliseError as EventListener)
    }
  }, [currentLocale])

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale)
    setIsDropdownOpen(false)
    // Update Lokalise locale
    document.dispatchEvent(new CustomEvent('lokalise-update-locale', { detail: newLocale }))
  }



  return (
    <>
      {/* Lokalise LiveJS Script */}
      <Script
        src="https://app.lokalise.com/live-js/script.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Lokalise script loaded successfully')
        }}
        onError={(error) => {
          console.error('Failed to load Lokalise script:', error)
          alert('Failed to load Lokalise LiveJS. Check console for details.')
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <h1 className="ml-3 text-xl font-semibold text-gray-900">Lokalise LiveJS Demo</h1>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isInContextMode 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <span className={`w-2 h-2 mr-1 rounded-full ${
                    isInContextMode ? 'bg-green-400' : 'bg-gray-400'
                  }`}></span>
                  {isInContextMode ? 'LiveJS Active' : 'LiveJS Inactive'}
                </span>
                {isAuthenticated && userInfo && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    👤 {userInfo.name}
                  </span>
                )}
              </div>
                            <div className="flex items-center space-x-4">
                {/* Custom Language Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <span className="text-lg">{currentLanguage.flag}</span>
                    <span>{currentLanguage.name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => handleLocaleChange(language.code)}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-blue-50 transition-colors duration-150 ${
                              currentLocale === language.code
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-700 hover:text-blue-700'
                            }`}
                          >
                            <span className="text-lg">{language.flag}</span>
                            <span>{language.name}</span>
                            {currentLocale === language.code && (
                              <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🚀 Lokalise LiveJS In-Context Editor
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Edit translations directly on your live website with Lokalise LiveJS. See changes in real-time and collaborate with your translation team seamlessly.
              </p>
            </div>

            {/* Setup Instructions */}
            {!isAuthenticated && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">403 Forbidden - Authentication Required</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p><strong>Current Issue:</strong> You are not allowed to access this project.</p>
                      <p className="mt-1"><strong>Solutions:</strong></p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Log in to <a href="https://app.lokalise.com" target="_blank" rel="noopener noreferrer" className="underline">app.lokalise.com</a> first</li>
                        <li>Ensure you have admin/manager permissions for project ID: <code className="bg-red-100 px-1 rounded">2737462568503fbe1a3da6.74461504</code></li>
                        <li>Check that LiveJS is enabled in your project settings</li>
                        <li>Verify the project ID is correct</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isAuthenticated && userInfo && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      <strong>✅ Authenticated!</strong> Logged in as {userInfo.name} ({userInfo.email}).
                      You can now edit translations by clicking on any text below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Demo Content with Lokalise Data Attributes */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-lokalise 
                    data-key="hero.welcome.title"
                  >
                    Welcome to Our Platform
                  </h3>
                  <p 
                    className="text-gray-600"
                    data-lokalise 
                    data-key="hero.welcome.description"
                  >
                    Experience the power of real-time translation editing with Lokalise LiveJS. 
                    Edit this text directly in your browser and see changes instantly.
                  </p>
                </div>

                <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-lokalise 
                    data-key="features.collaboration.title"
                  >
                    Team Collaboration
                  </h3>
                  <p 
                    className="text-gray-600 mb-3"
                    data-lokalise 
                    data-key="features.collaboration.description"
                  >
                    Work together with your translation team in real-time. Comments, suggestions, 
                    and approvals happen directly on your live website.
                  </p>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    data-lokalise 
                    data-key="cta.learn_more"
                  >
                    Learn More
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-lokalise 
                    data-key="benefits.visual.title"
                  >
                    Visual Context
                  </h3>
                  <p 
                    className="text-gray-600"
                    data-lokalise 
                    data-key="benefits.visual.description"
                  >
                    See exactly how your translations will appear on the live website. 
                    No more guessing about layout, spacing, or design impact.
                  </p>
                </div>

                <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50">
                  <h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                    data-lokalise 
                    data-key="testimonial.title"
                  >
                    Customer Success
                  </h3>
                  <blockquote 
                    className="text-gray-600 italic mb-3"
                    data-lokalise 
                    data-key="testimonial.quote"
                  >
                    &quot;Lokalise LiveJS transformed our localization workflow. We reduced translation 
                    time by 60% and improved accuracy significantly.&quot;
                  </blockquote>
                  <p 
                    className="text-sm text-gray-500"
                    data-lokalise 
                    data-key="testimonial.author"
                  >
                    - Sarah Chen, Product Manager
                  </p>
                </div>
              </div>
            </div>

            {/* Form Example with Special Attributes */}
            <div className="mt-8 p-6 rounded-lg border-2 border-gray-200 bg-gray-50">
              <h3 
                className="text-xl font-semibold text-gray-900 mb-4"
                data-lokalise 
                data-key="form.contact.title"
              >
                Contact Form Example
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-lokalise 
                    data-key="form.name.label"
                  >
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your name"
                    data-lokalise 
                    data-key="form.name.placeholder" 
                    data-type-placeholder
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium text-gray-700 mb-1"
                    data-lokalise 
                    data-key="form.email.label"
                  >
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="your@email.com"
                    data-lokalise 
                    data-key="form.email.placeholder" 
                    data-type-placeholder
                  />
                </div>
              </div>
              <div className="mt-4">
                <label 
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-lokalise 
                  data-key="form.message.label"
                >
                  Message
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  placeholder="Tell us about your project..."
                  data-lokalise 
                  data-key="form.message.placeholder" 
                  data-type-placeholder
                ></textarea>
              </div>
              <button 
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                data-lokalise 
                data-key="form.submit.button"
                aria-label="Submit contact form"
                data-lokalise-aria
                data-key-aria="form.submit.aria_label"
                data-type-aria-label
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Instructions Panel */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use Lokalise LiveJS</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Setup Project</h4>
                <p className="text-sm text-gray-600">Configure your Lokalise project ID and ensure your team has proper access permissions.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Authenticate</h4>
                <p className="text-sm text-gray-600">Log in to Lokalise to activate the in-context editing capabilities.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Edit & Save</h4>
                <p className="text-sm text-gray-600">Click on any translatable text, edit directly, and save with Cmd/Ctrl+S.</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All text elements with <code>data-lokalise</code> attributes are editable</li>
                <li>• Form placeholders and ARIA labels are also translatable</li>
                <li>• Changes are saved to Lokalise, not your local files</li>
                <li>• Use the onSave callback to sync changes to your backend</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 
