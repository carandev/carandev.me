import type { CSSProperties } from 'react'
import { GraduationCap } from 'lucide-react'

import { profile } from '../data/profile'
import { formatPeriod, formatYearMonth, isOngoing, parseYearMonth } from '../lib/dates'
import styles from './Experience.module.css'

const startTime = (start?: string) => start ? parseYearMonth(start).getTime() : Infinity

/** Más reciente primero; lo que no tiene fecha de inicio va arriba. */
const byStartDesc = <T extends { start?: string }>(a: T, b: T) => startTime(b.start) - startTime(a.start)

export function Experience () {
  const jobs = [...profile.jobs].sort(byStartDesc)
  const education = [...profile.education].sort(byStartDesc)

  return (
    <section className={`container ${styles.section}`} id='experiencia'>
      <div className={styles.heading} data-reveal=''>
        <p className='eyebrow'>02 · experiencia</p>
        <h2 className='section-title'>Dónde he estado</h2>
      </div>

      <div className={styles.columns}>
        <ol className={styles.jobs}>
          {jobs.map((job, i) => {
            const current = isOngoing(job.end)

            return (
              <li
                key={`${job.company}-${job.start}`}
                className={`${styles.job} ${current ? styles.jobCurrent : ''}`}
                data-reveal=''
                style={{ '--delay': `${i * 0.08}s` } as CSSProperties}
              >
                <div className={styles.jobHead}>
                  <h3 className={styles.jobRole}>{job.role}</h3>
                  <span className={styles.period}>{formatPeriod(job.start, job.end)}</span>
                </div>
                <p className={styles.company}>
                  {job.url
                    ? <a href={job.url} rel='noopener noreferrer' target='_blank'>{job.company}</a>
                    : job.company}
                  <span className={styles.location}> · {job.location}</span>
                </p>
                <ul className={styles.highlights}>
                  {job.highlights.map(h => <li key={h}>{h}</li>)}
                </ul>
                {current && <span className={styles.currentTag}>actual</span>}
              </li>
            )
          })}
        </ol>

        <ol className={styles.education}>
          {education.map((item, i) => {
            const ongoing = isOngoing(item.end)

            return (
              <li
                key={item.degree}
                className={`tone-${ongoing ? 'sky' : 'cream'} ${styles.study}`}
                data-reveal=''
                style={{ '--delay': `${0.12 + i * 0.08}s` } as CSSProperties}
              >
                <GraduationCap aria-hidden='true' className={styles.studyIcon} size={22} />
                <h3 className={styles.studyDegree}>{item.degree}</h3>
                <p className={styles.studyMeta}>
                  {item.institution}
                </p>
                <p className={styles.studyMeta}>
                  {item.start && `${formatYearMonth(item.start)} — ${ongoing ? 'hoy' : formatYearMonth(item.end as string)}`}
                  <span className={`chip ${styles.studyChip}`}>{ongoing ? 'en curso' : 'finalizado'}</span>
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
