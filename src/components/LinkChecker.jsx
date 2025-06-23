import { useState } from 'react'
import { FiLink, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import { analyzeEmail } from '../utils/analysis';
import ResultCard from './ResultCard'

export default function LinkChecker() {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const analysis = analyzeLink(url)
      setResults(analysis)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FiLink className="mr-2" /> Suspicious Link Checker
        </h2>
        <p className="text-gray-600 mb-6">
          Enter a URL to check if it's safe to visit.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              type="url"
              className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check URL'}
            </button>
          </div>
        </form>
      </div>
      
      {results && (
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Analysis Results</h3>
            <div className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${results.score < 50 ? 'bg-green-100 text-green-800' : results.score < 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
              Safety Score: {results.score}/100
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.issues.map((issue, index) => (
              <ResultCard 
                key={index}
                type={issue.severity === 'high' ? 'danger' : issue.severity === 'medium' ? 'warning' : 'info'}
                title={issue.title}
                description={issue.description}
              />
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Final Verdict</h4>
            <div className={`flex items-center ${results.score < 50 ? 'text-green-600' : results.score < 80 ? 'text-yellow-600' : 'text-red-600'}`}>
              {results.score < 50 ? (
                <>
                  <FiCheckCircle className="mr-2" />
                  <span>This link appears to be safe.</span>
                </>
              ) : (
                <>
                  <FiAlertTriangle className="mr-2" />
                  <span>This link is potentially dangerous!</span>
                </>
              )}
            </div>
            <p className="mt-2 text-gray-600 text-sm">{results.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  )
}