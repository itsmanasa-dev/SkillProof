export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type SkillStatus = 'verified' | 'learning' | 'needs-evidence'

export interface Competency {
  label: string
  score: number
}

export interface Skill {
  id: string
  name: string
  category: string
  level: SkillLevel
  confidence: number
  evidenceCount: number
  lastVerified: string
  status: SkillStatus
  color: string
  summary: string
  competencies: Competency[]
}

export interface SkillTrendPoint {
  month: string
  score: number
}