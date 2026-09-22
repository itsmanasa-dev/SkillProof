import { useState, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/Button'
import { SkillGlobeNetwork, type TechnicalSkillNode } from '@/components/marketing/SkillGlobeNetwork'
import { EASE } from '@/lib/motion'

export function Hero(): ReactElement {
  const [selectedNode, setSelectedNode] = useState<TechnicalSkillNode>({
    id: 'python',
    name: 'Python',
    category: 'Core Language',
    verified: true,
    score: 94,
    position: [-2.1, 0.7, 0.9],
  })

  return (
    <section className="relative overflow-hidden border-b border-[#34352E] bg-[#11120F]">
      {/* Subtle technical background grid */}
      <div
        className="tech-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* LEFT: Typography + System Label + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col items-start"
          >
            {/* Monospace Technical System Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mb-6 flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#96968C]"
            >
              <span className="h-1.5 w-1.5 bg-[#B7D63D]" />
              <span>SKILL VERIFICATION / 01</span>
              <span className="text-[#34352E]">—</span>
              <span className="text-[#5A5A52]">SYSTEM ACTIVE</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#F1EDE2] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98]">
              Prove what you
              <br />
              can <span className="text-[#B7D63D]">actually</span> do.
            </h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.35, ease: EASE }}
              className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-[#96968C]"
            >
              Take real-world challenges.
              <br className="hidden sm:inline" />
              Earn verifiable proof.
              <br className="hidden sm:inline" />
              Build a profile that shows your true skills.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link to="/app/assessments">
                <Button variant="primary" size="lg">
                  START A CHALLENGE →
                </Button>
              </Link>
              <Link to="/app/skills">
                <Button variant="secondary" size="lg">
                  EXPLORE SKILLS
                </Button>
              </Link>
            </motion.div>

            {/* Live Verification Telemetry Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-12 flex flex-wrap items-center gap-6 border-t border-[#34352E] pt-6 font-mono text-xs text-[#96968C]"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#5A5A52]">VERIFICATION:</span>
                <span className="text-[#F1EDE2]">DYNAMIC RUNTIME</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#5A5A52]">ACTIVE SPEC:</span>
                <span className="text-[#B7D63D]">{selectedNode.name.toUpperCase()} [{selectedNode.score}%]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#5A5A52]">INTEGRITY:</span>
                <span className="text-[#22C55E]">100% EVIDENCE-BACKED</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Restrained Interactive 3D Skill Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.45, ease: EASE }}
            className="relative flex flex-col items-center justify-center border border-[#34352E] bg-[#161713]/70 p-2 md:p-4"
          >
            {/* Engineering panel header */}
            <div className="flex w-full items-center justify-between border-b border-[#34352E] pb-2 px-2 font-mono text-[11px] text-[#96968C]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#B7D63D]" />
                <span className="text-[#F1EDE2]">TOPOLOGY VISUALIZER</span>
              </div>
              <span className="text-[#5A5A52]">REAL-TIME ORBIT</span>
            </div>

            {/* 3D Canvas */}
            <SkillGlobeNetwork
              className="h-[340px] sm:h-[400px] md:h-[450px]"
              onSelect={(node) => setSelectedNode(node)}
            />

            {/* Active inspection bar */}
            <div className="flex w-full items-center justify-between border-t border-[#34352E] pt-2 px-2 font-mono text-[11px]">
              <span className="text-[#96968C]">
                SELECTED: <strong className="text-[#F1EDE2]">{selectedNode.name}</strong> ({selectedNode.category})
              </span>
              <Link
                to={`/app/skills/${selectedNode.id}`}
                className="text-[#B7D63D] hover:underline flex items-center gap-1"
              >
                <span>VIEW PROOF</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}