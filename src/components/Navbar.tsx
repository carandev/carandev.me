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

const CV_LINK = { href: profile.cvUrl, rel: 'noopener', target: '_blank' }

const LINKS: SiteHeaderLink[] = [
  ...SECTIONS.map(s => ({ href: `#${s.id}`, label: s.label })),
  // The header actions stay visible on mobile, so there the CV moves into the menu
  { ...CV_LINK, label: 'Descargar CV', className: styles.cvLink }
]

export function Navbar () {
  const active = useScrollSpy(SECTION_IDS)

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
      activeHref={active ? `#${active}` : undefined}
      className={styles.header}
      closeMenuLabel='Cerrar menú'
      currentType='location'
      links={LINKS}
      logo={(
        // reveal.ts may mark this element before hydration
        <a suppressHydrationWarning className={styles.logo} data-reveal='' href='#inicio'>
          carandev
          <SketchCircle className={`sketch ${styles.logoCircle}`} />
        </a>
      )}
      navLabel='Principal'
      openMenuLabel='Abrir menú'
    />
  )
}
