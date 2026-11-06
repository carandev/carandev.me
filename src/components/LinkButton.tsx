import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { ButtonSize, ButtonVariant } from '@carandev/trazos-ui'

interface LinkButtonProps extends ComponentPropsWithoutRef<'a'> {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

const SIZE_CLASS: Record<ButtonSize, string> = { small: 'sm', medium: 'md', large: 'lg' }

// Stopgap: Trazos UI's Button only renders <button>, so this mirrors its markup on an anchor.
// It relies on the library's internal class names; replace it once the library ships link support.
export function LinkButton ({
  variant = 'primary',
  size = 'medium',
  leadingIcon,
  trailingIcon,
  className = '',
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <a {...rest} className={`trazos-btn trazos-btn-${variant} trazos-btn-${SIZE_CLASS[size]} ${className}`.trim()}>
      {leadingIcon != null && <span className='trazos-btn-leading-icon'>{leadingIcon}</span>}
      <span className='trazos-btn-text'>{children}</span>
      {trailingIcon != null && <span className='trazos-btn-trailing-icon'>{trailingIcon}</span>}
    </a>
  )
}
