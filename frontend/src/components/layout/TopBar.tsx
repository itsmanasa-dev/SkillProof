import type { ReactElement } from 'react'
import { motion } from 'motion/react'

import { Icon } from '@/components/common/Icon'

export interface TopBarProps {
  query: string
  onQueryChange: (value: string) => void
  notificationCount: number
  onNotificationsOpen: () => void
  initials: string
}

export function TopBar({
  query,
  onQueryChange,
  notificationCount,
  onNotificationsOpen,
  initials,
}: TopBarProps): ReactElement {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-8">
      <div className="relative hidden max-w-sm flex-1 md:block">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search skills, evidence..."
          aria-label="Search"
          className="h-9 w-full rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-sm text-foreground placeholder:text-faint transition-colors focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          onClick={onNotificationsOpen}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2 text-muted transition-colors hover:text-foreground"
        >
          <Icon name="bell" className="h-[18px] w-[18px]" />
          {notificationCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 24 }}
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white"
            >
              {notificationCount}
            </motion.span>
          )}
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg border border-border bg-surface-2 p-1.5 pl-2 transition-colors hover:border-border-strong"
          aria-label="Profile"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-violet text-xs font-semibold text-white">
            {initials}
          </span>
          <span className="hidden pr-1 text-sm font-medium text-foreground md:block">
            Profile
          </span>
        </button>
      </div>
    </header>
  )
}