import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  interactive?: boolean
}

export function Card({
  className = '',
  interactive = false,
  children,
  ...props
}: CardProps): ReactElement {
  return (
    <div
      className={cn(
        'card-gradient rounded-xl border border-border text-foreground shadow-soft',
        interactive && 'card-hover',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className = '',
  children,
  ...props
}: CardProps): ReactElement {
  return (
    <div className={cn('flex flex-col gap-1 p-6 pb-3', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({
  className = '',
  children,
  ...props
}: CardProps): ReactElement {
  return (
    <h3
      className={cn('text-base font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  className = '',
  children,
  ...props
}: CardProps): ReactElement {
  return (
    <p className={cn('text-sm text-muted', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({
  className = '',
  children,
  ...props
}: CardProps): ReactElement {
  return (
    <div className={cn('p-6 pt-3', className)} {...props}>
      {children}
    </div>
  )
}