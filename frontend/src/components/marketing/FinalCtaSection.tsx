import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/lib/motion'

export function FinalCtaSection(): ReactElement {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-5 text-center md:px-8"
      >
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
          Stop selling yourself short.
          <span className="text-gradient"> Start proving it.</span>
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Take a challenge, watch your evidence build, and share a passport that
          hiring teams actually trust.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/app/assessments">
            <Button size="lg">Prove a Skill</Button>
          </Link>
          <Link to="/app">
            <Button variant="outline" size="lg">
              Open Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}