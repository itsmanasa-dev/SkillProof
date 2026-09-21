import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { Button } from '@/components/ui/Button'

export interface GraphInfoPanelProps {
  selected: {
    name: string
    level: string
    confidence: number
    evidence: number
    gaps: number
    color: string
  } | null
  onNavigate?: () => void
  emptyTitle?: string
  emptyDescription?: string
}

export function GraphInfoPanel({
  selected,
  onNavigate,
  emptyTitle = 'Select a skill node',
  emptyDescription = 'Click any node in the graph to inspect its verification status.',
}: GraphInfoPanelProps): ReactElement {
  return (
    <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-border bg-surface p-5">
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: selected.color }}
              />
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {selected.name}
              </h3>
              <span className="text-xs text-faint">{selected.level}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-xs text-faint">Confidence</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {selected.confidence}
                  <span className="text-sm text-muted">%</span>
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-xs text-faint">Evidence</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {selected.evidence}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-xs text-faint">Level</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {selected.level}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-xs text-faint">Skill gaps</p>
                <p className="mt-1 text-2xl font-semibold text-warning">
                  {selected.gaps}
                </p>
              </div>
            </div>

            {onNavigate && (
              <Button variant="outline" size="sm" onClick={onNavigate}>
                View skill details
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 text-center"
          >
            <span className="text-faint">
              <FilterIcon />
            </span>
            <p className="text-sm font-medium text-foreground">{emptyTitle}</p>
            <p className="max-w-[240px] text-xs text-muted">
              {emptyDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterIcon(): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7 7.2 10.5 15.5M17 7.2 13.5 15.5M7.4 6h9.2" />
    </svg>
  )
}