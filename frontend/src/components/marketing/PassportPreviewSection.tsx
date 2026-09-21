import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { useState } from 'react'

import { SectionHeading } from '@/components/common/SectionHeading'
import { Icon } from '@/components/common/Icon'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/lib/motion'
import { mockProfile } from '@/data/mockProfile'
import { mockSkills } from '@/data/mockSkills'

const stats = [
  { label: 'Verified skills', value: '6' },
  { label: 'Evidence records', value: '27' },
  { label: 'Avg confidence', value: '84%' },
  { label: 'Challenges completed', value: '8' },
]

export function PassportPreviewSection(): ReactElement {
  const [copied, setCopied] = useState(false)

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
    <section id="passport" className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Skill passport"
          title="One shareable profile that speaks for itself"
          description="Recruiters see verified skills, confidence scores and the exact evidence behind them — no more self-reported resumes."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-violet/10" aria-hidden="true" />
          <div className="glass relative p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet text-lg font-semibold text-white">
                  {mockProfile.initials}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {mockProfile.name}
                    </h3>
                    <Icon name="check" className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-sm text-muted">{mockProfile.role}</p>
                </div>
              </div>
              <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
                Verified profile
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-lg border border-border bg-surface-2 p-3 text-center"
                >
                  <p className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-faint">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {mockSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: skill.color }}
                    aria-hidden="true"
                  />
                  {skill.name}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-border pt-6">
              <Button size="sm" onClick={share}>
                {copied ? 'Link copied' : 'Share Profile'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
              >
                Download PDF
              </Button>
              <span className="ml-auto text-xs text-faint">
                Last verified: Sep 2026
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}