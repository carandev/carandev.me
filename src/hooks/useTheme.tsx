import { createContext, useContext, ReactNode } from 'react'
import { useTheme as useThemeHook, Theme, ThemeColors } from '../types/theme'

interface ThemeContextValue {
  theme: Theme
  colors: ThemeColors
  toggleTheme: () => void
  setThemeMode: (mode: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, colors, toggleTheme, setThemeMode } = useThemeHook()

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
