import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'

import { Icon } from '@/components/common/Icon'
import { appNavItems } from './nav'

function BrandMark(): ReactElement {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-8 w-8" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="url(#sp-brand-grad)" />
      <path
        d="M20 33.5l8.5 8.5L44 25"
        stroke="#ffffff"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="sp-brand-grad" x1="0" y1="0" x2="64" y2="64">
          <stop stopColor="#4e7cff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Sidebar({
  onSettingsOpen,
}: {
  onSettingsOpen: () => void
}): ReactElement {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface/60 backdrop-blur lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <BrandMark />
        <span className="text-base font-semibold tracking-tight text-foreground">
          SkillProof
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {appNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted hover:bg-white/5 hover:text-foreground'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 34,
                        }}
                        className="absolute inset-0 rounded-lg bg-white/8 ring-1 ring-white/10"
                        aria-hidden="true"
                      />
                    )}
                    <Icon
                      name={item.icon}
                      className={`relative z-10 h-[18px] w-[18px] ${
                        isActive ? 'text-primary' : 'group-hover:text-foreground'
                      }`}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={onSettingsOpen}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
        >
          <Icon name="settings" className="h-[18px] w-[18px]" />
          Settings
        </button>
      </div>
    </aside>
  )
}