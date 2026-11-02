import { useEffect } from 'react'

import { observeReveal } from '../scripts/reveal'

/** Re-scans for `[data-reveal]` elements after an island renders new content. */
export function useReveal (deps: unknown[] = []) {
  useEffect(() => {
    observeReveal()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
