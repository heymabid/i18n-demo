'use client'

import { useState } from 'react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function CrowdinDemo() {
  const [isInContextMode, setIsInContextMode] = useState(false)
  const [selectedText, setSelectedText] = useState('')

  // Simulate Crowdin's in-context editor
  const enableInContextEditor = () => {
    setIsInContextMode(true)
    alert('🎨 Crowdin In-Context Editor Activated!\n\nIn production, this would:\n• Overlay translation interface on your live site\n• Allow translators to see content in real context\n• Enable collaborative editing with comments\n• Show translation progress in real-time')
  }

  const handleTextSelection = (text: string) => {
    if (isInContextMode) {
      setSelectedText(text)
      // In real implementation, this would open Crowdin's translation interface
      console.log('Selected for translation:', text)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <h1 className="ml-3 text-xl font-semibold text-gray-900">Crowdin Visual Editor Demo</h1>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isInContextMode 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <span className={`w-2 h-2 mr-1 rounded-full ${
                  isInContextMode ? 'bg-orange-400' : 'bg-gray-400'
                }`}></span>
                {isInContextMode ? 'In-Context Mode Active' : 'Preview Mode'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher service="crowdin" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Visual Editor Hero */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎯 Crowdin In-Context Editor
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Translate content directly on your live website with full context. See exactly how translations will look and collaborate with your team in real-time.
            </p>
          </div>

          {/* In-Context Editor Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={enableInContextEditor}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Enable In-Context Editor
            </button>
            
            {isInContextMode && (
              <button
                onClick={() => setIsInContextMode(false)}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Exit Editor Mode
              </button>
            )}
          </div>

          {/* Sample Content with In-Context Editing */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div 
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  isInContextMode 
                    ? 'border-orange-400 bg-orange-50 hover:bg-orange-100' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleTextSelection('Welcome to Our Global Platform')}
                title={isInContextMode ? 'Click to translate this text' : 'Enable in-context mode to translate'}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Welcome to Our Global Platform
                    </h3>
                    <p className="text-gray-600">
                      Experience seamless international business operations with our comprehensive suite of tools designed for global success.
                    </p>
                  </div>
                  {isInContextMode && (
                    <div className="ml-4 flex flex-col items-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✎</span>
                      </div>
                      <span className="text-xs text-orange-600 mt-1">Edit</span>
                    </div>
                  )}
                </div>
                {isInContextMode && (
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <div className="flex items-center text-sm text-orange-700">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Translated: 4/5 languages
                    </div>
                  </div>
                )}
              </div>

              <div 
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  isInContextMode 
                    ? 'border-orange-400 bg-orange-50 hover:bg-orange-100' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleTextSelection('Customer Testimonials')}
                title={isInContextMode ? 'Click to translate this text' : 'Enable in-context mode to translate'}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Customer Testimonials
                    </h3>
                    <p className="text-gray-600 mb-3">
                      &quot;This platform transformed our international operations. We saw a 250% increase in global engagement within the first quarter.&quot;
                    </p>
                    <p className="text-sm text-gray-500">- Maria Rodriguez, International Director</p>
                  </div>
                  {isInContextMode && (
                    <div className="ml-4 flex flex-col items-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✎</span>
                      </div>
                      <span className="text-xs text-orange-600 mt-1">Edit</span>
                    </div>
                  )}
                </div>
                {isInContextMode && (
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <div className="flex items-center text-sm text-orange-700">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Needs review: 2 languages
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div 
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  isInContextMode 
                    ? 'border-orange-400 bg-orange-50 hover:bg-orange-100' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleTextSelection('Start Your Journey')}
                title={isInContextMode ? 'Click to translate this text' : 'Enable in-context mode to translate'}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Start Your Journey
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Join over 10,000 companies worldwide who trust our platform for their international expansion.
                    </p>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                      Get Started Free
                    </button>
                  </div>
                  {isInContextMode && (
                    <div className="ml-4 flex flex-col items-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✎</span>
                      </div>
                      <span className="text-xs text-orange-600 mt-1">Edit</span>
                    </div>
                  )}
                </div>
                {isInContextMode && (
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <div className="flex items-center text-sm text-orange-700">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Fully translated
                    </div>
                  </div>
                )}
              </div>

              <div 
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  isInContextMode 
                    ? 'border-orange-400 bg-orange-50 hover:bg-orange-100' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleTextSelection('Expert Support Team')}
                title={isInContextMode ? 'Click to translate this text' : 'Enable in-context mode to translate'}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Expert Support Team
                    </h3>
                    <p className="text-gray-600">
                      Our multilingual support team is available 24/7 to assist you in your preferred language across all time zones.
                    </p>
                  </div>
                  {isInContextMode && (
                    <div className="ml-4 flex flex-col items-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✎</span>
                      </div>
                      <span className="text-xs text-orange-600 mt-1">Edit</span>
                    </div>
                  )}
                </div>
                {isInContextMode && (
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <div className="flex items-center text-sm text-orange-700">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Translation pending
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Selected Text Panel */}
          {isInContextMode && selectedText && (
            <div className="mt-8 p-6 bg-orange-100 border border-orange-300 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-3">Translation Panel</h4>
              <p className="text-sm text-orange-800 mb-3">Selected: &quot;{selectedText}&quot;</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-2">
                    French Translation
                  </label>
                  <textarea 
                    className="w-full p-3 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    rows={3}
                    placeholder="Enter French translation..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-2">
                    Spanish Translation
                  </label>
                  <textarea 
                    className="w-full p-3 border border-orange-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    rows={3}
                    placeholder="Enter Spanish translation..."
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                  Save Translation
                </button>
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
                  Add Comment
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Request Review
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Visual Editor Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Crowdin Visual Editor Advantages</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">True Context</h4>
              <p className="text-sm text-gray-600">
                See translations in the actual layout with real styling and formatting
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Team Collaboration</h4>
              <p className="text-sm text-gray-600">
                Comments, reviews, and approvals directly on the live content
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
              <p className="text-sm text-gray-600">
                Spot layout issues and text overflow problems immediately
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Setting Up Crowdin In-Context Editor</h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">1. Install Crowdin In-Context Script</h4>
              <p className="text-gray-600 mb-3">
                Add the Crowdin in-context editing script to your website:
              </p>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`<script type="text/javascript">`}<br/>
                  {`  window.crowdinSettings = {`}<br/>
                  {`    projectId: 'your-project-id',`}<br/>
                  {`    language: 'auto' // or specific language code`}<br/>
                  {`  };`}<br/>
                  {`</script>`}<br/>
                  {`<script src="https://cdn.crowdin.com/jipt/jipt.js"></script>`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">2. Enable In-Context Mode</h4>
              <p className="text-gray-600 mb-3">
                Translators can access the editor by adding a URL parameter:
              </p>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`https://yoursite.com?crowdin-in-context=true`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">3. Configure Translation Keys</h4>
              <p className="text-gray-600 mb-3">
                Mark translatable content with data attributes:
              </p>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`<h1 data-crowdin-key="homepage.title">`}<br/>
                  {`  Welcome to Our Platform`}<br/>
                  {`</h1>`}<br/>
                  {`<p data-crowdin-key="homepage.description">`}<br/>
                  {`  Your content here...`}<br/>
                  {`</p>`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
