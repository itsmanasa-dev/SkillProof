import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useState } from 'react'

import { SafeGraph } from '@/components/marketing/SafeGraph'
import { Button } from '@/components/ui/Button'
import { getSkillById } from '@/data/mockSkills'
import type { SkillGraphNode } from '@/types'

export function Hero(): ReactElement {
  const [selectedId, setSelectedId] = useState<string>('python')
  const selected = getSkillById(selectedId)

  const handleSelect = (node: SkillGraphNode): void => {
    const exists = getSkillById(node.id)
    if (exists) setSelectedId(node.id)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="bg-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-8 pt-14 md:px-8 md:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Skill verification for developers
            </motion.span>

            <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
              Don't just claim your skills.
              <span className="text-gradient"> Prove them.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg text-base leading-relaxed text-muted md:text-lg"
            >
              SkillProof puts your abilities to the test, evaluates practical
              performance, and builds a verified, evidence-backed skill profile
              you can share with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link to="/app/assessments">
                <Button size="lg">Prove a Skill</Button>
              </Link>
              <a href="#graph">
                <Button variant="outline" size="lg">
                  Explore Skill Graph
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
            <SafeGraph
              autoRotate
              interactive
              className="h-[340px] md:h-[420px]"
              selectedId={selectedId}
              onSelect={handleSelect}
              onBackgroundClick={() => setSelectedId('python')}
              navigateFromNode
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-center text-xs text-faint"
        >
          Hover a node to inspect it · Click any node to open its verified
          {selected ? ` ${selected.name} profile` : ''}
        </motion.p>
      </div>
    </section>
  )
}