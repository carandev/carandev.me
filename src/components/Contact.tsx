import { CopyButton, LinkButton } from '@carandev/trazos-ui'
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react'

import { profile } from '../data/profile'
import styles from './Contact.module.css'

export function Contact () {
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
          <CopyButton
            checkIcon={<Check aria-hidden='true' size={18} />}
            copiedLabel='¡copiado!'
            fallback={email => { window.location.href = `mailto:${email}` }}
            icon={<Copy aria-hidden='true' size={18} />}
            label='Copiar correo'
            size='large'
            value={profile.email}
            variant='outline'
          />
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
      </div>
    </section>
  )
}
