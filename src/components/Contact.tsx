import { useEffect, useRef, useState } from 'react'
import { Button } from '@carandev/trazos-ui'
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react'

import { profile } from '../data/profile'
import { LinkButton } from './LinkButton'
import styles from './Contact.module.css'

export function Contact () {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className='container' id='contacto'>
      {/* reveal.ts may mark this element before hydration */}
      <div suppressHydrationWarning className={styles.box} data-reveal=''>
        <p className={styles.eyebrow}>04 · ¿hablamos?</p>
        <h2 className={styles.title}>¿Tienes un proyecto o una vacante en mente?</h2>
        <p className={styles.text}>
          Respondo lo más pronto posible. También me encuentras en GitHub y LinkedIn.
        </p>

        <div className={styles.actions}>
          <LinkButton href={`mailto:${profile.email}`} leadingIcon={<Mail aria-hidden='true' size={18} />} size='large'>
            {profile.email}
          </LinkButton>
          <Button
            aria-label={copied ? 'Correo copiado' : 'Copiar correo'}
            className={styles.copy}
            size='large'
            variant='outline'
            onClick={copyEmail}
          >
            {copied ? <Check aria-hidden='true' size={18} /> : <Copy aria-hidden='true' size={18} />}
            <span aria-hidden='true' className={`${styles.copiedNote} ${copied ? styles.copiedVisible : ''}`}>¡copiado!</span>
          </Button>
        </div>

        <div className={styles.socials}>
          <LinkButton
            href={profile.links.github}
            leadingIcon={<Github aria-hidden='true' size={16} />}
            rel='noopener noreferrer'
            target='_blank'
            variant='outline'
          >
            GitHub
          </LinkButton>
          <LinkButton
            href={profile.links.linkedin}
            leadingIcon={<Linkedin aria-hidden='true' size={16} />}
            rel='noopener noreferrer'
            target='_blank'
            variant='outline'
          >
            LinkedIn
          </LinkButton>
        </div>
        <p aria-live='polite' className='visually-hidden'>{copied ? 'Correo copiado al portapapeles' : ''}</p>
      </div>
    </section>
  )
}
