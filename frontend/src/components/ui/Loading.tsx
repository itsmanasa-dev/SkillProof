import type { ReactElement } from 'react'

export interface LoadingProps {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Loading({
  label = 'Loading...',
  size = 'md',
}: LoadingProps): ReactElement {
  const dimensions =
    size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-5 w-5'
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 py-10 text-sm text-muted"
    >
      <span
        aria-hidden="true"
        className={cn_ring(dimensions)}
      />
      <span>{label}</span>
    </div>
  )
}

function cn_ring(dimensions: string): string {
  return `inline-block ${dimensions} animate-spin rounded-full border-2 border-border border-t-primary`
}