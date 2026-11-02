import { formatDuration, formatPeriod, monthsBetween, parseYearMonth } from '../lib/dates'

/**
 * The page is prerendered, so date-derived text would freeze at build time.
 * Components render the build-time value plus a data attribute; this script
 * recomputes it in the browser with today's date.
 *
 *   data-live-duration="2023-05"           → "3 años"
 *   data-live-period="2023-05" [data-end]  → "may 2023 — hoy · 3 años y 6 meses"
 *   data-live-year                         → current year
 */
export function refreshLiveDates (root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-live-duration]').forEach(el => {
    el.textContent = formatDuration(monthsBetween(parseYearMonth(el.dataset.liveDuration as string)))
  })

  root.querySelectorAll<HTMLElement>('[data-live-period]').forEach(el => {
    el.textContent = formatPeriod(el.dataset.livePeriod as string, el.dataset.end ?? null)
  })

  root.querySelectorAll<HTMLElement>('[data-live-year]').forEach(el => {
    el.textContent = String(new Date().getFullYear())
  })
}
