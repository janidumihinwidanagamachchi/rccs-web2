import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type CardAlign = 'right' | 'middle' | 'left'

interface CardSectionProps {
  title?: ReactNode
  subtitle?: ReactNode
  align?: CardAlign
  wide?: boolean
  plain?: boolean
  slim?: boolean
  className?: string
  contentClassName?: string
  children: ReactNode
}

export function CardSection({
  title,
  subtitle,
  align = 'right',
  wide = false,
  plain = false,
  slim = false,
  className,
  contentClassName,
  children,
}: CardSectionProps) {
  return (
    <div className={cn('card-align', `card-align--${align}`, className)}>
      <section
        className={cn(
          'card-section',
          wide && 'card-section--wide',
          slim && 'card-section--slim'
        )}
      >
        {title ? (
          <h2 className="card-section-title">
            {title}
            {subtitle ? <span className="card-section-subtitle">{subtitle}</span> : null}
          </h2>
        ) : null}
        <div className={cn(plain ? 'card-surface--plain' : 'card-textbox', contentClassName)}>
          {children}
        </div>
      </section>
    </div>
  )
}