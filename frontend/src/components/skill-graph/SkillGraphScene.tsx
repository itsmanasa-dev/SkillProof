import type { ReactElement } from 'react'
import { Float, Html } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import type { SkillGraphNode } from '@/types'

interface NodeMeshProps {
  node: SkillGraphNode
  hoveredId: string | null
  selectedId: string | null
  onHover: (id: string | null) => void
  onSelect: (node: SkillGraphNode) => void
}

function NodeMesh({
  node,
  hoveredId,
  selectedId,
  onHover,
  onSelect,
}: NodeMeshProps): ReactElement {
  const meshRef = useRef<THREE.Mesh>(null)
  const isHovered = hoveredId === node.id
  const isSelected = selectedId === node.id
  const targetScale = isHovered || isSelected ? 1.3 : 1

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return
    const current = mesh.scale.x
    mesh.scale.setScalar(
      THREE.MathUtils.lerp(current, targetScale, 0.12),
    )
    const material = mesh.material as THREE.MeshStandardMaterial
    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      isHovered || isSelected ? 0.9 : 0.35,
      0.08,
    )
  })

  return (
    <group
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        onSelect(node)
      }}
      onPointerOver={(event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation()
        onHover(node.id)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        onHover(null)
        document.body.style.cursor = 'auto'
      }}
    >
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.9}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.1}
          />
        </mesh>
        {isSelected && (
          <mesh>
            <sphereGeometry args={[0.5, 24, 24]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.12}
              depthWrite={false}
            />
          </mesh>
        )}
      </Float>

      {isHovered && (
        <Html center distanceFactor={9} zIndexRange={[20, 0]} className="pointer-events-none">
          <div className="-translate-y-16 whitespace-nowrap rounded-lg border border-border-strong bg-surface/95 px-3 py-2 shadow-float backdrop-blur">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              {node.label}
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: node.color }}
              />
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {node.level} • {node.evidenceCount} evidence
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}

export interface SkillGraphSceneProps {
  nodes: SkillGraphNode[]
  edges: { source: string; target: string }[]
  selectedId: string | null
  hoveredId: string | null
  onHover: (id: string | null) => void
  onSelect: (node: SkillGraphNode) => void
  autoRotate?: boolean
  interactive?: boolean
}

export function SkillGraphScene({
  nodes,
  edges,
  selectedId,
  hoveredId,
  onHover,
  onSelect,
  autoRotate = true,
  interactive = true,
}: SkillGraphSceneProps): ReactElement {
  const nodeById = new Map(nodes.map((node) => [node.id, node]))

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 8, 6]} intensity={120} color="#4e7cff" />
      <pointLight position={[-6, -4, -4]} intensity={90} color="#8b5cf6" />
      <directionalLight position={[0, 4, 8]} intensity={0.5} />

      {edges.map((edge) => {
        const source = nodeById.get(edge.source)
        const target = nodeById.get(edge.target)
        if (!source || !target) return null
        const active =
          selectedId === source.id || selectedId === target.id
        return (
          <line key={`${edge.source}-${edge.target}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={
                  new Float32Array([
                    source.x,
                    source.y,
                    source.z,
                    target.x,
                    target.y,
                    target.z,
                  ])
                }
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={active ? '#ffffff' : '#4e5270'}
              transparent
              opacity={active ? 0.7 : 0.28}
            />
          </line>
        )
      })}

      {nodes.map((node) => (
        <NodeMesh
          key={node.id}
          node={node}
          hoveredId={interactive ? hoveredId : null}
          selectedId={selectedId}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}