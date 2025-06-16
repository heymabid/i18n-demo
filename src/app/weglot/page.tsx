'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function WeglotDemo() {
  const [isWeglotLoaded, setIsWeglotLoaded] = useState(false)
  const [showVisualEditor, setShowVisualEditor] = useState(false)
  const [isVisualEditorMode, setIsVisualEditorMode] = useState(false)

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
          setIsWeglotLoaded(true)
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
      'Note: The visual editor runs on Weglot\'s platform, not directly on your website.'
    )
    
    // Open dashboard in new tab
    window.open(dashboardUrl, '_blank')
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
                  Discover amazing features that will transform your business. Our innovative solutions are designed to help you succeed in today's competitive market.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer" title="Click to translate in visual editor">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Customer Success Stories
                </h3>
                <p className="text-gray-600">
                  "This platform has revolutionized how we work. The results speak for themselves - 300% increase in productivity!"
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
      </div>
    </div>
  )
} 
