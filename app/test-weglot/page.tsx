'use client';

import { useEffect, useState } from 'react';

export default function SimpleWeglotTest() {
  const [weglotStatus, setWeglotStatus] = useState('Loading...');

  useEffect(() => {

    // Simple Weglot initialization
    const script = document.createElement('script');
    script.src = 'https://cdn.weglot.com/weglot.min.js';
    script.onload = () => {
      setTimeout(() => {
        if (window.Weglot) {
          try {
            window.Weglot.initialize({
              api_key: 'wg_ee88fe9620369bb6fc8ecdabbcc819301',
              original_language: 'en',
              destination_languages: 'fr,es,de',
              dynamic: true
            });
            setWeglotStatus('✅ Weglot loaded and initialized successfully');
            console.log('Weglot initialized successfully');
          } catch (error) {
            setWeglotStatus('❌ Weglot initialization failed');
            console.error('Weglot initialization error:', error);
          }
        } else {
          setWeglotStatus('❌ Weglot object not available');
        }
      }, 500);
    };
    script.onerror = () => {
      setWeglotStatus('❌ Failed to load Weglot script');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[src*="weglot"]');
      scripts.forEach(s => s.remove());
    };
  }, []);

  const openWeglotDashboard = () => {
    const currentUrl = window.location.href;
    const dashboardUrl = 'https://weglot.com/dashboard';
    
    alert(
      'Opening Weglot Dashboard...\n\n' +
      'To use the Visual Editor:\n' +
      '1. In the new tab, go to Projects → Visual Editor\n' +
      '2. Enter this page URL: ' + currentUrl + '\n' +
      '3. The visual editor will load your page with edit capabilities\n\n' +
      'Note: The visual editor runs on Weglot\'s platform, not directly on your website.'
    );
    
    window.open(dashboardUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Status Header */}
        <div className="mb-6 p-4 rounded-lg border bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Simple Weglot Test</h1>
              <p className="text-sm mt-1 text-blue-700">
                🌍 Live Translation Demo: Use language switcher to see translations
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 mr-2 rounded-full bg-green-400"></span>
                Live Translation Active
              </div>
              <p className="text-xs text-gray-600 mt-1">{weglotStatus}</p>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Visual Editor Controls</h2>
          <div className="flex space-x-4">
            <button 
              onClick={openWeglotDashboard}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🎨 Open Weglot Dashboard
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              🔄 Reload Page
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How to Access Visual Editor:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Click the button above to open your Weglot Dashboard</li>
              <li>• Navigate to Projects → Visual Editor</li>
              <li>• Enter this page&apos;s URL in the visual editor</li>
              <li>• The visual editor will load with click-to-edit functionality</li>
            </ul>
          </div>
        </div>

        {/* Test Content */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Our Platform</h2>
          <p className="text-gray-600 mb-4">
            This is a simple test to verify that Weglot is working correctly. 
            The content on this page should be automatically detected and translated.
            In visual editor mode, you should see edit icons next to this text.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Key Features</h3>
            <p className="text-blue-800">
              Our platform offers seamless internationalization with real-time translation 
              capabilities and an intuitive visual editing interface.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold mb-3">Product Benefits</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Fast and reliable performance across all devices</li>
            <li>Easy to use interface with minimal learning curve</li>
            <li>24/7 customer support in multiple languages</li>
            <li>Secure data handling with enterprise-grade encryption</li>
            <li>Seamless integration with existing workflows</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Sales Team</h4>
              <p className="text-gray-600">
                Email: sales@example.com<br/>
                Phone: +1 (555) 123-4567<br/>
                Hours: Monday-Friday, 9 AM - 6 PM EST
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Support Team</h4>
              <p className="text-gray-600">
                Email: support@example.com<br/>
                Phone: +1 (555) 987-6543<br/>
                Hours: 24/7 Support Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
