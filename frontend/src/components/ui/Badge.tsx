import type { ReactElement, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone =
  | 'default'
  | 'primary'
  | 'violet'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'neutral'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

const toneClasses: Record<BadgeTone, string> = {
  default:
    'bg-white/5 text-muted border-border',
  primary:
    'bg-primary/10 text-primary border-primary/25',
  violet:
    'bg-violet/10 text-violet border-violet/25',
  success:
    'bg-success/10 text-success border-success/25',
  warning:
    'bg-warning/10 text-warning border-warning/25',
  destructive:
    'bg-destructive/10 text-destructive border-destructive/25',
  neutral:
    'bg-surface-3 text-muted border-border-strong',
}

export function Badge({
  children,
  tone = 'default',
  className,
}: BadgeProps): ReactElement {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium tracking-wide',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}