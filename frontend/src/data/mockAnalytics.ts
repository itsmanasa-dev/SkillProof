import type { Analytics } from '@/types'

export const mockAnalytics: Analytics = {
  radar: [
    { label: 'Correctness', value: 92 },
    { label: 'Problem Solving', value: 88 },
    { label: 'Code Quality', value: 84 },
    { label: 'Efficiency', value: 79 },
    { label: 'Testing', value: 86 },
    { label: 'Algorithms', value: 81 },
  ],
  performanceByMonth: [
    { month: 'Apr', score: 68 },
    { month: 'May', score: 72 },
    { month: 'Jun', score: 76 },
    { month: 'Jul', score: 79 },
    { month: 'Aug', score: 82 },
    { month: 'Sep', score: 87 },
  ],
  evidenceByType: [
    { type: 'Assessments', count: 14 },
    { type: 'Projects', count: 6 },
    { type: 'Interviews', count: 3 },
    { type: 'GitHub', count: 4 },
  ],
  activity: [
    { day: 'Mon', level: 2 },
    { day: 'Tue', level: 3 },
    { day: 'Wed', level: 1 },
    { day: 'Thu', level: 3 },
    { day: 'Fri', level: 2 },
    { day: 'Sat', level: 4 },
    { day: 'Sun', level: 2 },
  ],
  trending: [
    { skillId: 'machineLearning', skillName: 'Machine Learning', delta: 12 },
    { skillId: 'python', skillName: 'Python', delta: 8 },
    { skillId: 'react', skillName: 'React', delta: 5 },
  ],
}