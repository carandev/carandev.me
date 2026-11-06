export type Theme = 'light' | 'dark'

const THEME_COLORS: Record<Theme, string> = { light: '#FAF7F2', dark: '#1A1512' }

export function currentTheme (): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

// Persists an explicit choice; the inline script in Layout.astro reads it before first paint.
export function setTheme (theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  try { localStorage.setItem('theme', theme) } catch { /* storage unavailable: choice lasts this visit */ }
}
