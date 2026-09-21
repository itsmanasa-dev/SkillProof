import type { SkillLevel } from './skill'

export interface SkillGraphNode {
  id: string
  label: string
  category: string
  level: SkillLevel
  color: string
  evidenceCount: number
  x: number
  y: number
  z: number
}

export interface SkillGraphEdge {
  source: string
  target: string
}

export interface SkillGraphData {
  nodes: SkillGraphNode[]
  edges: SkillGraphEdge[]
}