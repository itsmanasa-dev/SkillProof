import type { Skill } from '@/types'

export const skillColors: Record<string, string> = {
  python: '#4e7cff',
  javascript: '#f7df1e',
  react: '#61dafb',
  sql: '#f97316',
  machineLearning: '#8b5cf6',
  git: '#f05252',
  htmlCss: '#ff7a59',
  dsa: '#34d399',
}

export const mockSkills: Skill[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    level: 'Advanced',
    confidence: 87,
    evidenceCount: 8,
    lastVerified: '2 weeks ago',
    status: 'verified',
    color: skillColors.python,
    summary:
      'Strong practical Python skills verified through assessments, projects and interviews.',
    competencies: [
      { label: 'Syntax & fundamentals', score: 92 },
      { label: 'Problem solving', score: 86 },
      { label: 'Code quality', score: 84 },
      { label: 'Algorithms', score: 81 },
      { label: 'Efficiency', score: 78 },
      { label: 'Testing', score: 83 },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming',
    level: 'Intermediate',
    confidence: 72,
    evidenceCount: 5,
    lastVerified: '1 month ago',
    status: 'verified',
    color: skillColors.javascript,
    summary:
      'Solid JavaScript fundamentals with growing experience in modern tooling and patterns.',
    competencies: [
      { label: 'Syntax & fundamentals', score: 78 },
      { label: 'Problem solving', score: 74 },
      { label: 'Code quality', score: 70 },
      { label: 'Efficiency', score: 66 },
    ],
  },
  {
    id: 'react',
    name: 'React',
    category: 'Web Development',
    level: 'Intermediate',
    confidence: 74,
    evidenceCount: 5,
    lastVerified: '3 weeks ago',
    status: 'verified',
    color: skillColors.react,
    summary:
      'Comfortable building interactive interfaces with hooks, state and components.',
    competencies: [
      { label: 'Components & props', score: 82 },
      { label: 'State & hooks', score: 78 },
      { label: 'Performance', score: 64 },
      { label: 'Tooling', score: 71 },
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Data',
    level: 'Advanced',
    confidence: 84,
    evidenceCount: 6,
    lastVerified: '1 month ago',
    status: 'verified',
    color: skillColors.sql,
    summary:
      'Confident writing, tuning and reasoning about relational queries at scale.',
    competencies: [
      { label: 'Queries & joins', score: 90 },
      { label: 'Schema design', score: 82 },
      { label: 'Optimization', score: 76 },
      { label: 'Window functions', score: 88 },
    ],
  },
  {
    id: 'machineLearning',
    name: 'Machine Learning',
    category: 'AI',
    level: 'Advanced',
    confidence: 83,
    evidenceCount: 12,
    lastVerified: '1 week ago',
    status: 'verified',
    color: skillColors.machineLearning,
    summary:
      'Hands-on experience building, training and shipping ML models end to end.',
    competencies: [
      { label: 'Model training', score: 85 },
      { label: 'Data pipelines', score: 84 },
      { label: 'Evaluation', score: 88 },
      { label: 'Deployment', score: 74 },
    ],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Tooling',
    level: 'Intermediate',
    confidence: 70,
    evidenceCount: 4,
    lastVerified: '2 months ago',
    status: 'verified',
    color: skillColors.git,
    summary:
      'Everyday version control workflow, branching and collaboration through GitHub.',
    competencies: [
      { label: 'Workflow', score: 76 },
      { label: 'Branching & merging', score: 72 },
      { label: 'Collaboration', score: 68 },
    ],
  },
  {
    id: 'htmlCss',
    name: 'HTML/CSS',
    category: 'Web Development',
    level: 'Intermediate',
    confidence: 81,
    evidenceCount: 3,
    lastVerified: '3 months ago',
    status: 'learning',
    color: skillColors.htmlCss,
    summary:
      'Building responsive, accessible layouts with modern CSS techniques.',
    competencies: [
      { label: 'Layout', score: 85 },
      { label: 'Responsive design', score: 82 },
      { label: 'Accessibility', score: 76 },
    ],
  },
  {
    id: 'dsa',
    name: 'DSA',
    category: 'Fundamentals',
    level: 'Intermediate',
    confidence: 65,
    evidenceCount: 2,
    lastVerified: '2 months ago',
    status: 'needs-evidence',
    color: skillColors.dsa,
    summary:
      'Data structures and algorithms with room to build more verified evidence.',
    competencies: [
      { label: 'Arrays & strings', score: 78 },
      { label: 'Trees', score: 62 },
      { label: 'Dynamic programming', score: 55 },
      { label: 'Complexity analysis', score: 66 },
    ],
  },
]

export const getSkillById = (id: string): Skill | undefined =>
  mockSkills.find((skill) => skill.id === id)

export const skillsByStatus = {
  verified: mockSkills.filter((s) => s.status === 'verified'),
  learning: mockSkills.filter((s) => s.status === 'learning'),
  'needs-evidence': mockSkills.filter((s) => s.status === 'needs-evidence'),
}