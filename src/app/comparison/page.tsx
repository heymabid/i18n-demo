'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ComparisonPage() {
  const [selectedCategory, setSelectedCategory] = useState('overview')

  const services = [
    {
      name: 'Weglot',
      icon: 'W',
      color: 'blue',
      tagline: 'Visual Translation Platform',
      bestFor: 'Quick website translation with visual editing',
      link: '/weglot'
    },
    {
      name: 'Crowdin',
      icon: 'C', 
      color: 'purple',
      tagline: 'Enterprise Translation Management',
      bestFor: 'Large teams with complex workflows',
      link: '/crowdin'
    }
  ]

  const categories = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'setup', label: 'Setup & Integration', icon: '⚙️' },
    { id: 'features', label: 'Features', icon: '✨' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'use-cases', label: 'Use Cases', icon: '🎯' }
  ]

  const comparisonData: Record<string, { title: string; data: Array<{ feature: string; weglot: string; crowdin: string }> }> = {
    overview: {
      title: 'Platform Overview',
      data: [
        { feature: 'Primary Focus', weglot: 'Website translation', crowdin: 'Enterprise localization' },
        { feature: 'Target Users', weglot: 'SMBs, agencies', crowdin: 'Large teams, enterprises' },
        { feature: 'Learning Curve', weglot: 'Easy - minimal setup', crowdin: 'Medium - feature-rich' },
        { feature: 'Time to Launch', weglot: '< 1 hour', crowdin: '1-3 days' }
      ]
    },
    setup: {
      title: 'Setup & Integration',
      data: [
        { feature: 'Installation', weglot: 'Script tag or plugin', crowdin: 'API/CLI + SDK integration' },
        { feature: 'Technical Knowledge', weglot: 'None required', crowdin: 'Some - API integration' },
        { feature: 'CI/CD Integration', weglot: 'Limited', crowdin: 'Good with GitHub Actions' },
        { feature: 'Content Management', weglot: 'Automatic detection', crowdin: 'Git-like workflow' }
      ]
    },
    features: {
      title: 'Key Features',
      data: [
        { feature: 'Visual Editor', weglot: '✅ In-context editing', crowdin: '✅ Web editor' },
        { feature: 'Workflow Management', weglot: '⚠️ Basic', crowdin: '✅ Structured process' },
        { feature: 'Team Collaboration', weglot: '⚠️ Limited', crowdin: '✅ Good collaboration' },
        { feature: 'Quality Assurance', weglot: '⚠️ Basic checks', crowdin: '✅ Good QA tools' },
        { feature: 'Machine Translation', weglot: '✅ AI-powered', crowdin: '✅ AI-powered' },
        { feature: 'Translation Memory', weglot: '✅ Built-in', crowdin: '✅ Smart suggestions' }
      ]
    },
    pricing: {
      title: 'Pricing Comparison',
      data: [
        { feature: 'Starting Price', weglot: '$15/month', crowdin: '$25/month' },
        { feature: 'Pricing Model', weglot: 'Words translated', crowdin: 'Keys + team size' },
        { feature: 'Free Tier', weglot: '10,000 words', crowdin: '1,000 keys' },
        { feature: 'Enterprise Plans', weglot: '✅ Custom pricing', crowdin: '✅ Custom plans' }
      ]
    }
  }

  const useCases = [
    {
      title: 'Marketing Website',
      description: 'Company website with landing pages, blog, contact forms',
      recommendation: 'weglot',
      reasoning: 'Quick setup, visual editing, perfect for marketing content'
    },
    {
      title: 'SaaS Application',
      description: 'Complex web application with user interface, help docs, notifications',
      recommendation: 'crowdin',
      reasoning: 'Structured workflow, team collaboration, handles complex UI strings'
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
              <p className="text-gray-600 mt-2">Compare Weglot and Crowdin to find the best fit for your project</p>
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
        <section className="grid md:grid-cols-2 gap-8 mb-12">
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
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData[selectedCategory]?.data.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{row.feature}</td>
                          <td className="py-3 px-4 text-gray-700">{row.weglot}</td>
                          <td className="py-3 px-4 text-gray-700">{row.crowdin}</td>
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
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {useCase.recommendation === 'weglot' ? 'Weglot' : 'Crowdin'}
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
          <div className="grid md:grid-cols-2 gap-8">
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
                <li>• Simple, straightforward workflow</li>
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
                <li>• Git integration and version control</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 
