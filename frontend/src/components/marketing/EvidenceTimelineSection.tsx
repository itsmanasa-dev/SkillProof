import type { ReactElement } from 'react'
import { motion } from 'motion/react'

import { SectionHeading } from '@/components/common/SectionHeading'
import { Icon, type IconName } from '@/components/common/Icon'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { mockEvidence } from '@/data/mockEvidence'
import type { EvidenceItem, EvidenceType } from '@/types'

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

export function EvidenceTimelineSection(): ReactElement {
  const timeline = [...mockEvidence].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <section id="evidence" className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Evidence timeline"
          title="Every skill is backed by a trail"
          description="Assessments, shipped projects, interviews and real development activity — each one dated, scored and attached to the skills it proves."
        />

        <motion.ol
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative mx-auto mt-14 max-w-2xl"
        >
          <span
            className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
            aria-hidden="true"
          />
          {timeline.slice(0, 5).map((item) => (
            <TimelineRow key={item.id} item={item} />
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

function TimelineRow({ item }: { item: EvidenceItem }): ReactElement {
  return (
    <motion.li variants={fadeUp} className="relative pl-12 pb-8 last:pb-0">
      <span
        className="absolute left-2.5 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background"
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      </span>

      <div className="card-gradient group rounded-xl border border-border p-5 transition-colors hover:border-border-strong">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2 text-muted"
              aria-hidden="true"
            >
              <Icon
                name={typeIcon[item.type]}
                className="h-4 w-4"
              />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-faint">
                {item.date} · {item.type}
              </p>
            </div>
          </div>
          <Badge tone={resultTone[item.result] ?? 'neutral'}>
            {item.result}
          </Badge>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {item.summary}
        </p>
        <div className="mt-3 border-t border-border/60 pt-3">
          <span className="text-xs text-faint">Attributed to</span>
          <span className="ml-2 text-sm font-medium text-foreground">
            {item.skillName}
          </span>
        </div>
      </div>
    </motion.li>
  )
}