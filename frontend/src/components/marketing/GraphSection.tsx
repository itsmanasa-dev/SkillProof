import type { ReactElement } from 'react'
import { useState } from 'react'

import { SectionHeading } from '@/components/common/SectionHeading'
import { GraphInfoPanel } from '@/components/skill-graph/GraphInfoPanel'
import { SkillGraph } from '@/components/skill-graph/SkillGraph'
import { mockGraph } from '@/data/mockGraph'
import { getSkillById } from '@/data/mockSkills'
import type { SkillGraphNode } from '@/types'

interface SelectedInfo {
  id: string
  name: string
  level: string
  confidence: number
  evidence: number
  gaps: number
  color: string
}

export function GraphSection(): ReactElement {
  const [selected, setSelected] = useState<SelectedInfo>(() =>
    toSelectedInfo('python'),
  )

  const handleSelect = (node: SkillGraphNode): void => {
    const info = toSelectedInfo(node.id)
    if (info) setSelected(info)
  }

  return (
    <section id="graph" className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Skill graph"
          title="Your skills, mapped and cross-verified"
          description="Skills learn from one another. The graph links related skills so verifying one reinforces the map around it."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-2xl border border-border bg-surface p-2">
            <SkillGraph
              nodes={mockGraph.nodes}
              edges={mockGraph.edges}
              selectedId={selected?.id ?? 'python'}
              onSelect={handleSelect}
              onBackgroundClick={() => setSelected(toSelectedInfo('python'))}
              autoRotate
              interactive
              className="h-[420px]"
            />
          </div>
          <GraphInfoPanel
            selected={selected ? { ...selected } : null}
            emptyTitle="Select a skill node"
            emptyDescription="Click any node in the graph to inspect its verification status."
          />
        </div>
      </div>
    </section>
  )
}

function toSelectedInfo(id: string): SelectedInfo {
  const skill = getSkillById(id)
  const node = mockGraph.nodes.find((n) => n.id === id)
  return {
    id,
    name: skill?.name ?? id,
    level: skill?.level ?? '—',
    confidence: skill?.confidence ?? 0,
    evidence: skill?.evidenceCount ?? 0,
    gaps: node && skill ? skillGapsFor(skill.level) : 0,
    color: node?.color ?? '#8b5cf6',
  }
}

function skillGapsFor(level: string): number {
  if (level === 'Advanced') return 1
  if (level === 'Intermediate') return 2
  return 3
}