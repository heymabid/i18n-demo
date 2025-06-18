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
  const [previewMode, setPreviewMode] = useState(true) // New: for non-authenticated users
  
  // Dynamic content states
  const [showModal, setShowModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [dynamicCards, setDynamicCards] = useState<Array<{
    id: number
    slug: string
    title: string
    description: string
    price: string
    badge: string
  }>>([])
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number
    slug: string
    text: string
    sender: string
    timestamp: string
  }>>([])
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [showForm, setShowForm] = useState(false)

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

  // Auto-detect dynamic Lokalise content
  useEffect(() => {
    // Create a MutationObserver to watch for new data-lokalise elements
    const observer = new MutationObserver((mutations) => {
      let hasNewLokaliseElements = false
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              // Check if the added element or its children have data-lokalise attributes
              if (element.hasAttribute?.('data-lokalise') || 
                  element.querySelector?.('[data-lokalise]')) {
                hasNewLokaliseElements = true
              }
            }
          })
        }
      })
      
      // If new Lokalise elements were found, notify Lokalise to update
      if (hasNewLokaliseElements) {
        console.log('🔄 Auto-detected new Lokalise elements, refreshing...')
        document.dispatchEvent(new Event('lokalise-update-elements'))
      }
    })
    
    // Start observing the entire document for dynamic content
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    // Cleanup on unmount
    return () => observer.disconnect()
  }, [])

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
      setPreviewMode(!event.detail.authenticated) // Enable preview mode when not authenticated
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

  // Dynamic content functions
  const addDynamicCard = () => {
    const productNumber = dynamicCards.length + 1
    const slug = `product-${productNumber}`
    const newCard = {
      id: Date.now(),
      slug: slug,
      title: `Dynamic Product ${productNumber}`,
      description: `This is a dynamically added product card. It was created at ${new Date().toLocaleTimeString()} and should be translatable by Lokalise LiveJS.`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      badge: 'New Arrival'
    }
    setDynamicCards([...dynamicCards, newCard])
  }

  const addChatMessage = () => {
    const messageData = [
      { text: 'Hello! How can I help you today?', slug: 'greeting' },
      { text: 'I am interested in your products.', slug: 'interest' },
      { text: 'Great! We have amazing deals running this week.', slug: 'deals' },
      { text: 'Can you tell me more about pricing?', slug: 'pricing-question' },
      { text: 'Absolutely! Our plans start from $19/month.', slug: 'pricing-answer' },
      { text: 'That sounds perfect for my needs!', slug: 'satisfaction' }
    ]
    
    const messageIndex = chatMessages.length % messageData.length
    const selectedMessage = messageData[messageIndex]
    
    const newMessage = {
      id: Date.now(),
      slug: selectedMessage.slug,
      text: selectedMessage.text,
      sender: chatMessages.length % 2 === 0 ? 'support' : 'user',
      timestamp: new Date().toLocaleTimeString()
    }
    setChatMessages([...chatMessages, newMessage])
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`)
    setFormData({ name: '', email: '', message: '' })
    setShowForm(false)
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

            {previewMode && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Preview Mode</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p><strong>Language Switching Limitation:</strong> Lokalise LiveJS requires authentication to switch languages.</p>
                      <p className="mt-1"><strong>Missing Translation Behavior:</strong> When translations don&apos;t exist, content disappears instead of showing fallback text.</p>
                      <p className="mt-1"><strong>This is normal behavior</strong> - LiveJS is designed for translators, not end users.</p>
                    </div>
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

          {/* Dynamic Content Testing Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 
              className="text-2xl font-bold text-gray-900 mb-6"
              data-lokalise 
              data-key="dynamic.section.title"
            >
              🧪 Dynamic Content Testing
            </h3>
            <p 
              className="text-gray-600 mb-6"
              data-lokalise 
              data-key="dynamic.section.description"
            >
              Test how Lokalise LiveJS handles content that is dynamically added to the page after initial load. 
              This is crucial for modern web applications with dynamic content.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dynamic Cards Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 
                    className="text-lg font-semibold text-gray-900"
                    data-lokalise 
                    data-key="dynamic.cards.section_title"
                  >
                    Dynamic Product Cards
                  </h4>
                  <button
                    onClick={addDynamicCard}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                    data-lokalise 
                    data-key="dynamic.cards.add_button"
                  >
                    Add New Card
                  </button>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {dynamicCards.map((card) => (
                    <div key={card.id} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <h5 
                          className="font-semibold text-gray-900"
                          data-lokalise 
                          data-key={`dynamic.card.title.${card.slug}`}
                        >
                          {card.title}
                        </h5>
                        <span 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                          data-lokalise 
                          data-key={`dynamic.card.badge.${card.slug}`}
                        >
                          {card.badge}
                        </span>
                      </div>
                      <p 
                        className="text-gray-600 text-sm mb-2"
                        data-lokalise 
                        data-key={`dynamic.card.description.${card.slug}`}
                      >
                        {card.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{card.price}</span>
                        <button 
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                          data-lokalise 
                          data-key="dynamic.card.add_to_cart"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                  {dynamicCards.length === 0 && (
                    <p 
                      className="text-gray-500 text-center py-8 italic"
                      data-lokalise 
                      data-key="dynamic.cards.empty_state"
                    >
                      No dynamic cards yet. Click &quot;Add New Card&quot; to test dynamic content translation.
                    </p>
                  )}
                </div>
              </div>

              {/* Dynamic Chat Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 
                    className="text-lg font-semibold text-gray-900"
                    data-lokalise 
                    data-key="dynamic.chat.section_title"
                  >
                    Live Chat Simulation
                  </h4>
                  <button
                    onClick={addChatMessage}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
                    data-lokalise 
                    data-key="dynamic.chat.send_button"
                  >
                    Send Message
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-900 border'
                          }`}
                        >
                          <p 
                            className="text-sm"
                            data-lokalise 
                            data-key={`dynamic.chat.message.${message.slug}`}
                          >
                            {message.text}
                          </p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    {chatMessages.length === 0 && (
                      <p 
                        className="text-gray-500 text-center py-8 italic"
                        data-lokalise 
                        data-key="dynamic.chat.empty_state"
                      >
                        No messages yet. Click &quot;Send Message&quot; to start a conversation.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal and Tooltip Tests */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 
                className="text-lg font-semibold text-gray-900 mb-4"
                data-lokalise 
                data-key="dynamic.interactive.section_title"
              >
                Interactive Elements
              </h4>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  data-lokalise 
                  data-key="dynamic.buttons.open_modal"
                >
                  Open Modal
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    data-lokalise 
                    data-key="dynamic.buttons.toggle_tooltip"
                  >
                    Toggle Tooltip
                  </button>
                  {showTooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap">
                      <span 
                        data-lokalise 
                        data-key="dynamic.tooltip.text"
                      >
                        This is a dynamic tooltip that appears on demand!
                      </span>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                  data-lokalise 
                  data-key={showForm ? "dynamic.buttons.hide_form" : "dynamic.buttons.show_form"}
                >
                  {showForm ? 'Hide Form' : 'Show Dynamic Form'}
                </button>
              </div>

              {/* Dynamic Form */}
              {showForm && (
                <div className="mt-6 p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <h5 
                    className="font-semibold text-gray-900 mb-4"
                    data-lokalise 
                    data-key="dynamic.form.title"
                  >
                    Dynamic Contact Form
                  </h5>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label 
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-lokalise 
                        data-key="dynamic.form.name.label"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your full name"
                        data-lokalise 
                        data-key="dynamic.form.name.placeholder" 
                        data-type-placeholder
                        required
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-lokalise 
                        data-key="dynamic.form.email.label"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="your@email.com"
                        data-lokalise 
                        data-key="dynamic.form.email.placeholder" 
                        data-type-placeholder
                        required
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm font-medium text-gray-700 mb-1"
                        data-lokalise 
                        data-key="dynamic.form.message.label"
                      >
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                        placeholder="Tell us about your inquiry..."
                        data-lokalise 
                        data-key="dynamic.form.message.placeholder" 
                        data-type-placeholder
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                        data-lokalise 
                        data-key="dynamic.form.submit"
                      >
                        Submit Form
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        data-lokalise 
                        data-key="dynamic.form.cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 
                    className="text-xl font-bold text-gray-900"
                    data-lokalise 
                    data-key="dynamic.modal.title"
                  >
                    Dynamic Modal
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p 
                  className="text-gray-600 mb-6"
                  data-lokalise 
                  data-key="dynamic.modal.description"
                >
                  This modal content was dynamically rendered and should be translatable by Lokalise LiveJS. 
                  The modal includes various interactive elements to test translation coverage.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p 
                      className="text-blue-800 text-sm"
                      data-lokalise 
                      data-key="dynamic.modal.info"
                    >
                      <strong>Info:</strong> Dynamic content like this modal tests real-world scenarios.
                    </p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      data-lokalise 
                      data-key="dynamic.modal.close"
                    >
                      Close Modal
                    </button>
                    <button
                      onClick={() => {
                        alert('Action completed!')
                        setShowModal(false)
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      data-lokalise 
                      data-key="dynamic.modal.action"
                    >
                      Take Action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
