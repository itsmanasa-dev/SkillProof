import type { ReactElement } from 'react'
import { motion } from 'motion/react'

import { SectionHeading } from '@/components/common/SectionHeading'
import { fadeUp, staggerContainer } from '@/lib/motion'

const claims = [
  { label: 'Skill', value: 'Python', note: 'Attested: "Microsoft Excel" scaled to "Python — Advanced"' },
  { label: 'Level', value: '"Expert"', note: 'Self-rated, no basis' },
  { label: 'Proof', value: 'None on file', note: 'Resume line, nothing behind it' },
]

const evidence = [
  { label: 'Skill', value: 'Python', note: '4 of 4 assessment attempts verified' },
  { label: 'Level', value: 'Advanced', note: '84% confidence from 8 evidence records' },
  { label: 'Proof', value: '8 records on file', note: 'Coding assessment, project, interview, GitHub' },
]

export function ProblemSection(): ReactElement {
  return (
    <section id="problem" className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="The problem"
          title="Resumes tell people what you know. Evidence shows what you can do."
          description="Any skill listed on a resume is a claim. SkillProof replaces claims with records — assessments you pass, projects you ship, interviews you nail."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          <ClaimCard
            title="The typical resume"
            badge="A claim"
            tone="muted"
            rows={claims}
            stamp="Unverified"
          />
          <ClaimCard
            title="A SkillProof profile"
            badge="Verified"
            tone="success"
            rows={evidence}
            stamp="Verified"
          />
        </motion.div>
      </div>
    </section>
  )
}

function ClaimCard({
  title,
  badge,
  tone,
  rows,
  stamp,
}: {
  title: string
  badge: string
  tone: 'muted' | 'success'
  rows: { label: string; value: string; note: string }[]
  stamp: string
}): ReactElement {
  const isVerified = tone === 'success'
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="card-gradient relative overflow-hidden rounded-2xl border border-border p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            isVerified
              ? 'border-success/30 bg-success/10 text-success'
              : 'border-border bg-white/5 text-faint'
          }`}
        >
          {badge}
        </span>
      </div>

      <div
        className={`absolute right-5 top-1/2 -translate-y-1/2 rotate-[-8deg] rounded-lg border px-3 py-1 text-sm font-semibold uppercase tracking-widest ${
          isVerified
            ? 'border-success/40 text-success/90'
            : 'border-warning/40 text-warning/80'
        }`}
        aria-hidden="true"
      >
        {stamp}
      </div>

      <dl className="mt-6 flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-border/60 pb-4 last:border-0">
            <dt className="text-xs uppercase tracking-wider text-faint">
              {row.label}
            </dt>
            <dd className="mt-1 text-lg font-medium text-foreground">
              {row.value}
            </dd>
            <dd className="mt-0.5 text-sm text-muted">{row.note}</dd>
          </div>
        ))}
      </dl>
    </motion.article>
  )
}