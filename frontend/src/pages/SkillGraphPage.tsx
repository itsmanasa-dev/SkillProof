import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { PageHeader } from '@/components/common/PageHeader'
import { SkillGraph } from '@/components/skill-graph/SkillGraph'
import { GraphInfoPanel } from '@/components/skill-graph/GraphInfoPanel'
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

export function SkillGraphPage(): ReactElement {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<SelectedInfo>(() =>
    toSelectedInfo('python'),
  )

  const handleSelect = (node: SkillGraphNode): void => {
    const info = toSelectedInfo(node.id)
    if (info) setSelected(info)
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Skill graph"
        title="Skill dependency graph"
        description="Select a node to inspect its verification status. Related skills are linked by real development dependency."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.5fr]">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface p-2">
          <SkillGraph
            nodes={mockGraph.nodes}
            edges={mockGraph.edges}
            selectedId={selected?.id ?? 'python'}
            onSelect={handleSelect}
            onBackgroundClick={() => setSelected(toSelectedInfo('python'))}
            autoRotate
            interactive
            className="h-[520px]"
          />
        </div>
        <GraphInfoPanel
          selected={selected}
          onNavigate={() => {
            const skill = getSkillById(selected.id)
            if (skill) navigate(`/app/skills/${skill.id}`)
          }}
          emptyTitle="Select a skill node"
          emptyDescription="Click any node in the graph to inspect its verification status."
        />
      </div>
    </div>
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