import type { Challenge, EvaluationResult } from '@/types'

export const mockChallenges: Challenge[] = [
  {
    id: 'ch-01',
    skillId: 'python',
    skillName: 'Python',
    difficulty: 'Intermediate',
    kind: 'Practical coding',
    title: 'First Non-Repeating Character',
    summary:
      'Build a function that returns the first non-repeating character in a string.',
    questionCount: 5,
    timeMinutes: 30,
    prompt:
      'Given a string s, find the first character that appears only once and return it. If every character repeats, return an empty string.\n\nImplement the function:\n\ndef first_non_repeating(s: str) -> str: ...\n\nConstraints:\n- 1 <= len(s) <= 10^5\n- s consists of lowercase English letters\n\nExample:\nfirst_non_repeating("loveleetcode") -> "v"\nfirst_non_repeating("aabb") -> ""\n\nFocus on a time-efficient solution and clean, readable code.',
    starterCode:
      'def first_non_repeating(s: str) -> str:\n    """Return the first character that appears exactly once in s."""\n    # Your solution here\n    pass\n',
    testCases: [
      { id: 1, label: 'Basic case', input: '"loveleetcode"', expected: '"v"' },
      { id: 2, label: 'All repeating', input: '"aabb"', expected: '""' },
      { id: 3, label: 'Single character', input: '"z"', expected: '"z"' },
      { id: 4, label: 'First char unique', input: '"abccba"', expected: '' },
      { id: 5, label: 'Long mixed input', input: '"leetcode"', expected: '"l"' },
    ],
  },
  {
    id: 'ch-02',
    skillId: 'python',
    skillName: 'Python',
    difficulty: 'Beginner',
    kind: 'Practical coding',
    title: 'Validate Balanced Brackets',
    summary:
      'Given a string with parentheses, verify that brackets are balanced and nested correctly.',
    questionCount: 5,
    timeMinutes: 30,
    prompt:
      'Given a string s containing the characters "(", ")", "[", "]", "{" and "}", determine if the input string is valid: every open bracket has a matching close bracket of the same type in the correct order.\n\nImplement:\n\ndef is_valid(s: str) -> bool: ...',
    starterCode:
      'def is_valid(s: str) -> bool:\n    """Return True if the bracket sequence is balanced."""\n    # Your solution here\n    pass\n',
    testCases: [
      { id: 1, label: 'Nested', input: '"([]){}"', expected: 'true' },
      { id: 2, label: 'Mismatched', input: '"([)]"', expected: 'false' },
      { id: 3, label: 'Empty', input: '""', expected: 'true' },
      { id: 4, label: 'Single open', input: '"("', expected: 'false' },
      { id: 5, label: 'Long valid', input: '"({[]})"', expected: 'true' },
    ],
  },
  {
    id: 'ch-03',
    skillId: 'python',
    skillName: 'Python',
    difficulty: 'Advanced',
    kind: 'System reasoning',
    title: 'Rate Limiter Design',
    summary:
      'Design a sliding-window rate limiter and reason about the system trade-offs.',
    questionCount: 5,
    timeMinutes: 45,
    prompt:
      'Design a sliding-window rate limiter that allows at most N requests per user per minute.\n\nImplement:\n\nclass RateLimiter:\n    def __init__(self, limit: int): ...\n    def allow(self, user_id: str) -> bool: ...\n\nThen explain your choice of data structures and the space/time complexity.',
    starterCode:
      'class RateLimiter:\n    """Sliding-window rate limiter (one minute window)."""\n    def __init__(self, limit: int):\n        self.limit = limit\n        self.windows = {}\n\n    def allow(self, user_id: str) -> bool:\n        # Your solution here\n        return True\n',
    testCases: [
      { id: 1, label: 'Under limit', input: 'limit=3, 2 calls', expected: 'true' },
      { id: 2, label: 'At limit', input: 'limit=3, 3rd call', expected: 'true' },
      { id: 3, label: 'Exceeds limit', input: 'limit=3, 4th call', expected: 'false' },
      { id: 4, label: 'Distinct users', input: 'limit=3, user A repeats', expected: 'false' },
      { id: 5, label: 'Window resets', input: 'wait 60s, new call', expected: 'true' },
    ],
  },
]

export const getChallengeById = (id: string): Challenge | undefined =>
  mockChallenges.find((challenge) => challenge.id === id)

export const mockEvaluationResult: EvaluationResult = {
  score: 87,
  correctness: 92,
  problemSolving: 88,
  codeQuality: 84,
  efficiency: 79,
  strengths: [
    'Clear, readable implementation',
    'Good edge-case handling',
    'Clean function structure',
  ],
  improvements: [
    'Reduce repeated iteration over the input',
    'Improve worst-case time complexity',
  ],
}

export const evaluationStages = [
  { id: 'correctness', label: 'Analyzing correctness' },
  { id: 'quality', label: 'Analyzing code quality' },
  { id: 'efficiency', label: 'Analyzing efficiency' },
  { id: 'evidence', label: 'Generating evidence' },
]