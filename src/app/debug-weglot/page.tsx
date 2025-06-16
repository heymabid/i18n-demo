'use client';

import { useEffect, useState } from 'react';

export default function DebugWeglot() {
  const [status, setStatus] = useState('Loading...');
  const [apiKey] = useState('wg_ee88fe9620369bb6fc8ecdabbcc819301');

  useEffect(() => {
    // Test Weglot API key
    const testWeglotAPI = async () => {
      try {
        // Try to load Weglot script
        const script = document.createElement('script');
        script.src = 'https://cdn.weglot.com/weglot.min.js';
        
        script.onload = () => {
          setStatus('✅ Weglot script loaded successfully');
          
          // Try to initialize
          setTimeout(() => {
            if (window.Weglot) {
              try {
                window.Weglot.initialize({
                  api_key: apiKey,
                  original_language: 'en',
                  destination_languages: 'fr'
                });
                setStatus('✅ Weglot initialized successfully! API key is valid.');
              } catch (error) {
                setStatus(`❌ Weglot initialization failed: ${error.message}`);
              }
            } else {
              setStatus('❌ Weglot object not available after script load');
            }
          }, 1000);
        };
        
        script.onerror = () => {
          setStatus('❌ Failed to load Weglot script from CDN');
        };
        
        document.head.appendChild(script);
        
      } catch (error) {
        setStatus(`❌ Error: ${error.message}`);
      }
    };

    testWeglotAPI();
  }, [apiKey]);

  const testVisualEditor = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('weglot_mode', 'translate');
    window.location.href = url.toString();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Weglot Debug Page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">API Key Test</h2>
          <div className="mb-4">
            <strong>API Key:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{apiKey}</code>
          </div>
          <div className="mb-4">
            <strong>Status:</strong> <span className="font-mono">{status}</span>
          </div>
          
          <button 
            onClick={testVisualEditor}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mr-4"
          >
            Test Visual Editor
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Reload Test
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold mb-3">Test Content for Translation</h3>
          <p className="text-gray-600 mb-4">
            This is some test content that should be automatically detected by Weglot 
            and made available for translation. If Weglot is working correctly, 
            you should see a language switcher appear on this page.
          </p>
          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-semibold text-blue-900">Important Notice</h4>
            <p className="text-blue-800">
              Please check your browser console for any error messages related to Weglot.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Troubleshooting Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Check if the API key is valid in your Weglot dashboard</li>
            <li>Verify that the domain is authorized in Weglot settings</li>
            <li>Look for JavaScript errors in the browser console</li>
            <li>Try accessing the visual editor with ?weglot_mode=translate</li>
            <li>Check network tab for failed requests to Weglot servers</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 
