import { LinkButton, SiteHeader, SketchCircle, ThemeToggle, useScrollSpy, type SiteHeaderLink } from '@carandev/trazos-ui'
import { Moon, Sun } from 'lucide-react'

import { profile } from '../data/profile'
import { THEME_STORAGE_KEY } from '../lib/theme'
import styles from './Navbar.module.css'

const SECTIONS = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' }
]
const SECTION_IDS = SECTIONS.map(s => s.id)
const NO_SECTIONS: string[] = []
const BLOG_HREF = '/blog/'

const CV_LINK = { href: profile.cvUrl, rel: 'noopener', target: '_blank' }

/** Section anchors are relative on the home page and point back to it from other pages. */
const buildLinks = (base: string): SiteHeaderLink[] => [
  ...SECTIONS.map(s => ({ href: `${base}#${s.id}`, label: s.label })),
  { href: BLOG_HREF, label: 'Blog' },
  // The header actions stay visible on mobile, so there the CV moves into the menu
  { ...CV_LINK, label: 'Descargar CV', className: styles.cvLink }
]

interface NavbarProps {
  /** Page the navbar is rendered on. */
  current?: 'home' | 'blog'
}

export function Navbar ({ current = 'home' }: NavbarProps) {
  const isHome = current === 'home'
  const base = isHome ? '' : '/'
  const spied = useScrollSpy(isHome ? SECTION_IDS : NO_SECTIONS)
  const activeHref = isHome ? (spied ? `#${spied}` : undefined) : BLOG_HREF

  return (
    <SiteHeader
      actions={(
        <>
          <ThemeToggle
            label='Cambiar tema claro u oscuro'
            moonIcon={<Moon aria-hidden='true' size={20} />}
            storageKey={THEME_STORAGE_KEY}
            sunIcon={<Sun aria-hidden='true' size={20} />}
            title='Cambiar tema'
            variant='ghost'
          />
          <LinkButton {...CV_LINK} className={styles.cv} variant='outline'>Descargar CV</LinkButton>
        </>
      )}
      activeHref={activeHref}
      className={styles.header}
      closeMenuLabel='Cerrar menú'
      currentType='location'
      links={buildLinks(base)}
      logo={(
        // reveal.ts may mark this element before hydration
        <a suppressHydrationWarning className={styles.logo} data-reveal='' href={`${base}#inicio`}>
          carandev
          <SketchCircle className={`sketch ${styles.logoCircle}`} />
        </a>
      )}
      navLabel='Principal'
      openMenuLabel='Abrir menú'
    />
  )
}
