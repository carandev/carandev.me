import type { Education, Job } from '../data/profile'

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

/** 'YYYY' o 'YYYY-MM' → Date (primer día del mes). */
export function parseYearMonth (value: string): Date {
  const [year, month = '1'] = value.split('-')

  return new Date(Number(year), Number(month) - 1, 1)
}

function hasMonth (value: string) {
  return value.includes('-')
}

/** Meses completos entre dos fechas. */
export function monthsBetween (from: Date, to: Date = new Date()): number {
  const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())

  return Math.max(0, months)
}

function plural (n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`
}

/** "3 años", "3 años y 6 meses", "8 meses". */
export function formatDuration (totalMonths: number, { withMonths = false } = {}): string {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0) return plural(Math.max(1, months), 'mes', 'meses')
  if (!withMonths || months === 0) return plural(years, 'año', 'años')

  return `${plural(years, 'año', 'años')} y ${plural(months, 'mes', 'meses')}`
}

/** "may 2023" o "2023". */
export function formatYearMonth (value: string): string {
  const date = parseYearMonth(value)

  return hasMonth(value) ? `${MONTHS[date.getMonth()]} ${date.getFullYear()}` : String(date.getFullYear())
}

export function isOngoing (end: string | null, now: Date = new Date()): boolean {
  return end === null || parseYearMonth(end) > now
}

/** Experiencia profesional total: desde el primer trabajo hasta hoy. */
export function totalExperienceMonths (jobs: Job[], now: Date = new Date()): number {
  if (jobs.length === 0) return 0
  const first = jobs.map(j => parseYearMonth(j.start)).sort((a, b) => a.getTime() - b.getTime())[0]

  return monthsBetween(first, now)
}

export function currentJob (jobs: Job[], now: Date = new Date()): Job | undefined {
  return jobs.find(j => isOngoing(j.end, now))
}

export function currentStudies (education: Education[], now: Date = new Date()): Education | undefined {
  return education.find(e => isOngoing(e.end, now))
}

/** "may 2023 — hoy · 3 años y 6 meses" */
export function formatPeriod (start: string, end: string | null, now: Date = new Date()): string {
  const ongoing = isOngoing(end, now)
  const endLabel = ongoing ? 'hoy' : formatYearMonth(end as string)
  const months = monthsBetween(parseYearMonth(start), ongoing ? now : parseYearMonth(end as string))

  return `${formatYearMonth(start)} — ${endLabel} · ${formatDuration(months, { withMonths: true })}`
}
