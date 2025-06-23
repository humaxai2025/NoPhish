import { motion } from 'framer-motion'

export default function TabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => setActiveTab('email')}
        className={`px-4 py-2 font-medium text-sm relative ${activeTab === 'email' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Email Analyzer
        {activeTab === 'email' && (
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
          />
        )}
      </button>
      <button
        onClick={() => setActiveTab('link')}
        className={`px-4 py-2 font-medium text-sm relative ${activeTab === 'link' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
      >
        Link Checker
        {activeTab === 'link' && (
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
          />
        )}
      </button>
    </div>
  )
}