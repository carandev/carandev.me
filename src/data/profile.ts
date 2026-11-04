/**
 * Datos del portafolio. Todo lo que dependa del tiempo (años de experiencia,
 * trabajo actual, estado de los estudios) se calcula a partir de estas fechas.
 *
 * Formato de fechas: 'YYYY-MM' (o 'YYYY' si solo sabes el año).
 * `end: null` significa "actualmente".
 */

export interface Job {
  company: string
  url?: string
  role: string
  location: string
  start: string
  end: string | null
  highlights: string[]
}

export interface Education {
  institution: string
  shortName?: string
  degree: string
  /** Opcional: si no se indica, solo se muestra el estado ("en curso" / "finalizado"). */
  start?: string
  end: string | null
}

export interface SkillGroup {
  title: string
  tone: Tone
  items: string[]
}

export type Tone = 'lavender' | 'cream' | 'mint' | 'rose' | 'sky'

export const profile = {
  name: 'Carlos Gómez',
  fullName: 'Carlos Andrés Gómez Silva',
  role: 'Desarrollador Full Stack',
  location: 'Piedecuesta, Santander · Colombia',
  timezone: 'GMT-5',
  email: 'contacto@carandev.me',
  cvUrl: '/cv-carlos-gomez.pdf',
  avatarUrl: '/avatar.webp',
  links: {
    github: 'https://github.com/carandev',
    linkedin: 'https://linkedin.com/in/carandev'
  },

  jobs: [
    {
      company: 'Schein SAS',
      url: 'https://www.schein.co/',
      role: 'Desarrollador Full Stack',
      location: 'Bucaramanga, Colombia',
      start: '2023-05',
      end: null,
      highlights: [
        'Aplicaciones web y de escritorio con .NET, Blazor y WPF.',
        'Integración y consumo de servicios web.',
        'Código limpio y arquitecturas mantenibles y escalables.'
      ]
    }
  ] satisfies Job[],

  education: <Education[]>[
    {
      institution: 'Universitaria Tecnológica de Santander',
      shortName: 'UTS',
      degree: 'Tecnología en Desarrollo de Sistemas Informáticos',
      end: null
    }
  ],

  skills: [
    { title: 'Web con .NET', tone: 'lavender', items: ['Blazor', 'ASP.NET Core', 'Razor', 'Web APIs', 'REST'] },
    { title: 'Frontend', tone: 'cream', items: ['React', 'TypeScript', 'JavaScript', 'Vue', 'HTML/CSS'] },
    { title: 'Backend', tone: 'mint', items: ['C#', '.NET', 'Entity Framework', 'LINQ', 'Python'] },
    { title: 'Herramientas', tone: 'rose', items: ['Git', 'SQL Server', 'Docker', 'Azure', 'Linux'] }
  ] satisfies SkillGroup[]
}
