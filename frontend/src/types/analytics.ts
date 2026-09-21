export interface AnalyticsPoint {
  label: string
  value: number
}

export interface TrendingEntry {
  skillId: string
  skillName: string
  delta: number
}

export interface Analytics {
  radar: AnalyticsPoint[]
  performanceByMonth: { month: string; score: number }[]
  evidenceByType: { type: string; count: number }[]
  activity: { day: string; level: number }[]
  trending: TrendingEntry[]
}