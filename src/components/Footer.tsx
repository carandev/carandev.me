import { profile } from '../data/profile'
import styles from './Footer.module.css'

export function Footer () {
  return (
    <footer className={`container ${styles.footer}`}>
      <span>© {new Date().getFullYear()} {profile.name} · hecho a mano con React</span>
    </footer>
  )
}
