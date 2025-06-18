'use client'

import { useState, useEffect } from 'react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function WeglotDemo() {
  const [isVisualEditorMode, setIsVisualEditorMode] = useState(false)
  
  // Dynamic content states
  const [showModal, setShowModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [dynamicCards, setDynamicCards] = useState<Array<{
    id: number
    title: string
    description: string
    price: string
    badge: string
  }>>([])
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number
    text: string
    sender: string
    timestamp: string
  }>>([])
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // Check if we're in visual editor mode
    const urlParams = new URLSearchParams(window.location.search)
    setIsVisualEditorMode(urlParams.get('weglot_mode') === 'translate')
  }, [])

  useEffect(() => {
    // Load Weglot script first
    const weglotScript = document.createElement('script')
    weglotScript.src = 'https://cdn.weglot.com/weglot.min.js'
    weglotScript.async = true
    weglotScript.onload = () => {
      // Initialize Weglot after script loads
      setTimeout(() => {
                  if (window.Weglot) {
            window.Weglot.initialize({
              api_key: 'wg_ee88fe9620369bb6fc8ecdabbcc819301',
              original_language: 'en',
              destination_languages: 'fr,es,de,it',
              cache: true,
              auto_switch: false,
              // VISUAL EDITOR CONFIGURATION - Simplified for better compatibility
              switchers: [{
                button_style: {
                  full_name: true,
                  with_name: true,
                  is_dropdown: true,
                  with_flags: true,
                  flag_type: 'rectangle'
                },
                location: {
                  target: '#weglot-switcher',
                  sibling: null
                }
              }],
              // Essential visual editor settings
              dynamic: true,
              translate_search: true
            })
          // Weglot loaded successfully
          console.log('✅ Weglot initialized successfully')
        } else {
          console.error('❌ Weglot not available after script load')
        }
      }, 100)
    }
    weglotScript.onerror = () => {
      console.error('❌ Failed to load Weglot script')
    }
    document.head.appendChild(weglotScript)

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[src*="weglot"]')
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [])

  const openWeglotDashboard = () => {
    // Open Weglot dashboard in a new tab with instructions
    const currentUrl = window.location.href
    const dashboardUrl = 'https://weglot.com/dashboard'
    
    // Show instructions
    alert(
      'Opening Weglot Dashboard...\n\n' +
      'To use the Visual Editor:\n' +
      '1. In the new tab, go to Projects → Visual Editor\n' +
      '2. Enter this page URL: ' + currentUrl + '\n' +
      '3. The visual editor will load your page with edit capabilities\n\n' +
      'Note: The visual editor runs on Weglot&apos;s platform, not directly on your website.'
    )
    
    // Open dashboard in new tab
    window.open(dashboardUrl, '_blank')
  }

  // Dynamic content functions
  const addDynamicCard = () => {
    const newCard = {
      id: Date.now(),
      title: `Dynamic Product ${dynamicCards.length + 1}`,
      description: `This is a dynamically added product card. It was created at ${new Date().toLocaleTimeString()} and should be translatable by Weglot.`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      badge: 'New Arrival'
    }
    setDynamicCards([...dynamicCards, newCard])
  }

  const addChatMessage = () => {
    const messages = [
      'Hello! How can I help you today?',
      'I am interested in your products.',
      'Great! We have amazing deals running this week.',
      'Can you tell me more about pricing?',
      'Absolutely! Our plans start from $19/month.',
      'That sounds perfect for my needs!'
    ]
    const newMessage = {
      id: Date.now(),
      text: messages[chatMessages.length % messages.length],
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Visual Editor Focus */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <h1 className="ml-3 text-xl font-semibold text-gray-900">Weglot Visual Editor Demo</h1>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isVisualEditorMode 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                <span className={`w-2 h-2 mr-1 rounded-full ${
                  isVisualEditorMode ? 'bg-orange-400' : 'bg-green-400'
                }`}></span>
                {isVisualEditorMode ? 'Visual Editor Mode Active' : 'Live Translation Active'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div id="weglot-switcher"></div>
              <LanguageSwitcher service="weglot" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Visual Editor Showcase */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎨 Weglot Visual Editor Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the power of in-context translation editing. Click on any text element to translate it directly on the page - no switching between interfaces!
            </p>
            <div className={`mt-4 p-4 border rounded-lg max-w-2xl mx-auto ${
              isVisualEditorMode 
                ? 'bg-orange-50 border-orange-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <p className={`text-sm ${isVisualEditorMode ? 'text-orange-800' : 'text-blue-800'}`}>
                {isVisualEditorMode ? (
                  <>
                    <strong>🎯 Visual Editor Active:</strong> You&apos;re now in Weglot&apos;s visual editor mode! 
                    Look for edit icons on translatable content. Click on any text to edit translations directly.
                  </>
                ) : (
                  <>
                    <strong>🔥 Live Demo:</strong> This page is connected to a real Weglot account! 
                    Try switching languages using the language switcher above to see live translations in action.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Visual Editor Demo Button */}
          <div className="text-center mb-8">
            <div className="space-y-4">
              <button
                onClick={openWeglotDashboard}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open Weglot Dashboard
              </button>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-blue-800">
                  <strong>💡 How it works:</strong> Weglot&apos;s visual editor runs on their platform. Click the button above to open your Weglot dashboard, 
                  then navigate to Projects → Visual Editor and enter this page&apos;s URL to edit translations in context.
                </p>
              </div>
            </div>
          </div>

          {/* Sample Content for Visual Editing */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer" title="Click to translate in visual editor">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome to Our Platform
                </h3>
                <p className="text-gray-600">
                  Discover amazing features that will transform your business. Our innovative solutions are designed to help you succeed in today&apos;s competitive market.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer" title="Click to translate in visual editor">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Customer Success Stories
                </h3>
                <p className="text-gray-600">
                  &quot;This platform has revolutionized how we work. The results speak for themselves - 300% increase in productivity!&quot;
                </p>
                <p className="text-sm text-gray-500 mt-2">- Sarah Johnson, CEO</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer" title="Click to translate in visual editor">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Get Started Today
                </h3>
                <p className="text-gray-600 mb-4">
                  Join thousands of satisfied customers who have already transformed their business with our solutions.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer" title="Click to translate in visual editor">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  24/7 Support Available
                </h3>
                <p className="text-gray-600">
                  Our dedicated support team is here to help you every step of the way. Contact us anytime for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Editor Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Visual Editor Key Features</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Click-to-Edit</h4>
              <p className="text-sm text-gray-600">
                Click any text element on your live website to translate it instantly
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Preview</h4>
              <p className="text-sm text-gray-600">
                See translations applied immediately as you type, with full context
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Team Collaboration</h4>
              <p className="text-sm text-gray-600">
                Multiple translators can work simultaneously with role-based access
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Visual Editor Implementation</h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">1. Enable Visual Editor in Weglot Dashboard</h4>
              <p className="text-gray-600 mb-3">
                In your Weglot dashboard, navigate to Settings → Visual Editor and enable the feature.
              </p>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`// Visual Editor is automatically enabled when you:`}<br/>
                  {`// 1. Have a valid Weglot subscription`}<br/>
                  {`// 2. Include the Weglot script on your pages`}<br/>
                  {`// 3. Set editor_button: true in configuration`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">2. Configure Visual Editor Options</h4>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`Weglot.initialize({`}<br/>
                  {`  api_key: 'your_api_key',`}<br/>
                  {`  // Enable visual editor features`}<br/>
                  {`  editor_button: true,`}<br/>
                  {`  translate_search: true,`}<br/>
                  {`  dynamic: true,`}<br/>
                  {`  exceptions: '#no-translate'`}<br/>
                  {`});`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">3. Access Visual Editor</h4>
              <p className="text-gray-600 mb-3">
                The visual editor is accessed through the Weglot platform:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Go to your Weglot Dashboard at <code className="bg-white px-2 py-1 rounded">weglot.com/dashboard</code></li>
                <li>Navigate to Projects → Visual Editor</li>
                <li>Enter your website URL to load it in the visual editor</li>
                <li>Click on any text element to edit translations in context</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Content Testing Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🧪 Dynamic Content Testing</h3>
          <p className="text-gray-600 mb-6">
            Test how Weglot handles content that is dynamically added to the page after initial load. 
            This is crucial for modern web applications with dynamic content.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Dynamic Cards Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Dynamic Product Cards</h4>
                <button
                  onClick={addDynamicCard}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  Add New Card
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dynamicCards.map((card) => (
                  <div key={card.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-gray-900">{card.title}</h5>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{card.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">{card.price}</span>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
                {dynamicCards.length === 0 && (
                  <p className="text-gray-500 text-center py-8 italic">
                    No dynamic cards yet. Click &quot;Add New Card&quot; to test dynamic content translation.
                  </p>
                )}
              </div>
            </div>

            {/* Dynamic Chat Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Live Chat Simulation</h4>
                <button
                  onClick={addChatMessage}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
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
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  {chatMessages.length === 0 && (
                    <p className="text-gray-500 text-center py-8 italic">
                      No messages yet. Click &quot;Send Message&quot; to start a conversation.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal and Tooltip Tests */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Interactive Elements</h4>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Open Modal
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Toggle Tooltip
                </button>
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap">
                    This is a dynamic tooltip that appears on demand!
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                {showForm ? 'Hide Form' : 'Show Dynamic Form'}
              </button>
            </div>

            {/* Dynamic Form */}
            {showForm && (
              <div className="mt-6 p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                <h5 className="font-semibold text-gray-900 mb-4">Dynamic Contact Form</h5>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                      placeholder="Tell us about your inquiry..."
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Submit Form
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
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
                <h3 className="text-xl font-bold text-gray-900">Dynamic Modal</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                This modal content was dynamically rendered and should be translatable by Weglot. 
                The modal includes various interactive elements to test translation coverage.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="text-blue-800 text-sm">
                    <strong>Info:</strong> Dynamic content like this modal tests real-world scenarios.
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Close Modal
                  </button>
                  <button
                    onClick={() => {
                      alert('Action completed!')
                      setShowModal(false)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Take Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
