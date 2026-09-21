import type { ReactElement } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useCallback, useState } from 'react'

import type { SkillGraphNode } from '@/types'

import { SkillGraphScene } from './SkillGraphScene'

export interface SkillGraphCanvasProps {
  nodes: SkillGraphNode[]
  edges: { source: string; target: string }[]
  selectedId: string | null
  onSelect: (node: SkillGraphNode) => void
  autoRotate?: boolean
  interactive?: boolean
  onBackgroundClick?: () => void
}

export function SkillGraphCanvas({
  nodes,
  edges,
  selectedId,
  onSelect,
  autoRotate = true,
  interactive = true,
  onBackgroundClick,
}: SkillGraphCanvasProps): ReactElement {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleSelect = useCallback(
    (node: SkillGraphNode) => onSelect(node),
    [onSelect],
  )

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.5, 10], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      onPointerMissed={() => {
        if (interactive && onBackgroundClick) onBackgroundClick()
      }}
      aria-label="Interactive skill dependency graph"
      role="img"
    >
      <SkillGraphScene
        nodes={nodes}
        edges={edges}
        selectedId={selectedId}
        hoveredId={hoveredId}
        onHover={setHoveredId}
        onSelect={handleSelect}
        autoRotate={autoRotate}
        interactive={interactive}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  )
}