import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { Icon } from '@/components/common/Icon'
import { PageHeader } from '@/components/common/PageHeader'
import { LevelBadge, StatusBadge } from '@/components/common/SkillBadges'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Tabs } from '@/components/ui/Tabs'
import { skillsByStatus } from '@/data/mockSkills'
import type { Skill } from '@/types'

type TabKey = 'verified' | 'learning' | 'needs-evidence'

const tabItems = [
  { id: 'verified', label: 'Verified' },
  { id: 'learning', label: 'In progress' },
  { id: 'needs-evidence', label: 'Needs evidence' },
]

export function SkillsPage(): ReactElement {
  const [active, setActive] = useState<TabKey>('verified')
  const skills = skillsByStatus[active]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="My skills"
        title="Skills"
        description="Skills are only as valuable as the evidence behind them. Prove more to raise confidence."
      />

      <Tabs
        items={tabItems}
        activeId={active}
        onChange={(id) => setActive(id as TabKey)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} activeStatus={active} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SkillCard({
  skill,
  activeStatus,
}: {
  skill: Skill
  activeStatus: TabKey
}): ReactElement {
  return (
    <Link
      to={`/app/skills/${skill.id}`}
      className="card-gradient card-hover group relative overflow-hidden rounded-xl border border-border p-5"
      aria-label={`Open ${skill.name} skill details`}
    >
      <span
        className="absolute left-0 top-0 h-full w-1"
        style={{ background: skill.color }}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold"
            style={{ background: `${skill.color}1f`, color: skill.color }}
          >
            {skill.name.slice(0, 2)}
          </span>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary">
              {skill.name}
            </h3>
            <p className="text-xs text-faint">{skill.category}</p>
          </div>
        </div>
        <LevelBadge level={skill.level} />
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">
        {skill.summary}
      </p>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-muted">Confidence</span>
          <span className="font-medium text-foreground">
            {skill.confidence}%
          </span>
        </div>
        <ProgressBar
          value={skill.confidence}
          trackClassName="bg-white/5"
          gradient={skill.color}
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Icon name="evidence" className="h-3.5 w-3.5" />
          {skill.evidenceCount} evidence records
        </span>
        <StatusBadge status={activeStatus === 'verified' ? 'verified' : 'pending'}>
          {activeStatus === 'verified'
            ? 'Verified'
            : activeStatus === 'learning'
              ? 'In progress'
              : 'Needs evidence'}
        </StatusBadge>
      </div>
    </Link>
  )
}