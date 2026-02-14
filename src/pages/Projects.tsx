import { useTheme } from '../hooks/useTheme'
import { useGitHub } from '../hooks/useGitHub'
import { Star, ExternalLink, Folder, Lock, Globe } from 'lucide-react'
import styles from './Projects.module.css'

const languageColors: Record<string, string> = {
  'C#': '#178600',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  Shell: '#89e051',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
}

function getLanguageColor(lang: string | null): string {
  if (!lang) return '#8b949e'
  return languageColors[lang] || '#8b949e'
}

export function Projects() {
  const { colors } = useTheme()
  const { repositories, loading, error } = useGitHub()

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading} style={{ color: colors.yellow }}>// Cargando proyectos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error} style={{ color: colors.red }}>Error: {error}</p>
        <p className={styles.errorHint}>
          Verifica que el token de GitHub tenga los permisos necesarios (scope repo).
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title} style={{ color: colors.blue }}>
          Mis Proyectos
        </h1>
        <p className={styles.subtitle} style={{ color: colors.yellow }}>
          // Proyectos ordenados por última actualización
        </p>
      </div>

      <div className={styles.grid}>
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className={styles.card}
            style={{ background: colors.sidebar, borderColor: colors.border }}
          >
            <div className={styles.cardHeader}>
              <Folder size={18} color={colors.yellow} />
              <h3 className={styles.cardTitle} style={{ color: colors.blue }}>
                {repo.name}
              </h3>
              {repo.private && (
                <span title="Repositorio privado">
                  <Lock size={14} color={colors.orange} />
                </span>
              )}
            </div>

            <p className={styles.cardDescription}>
              {repo.description || 'Sin descripción disponible'}
            </p>

            <div className={styles.cardMeta}>
              {repo.language && (
                <span className={styles.language} style={{ color: getLanguageColor(repo.language) }}>
                  ● {repo.language}
                </span>
              )}
              <span className={styles.stars} style={{ color: colors.yellow }}>
                <Star size={12} />
                {repo.stargazers_count}
              </span>
            </div>

            <div className={styles.cardActions}>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  <Globe size={14} />
                  Ver Demo
                </a>
              )}
              {!repo.private && (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  style={{ background: colors.activityBar, borderColor: colors.border }}
                >
                  <ExternalLink size={14} />
                  Código
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {repositories.length === 0 && (
        <div className={styles.empty}>
          <p style={{ color: colors.yellow, fontSize: '14px' }}>
            No hay proyectos con demo desplegada aún.
          </p>
        </div>
      )}
    </div>
  )
}
