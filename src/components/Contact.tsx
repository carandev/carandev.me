import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react'

import { profile } from '../data/profile'
import styles from './Contact.module.css'

export function Contact () {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>()

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
          <a className='btn btn--primary' href={`mailto:${profile.email}`}>
            <Mail aria-hidden='true' size={18} /> {profile.email}
          </a>
          <button
            aria-label={copied ? 'Correo copiado' : 'Copiar correo'}
            className={`btn btn--outline ${styles.copy}`}
            type='button'
            onClick={copyEmail}
          >
            {copied ? <Check aria-hidden='true' size={18} /> : <Copy aria-hidden='true' size={18} />}
            <span aria-hidden='true' className={`${styles.copiedNote} ${copied ? styles.copiedVisible : ''}`}>¡copiado!</span>
          </button>
        </div>

        <div className={styles.socials}>
          <a className='btn btn--outline btn--sm' href={profile.links.github} rel='noopener noreferrer' target='_blank'>
            <Github aria-hidden='true' size={16} /> GitHub
          </a>
          <a className='btn btn--outline btn--sm' href={profile.links.linkedin} rel='noopener noreferrer' target='_blank'>
            <Linkedin aria-hidden='true' size={16} /> LinkedIn
          </a>
        </div>
        <p aria-live='polite' className='visually-hidden'>{copied ? 'Correo copiado al portapapeles' : ''}</p>
      </div>
    </section>
  )
}
