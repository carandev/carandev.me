import { ReactNode, useState } from 'react'
import { Sidebar, Explorer, TabBar, StatusBar } from '../IDE'
import { useTheme } from '../../hooks/useTheme'
import styles from './IDELayout.module.css'

interface IDELayoutProps {
  children: ReactNode
  onNavigate?: (section: string) => void
}

const tabs = [
  { id: 'about', name: 'sobre-mi.tsx' },
  { id: 'projects', name: 'proyectos.tsx' },
  { id: 'contact', name: 'contacto.tsx' },
]

export function IDELayout({ children, onNavigate }: IDELayoutProps) {
  const { theme, toggleTheme, colors } = useTheme()
  const [activeSection, setActiveSection] = useState('about')
  const [activeTab, setActiveTab] = useState('about')

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setActiveTab(section)
    onNavigate?.(section)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setActiveSection(tabId)
    onNavigate?.(tabId)
  }

  const handleTabClose = (tabId: string) => {
    const remainingTabs = tabs.filter(t => t.id !== tabId)
    if (remainingTabs.length > 0) {
      handleTabChange(remainingTabs[0].id)
    }
  }

  return (
    <div className={styles.wrapper} style={{ background: colors.background }}>
      <div className={styles.main}>
        <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
        <Explorer activeSection={activeSection} onSectionChange={handleSectionChange} />
        
        <div className={styles.content}>
          <TabBar 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
            onTabClose={handleTabClose}
          />
          <main className={styles.mainContent} style={{ background: colors.background }}>
            {children}
          </main>
        </div>
      </div>
      
      <StatusBar onToggleTheme={toggleTheme} theme={theme} />
    </div>
  )
}
