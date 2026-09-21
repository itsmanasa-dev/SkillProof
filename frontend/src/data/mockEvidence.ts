import type { EvidenceItem } from '@/types'

export const mockEvidence: EvidenceItem[] = [
  {
    id: 'ev-01',
    skillId: 'python',
    skillName: 'Python',
    type: 'Assessment',
    title: 'Python Data Processing Challenge',
    date: 'Sep 18, 2026',
    status: 'verified',
    result: 'Passed',
    score: 91,
    competencies: [
      { label: 'Problem Solving', score: 88 },
      { label: 'Code Quality', score: 84 },
      { label: 'Efficiency', score: 79 },
    ],
    summary:
      'Built a streaming CSV processor handling 2M+ rows with constant memory usage.',
  },
  {
    id: 'ev-02',
    skillId: 'machineLearning',
    skillName: 'Machine Learning',
    type: 'Assessment',
    title: 'ML Model Evaluation Challenge',
    date: 'Sep 12, 2026',
    status: 'verified',
    result: 'Passed',
    score: 89,
    competencies: [
      { label: 'Model Training', score: 86 },
      { label: 'Evaluation', score: 92 },
      { label: 'Deployment', score: 78 },
    ],
    summary:
      'Trained and evaluated a classifier with clean cross-validation methodology.',
  },
  {
    id: 'ev-03',
    skillId: 'python',
    skillName: 'Python',
    type: 'Project',
    title: 'RealVest — Investment Analytics',
    date: 'Sep 02, 2026',
    status: 'verified',
    result: 'Evidence detected',
    score: 88,
    competencies: [
      { label: 'Code Quality', score: 86 },
      { label: 'Architecture', score: 84 },
      { label: 'Testing', score: 90 },
    ],
    summary:
      'Static analysis of the repository detected strong typing, tests and clean module boundaries.',
  },
  {
    id: 'ev-04',
    skillId: 'machineLearning',
    skillName: 'Machine Learning',
    type: 'Project',
    title: 'Fraud Detection Pipeline',
    date: 'Aug 21, 2026',
    status: 'verified',
    result: 'Evidence detected',
    score: 85,
    competencies: [
      { label: 'Data Pipelines', score: 87 },
      { label: 'Evaluation', score: 84 },
      { label: 'Documentation', score: 82 },
    ],
    summary:
      'End-to-end pipeline with reproducible experiments and logged metrics.',
  },
  {
    id: 'ev-05',
    skillId: 'python',
    skillName: 'Python',
    type: 'Interview',
    title: 'Python Technical Interview',
    date: 'Aug 14, 2026',
    status: 'verified',
    result: 'Strong',
    score: 86,
    competencies: [
      { label: 'Problem Solving', score: 88 },
      { label: 'Communication', score: 90 },
      { label: 'Algorithms', score: 80 },
    ],
    summary:
      'Structured coding interview covering algorithms, design choices and trade-offs.',
  },
  {
    id: 'ev-06',
    skillId: 'sql',
    skillName: 'SQL',
    type: 'Assessment',
    title: 'Advanced SQL Optimization',
    date: 'Aug 05, 2026',
    status: 'verified',
    result: 'Passed',
    score: 92,
    competencies: [
      { label: 'Queries & joins', score: 94 },
      { label: 'Optimization', score: 88 },
      { label: 'Window functions', score: 90 },
    ],
    summary:
      'Tuned queries over a 4M-row analytics table, cutting runtime by 68%.',
  },
  {
    id: 'ev-07',
    skillId: 'react',
    skillName: 'React',
    type: 'GitHub',
    title: 'opensource/dashboard-ui',
    date: 'Jul 28, 2026',
    status: 'verified',
    result: 'Merged',
    score: 82,
    competencies: [
      { label: 'Components & props', score: 84 },
      { label: 'State & hooks', score: 80 },
      { label: 'Code Quality', score: 81 },
    ],
    summary:
      'Contribution accepted: reusable data table with virtualized rows and keyboard navigation.',
  },
  {
    id: 'ev-08',
    skillId: 'machineLearning',
    skillName: 'Machine Learning',
    type: 'Interview',
    title: 'ML Systems Interview',
    date: 'Jul 19, 2026',
    status: 'verified',
    result: 'Strong',
    score: 84,
    competencies: [
      { label: 'Model Selection', score: 86 },
      { label: 'Data Pipelines', score: 84 },
      { label: 'Communication', score: 82 },
    ],
    summary:
      'End-to-end ML system design: data, features, training, serving and monitoring.',
  },
  {
    id: 'ev-09',
    skillId: 'javascript',
    skillName: 'JavaScript',
    type: 'Challenge',
    title: 'Concurrency Deep Dive',
    date: 'Jul 09, 2026',
    status: 'verified',
    result: 'Passed',
    score: 78,
    competencies: [
      { label: 'Async patterns', score: 80 },
      { label: 'Problem Solving', score: 76 },
      { label: 'Edge cases', score: 79 },
    ],
    summary:
      'Race condition, event loop ordering and cancelable async task challenge.',
  },
  {
    id: 'ev-10',
    skillId: 'sql',
    skillName: 'SQL',
    type: 'Project',
    title: 'Analytics Warehouse',
    date: 'Jun 30, 2026',
    status: 'verified',
    result: 'Evidence detected',
    score: 83,
    competencies: [
      { label: 'Schema design', score: 85 },
      { label: 'Queries & joins', score: 82 },
      { label: 'Optimization', score: 80 },
    ],
    summary:
      'Star-schema warehouse with materialized views and indexed hot paths.',
  },
  {
    id: 'ev-11',
    skillId: 'git',
    skillName: 'Git',
    type: 'GitHub',
    title: 'repo-activity/git-history',
    date: 'Jun 18, 2026',
    status: 'verified',
    result: 'Analyzed',
    score: 76,
    competencies: [
      { label: 'Workflow', score: 79 },
      { label: 'Branching & merging', score: 74 },
      { label: 'Collaboration', score: 76 },
    ],
    summary:
      'Contributing history shows clean, reviewed feature branches over 6 months.',
  },
  {
    id: 'ev-12',
    skillId: 'react',
    skillName: 'React',
    type: 'Assessment',
    title: 'React Performance Audit',
    date: 'Jun 04, 2026',
    status: 'verified',
    result: 'Passed',
    score: 72,
    competencies: [
      { label: 'Performance', score: 68 },
      { label: 'State & hooks', score: 76 },
      { label: 'Tooling', score: 71 },
    ],
    summary:
      'Identified and fixed three avoidable re-render sources in a filter-heavy UI.',
  },
  {
    id: 'ev-13',
    skillId: 'python',
    skillName: 'Python',
    type: 'Challenge',
    title: 'Memory-efficient ETL',
    date: 'May 22, 2026',
    status: 'verified',
    result: 'Passed',
    score: 84,
    competencies: [
      { label: 'Efficiency', score: 86 },
      { label: 'Problem Solving', score: 82 },
      { label: 'Code Quality', score: 84 },
    ],
    summary:
      'Generator-based ETL processing a 1GB dataset in under 300MB memory.',
  },
]

export const getEvidenceForSkill = (skillId: string): EvidenceItem[] =>
  mockEvidence
    .filter((item) => item.skillId === skillId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const evidenceCountForSkill = (skillId: string): number =>
  mockEvidence.filter((item) => item.skillId === skillId).length