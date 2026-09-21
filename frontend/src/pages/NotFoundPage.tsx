import type { ReactElement } from 'react'

export function NotFoundPage(): ReactElement {
  return (
    <div className="flex flex-col items-center gap-4 pt-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="text-muted-foreground">Page not found.</p>
    </div>
  )
}
