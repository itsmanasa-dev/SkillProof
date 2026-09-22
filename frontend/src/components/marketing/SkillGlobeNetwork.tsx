import { useRef, useState, useMemo, type ReactElement } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export interface TechnicalSkillNode {
  id: string
  name: string
  category: string
  verified: boolean
  score: number
  position: [number, number, number]
}

const SKILL_NODES: TechnicalSkillNode[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Core Language',
    verified: true,
    score: 94,
    position: [-2.1, 0.7, 0.9],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Relational DB',
    verified: true,
    score: 89,
    position: [2.0, 0.5, 0.6],
  },
  {
    id: 'react',
    name: 'React',
    category: 'UI Architecture',
    verified: true,
    score: 91,
    position: [0.3, -1.8, 1.1],
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'Model Engineering',
    verified: true,
    score: 86,
    position: [0.6, 2.0, -0.6],
  },
  {
    id: 'dsa',
    name: 'Data Structures',
    category: 'Algorithmic Complexity',
    verified: true,
    score: 88,
    position: [-1.9, -1.3, -0.8],
  },
  {
    id: 'sysdesign',
    name: 'System Design',
    category: 'Distributed Systems',
    verified: true,
    score: 92,
    position: [1.9, -0.9, -1.0],
  },
]

// Network edges representing skill verification dependencies
const CONNECTIONS: [string, string][] = [
  ['python', 'dsa'],
  ['python', 'ml'],
  ['python', 'sql'],
  ['sql', 'sysdesign'],
  ['react', 'sysdesign'],
  ['dsa', 'sysdesign'],
  ['ml', 'sysdesign'],
  ['react', 'python'],
]

interface NodeMeshProps {
  node: TechnicalSkillNode
  isHovered: boolean
  isSelected: boolean
  onHover: (id: string | null) => void
  onSelect: (node: TechnicalSkillNode) => void
}

function NodeMesh({
  node,
  isHovered,
  isSelected,
  onHover,
  onSelect,
}: NodeMeshProps): ReactElement {
  const meshRef = useRef<THREE.Mesh>(null)
  const active = isHovered || isSelected

  useFrame(() => {
    if (!meshRef.current) return
    const targetScale = active ? 1.25 : 1
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.15),
    )
  })

  return (
    <group position={node.position}>
      {/* Interactive Hit Area */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(node)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(node.id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color={active ? '#B7D63D' : '#F1EDE2'}
          roughness={0.4}
          metalness={0.2}
          emissive={active ? '#B7D63D' : '#1B1C18'}
          emissiveIntensity={active ? 0.6 : 0.1}
        />
      </mesh>

      {/* Target ring around node */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.33, 32]} />
        <meshBasicMaterial
          color={active ? '#B7D63D' : '#34352E'}
          transparent
          opacity={active ? 0.8 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Technical Label */}
      <Html
        center
        distanceFactor={10}
        zIndexRange={[20, 0]}
        className="pointer-events-none select-none"
      >
        <div
          className={`flex flex-col items-center -translate-y-8 transition-all duration-150 whitespace-nowrap ${
            active ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
          }`}
        >
          <div
            className={`border px-2 py-0.5 text-[11px] font-mono tracking-wider uppercase transition-colors ${
              active
                ? 'border-[#B7D63D] bg-[#11120F]/95 text-[#F1EDE2]'
                : 'border-[#34352E] bg-[#161713]/85 text-[#96968C]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 ${
                  active ? 'bg-[#B7D63D]' : 'bg-[#96968C]'
                }`}
              />
              <span className="font-semibold text-[#F1EDE2]">{node.name}</span>
              <span className="text-[10px] text-[#96968C]">[{node.score}%]</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

function OrbitalRings(): ReactElement {
  return (
    <group>
      {/* Primary horizontal equatorial orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.55, 2.57, 64]} />
        <meshBasicMaterial
          color="#34352E"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tilted orbital ring 1 */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[2.58, 2.6, 64]} />
        <meshBasicMaterial
          color="#34352E"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tilted orbital ring 2 */}
      <mesh rotation={[-Math.PI / 3, -Math.PI / 5, 0]}>
        <ringGeometry args={[2.61, 2.63, 64]} />
        <meshBasicMaterial
          color="#34352E"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe subtle core sphere */}
      <mesh>
        <sphereGeometry args={[2.4, 20, 16]} />
        <meshBasicMaterial
          color="#242520"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  )
}

function ConnectionLines({
  nodes,
  hoveredId,
  selectedId,
}: {
  nodes: TechnicalSkillNode[]
  hoveredId: string | null
  selectedId: string | null
}): ReactElement {
  const nodeMap = useMemo(() => {
    const map = new Map<string, TechnicalSkillNode>()
    nodes.forEach((n) => map.set(n.id, n))
    return map
  }, [nodes])

  return (
    <group>
      {CONNECTIONS.map(([srcId, tgtId]) => {
        const src = nodeMap.get(srcId)
        const tgt = nodeMap.get(tgtId)
        if (!src || !tgt) return null

        const isRelated =
          hoveredId === srcId ||
          hoveredId === tgtId ||
          selectedId === srcId ||
          selectedId === tgtId

        const points = [
          new THREE.Vector3(...src.position),
          new THREE.Vector3(...tgt.position),
        ]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)

        return (
          <primitive key={`${srcId}-${tgtId}`} object={new THREE.Line(lineGeo)}>
            <lineBasicMaterial
              attach="material"
              color={isRelated ? '#B7D63D' : '#34352E'}
              transparent
              opacity={isRelated ? 0.85 : 0.28}
              linewidth={1}
            />
          </primitive>
        )
      })}
    </group>
  )
}

function Scene({
  onSelectNode,
}: {
  onSelectNode?: (node: TechnicalSkillNode) => void
}): ReactElement {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>('python')

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Gentle technical rotation
    groupRef.current.rotation.y += delta * 0.08

    // Very subtle mouse parallax
    const targetX = state.pointer.y * 0.15
    const targetZ = state.pointer.x * 0.15
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05,
    )
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetZ,
      0.05,
    )
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#F1EDE2" />
      <directionalLight position={[-5, -5, -3]} intensity={0.2} color="#96968C" />

      <group ref={groupRef}>
        <OrbitalRings />
        <ConnectionLines
          nodes={SKILL_NODES}
          hoveredId={hoveredId}
          selectedId={selectedId}
        />
        {SKILL_NODES.map((node) => (
          <NodeMesh
            key={node.id}
            node={node}
            isHovered={hoveredId === node.id}
            isSelected={selectedId === node.id}
            onHover={setHoveredId}
            onSelect={(n) => {
              setSelectedId(n.id)
              onSelectNode?.(n)
            }}
          />
        ))}
      </group>
    </>
  )
}

export interface SkillGlobeNetworkProps {
  className?: string
  onSelect?: (node: TechnicalSkillNode) => void
}

export function SkillGlobeNetwork({
  className = 'h-[360px] md:h-[440px]',
  onSelect,
}: SkillGlobeNetworkProps): ReactElement {
  return (
    <div className={`relative w-full ${className} select-none`}>
      {/* Corner crosshair coordinates for editorial engineering feel */}
      <div className="absolute top-2 left-2 font-mono text-[10px] text-[#5A5A52] tracking-widest uppercase pointer-events-none z-10">
        SYS.GRAPH // VERIFY_GRID
      </div>
      <div className="absolute top-2 right-2 font-mono text-[10px] text-[#5A5A52] tracking-widest uppercase pointer-events-none z-10">
        NODE.COUNT // 06
      </div>
      <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#5A5A52] tracking-widest uppercase pointer-events-none z-10">
        LAT_LON // ORBIT_3D
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-[#B7D63D] tracking-widest uppercase pointer-events-none z-10">
        ● LIVE METRIC
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene onSelectNode={onSelect} />
      </Canvas>
    </div>
  )
}
