'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ComparisonPage() {
  const [selectedCategory, setSelectedCategory] = useState('overview')

  const services = [
    {
      name: 'Weglot',
      color: 'blue',
      icon: 'W',
      tagline: 'Quick Setup & Visual Translation',
      bestFor: 'Small to medium websites that need fast implementation',
      link: '/weglot'
    },
    {
      name: 'Crowdin',
      color: 'purple', 
      icon: 'C',
      tagline: 'Enterprise Workflows & Team Management',
      bestFor: 'Large teams with complex translation workflows',
      link: '/crowdin'
    },
    {
      name: 'Lokalise',
      color: 'green',
      icon: 'L', 
      tagline: 'Developer-Friendly & Agile',
      bestFor: 'Development teams that want clean, powerful tools',
      link: '/lokalise'
    }
  ]

  const categories = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'setup', label: 'Setup & Integration', icon: '⚙️' },
    { id: 'features', label: 'Features', icon: '✨' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'use-cases', label: 'Use Cases', icon: '🎯' }
  ]

  const comparisonData = {
    overview: {
      title: 'Platform Overview',
      data: [
        {
          feature: 'Primary Approach',
          weglot: 'Overlay translation layer',
          crowdin: 'Workflow-based localization',
          lokalise: 'Developer-focused platform'
        },
        {
          feature: 'Target Audience',
          weglot: 'Website owners, marketers',
          crowdin: 'Enterprise teams, agencies',
          lokalise: 'Developers, agile teams'
        },
        {
          feature: 'Learning Curve',
          weglot: 'Very low - plug and play',
          crowdin: 'High - feature-rich',
          lokalise: 'Medium - developer-friendly'
        },
        {
          feature: 'Setup Time',
          weglot: '< 1 hour',
          crowdin: '1-2 weeks',
          lokalise: '1-3 days'
        }
      ]
    },
    setup: {
      title: 'Setup & Integration',
      data: [
        {
          feature: 'Installation Method',
          weglot: 'Script tag or React component',
          crowdin: 'CLI + API + configuration files',
          lokalise: 'API/CLI + SDK integration'
        },
        {
          feature: 'Code Changes Required',
          weglot: 'Minimal - just add script',
          crowdin: 'Moderate - structured setup',
          lokalise: 'Some - API integration'
        },
        {
          feature: 'CI/CD Integration',
          weglot: 'Limited',
          crowdin: 'Excellent with webhooks',
          lokalise: 'Good with GitHub Actions'
        },
        {
          feature: 'Development Workflow',
          weglot: 'External management',
          crowdin: 'Integrated with dev process',
          lokalise: 'Git-like workflow'
        }
      ]
    },
    features: {
      title: 'Feature Comparison',
      data: [
        {
          feature: 'Visual Editor',
          weglot: '✅ In-context editing',
          crowdin: '✅ Screenshots + context',
          lokalise: '✅ Web editor'
        },
        {
          feature: 'Workflow Management',
          weglot: '❌ Basic',
          crowdin: '✅ Advanced workflows',
          lokalise: '✅ Structured process'
        },
        {
          feature: 'Team Collaboration',
          weglot: '⚠️ Limited',
          crowdin: '✅ Extensive tools',
          lokalise: '✅ Good collaboration'
        },
        {
          feature: 'Quality Assurance',
          weglot: '⚠️ Basic checks',
          crowdin: '✅ Advanced QA',
          lokalise: '✅ Good QA tools'
        },
        {
          feature: 'Machine Translation',
          weglot: '✅ Automatic',
          crowdin: '✅ Multiple providers',
          lokalise: '✅ AI-powered'
        },
        {
          feature: 'Translation Memory',
          weglot: '✅ Basic',
          crowdin: '✅ Advanced TM',
          lokalise: '✅ Smart suggestions'
        }
      ]
    },
    pricing: {
      title: 'Pricing Structure',
      data: [
        {
          feature: 'Starting Price',
          weglot: '$15/month',
          crowdin: '$40/month',
          lokalise: '$25/month'
        },
        {
          feature: 'Pricing Model',
          weglot: 'Page views + languages',
          crowdin: 'Strings + features',
          lokalise: 'Keys + team size'
        },
        {
          feature: 'Free Tier',
          weglot: '10,000 words',
          crowdin: '60,000 strings',
          lokalise: '1,000 keys'
        },
        {
          feature: 'Enterprise Options',
          weglot: '⚠️ Limited',
          crowdin: '✅ Full enterprise suite',
          lokalise: '✅ Custom plans'
        }
      ]
    }
  }

  const useCases = [
    {
      title: 'Small Business Website',
      description: 'Marketing site with 10-20 pages, minimal development resources',
      recommendation: 'weglot',
      reasoning: 'Quick setup, no technical knowledge required, visual editing for marketing content'
    },
    {
      title: 'Enterprise SaaS Platform', 
      description: 'Large application with complex workflows, multiple teams, compliance requirements',
      recommendation: 'crowdin',
      reasoning: 'Advanced workflow management, enterprise features, extensive collaboration tools'
    },
    {
      title: 'Startup Mobile App',
      description: 'React Native app with agile development, frequent releases, developer-focused team',
      recommendation: 'lokalise',
      reasoning: 'Developer-friendly API, clean UI, good automation without complexity'
    },
    {
      title: 'E-commerce Platform',
      description: 'Product catalog with dynamic content, multiple markets, SEO requirements',
      recommendation: 'weglot',
      reasoning: 'SEO-friendly URLs, automatic content detection, works well with dynamic content'
    },
    {
      title: 'Documentation Portal',
      description: 'Technical documentation with version control, contributor workflow',
      recommendation: 'crowdin',
      reasoning: 'Git integration, contributor management, documentation-specific features'
    },
    {
      title: 'React/Next.js App',
      description: 'Modern web application with structured i18n, TypeScript, CI/CD pipeline',
      recommendation: 'lokalise',
      reasoning: 'Excellent TypeScript support, GitHub Actions, structured key management'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Comparison</h1>
              <p className="text-gray-600 mt-2">Compare Weglot, Crowdin, and Lokalise to find the best fit for your project</p>
            </div>
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service Overview Cards */}
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div key={service.name} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-${service.color}-600 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold text-xl">{service.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.tagline}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{service.bestFor}</p>
              <Link 
                href={service.link}
                className={`inline-block w-full text-center bg-${service.color}-600 hover:bg-${service.color}-700 text-white py-2 px-4 rounded-lg transition-colors`}
              >
                Learn More
              </Link>
            </div>
          ))}
        </section>

        {/* Comparison Table */}
        <section className="bg-white rounded-2xl shadow-sm mb-12">
          {/* Category Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    selectedCategory === category.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Comparison Content */}
          <div className="p-8">
            {selectedCategory !== 'use-cases' ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {comparisonData[selectedCategory]?.title}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                        <th className="text-left py-3 px-4 font-semibold text-blue-600">Weglot</th>
                        <th className="text-left py-3 px-4 font-semibold text-purple-600">Crowdin</th>
                        <th className="text-left py-3 px-4 font-semibold text-green-600">Lokalise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData[selectedCategory]?.data.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{row.feature}</td>
                          <td className="py-3 px-4 text-gray-700">{row.weglot}</td>
                          <td className="py-3 px-4 text-gray-700">{row.crowdin}</td>
                          <td className="py-3 px-4 text-gray-700">{row.lokalise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Use Case Recommendations</h2>
                <div className="space-y-6">
                  {useCases.map((useCase, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                          <p className="text-gray-600">{useCase.description}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          useCase.recommendation === 'weglot' ? 'bg-blue-100 text-blue-800' :
                          useCase.recommendation === 'crowdin' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {useCase.recommendation === 'weglot' ? 'Weglot' :
                           useCase.recommendation === 'crowdin' ? 'Crowdin' : 'Lokalise'}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Why this choice:</strong> {useCase.reasoning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Decision Framework */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Decision Framework</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Weglot if you want:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fastest time to market</li>
                <li>• Minimal technical setup</li>
                <li>• Visual content editing</li>
                <li>• Website translation focus</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Crowdin if you need:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Enterprise-grade workflows</li>
                <li>• Large team collaboration</li>
                <li>• Advanced project management</li>
                <li>• Complex approval processes</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Lokalise if you prefer:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Developer-friendly tools</li>
                <li>• Clean, modern interface</li>
                <li>• Agile development workflows</li>
                <li>• Balanced feature set</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 
