import type { ReactElement, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useState } from 'react'

import { Icon } from '@/components/common/Icon'
import { PageHeader } from '@/components/common/PageHeader'
import { LevelBadge } from '@/components/common/SkillBadges'
import { Button } from '@/components/ui/Button'
import { mockSkills } from '@/data/mockSkills'
import type { Skill } from '@/types'

const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const
const assessmentTypes = ['Practical coding', 'System reasoning'] as const

export function AssessmentSetupPage(): ReactElement {
  const navigate = useNavigate()
  const [skill, setSkill] = useState<Skill>(mockSkills[0])
  const [difficulty, setDifficulty] =
    useState<(typeof difficulties)[number]>('Intermediate')
  const [assessmentType, setAssessmentType] =
    useState<(typeof assessmentTypes)[number]>('Practical coding')

  const launch = (): void => {
    navigate('/app/assessments/ch-01')
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Assessment"
        title="Set up your assessment"
        description="Choose a skill, difficulty and format. Your performance becomes verifiable evidence."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="flex flex-col gap-8">
          <section>
            <StepLabel step="01" label="Choose a skill" />
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
              {mockSkills.map((item) => {
                const active = item.id === skill.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSkill(item)}
                    className={`relative rounded-xl border p-4 text-left transition-colors ${
                      active
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-border bg-surface hover:border-border-strong'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="setup-skill-active"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/40"
                        aria-hidden="true"
                      />
                    )}
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: item.color }}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-semibold text-foreground">
                        {item.name}
                      </span>
                    </span>
                    <span className="mt-2 block text-xs text-faint">
                      {item.category} · {item.evidenceCount} verified
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <StepLabel step="02" label="Difficulty" />
            <div className="mt-3 inline-flex items-center gap-1 rounded-lg border border-border bg-surface-2 p-1">
              {difficulties.map((level) => {
                const active = difficulty === level
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      active ? 'text-foreground' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="setup-difficulty-active"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-md bg-white/8 ring-1 ring-white/10"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{level}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <StepLabel step="03" label="Assessment type" />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {assessmentTypes.map((type) => {
                const active = assessmentType === type
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAssessmentType(type)}
                    className={`relative rounded-xl border p-4 text-left transition-colors ${
                      active
                        ? 'border-violet/50 bg-violet/5'
                        : 'border-border bg-surface hover:border-border-strong'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="setup-type-active"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl ring-1 ring-inset ring-violet/40"
                        aria-hidden="true"
                      />
                    )}
                    <Icon
                      name={type === 'Practical coding' ? 'code' : 'layers'}
                      className={`h-5 w-5 ${active ? 'text-violet' : 'text-muted'}`}
                    />
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {type}
                    </p>
                    <p className="mt-1 text-xs text-faint">
                      {type === 'Practical coding'
                        ? 'Write code against hidden test cases.'
                        : 'Design a system and reason about trade-offs.'}
                    </p>
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        <aside className="card-gradient h-fit rounded-xl border border-border p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Assessment summary
          </h2>
          <dl className="mt-5 flex flex-col gap-4">
            <SummaryRow label="Skill">
              <span className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: skill.color }}
                  aria-hidden="true"
                />
                {skill.name}
              </span>
            </SummaryRow>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-muted">Current level</dt>
              <dd>
                <LevelBadge level={skill.level} />
              </dd>
            </div>
            <SummaryRow label="Difficulty">{difficulty}</SummaryRow>
            <SummaryRow label="Type">{assessmentType}</SummaryRow>
            <SummaryRow label="Questions">
              5
            </SummaryRow>
            <SummaryRow label="Estimated time">
              {difficulty === 'Advanced' ? 45 : 30} minutes
            </SummaryRow>
          </dl>

          <div className="border-t border-border pt-5">
            <Button size="lg" className="w-full" onClick={launch}>
              <Icon name="sparkles" className="h-4 w-4" />
              Launch assessment
            </Button>
            <p className="mt-3 text-center text-xs text-faint">
              Your submission is evaluated against hidden test cases.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function StepLabel({ step, label }: { step: string; label: string }): ReactElement {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
        {step}
      </span>
      <h2 className="text-base font-semibold tracking-tight text-foreground">
        {label}
      </h2>
    </div>
  )
}

function SummaryRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}): ReactElement {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{children}</dd>
    </div>
  )
}