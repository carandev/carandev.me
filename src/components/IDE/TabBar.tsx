import { X, FileCode } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

interface Tab {
  id: string
  name: string
}

interface TabBarProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  onTabClose: (tabId: string) => void
}

export function TabBar({ tabs, activeTab, onTabChange, onTabClose }: TabBarProps) {
  const { colors } = useTheme()

  return (
    <div style={{
      display: 'flex',
      background: colors.tabInactive,
      borderBottom: `1px solid ${colors.border}`,
      overflowX: 'auto'
    }}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '8px 12px',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)',
            background: activeTab === tab.id ? colors.tabActive : 'transparent',
            color: activeTab === tab.id ? colors.foreground : colors.foreground,
            borderRight: `1px solid ${colors.border}`,
            borderTop: activeTab === tab.id ? `2px solid ${colors.blue}` : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minWidth: 'fit-content'
          }}
        >
          <FileCode size={14} color={colors.yellow} />
          <span>{tab.name}</span>
          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onTabClose(tab.id)
              }}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                color: colors.foreground,
                opacity: 0.6
              }}
            >
              <X size={12} />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
