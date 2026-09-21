import type { IconName } from '@/components/common/Icon'

export interface NavItem {
  label: string
  to: string
  icon: IconName
}

export const appNavItems: NavItem[] = [
  { label: 'Overview', to: '/app', icon: 'home' },
  { label: 'My Skills', to: '/app/skills', icon: 'skills' },
  { label: 'Assessments', to: '/app/assessments', icon: 'assessment' },
  { label: 'Evidence', to: '/app/evidence', icon: 'evidence' },
  { label: 'Skill Graph', to: '/app/graph', icon: 'graph' },
  { label: 'Skill Passport', to: '/app/passport', icon: 'passport' },
]

export const mobileNavItems: NavItem[] = [
  { label: 'Overview', to: '/app', icon: 'home' },
  { label: 'Skills', to: '/app/skills', icon: 'skills' },
  { label: 'Assess', to: '/app/assessments', icon: 'assessment' },
  { label: 'Evidence', to: '/app/evidence', icon: 'evidence' },
  { label: 'Graph', to: '/app/graph', icon: 'graph' },
]