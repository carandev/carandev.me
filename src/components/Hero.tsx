import type { CSSProperties } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

import { profile } from '../data/profile'
import { currentJob, formatDuration, totalExperienceMonths } from '../lib/dates'
import { Arrow } from './Sketch'
import styles from './Hero.module.css'

const delay = (s: number) => ({ '--delay': `${s}s` } as CSSProperties)

export function Hero () {
  const experience = formatDuration(totalExperienceMonths(profile.jobs))
  const job = currentJob(profile.jobs)

  return (
    <section className={`container ${styles.hero}`} id='inicio'>
      <div className={styles.copy}>
        <p className={styles.hello} data-reveal='' style={delay(0)}>¡hola! soy</p>
        <h1 className={styles.name} data-reveal='' style={delay(0.08)}>{profile.name}</h1>
        <p className={styles.lead} data-reveal='' style={delay(0.16)}>
          {profile.role} con <strong>{experience}</strong> de experiencia. Construyo aplicaciones web con{' '}
          <span className='highlight highlight--lavender'>.NET y Blazor</span>, y también con{' '}
          <span className='highlight highlight--cream'>React y TypeScript</span>.
        </p>

        <div className={styles.actions} data-reveal='' style={delay(0.24)}>
          <a className='btn btn--primary' href='#proyectos'>
            Ver mis proyectos <ArrowRight aria-hidden='true' size={18} strokeWidth={2.4} />
          </a>
          <a className='btn btn--lavender' href='#contacto'>Hablemos</a>
        </div>

        <div className={styles.meta} data-reveal='' style={delay(0.32)}>
          {job && (
            <span className={styles.metaItem}>
              Actualmente en <a href={job.url} rel='noopener noreferrer' target='_blank'>{job.company}</a>
            </span>
          )}
          <span className={styles.metaItem}>
            <MapPin aria-hidden='true' size={16} />
            {profile.location}
          </span>
        </div>
      </div>

      <div className={styles.photoWrap} data-reveal='' style={delay(0.2)}>
        <div className={styles.photo}>
          <div aria-hidden='true' className={styles.photoBack} />
          <img
            alt={`Foto de ${profile.name}`}
            className={styles.photoImg}
            height={460}
            src={profile.avatarUrl}
            width={420}
          />
          <span aria-hidden='true' className='tape' style={{ left: '50%', marginLeft: -42, top: -14, '--tape-rotate': '-4deg' } as CSSProperties} />
          <p aria-hidden='true' className={styles.note}>ese soy yo</p>
          <Arrow className={styles.arrow} />
        </div>
      </div>
    </section>
  )
}
