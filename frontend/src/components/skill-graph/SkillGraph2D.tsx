import type { ReactElement } from 'react'
import { motion } from 'motion/react'

import type { SkillGraphNode } from '@/types'

export interface SkillGraph2DProps {
  nodes: SkillGraphNode[]
  edges: { source: string; target: string }[]
  selectedId: string | null
  onSelect: (node: SkillGraphNode) => void
  className?: string
}

/** 2D SVG fallback used when WebGL is unavailable. */
export function SkillGraph2D({
  nodes,
  edges,
  selectedId,
  onSelect,
  className,
}: SkillGraph2DProps): ReactElement {
  const nodeById = new Map(nodes.map((node) => [node.id, node]))
  const width = 640
  const height = 480
  const cx = width / 2
  const cy = height / 2

  const toScreen = (x: number, y: number): { x: number; y: number } => ({
    x: cx + x * 78,
    y: cy - y * 78,
  })

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="Skill dependency graph (2D view)"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <radialGradient id="sgg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(78,124,255,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#sgg-glow)" rx={16} />

      {edges.map((edge) => {
        const source = nodeById.get(edge.source)
        const target = nodeById.get(edge.target)
        if (!source || !target) return null
        const a = toScreen(source.x, source.y)
        const b = toScreen(target.x, target.y)
        const active = selectedId === source.id || selectedId === target.id
        return (
          <line
            key={`${edge.source}-${edge.target}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={active ? 'rgba(255,255,255,0.6)' : 'rgba(120,130,180,0.3)'}
            strokeWidth={active ? 1.5 : 1}
          />
        )
      })}

      {nodes.map((node) => {
        const pos = toScreen(node.x, node.y)
        const selected = selectedId === node.id
        const radius = node.id === 'programming' ? 12 : 9
        return (
          <motion.g
            key={node.id}
            whileHover={{ scale: 1.25 }}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect(node)}
            role="button"
            aria-label={node.label}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(node)
            }}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={radius + 6}
              fill={node.color}
              opacity={selected ? 0.15 : 0}
            />
            <circle
              cx={pos.x}
              cy={pos.y}
              r={radius}
              fill={node.color}
              stroke={selected ? '#ffffff' : 'none'}
              strokeWidth={selected ? 2 : 0}
            />
            <text
              x={pos.x}
              y={pos.y - radius - 8}
              textAnchor="middle"
              className="fill-muted"
              fontSize="12"
              fontWeight={selected ? 600 : 500}
            >
              {node.label}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}