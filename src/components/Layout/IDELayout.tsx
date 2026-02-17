import { ReactNode, useState } from 'react'
import { Sidebar, Explorer, TabBar, StatusBar } from '../IDE'
import { useTheme } from '../../hooks/useTheme'
import { useSecrets } from '../../hooks/useSecrets'
import { Menu, X } from 'lucide-react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setActiveTab(section)
    onNavigate?.(section)
    setMobileMenuOpen(false)
  }

  const handleOpenSecretFile = (fileId: string, content: string) => {
    const fileName = `${fileId}.md`
    
    setSecretFilesContent(prev => ({ ...prev, [fileId]: content }))
    
    if (!openTabs.find(t => t.id === fileId)) {
      setOpenTabs(prev => [...prev, { id: fileId, name: fileName }])
    }
    
    setActiveTab(fileId)
    setActiveSection(fileId)
    setMobileMenuOpen(false)
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
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: colors.foreground, cursor: 'pointer' }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className={styles.mobileHeaderTitle}>carandev-portfolio</span>
        <div style={{ width: 20 }} />
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.open : ''}`} style={{ background: colors.sidebar }}>
        <div style={{ padding: '10px 8px', borderBottom: `1px solid ${colors.border}` }}>
          <span style={{ fontSize: '13px', color: colors.foreground, fontFamily: 'var(--font-mono)' }}>
            EXPLORADOR
          </span>
        </div>
        <div style={{ padding: '8px' }}>
          <div style={{ 
            padding: '4px 8px', 
            fontSize: '13px', 
            color: colors.foreground, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            marginBottom: '8px'
          }}>
            <span style={{ color: colors.yellow }}>📁</span>
            carandev-portfolio
          </div>
          
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSectionChange(tab.id)}
              style={{
                width: '100%',
                padding: '8px 8px 8px 24px',
                fontSize: '13px',
                background: activeSection === tab.id ? colors.selection : 'transparent',
                border: 'none',
                borderLeft: activeSection === tab.id ? `2px solid ${colors.blue}` : '2px solid transparent',
                color: activeSection === tab.id ? colors.blue : colors.foreground,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                marginBottom: '4px'
              }}
            >
              📄 {tab.name}
            </button>
          ))}
        </div>
      </div>

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
        <div className={styles.desktopSidebar}>
          <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
        </div>
        <div className={styles.desktopExplorer}>
          <Explorer 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange}
            onOpenSecretFile={handleOpenSecretFile}
          />
        </div>
        
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
