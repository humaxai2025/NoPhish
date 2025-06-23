import { useState } from 'react'
import Navbar from './components/Navbar'
import TabSwitcher from './components/TabSwitcher'
import EmailAnalyzer from './components/EmailAnalyzer'
import LinkChecker from './components/LinkChecker'

function App() {
  const [activeTab, setActiveTab] = useState('email')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-8">
          {activeTab === 'email' ? <EmailAnalyzer /> : <LinkChecker />}
        </div>
      </div>
    </div>
  )
}

export default App