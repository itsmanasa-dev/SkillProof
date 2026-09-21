import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({
  className = '',
  children,
  ...props
}: CardProps): ReactElement {
  const classes = [
    'rounded-lg border border-border bg-surface text-foreground shadow-sm',
    className,
  ].join(' ')

  return (
    <div className={classes} {...props}>
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
    <div className={`flex flex-col gap-1 p-6 ${className}`} {...props}>
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
      className={`text-lg font-semibold tracking-tight ${className}`}
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
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
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
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}
