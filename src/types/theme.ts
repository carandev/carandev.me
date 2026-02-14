import { useState, useEffect, useCallback } from 'react'

export type Theme = 'dark' | 'light'

export interface IDEThemeColors {
  background: string
  foreground: string
  sidebar: string
  activityBar: string
  statusBar: string
  tabActive: string
  tabInactive: string
  border: string
  hover: string
  selection: string
  blue: string
  green: string
  red: string
  yellow: string
  orange: string
  purple: string
  cyan: string
}

export const darkIDETheme: IDEThemeColors = {
  background: '#1e1e2e',
  foreground: '#cdd6f4',
  sidebar: '#181825',
  activityBar: '#11111b',
  statusBar: '#313244',
  tabActive: '#1e1e2e',
  tabInactive: '#313244',
  border: '#45475a',
  hover: '#45475a',
  selection: '#585b70',
  blue: '#89b4fa',
  green: '#a6e3a1',
  red: '#f38ba8',
  yellow: '#f9e2af',
  orange: '#fab387',
  purple: '#cba6f7',
  cyan: '#94e2d5'
}

export const lightIDETheme: IDEThemeColors = {
  background: '#eff1f5',
  foreground: '#4c4f69',
  sidebar: '#e6e9ef',
  activityBar: '#dce0e8',
  statusBar: '#bcc0cc',
  tabActive: '#ffffff',
  tabInactive: '#e6e9ef',
  border: '#ccd0da',
  hover: '#dcdaec',
  selection: '#bcc0cc',
  blue: '#1e66f5',
  green: '#40a02b',
  red: '#d20f39',
  yellow: '#df8e1d',
  orange: '#fe640b',
  purple: '#8839ef',
  cyan: '#179299'
}

const STORAGE_KEY = 'carandev-theme'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getColors(theme: Theme): IDEThemeColors {
  return theme === 'dark' ? darkIDETheme : lightIDETheme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [colors, setColors] = useState<IDEThemeColors>(getColors(theme))

  useEffect(() => {
    const newColors = getColors(theme)
    setColors(newColors)
    localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const setThemeMode = useCallback((mode: Theme) => {
    setTheme(mode)
  }, [])

  return { theme, colors, toggleTheme, setThemeMode }
}
