export type EvidenceType =
  | 'Assessment'
  | 'Project'
  | 'Interview'
  | 'GitHub'
  | 'Challenge'

export type EvidenceStatus = 'verified' | 'pending'

export interface EvidenceCompetency {
  label: string
  score: number
}

export interface EvidenceItem {
  id: string
  skillId: string
  skillName: string
  type: EvidenceType
  title: string
  date: string
  status: EvidenceStatus
  result: string
  score: number
  competencies: EvidenceCompetency[]
  summary: string
}

export type EvidenceFilter = 'All' | EvidenceType