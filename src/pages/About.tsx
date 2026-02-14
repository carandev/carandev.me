import { useTheme } from "../hooks/useTheme";
import { MapPin, FileText, ExternalLink, Briefcase, Code2 } from "lucide-react";
import styles from "./About.module.css";

export function About() {
  const { colors } = useTheme();

  const skills = [
    {
      category: "Blazor / Web",
      items: ["Blazor", "ASP.NET Core", "Razor", "Web APIs", "REST"],
    },
    {
      category: "Frontend",
      items: ["React", "JavaScript", "TypeScript", "Vue", "HTML/CSS"],
    },
    {
      category: "Backend",
      items: [".NET", "C#", "Python", "Entity Framework", "LINQ"],
    },
    {
      category: "Herramientas",
      items: ["Git", "SQL Server", "Docker", "Azure", "Linux"],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title} style={{ color: colors.blue }}>
          Carlos Andres Gomez Silva
        </h1>
        <p className={styles.subtitle} style={{ color: colors.yellow }}>
          Full Stack Developer
        </p>
      </div>

      <div className={styles.location}>
        <MapPin size={16} color={colors.foreground} />
        <span>Piedecuesta, Santander, Colombia</span>
      </div>

      <div className={styles.experience}>
        <Briefcase size={16} color={colors.green} />
        <span style={{ color: colors.green }}>3 años de experiencia</span>
        <span className={styles.experienceDivider}>|</span>
        <span>Schein SAS</span>
      </div>

      <div className={styles.bio}>
        <p className={styles.bioText}>
          Desarrollador Full Stack con 3 años de experiencia. Mi enfoque
          principal es el desarrollo de aplicaciones web con{" "}
          <strong>Blazor</strong> y <strong>.NET</strong>, tanto del lado del
          cliente como del servidor. Actualmente trabajo en{" "}
          <a target="_blank" href="https://www.schein.co/">
            <strong>Schein SAS</strong>
          </a>
          .
        </p>
        <p className={styles.bioText}>
          Tengo experiencia en consumo de servicios web, diseño de arquitecturas
          modernas y creación de soluciones completas. Me apasiona el{" "}
          <strong>código limpio</strong>, el{" "}
          <strong>liderazgo de proyectos</strong>y el aprendizaje continuo.
        </p>
        <p className={styles.bioText}>
          Estudiando <strong>Ingeniería de Sistemas</strong> en las{" "}
          <strong>Unidades Tecnológicas de Santander</strong> (UTS).
        </p>
      </div>

      <div>
        <a
          href="/cv-carlos-gomez.pdf"
          target="_blank"
          className={styles.cvButton}
          style={{ background: colors.blue }}
        >
          <FileText size={16} />
          Descargar CV
          <ExternalLink size={14} />
        </a>
      </div>

      <div className={styles.skills}>
        <h2 className={styles.skillsTitle} style={{ color: colors.purple }}>
          <Code2
            size={14}
            style={{ marginRight: "6px", verticalAlign: "middle" }}
          />
          Habilidades Técnicas
        </h2>
        <div className={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill.category} className={styles.skillCategory}>
              <h3
                className={styles.skillCategoryTitle}
                style={{ color: colors.yellow }}
              >
                {skill.category}
              </h3>
              <ul className={styles.skillList}>
                {skill.items.map((item) => (
                  <li key={item} className={styles.skillItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
