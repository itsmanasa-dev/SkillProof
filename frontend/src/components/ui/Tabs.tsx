import type { ReactElement } from 'react'
import { motion } from 'motion/react'

export interface TabItem {
  id: string
  label: string
}

export interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
  groupId?: string
}

export function Tabs({
  items,
  activeId,
  onChange,
  groupId = 'tabs',
}: TabsProps): ReactElement {
  return (
    <div
      role="tablist"
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-2 p-1"
    >
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'text-foreground'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${groupId}-tab-active`}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-md bg-white/8 ring-1 ring-white/10"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}