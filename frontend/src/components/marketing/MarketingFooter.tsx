import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export function MarketingFooter(): ReactElement {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8">
        <div className="flex flex-col gap-1.5">
          <span className="text-base font-semibold tracking-tight text-foreground">
            SkillProof
          </span>
          <p className="max-w-xs text-sm text-muted">
            Turning claimed skills into demonstrable, verified evidence.
          </p>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted" aria-label="Footer">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/app" className="transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link to="/app/passport" className="transition-colors hover:text-foreground">
            Skill Passport
          </Link>
        </nav>
      </div>
    </footer>
  )
}