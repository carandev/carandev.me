import { useTheme } from "../hooks/useTheme";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  MessageCircle,
} from "lucide-react";
import styles from "./Contact.module.css";

export function Contact() {
  const { colors } = useTheme();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contacto@carandev.me",
      href: "mailto:contacto@carandev.me",
      description: "Para consultas profesionales",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/carandev",
      href: "https://github.com/carandev",
      description: "Explora mi código",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/carandev",
      href: "https://linkedin.com/in/carandev",
      description: "Conectemos profesionalmente",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Piedecuesta, Santander, Colombia",
      href: null,
      description: "Zona horaria: GMT-5",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title} style={{ color: colors.blue }}>
          ¡Hablemos!
        </h1>
        <p className={styles.subtitle} style={{ color: colors.yellow }}>
          // Estoy disponible para nuevas oportunidades
        </p>
      </div>

      <div className={styles.intro}>
        <p className={styles.introText}>
          Actualmente estoy trabajando en <strong>Schein SAS</strong> como
          Desarrollador Full Stack, pero siempre estoy abierto a explorar nuevas
          oportunidades que me permitan seguir creciendo profesionalmente.
        </p>
        <p className={styles.introText}>
          Si te interesa mi perfil, tienes algún proyecto en mente, o
          simplemente quieres saludar, ¡no dudes en contactarme! Respondo lo más
          pronto posible.
        </p>
      </div>

      <div className={styles.contactList}>
        {contactInfo.map((item) => (
          <a
            key={item.label}
            href={item.href || undefined}
            target={item.href ? "_blank" : undefined}
            rel={item.href ? "noopener noreferrer" : undefined}
            className={styles.contactCard}
            style={{ background: colors.sidebar, borderColor: colors.border }}
          >
            <div className={styles.contactIcon} style={{ background: colors.activityBar }}>
              <item.icon size={22} color={colors.blue} />
            </div>
            <div className={styles.contactInfo}>
              <p className={styles.contactLabel} style={{ color: colors.yellow }}>
                {item.label}
              </p>
              <p className={styles.contactValue}>{item.value}</p>
              <p className={styles.contactDesc}>{item.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className={styles.statusBox} style={{ background: colors.sidebar, borderColor: colors.green }}>
        <div className={styles.statusHeader}>
          <MessageCircle size={18} color={colors.green} />
          <p className={styles.statusTitle} style={{ color: colors.green }}>
            Estado: Disponible para oportunidades
          </p>
        </div>
        <p className={styles.statusText}>
          Actualmente trabajando en Schein SAS, pero abierto a propuestas
          laborales interesantes.
        </p>
      </div>
    </div>
  );
}
