import { ReactNode, useState } from 'react'
import { Sidebar, Explorer, TabBar, StatusBar } from '../IDE'
import { useTheme } from '../../hooks/useTheme'
import { useSecrets } from '../../hooks/useSecrets'
import styles from './IDELayout.module.css'

interface IDELayoutProps {
  children: ReactNode
  onNavigate?: (section: string) => void
}

const tabs = [
  { id: 'about', name: 'sobre-mi.cs' },
  { id: 'projects', name: 'proyectos.cs' },
  { id: 'contact', name: 'contacto.cs' },
]

interface SecretTab {
  id: string
  name: string
}

export function IDELayout({ children, onNavigate }: IDELayoutProps) {
  const { theme, toggleTheme, colors } = useTheme()
  const { justUnlocked } = useSecrets()
  const [activeSection, setActiveSection] = useState('about')
  const [activeTab, setActiveTab] = useState('about')
  const [openTabs, setOpenTabs] = useState<SecretTab[]>([])
  const [secretFilesContent, setSecretFilesContent] = useState<Record<string, string>>({})

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setActiveTab(section)
    onNavigate?.(section)
  }

  const handleOpenSecretFile = (fileId: string, content: string) => {
    const fileName = `${fileId}.md`
    
    setSecretFilesContent(prev => ({ ...prev, [fileId]: content }))
    
    if (!openTabs.find(t => t.id === fileId)) {
      setOpenTabs(prev => [...prev, { id: fileId, name: fileName }])
    }
    
    setActiveTab(fileId)
    setActiveSection(fileId)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setActiveSection(tabId)
    onNavigate?.(tabId)
  }

  const handleTabClose = (tabId: string) => {
    const remainingTabs = tabs.filter(t => t.id !== tabId)
    const remainingSecretTabs = openTabs.filter(t => t.id !== tabId)
    
    const allRemaining = [...remainingTabs, ...remainingSecretTabs]
    if (allRemaining.length > 0) {
      handleTabChange(allRemaining[0].id)
    }
  }

  const allTabs = [...tabs, ...openTabs]

  return (
    <div className={styles.wrapper} style={{ background: colors.background }}>
      {justUnlocked && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: colors.green,
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          🔓 ¡Secretos desbloqueados!
        </div>
      )}
      <div className={styles.main}>
        <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
        <Explorer 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
          onOpenSecretFile={handleOpenSecretFile}
        />
        
        <div className={styles.content}>
          <TabBar 
            tabs={allTabs} 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
            onTabClose={handleTabClose}
          />
          <main className={styles.mainContent} style={{ background: colors.background }}>
            {activeTab in secretFilesContent 
              ? <div style={{ 
                  padding: '20px', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '14px',
                  whiteSpace: 'pre-wrap',
                  color: colors.foreground,
                  lineHeight: '1.6'
                }}>
                  {secretFilesContent[activeTab]}
                </div>
              : children
            }
          </main>
        </div>
      </div>
      
      <StatusBar onToggleTheme={toggleTheme} theme={theme} />
    </div>
  )
}
