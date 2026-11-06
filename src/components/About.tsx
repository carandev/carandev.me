import type { CSSProperties } from 'react'

import { profile } from '../data/profile'
import { currentStudies, firstJobStart, formatDuration, totalExperienceMonths } from '../lib/dates'
import { Underline } from './Sketch'
import styles from './About.module.css'

export function About () {
  const experience = formatDuration(totalExperienceMonths(profile.jobs))
  const studies = currentStudies(profile.education)

  return (
    <section className={styles.band} id='sobre-mi'>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text} data-reveal=''>
          <p className='eyebrow'>01 · sobre mí</p>
          <h2 className='section-title'>Código limpio, proyectos completos y ganas de aprender</h2>
          <Underline className={styles.underline} />
          <p className={styles.paragraph}>
            Tengo <span data-live-duration={firstJobStart(profile.jobs)}>{experience}</span> de experiencia desarrollando aplicaciones web, principalmente con Blazor y .NET,
            tanto del lado del cliente como del servidor. Me muevo cómodo consumiendo servicios web, diseñando
            arquitecturas y entregando soluciones de punta a punta.
          </p>
          {studies && (
            <p className={styles.paragraph}>
              Actualmente estudio {studies.degree} en la {studies.institution}
              {studies.shortName ? ` (${studies.shortName})` : ''}.
            </p>
          )}
        </div>

        <ul className={styles.skills}>
          {profile.skills.map((group, i) => (
            <li
              key={group.title}
              className={`hue-${group.tone} ${styles.skill}`}
              data-reveal=''
              style={{ '--delay': `${0.1 + i * 0.08}s`, '--tilt': `${[0, 1, -1, 0.5][i % 4]}deg` } as CSSProperties}
            >
              <h3 className={styles.skillTitle}>{group.title}</h3>
              <p className={styles.skillItems}>{group.items.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
