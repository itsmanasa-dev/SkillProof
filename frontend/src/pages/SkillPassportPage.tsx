import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { useState } from 'react'

import { Icon } from '@/components/common/Icon'
import { PageHeader } from '@/components/common/PageHeader'
import { LevelBadge } from '@/components/common/SkillBadges'
import { Button } from '@/components/ui/Button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { mockSkills } from '@/data/mockSkills'
import { mockProfile } from '@/data/mockProfile'

const passportSkills = mockSkills.filter((skill) => skill.status === 'verified')

export function SkillPassportPage(): ReactElement {
  const [copied, setCopied] = useState(false)
  const stats = mockProfile.passport

  const share = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText('https://skillproof.app/mv/manasat')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      <PageHeader
        eyebrow="Skill passport"
        title="Your verified passport"
        description="A shareable, evidence-backed summary of everything you've proven."
        actions={
          <>
            <Button size="sm" variant="outline" onClick={() => window.print()}>
              <Icon name="download" className="h-4 w-4" />
              Download PDF
            </Button>
            <Button size="sm" onClick={share}>
              {copied ? (
                <Icon name="check" className="h-4 w-4" />
              ) : (
                <Icon name="share" className="h-4 w-4" />
              )}
              {copied ? 'Link copied' : 'Share profile'}
            </Button>
          </>
        }
      />

      <motion.section
        variants={fadeUp}
        className="relative overflow-hidden rounded-2xl border border-border"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-violet/10" aria-hidden="true" />
        <div className="glass relative p-7 md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet text-xl font-semibold text-white">
                {mockProfile.initials}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    {mockProfile.name}
                  </h1>
                  <Icon name="check" className="h-5 w-5 text-success" />
                </div>
                <p className="text-sm text-muted">
                  {mockProfile.role} · {mockProfile.location}
                </p>
              </div>
            </div>
            <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
              Verified skill passport
            </span>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: 'Verified evidence', value: stats.verifiedEvidence },
              { label: 'Assessment score', value: `${stats.assessmentScore}%` },
              { label: 'Projects analyzed', value: stats.projectsAnalyzed },
              { label: 'Technical interviews', value: stats.technicalInterviews },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-surface-2 p-3 text-center"
              >
                <p className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-faint">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-faint">
              Verified skills
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {passportSkills.map((skill) => (
                <li
                  key={skill.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2 px-4 py-3"
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: skill.color }}
                      aria-hidden="true"
                    />
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-faint">
                      {skill.confidence}%
                    </span>
                    <LevelBadge level={skill.level} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-7 text-xs text-faint">
            Last verified:
            <span className="text-muted">
              {' '}
              {mockProfile.passport.technicalInterviews} evidence streams active
            </span>
          </p>
        </div>
      </motion.section>
    </motion.div>
  )
}