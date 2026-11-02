import { useEffect, useState } from 'react'

import { getProjects } from '../services/github'
import type { Project } from '../types/github'

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready', featured: Project[], others: Project[] }

const MAX_FEATURED = 3

export function useProjects (): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    getProjects(controller.signal)
      .then(projects => {
        const featured = projects.filter(p => p.featured).slice(0, MAX_FEATURED)
        const others = projects.filter(p => !featured.includes(p))

        setState({ status: 'ready', featured, others })
      })
      .catch(err => {
        if (!controller.signal.aborted) {
          console.error(err)
          setState({ status: 'error' })
        }
      })

    return () => controller.abort()
  }, [])

  return state
}
