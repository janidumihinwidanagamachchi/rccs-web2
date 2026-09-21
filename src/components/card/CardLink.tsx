import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function CardLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return <Link className={cn('card-link', className)} {...props} />
}