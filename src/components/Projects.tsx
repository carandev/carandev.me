import { useState, type CSSProperties } from 'react'
import { ArrowUpRight, Github, Star } from 'lucide-react'

import { profile, type Tone } from '../data/profile'
import { useProjects } from '../hooks/useProjects'
import { useReveal } from '../hooks/useReveal'
import type { Project } from '../types/github'
import styles from './Projects.module.css'

const FEATURED_TONES: Tone[] = ['lavender', 'cream', 'mint']
const TAPE: { color: string, rotate: string, left: string }[] = [
  { color: 'rgba(212, 197, 232, 0.85)', rotate: '-3deg', left: '28px' },
  { color: 'rgba(245, 211, 132, 0.85)', rotate: '4deg', left: 'calc(100% - 112px)' },
  { color: 'rgba(197, 220, 203, 0.9)', rotate: '-2deg', left: '40%' }
]
const OTHERS_PREVIEW = 6

function FeaturedCard ({ project, index }: { project: Project, index: number }) {
  const tone = FEATURED_TONES[index % FEATURED_TONES.length]
  const tape = TAPE[index % TAPE.length]
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const mainUrl = project.demoUrl ?? project.repoUrl

  return (
    <article
      className={`tone-${tone} ${styles.card}`}
      data-reveal=''
      style={{ '--delay': `${index * 0.1}s` } as CSSProperties}
    >
      <span
        aria-hidden='true'
        className='tape'
        style={{ left: tape.left, '--tape-color': tape.color, '--tape-rotate': tape.rotate } as CSSProperties}
      />

      <div className={styles.media}>
        {project.imageUrl && !imageFailed
          ? (
            <img
              alt=''
              className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
              decoding='async'
              height={320}
              loading='lazy'
              src={project.imageUrl}
              width={640}
              onError={() => setImageFailed(true)}
              onLoad={() => setImageLoaded(true)}
            />
            )
          : <span aria-hidden='true' className={styles.mediaFallback}>{project.name}</span>}
      </div>

      <h3 className={styles.title}>
        {mainUrl
          ? <a className={styles.titleLink} href={mainUrl} rel='noopener noreferrer' target='_blank'>{project.name}</a>
          : project.name}
      </h3>
      <p className={styles.description}>{project.description ?? 'Sin descripción por ahora.'}</p>

      <ul aria-label='Tecnologías' className={styles.tags}>
        {project.language && (
          <li className='chip'>
            <span aria-hidden='true' className={styles.langDot} style={{ background: project.language.color ?? 'var(--ink-light)' }} />
            {project.language.name}
          </li>
        )}
        {project.topics.slice(0, 3).map(t => <li key={t} className='chip'>{t}</li>)}
        {project.stars > 0 && (
          <li className='chip'>
            <Star aria-hidden='true' size={12} /> {project.stars}
          </li>
        )}
      </ul>

      <div className={styles.links}>
        {project.demoUrl && (
          <a className={styles.link} href={project.demoUrl} rel='noopener noreferrer' target='_blank'>
            Ver más <ArrowUpRight aria-hidden='true' size={16} />
          </a>
        )}
        {project.repoUrl && (
          <a className={styles.link} href={project.repoUrl} rel='noopener noreferrer' target='_blank'>
            <Github aria-hidden='true' size={16} /> Código
          </a>
        )}
      </div>
    </article>
  )
}

function OtherRow ({ project }: { project: Project }) {
  const href = project.demoUrl ?? project.repoUrl
  const meta = [project.language?.name, ...project.topics.slice(0, 1)].filter(Boolean).join(' · ')
  const content = (
    <>
      <span className={styles.rowName}>{project.name}</span>
      <span className={styles.rowMeta}>
        {meta}
        {href && <ArrowUpRight aria-hidden='true' className={styles.rowArrow} size={16} />}
      </span>
    </>
  )

  return (
    <li>
      {href
        ? <a className={styles.row} href={href} rel='noopener noreferrer' target='_blank' title={project.description ?? undefined}>{content}</a>
        : <div className={styles.row}>{content}</div>}
    </li>
  )
}

function LoadingState () {
  return (
    <div aria-busy='true' aria-label='Cargando proyectos' className={styles.grid}>
      {[0, 1, 2].map(i => (
        <div key={i} className={`${styles.card} ${styles.cardSkeleton}`}>
          <div className={`skeleton ${styles.media}`} />
          <div className='skeleton' style={{ height: 26, width: '60%' }} />
          <div className='skeleton' style={{ height: 14, width: '95%' }} />
          <div className='skeleton' style={{ height: 14, width: '80%' }} />
        </div>
      ))}
    </div>
  )
}

export function Projects () {
  const state = useProjects()
  const [showAll, setShowAll] = useState(false)

  useReveal([state.status, showAll])

  return (
    <section className={`container ${styles.section}`} id='proyectos'>
      {/* reveal.ts may mark this element before hydration */}
      <div suppressHydrationWarning className={styles.header} data-reveal=''>
        <div className={styles.heading}>
          <p className='eyebrow'>03 · proyectos</p>
          <h2 className='section-title'>Cosas que he construido</h2>
        </div>
        <a className={styles.githubLink} href={profile.links.github} rel='noopener noreferrer' target='_blank'>
          Todo en GitHub <ArrowUpRight aria-hidden='true' size={16} />
        </a>
      </div>

      {state.status === 'loading' && <LoadingState />}

      {state.status === 'error' && (
        <p className={styles.message}>
          No pude cargar los proyectos en este momento. Mientras tanto, puedes verlos directamente en{' '}
          <a href={profile.links.github} rel='noopener noreferrer' target='_blank'>GitHub</a>.
        </p>
      )}

      {state.status === 'ready' && (
        <>
          <div className={styles.grid}>
            {state.featured.map((p, i) => <FeaturedCard key={p.name} index={i} project={p} />)}
          </div>

          {state.others.length > 0 && (
            <div className={styles.others} data-reveal=''>
              <p className={styles.othersTitle}>y otros experimentos…</p>
              <ul className={styles.rows}>
                {(showAll ? state.others : state.others.slice(0, OTHERS_PREVIEW)).map(p => (
                  <OtherRow key={p.name} project={p} />
                ))}
              </ul>
              {state.others.length > OTHERS_PREVIEW && (
                <button className={`btn btn--outline btn--sm ${styles.more}`} type='button' onClick={() => setShowAll(v => !v)}>
                  {showAll ? 'Ver menos' : `Ver ${state.others.length - OTHERS_PREVIEW} más`}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  )
}
