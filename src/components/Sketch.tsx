import type { CSSProperties } from 'react'

/**
 * Trazos "dibujados a mano". Cada path usa pathLength=1 para que la clase
 * `.sketch` (global.css) los anime como si se dibujaran al entrar en pantalla.
 */

interface SketchProps {
  className?: string
  style?: CSSProperties
  color?: string
  strokeWidth?: number
}

export function Underline ({ className = '', style, color = 'var(--wine-500)', strokeWidth = 3 }: SketchProps) {
  return (
    <svg aria-hidden='true' className={`sketch ${className}`} preserveAspectRatio='none' style={style} viewBox='0 0 220 14'>
      <path d='M3 9 C 40 2, 80 13, 120 7 S 190 3, 217 8' pathLength={1} stroke={color} strokeWidth={strokeWidth} />
    </svg>
  )
}

export function Circle ({ className = '', style, color = 'var(--lavender-border)', strokeWidth = 3 }: SketchProps) {
  return (
    <svg aria-hidden='true' className={`sketch ${className}`} preserveAspectRatio='none' style={style} viewBox='0 0 160 60'>
      <path d='M20 8 C 70 -2, 150 6, 154 28 C 158 52, 60 58, 18 50 C -6 44, 4 14, 34 9' pathLength={1} stroke={color} strokeWidth={strokeWidth} />
    </svg>
  )
}

export function Arrow ({ className = '', style, color = 'var(--lavender-accent)', strokeWidth = 2.5 }: SketchProps) {
  return (
    <svg aria-hidden='true' className={`sketch ${className}`} style={style} viewBox='0 0 80 60'>
      <path d='M8 8 C 20 40, 40 50, 70 46' pathLength={1} stroke={color} strokeWidth={strokeWidth} />
      <path d='M60 38 L71 46 L60 53' pathLength={1} stroke={color} strokeWidth={strokeWidth} style={{ '--draw-delay': '1s' } as CSSProperties} />
    </svg>
  )
}

export function Squiggle ({ className = '', style, color = 'var(--paper-border-strong)', strokeWidth = 2 }: SketchProps) {
  return (
    <svg aria-hidden='true' className={`sketch ${className}`} preserveAspectRatio='none' style={style} viewBox='0 0 720 20'>
      <path d='M2 10 C 120 4, 240 16, 360 9 S 600 4, 718 11' pathLength={1} stroke={color} strokeWidth={strokeWidth} />
    </svg>
  )
}
