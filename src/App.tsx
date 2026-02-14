import { useState } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import { IDELayout } from './components/Layout'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'

function AppContent() {
  const [activeSection, setActiveSection] = useState('about')

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About />
      case 'projects':
        return <Projects />
      case 'contact':
        return <Contact />
      default:
        return <About />
    }
  }

  return (
    <IDELayout onNavigate={setActiveSection}>
      {renderContent()}
    </IDELayout>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
