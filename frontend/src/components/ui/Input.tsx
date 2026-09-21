import type { InputHTMLAttributes, ReactElement } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps): ReactElement {
  const inputId = id ?? label
  const classes = [
    'h-10 w-full rounded-md border border-border bg-surface px-3 text-sm',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    error ? 'border-destructive' : '',
    className,
  ].join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input id={inputId} className={classes} {...props} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
