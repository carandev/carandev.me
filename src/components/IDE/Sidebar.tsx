import { FolderOpen, Code, Mail, User, FileText, Settings } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections = [
  { id: 'about', icon: User, label: 'Sobre Mí' },
  { id: 'projects', icon: Code, label: 'Proyectos' },
  { id: 'contact', icon: Mail, label: 'Contacto' },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { colors } = useTheme()

  return (
    <div style={{
      width: '60px',
      background: colors.activityBar,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '10px',
      borderRight: `1px solid ${colors.border}`
    }}>
      <div style={{ marginBottom: '20px' }}>
        <FileText size={24} color={colors.foreground} />
      </div>
      
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          title={section.label}
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: activeSection === section.id ? colors.selection : 'transparent',
            border: 'none',
            borderLeft: activeSection === section.id ? `2px solid ${colors.blue}` : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: '4px',
            transition: 'background 0.1s'
          }}
        >
          <section.icon 
            size={24} 
            color={activeSection === section.id ? colors.blue : colors.foreground} 
            style={{ opacity: activeSection === section.id ? 1 : 0.6 }}
          />
        </button>
      ))}
    </div>
  )
}
