import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { SkillGraph } from '@/components/skill-graph/SkillGraph'
import { mockGraph } from '@/data/mockGraph'
import type { SkillGraphNode } from '@/types'

export interface SafeGraphProps {
  selectedId: string
  onSelect: (node: SkillGraphNode) => void
  onBackgroundClick: () => void
  autoRotate?: boolean
  interactive?: boolean
  navigateFromNode?: boolean
  className?: string
}

/** Marketing-specific graph: navigates to a skill page when a node is clicked. */
export function SafeGraph({
  selectedId,
  onSelect,
  onBackgroundClick,
  autoRotate = true,
  interactive = true,
  navigateFromNode = false,
  className,
}: SafeGraphProps): ReactElement {
  const navigate = useNavigate()
  const [localSelected, setLocalSelected] = useState<string | null>(null)

  const selected = selectedId || localSelected

  const handleSelect = (node: SkillGraphNode): void => {
    if (navigateFromNode) {
      navigate(`/app/skills/${node.id}`)
      return
    }
    setLocalSelected(node.id)
    onSelect(node)
  }

  const handleBackground = (): void => {
    if (navigateFromNode) return
    setLocalSelected(null)
    onBackgroundClick()
  }

  return (
    <SkillGraph
      nodes={mockGraph.nodes}
      edges={mockGraph.edges}
      selectedId={selected}
      onSelect={handleSelect}
      onBackgroundClick={handleBackground}
      autoRotate={autoRotate}
      interactive={interactive}
      className={className}
    />
  )
}