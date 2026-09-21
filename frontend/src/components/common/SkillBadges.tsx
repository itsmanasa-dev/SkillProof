import type { ReactElement, ReactNode } from 'react'

import { Badge, type BadgeTone } from '@/components/ui/Badge'
import type { SkillLevel } from '@/types'

const levelTone: Record<SkillLevel, BadgeTone> = {
  Beginner: 'warning',
  Intermediate: 'primary',
  Advanced: 'violet',
}

export function LevelBadge({
  level,
  className,
}: {
  level: SkillLevel
  className?: string
}): ReactElement {
  return (
    <Badge tone={levelTone[level]} className={className}>
      {level}
    </Badge>
  )
}

export function StatusBadge({
  status,
  children,
}: {
  status: 'verified' | 'pending'
  children: ReactNode
}): ReactElement {
  return (
    <Badge tone={status === 'verified' ? 'success' : 'warning'}>
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full bg-current"
      />
      {children}
    </Badge>
  )
}