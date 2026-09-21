import type { ReactElement } from 'react'
import { useCallback } from 'react'

import { useWebGL } from '@/hooks/useWebGL'
import type { SkillGraphNode } from '@/types'

import { SkillGraph2D } from './SkillGraph2D'
import { SkillGraphCanvas } from './SkillGraphCanvas'

export interface SkillGraphProps {
  nodes: SkillGraphNode[]
  edges: { source: string; target: string }[]
  selectedId: string | null
  onSelect: (node: SkillGraphNode) => void
  autoRotate?: boolean
  interactive?: boolean
  className?: string
  onBackgroundClick?: () => void
}

export function SkillGraph({
  nodes,
  edges,
  selectedId,
  onSelect,
  autoRotate = true,
  interactive = true,
  className,
  onBackgroundClick,
}: SkillGraphProps): ReactElement {
  const webgl = useWebGL()

  const clearSelection = useCallback(() => {
    if (onBackgroundClick) onBackgroundClick()
  }, [onBackgroundClick])

  if (webgl === 'checking') {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 320 }}
      >
        <span className="text-sm text-faint">Preparing visualization...</span>
      </div>
    )
  }

  if (webgl === 'unavailable') {
    return (
      <SkillGraph2D
        nodes={nodes}
        edges={edges}
        selectedId={selectedId}
        onSelect={onSelect}
        className={className}
      />
    )
  }

  return (
    <div className={className} style={{ minHeight: 320 }}>
      <SkillGraphCanvas
        nodes={nodes}
        edges={edges}
        selectedId={selectedId}
        onSelect={onSelect}
        autoRotate={autoRotate}
        interactive={interactive}
        onBackgroundClick={interactive ? clearSelection : undefined}
      />
    </div>
  )
}