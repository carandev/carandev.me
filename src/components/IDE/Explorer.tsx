import { FolderTree, ChevronRight, ChevronDown, FileCode, Mail } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'

interface ExplorerProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const files = [
  { id: 'about', name: 'sobre-mi.cs', icon: FileCode, type: 'file' },
  { id: 'projects', name: 'proyectos.cs', icon: FileCode, type: 'file' },
  { id: 'contact', name: 'contacto.cs', icon: Mail, type: 'file' },
]

export function Explorer({ activeSection, onSectionChange }: ExplorerProps) {
  const { colors } = useTheme()
  const [expanded, setExpanded] = useState(true)

  return (
    <div style={{
      width: '220px',
      background: colors.sidebar,
      display: 'flex',
      flexDirection: 'column',
      borderRight: `1px solid ${colors.border}`
    }}>
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '10px 12px',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: colors.foreground,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        Explorador
      </div>
      
      {expanded && (
        <div style={{ padding: '0 8px' }}>
          <div style={{
            padding: '4px 8px',
            fontSize: '13px',
            color: colors.foreground,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px'
          }}>
            <FolderTree size={16} color={colors.yellow} />
            carandev-portfolio
          </div>
          
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => onSectionChange(file.id)}
              style={{
                width: '100%',
                padding: '4px 8px 4px 24px',
                fontSize: '13px',
                background: activeSection === file.id ? colors.selection : 'transparent',
                border: 'none',
                borderLeft: activeSection === file.id ? `2px solid ${colors.blue}` : '2px solid transparent',
                color: activeSection === file.id ? colors.blue : colors.foreground,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <file.icon size={14} color={colors.foreground} />
              {file.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
