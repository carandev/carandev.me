import { useEffect } from 'react'

/**
 * Marca con `data-visible` los elementos `[data-reveal]` cuando entran en
 * pantalla, una sola vez. Las animaciones viven en CSS (ver styles/global.css),
 * así que con `prefers-reduced-motion` o sin JS el contenido se ve igual.
 *
 * `deps` permite re-escanear cuando aparece contenido nuevo (p. ej. proyectos).
 */
export function useReveal (deps: unknown[] = []) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-visible])')

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.setAttribute('data-visible', ''))

      return
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', '')
          observer.unobserve(entry.target)
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })

    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
