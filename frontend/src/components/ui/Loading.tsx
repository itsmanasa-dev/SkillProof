import type { ReactElement } from 'react'

export interface LoadingProps {
  label?: string
}

export function Loading({ label = 'Loading...' }: LoadingProps): ReactElement {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 py-10 text-sm text-muted-foreground"
    >
      <span
        aria-hidden="true"
        className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary"
      />
      <span>{label}</span>
    </div>
  )
}
