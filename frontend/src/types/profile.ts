export interface UserProfile {
  name: string
  firstName: string
  role: string
  tagline: string
  location: string
  initials: string
  summary: {
    verifiedSkills: number
    assessments: number
    evidence: number
    overallConfidence: number
  }
  passport: {
    verifiedEvidence: number
    assessmentScore: number
    projectsAnalyzed: number
    technicalInterviews: number
  }
  notificationCount: number
  search: string[]
}