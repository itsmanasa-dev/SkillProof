import type { ReactElement, SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string; hint?: string }[]
}

export function Select({
  label,
  options,
  className,
  id,
  ...props
}: SelectProps): ReactElement {
  const selectId = id ?? label
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-muted">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'h-10 w-full appearance-none rounded-lg border border-border bg-surface-2 px-3.5 pr-9 text-sm text-foreground',
            'transition-colors focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}