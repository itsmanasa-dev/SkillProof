import type { UserProfile } from '@/types'

export const mockProfile: UserProfile = {
  name: 'Manasa T',
  firstName: 'Manasa',
  role: 'AI / ML Developer',
  tagline: 'Evidence-backed technical profile',
  location: 'Bangalore, India',
  initials: 'MT',
  summary: {
    verifiedSkills: 8,
    assessments: 14,
    evidence: 27,
    overallConfidence: 84,
  },
  passport: {
    verifiedEvidence: 27,
    assessmentScore: 86,
    projectsAnalyzed: 6,
    technicalInterviews: 3,
  },
  notificationCount: 3,
  search: ['Python', 'Machine Learning', 'SQL', 'React'],
}