import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { Icon, type IconName } from '@/components/common/Icon'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import { Tabs } from '@/components/ui/Tabs'
import { mockEvidence } from '@/data/mockEvidence'
import { getSkillById } from '@/data/mockSkills'
import type { EvidenceItem, EvidenceType } from '@/types'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'Assessment', label: 'Assessments' },
  { id: 'Project', label: 'Projects' },
  { id: 'Interview', label: 'Interviews' },
  { id: 'GitHub', label: 'GitHub' },
] as const

type FilterId = 'all' | EvidenceType

const typeIcon: Record<EvidenceType, IconName> = {
  Assessment: 'assessment',
  Project: 'briefcase',
  Interview: 'users',
  GitHub: 'github',
  Challenge: 'sparkles',
}

const resultTone: Record<string, BadgeTone> = {
  Passed: 'success',
  Strong: 'success',
  Merged: 'success',
  'Evidence detected': 'primary',
  Analyzed: 'primary',
}

export function EvidencePage(): ReactElement {
  const [active, setActive] = useState<FilterId>('all')
  const items =
    active === 'all'
      ? mockEvidence
      : mockEvidence.filter((item) => item.type === active)

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Evidence"
        title="Evidence record"
        description="Every record below is date-stamped, scored and attributed to a skill."
      />

      <Tabs
        items={[...filters]}
        activeId={active}
        onChange={(id) => setActive(id as FilterId)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 md:grid-cols-2"
        >
          {items.map((item) => (
            <EvidenceCard key={item.id} item={item} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function EvidenceCard({ item }: { item: EvidenceItem }): ReactElement {
  const skill = getSkillById(item.skillId)
  const color = skill?.color ?? '#8b5cf6'

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-gradient card-hover group relative overflow-hidden rounded-xl border border-border p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg border"
            style={{ borderColor: `${color}40`, background: `${color}14`, color }}
            aria-hidden="true"
          >
            <Icon name={typeIcon[item.type]} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="text-xs text-faint">
              {item.date} · {item.type}
            </p>
          </div>
        </div>
        <Badge tone={resultTone[item.result] ?? 'neutral'}>{item.result}</Badge>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
        {item.summary}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: color }}
            aria-hidden="true"
          />
          {item.skillName}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          Score
          <span className="font-medium text-foreground">{item.score}</span>
        </span>
      </div>
    </motion.article>
  )
}