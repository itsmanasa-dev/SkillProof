import type { ReactElement } from 'react'
import { motion } from 'motion/react'

import { SectionHeading } from '@/components/common/SectionHeading'
import { Icon } from '@/components/common/Icon'
import { fadeUp, staggerContainer } from '@/lib/motion'
import type { IconName } from '@/components/common/Icon'

const steps: {
  step: string
  title: string
  description: string
  icon: IconName
}[] = [
  {
    step: '01',
    title: 'Pick a skill',
    icon: 'skills',
    description:
      'Choose the skill you want to prove from a structured dependency-aware skill map.',
  },
  {
    step: '02',
    title: 'Get assessed',
    icon: 'code',
    description:
      'Work through a real challenge in a live editor. Your code is run against hidden test cases.',
  },
  {
    step: '03',
    title: 'Gather evidence',
    icon: 'evidence',
    description:
      'Assessments, projects, interviews and GitHub activity become structured evidence records.',
  },
  {
    step: '04',
    title: 'Share your proof',
    icon: 'share',
    description:
      'A verified Skill Passport shows your confirmed level, confidence score and full evidence trail.',
  },
]

export function HowItWorks(): ReactElement {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From claim to verified proof in four steps"
          description="Every skill on your profile is earned the hard way — through demonstration, evaluation and evidence."
        />

        <motion.ol
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.li key={step.step} variants={fadeUp}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium tracking-widest text-faint">
                  STEP {step.step}
                </span>
                <span
                  className="mt-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary"
                  aria-hidden="true"
                >
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}