import { useEffect, useState } from 'react'

/** Devuelve el id de la sección que está ocupando el centro de la pantalla. */
export function useScrollSpy (ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: '-45% 0px -50% 0px' })

    sections.forEach(s => observer.observe(s))

    return () => observer.disconnect()
  }, [ids])

  return active
}
