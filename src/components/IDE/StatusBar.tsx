import { useTheme } from '../../hooks/useTheme'
import { GitBranch, GitPullRequest, Check, Sun, Moon } from 'lucide-react'

interface StatusBarProps {
  onToggleTheme: () => void
  theme: 'dark' | 'light'
}

export function StatusBar({ onToggleTheme, theme }: StatusBarProps) {
  const { colors } = useTheme()

  return (
    <div style={{
      height: '24px',
      background: colors.statusBar,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      fontSize: '12px',
      color: '#ffffff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <GitBranch size={14} />
          main
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.8 }}>
          <GitPullRequest size={14} />
          0
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: colors.green }}>
          <Check size={14} />
          0 problemas
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>UTF-8</span>
        <span>C#</span>
        <button
          onClick={onToggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 6px',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
          title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </div>
  )
}
