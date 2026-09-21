import type { ReactElement, ReactNode } from 'react'

import { Icon, type IconName } from './Icon'

export interface EmptyStateProps {
  icon?: IconName
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({
  icon = 'sparkles',
  title,
  description,
  action,
}: EmptyStateProps): ReactElement {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface/40 px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-muted">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}