'use client';

import { useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LokaliseDemo() {
  const [isLiveEditMode, setIsLiveEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState('');
  const [showTranslationPanel, setShowTranslationPanel] = useState(false);

  // Simulate Lokalise Live Edit mode
  const enableLiveEdit = () => {
    setIsLiveEditMode(true);
    alert('🚀 Lokalise Live Edit Activated!\n\nIn production, this would:\n• Enable click-to-edit on any text element\n• Show translation keys and progress\n• Allow real-time collaborative editing\n• Sync changes instantly with your project');
  };

  const handleElementClick = (text: string, key: string) => {
    if (isLiveEditMode) {
      setSelectedElement(key);
      setShowTranslationPanel(true);
      console.log(`Selected element: ${key} - "${text}"`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <h1 className="ml-3 text-xl font-semibold text-gray-900">Lokalise Live Edit Demo</h1>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isLiveEditMode 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <span className={`w-2 h-2 mr-1 rounded-full ${
                  isLiveEditMode ? 'bg-green-400' : 'bg-gray-400'
                }`}></span>
                {isLiveEditMode ? 'Live Edit Active' : 'Preview Mode'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher service="lokalise" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Edit Hero */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ⚡ Lokalise Live Edit Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Edit translations directly on your live website with Lokalise&apos;s powerful in-context editor. Perfect for developers who want precise control over their localization workflow.
            </p>
          </div>

          {/* Live Edit Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={enableLiveEdit}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Enable Live Edit
            </button>
            
            {isLiveEditMode && (
              <button
                onClick={() => {
                  setIsLiveEditMode(false);
                  setShowTranslationPanel(false);
                  setSelectedElement('');
                }}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Exit Live Edit
              </button>
            )}
          </div>

          {/* Sample Content with Live Edit */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div 
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer relative ${
                  isLiveEditMode 
                    ? 'border-green-400 bg-green-50 hover:bg-green-100' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleElementClick('Transform Your Business Globally', 'hero.title')}
                title={isLiveEditMode ? 'Click to edit translation' : 'Enable live edit to translate'}
              >
                {isLiveEditMode && (
                  <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                      hero.title
                    </span>
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✎</span>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Transform Your Business Globally
                </h3>
                <p className="text-gray-600">
                  Expand your reach with our comprehensive internationalization platform. Built for developers, loved by translators.
                </p>
                {isLiveEditMode && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-700">5 languages • 100% translated</span>
                      <span className="text-green-600">Last updated: 2h ago</span>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer relative ${
                  isLiveEditMode 
                    ? 'border-green-400 bg-green-50 hover:bg-green-100' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleElementClick('Developer-First Approach', 'features.dev_first')}
                title={isLiveEditMode ? 'Click to edit translation' : 'Enable live edit to translate'}
              >
                {isLiveEditMode && (
                  <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                      features.dev_first
                    </span>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">⚠</span>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Developer-First Approach
                </h3>
                <p className="text-gray-600 mb-3">
                  &quot;Lokalise integrates seamlessly with our development workflow. The API is intuitive and the CLI tools are fantastic.&quot;
                </p>
                <p className="text-sm text-gray-500">- Sarah Chen, Lead Developer</p>
                {isLiveEditMode && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-yellow-700">3 languages • 60% translated</span>
                      <span className="text-green-600">Needs review</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div 
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer relative ${
                  isLiveEditMode 
                    ? 'border-green-400 bg-green-50 hover:bg-green-100' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleElementClick('Start Building Today', 'cta.main')}
                title={isLiveEditMode ? 'Click to edit translation' : 'Enable live edit to translate'}
              >
                {isLiveEditMode && (
                  <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                      cta.main
                    </span>
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Start Building Today
                </h3>
                <p className="text-gray-600 mb-4">
                  Join over 5,000 development teams who trust Lokalise for their localization needs. Get started in minutes.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Try Free for 14 Days
                </button>
                {isLiveEditMode && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-700">8 languages • 95% translated</span>
                      <span className="text-green-600">Ready for review</span>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className={`p-6 rounded-lg border-2 transition-all cursor-pointer relative ${
                  isLiveEditMode 
                    ? 'border-green-400 bg-green-50 hover:bg-green-100' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleElementClick('24/7 Developer Support', 'support.title')}
                title={isLiveEditMode ? 'Click to edit translation' : 'Enable live edit to translate'}
              >
                {isLiveEditMode && (
                  <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                      support.title
                    </span>
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  24/7 Developer Support
                </h3>
                <p className="text-gray-600">
                  Our technical support team understands developers. Get help with API integration, webhook setup, and advanced configurations.
                </p>
                {isLiveEditMode && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-700">2 languages • 20% translated</span>
                      <span className="text-red-600">Translation needed</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Translation Panel */}
          {showTranslationPanel && selectedElement && (
            <div className="mt-8 p-6 bg-green-100 border border-green-300 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-green-900">Live Translation Editor</h4>
                <button 
                  onClick={() => setShowTranslationPanel(false)}
                  className="text-green-700 hover:text-green-900"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <span className="text-sm font-medium text-green-800">Translation Key:</span>
                <code className="ml-2 bg-white px-2 py-1 rounded text-sm">{selectedElement}</code>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-green-900 mb-2">
                    French (fr)
                  </label>
                  <textarea 
                    className="w-full p-3 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    rows={3}
                    placeholder="Enter French translation..."
                    defaultValue={selectedElement === 'hero.title' ? 'Transformez votre entreprise à l\'échelle mondiale' : ''}
                  />
                  <div className="mt-1 flex items-center text-xs text-green-700">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    Translated by AI • Needs review
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-900 mb-2">
                    Spanish (es)
                  </label>
                  <textarea 
                    className="w-full p-3 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    rows={3}
                    placeholder="Enter Spanish translation..."
                    defaultValue={selectedElement === 'hero.title' ? 'Transforma tu negocio globalmente' : ''}
                  />
                  <div className="mt-1 flex items-center text-xs text-green-700">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                    Translated by Maria R. • Approved
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Save Changes
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Request Review
                  </button>
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
                    Add Comment
                  </button>
                </div>
                <div className="text-sm text-green-700">
                  Auto-save enabled • Last saved: now
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Edit Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Lokalise Live Edit Advantages</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Developer-Friendly</h4>
              <p className="text-sm text-gray-600">
                Built with developers in mind - clean APIs, CLI tools, and seamless integrations
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Sync</h4>
              <p className="text-sm text-gray-600">
                Changes sync instantly across all platforms and team members
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Control</h4>
              <p className="text-sm text-gray-600">
                Built-in QA checks, translation memory, and automated workflows
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Setting Up Lokalise Live Edit</h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">1. Install Lokalise SDK</h4>
              <p className="text-gray-600 mb-3">
                Add the Lokalise JavaScript SDK to your project:
              </p>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`npm install @lokalise/node-api`}<br/>
                  {`# or for browser`}<br/>
                  {`<script src="https://cdn.lokalise.com/live-edit/live-edit.js"></script>`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">2. Initialize Live Edit</h4>
              <p className="text-gray-600 mb-3">
                Configure the live edit functionality:
              </p>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`Lokalise.init({`}<br/>
                  {`  projectId: 'your-project-id',`}<br/>
                  {`  apiKey: 'your-api-key',`}<br/>
                  {`  liveEdit: true,`}<br/>
                  {`  autoTranslate: true`}<br/>
                  {`});`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">3. Mark Translatable Content</h4>
              <p className="text-gray-600 mb-3">
                Use data attributes to mark content for translation:
              </p>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`<h1 data-lokalise-key="hero.title">`}<br/>
                  {`  Welcome to Our Platform`}<br/>
                  {`</h1>`}<br/>
                  {`<p data-lokalise-key="hero.description">`}<br/>
                  {`  Your amazing content here`}<br/>
                  {`</p>`}
                </code>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">4. Enable Live Edit Mode</h4>
              <p className="text-gray-600 mb-3">
                Activate live editing with a URL parameter or programmatically:
              </p>
              <div className="bg-white p-4 rounded border">
                <code className="text-sm text-gray-800">
                  {`// URL parameter`}<br/>
                  {`https://yoursite.com?lokalise_live_edit=true`}<br/>
                  {``}<br/>
                  {`// Programmatically`}<br/>
                  {`Lokalise.enableLiveEdit();`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
