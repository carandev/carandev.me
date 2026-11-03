import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

import { profile } from '../data/profile'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { currentTheme, setTheme } from '../lib/theme'
import { Circle } from './Sketch'
import styles from './Navbar.module.css'

const LINKS = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' }
]
const SECTION_IDS = LINKS.map(l => l.id)

export function Navbar () {
  const active = useScrollSpy(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }

    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* reveal.ts may mark this element before hydration */}
        <a
          suppressHydrationWarning
          className={styles.logo}
          data-reveal=''
          href='#inicio'
        >
          carandev
          <Circle className={styles.logoCircle} />
        </a>

        <button
          aria-label='Cambiar tema claro u oscuro'
          className={styles.themeButton}
          title='Cambiar tema'
          type='button'
          onClick={() => setTheme(currentTheme() === 'dark' ? 'light' : 'dark')}
        >
          {/* CSS shows the icon for the active theme, so server HTML never mismatches */}
          <Moon aria-hidden='true' className={styles.iconMoon} size={20} />
          <Sun aria-hidden='true' className={styles.iconSun} size={20} />
        </button>

        <button
          aria-controls='nav-links'
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className={styles.menuButton}
          type='button'
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav aria-label='Principal' className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} id='nav-links'>
          {LINKS.map(link => (
            <a
              key={link.id}
              aria-current={active === link.id ? 'location' : undefined}
              className={styles.link}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className={`btn btn--outline btn--sm ${styles.cv}`} href={profile.cvUrl} rel='noopener' target='_blank'>
            Descargar CV
          </a>
        </nav>
      </div>
    </header>
  )
}
