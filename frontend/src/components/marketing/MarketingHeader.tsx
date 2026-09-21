import type { ReactElement } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/Button'

const links = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Skill Graph', to: '/#graph' },
  { label: 'Evidence', to: '/#evidence' },
  { label: 'Passport', to: '/#passport' },
]

export function MarketingHeader(): ReactElement {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground"
          aria-label="SkillProof home"
        >
          <svg viewBox="0 0 64 64" fill="none" className="h-8 w-8" aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="url(#mkt-brand)" />
            <path
              d="M20 33.5l8.5 8.5L44 25"
              stroke="#ffffff"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="mkt-brand" x1="0" y1="0" x2="64" y2="64">
                <stop stopColor="#4e7cff" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          SkillProof
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              window.location.hash = ''
            }}
            className="hidden sm:inline-flex"
          >
            Sign in
          </Button>
          <Link to="/app">
            <Button size="sm">Open Dashboard</Button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}