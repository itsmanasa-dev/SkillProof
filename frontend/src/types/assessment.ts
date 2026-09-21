import type { SkillLevel } from './skill'

export type AssessmentDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type AssessmentKind =
  | 'Practical coding'
  | 'Debugging'
  | 'System reasoning'
  | 'Code review'

export interface AssessmentConfig {
  skillId: string
  difficulty: AssessmentDifficulty
  kind: AssessmentKind
  questionCount: number
  timeMinutes: number
}

export interface TestCase {
  id: number
  label: string
  input: string
  expected: string
  passed?: boolean
}

export interface Challenge {
  id: string
  skillId: string
  skillName: string
  difficulty: AssessmentDifficulty
  kind: AssessmentKind
  title: string
  summary: string
  questionCount: number
  timeMinutes: number
  prompt: string
  starterCode: string
  testCases: TestCase[]
}

export type StageState = 'pending' | 'running' | 'done'

export interface EvaluationStage {
  id: string
  label: string
  state: StageState
}

export interface EvaluationResult {
  score: number
  correctness: number
  codeQuality: number
  efficiency: number
  problemSolving: number
  strengths: string[]
  improvements: string[]
}