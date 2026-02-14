import { useState, useEffect, useCallback } from 'react'

export function useSecrets() {
  const [unlocked, setUnlocked] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState(false)

  const unlock = useCallback(() => {
    if (!unlocked) {
      setUnlocked(true)
      setJustUnlocked(true)
      setTimeout(() => setJustUnlocked(false), 2000)
    }
  }, [unlocked])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault()
        unlock()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [unlock])

  return { unlocked, justUnlocked, unlock }
}
