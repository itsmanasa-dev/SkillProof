import type { ReactElement } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

import { Icon } from '@/components/common/Icon'
import { ScoreRing } from '@/components/common/ScoreRing'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { mockEvaluationResult } from '@/data/mockChallenges'

const metrics = [
  { label: 'Correctness', value: mockEvaluationResult.correctness, color: '#34d399' },
  { label: 'Problem solving', value: mockEvaluationResult.problemSolving, color: '#4e7cff' },
  { label: 'Code quality', value: mockEvaluationResult.codeQuality, color: '#8b5cf6' },
  { label: 'Efficiency', value: mockEvaluationResult.efficiency, color: '#fbbf24' },
]

export function ResultsPage(): ReactElement {
  const navigate = useNavigate()

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="visible"
      className="mx-auto flex max-w-3xl flex-col gap-8"
    >
      <motion.section
        variants={fadeUp}
        className="card-gradient relative overflow-hidden rounded-2xl border border-border p-8 text-center"
      >
        <div
          className="bg-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center gap-5">
          <Badge tone="success">
            <Icon name="check" className="h-3.5 w-3.5" />
            4/5 test cases passed
          </Badge>
          <ScoreRing
            value={mockEvaluationResult.score}
            size={190}
            strokeWidth={12}
            sublabel="Overall score"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Solid performance, {mockEvaluationResult.score} approaching
              Advanced.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Your submission was evaluated for correctness, problem solving,
              code quality and efficiency, and added to your Python evidence
              trail.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.div
        variants={fadeUp}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="card-gradient rounded-xl border border-border p-4 text-center"
          >
            <div
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg text-base font-semibold"
              style={{ background: `${metric.color}1f`, color: metric.color }}
            >
              {metric.value}
            </div>
            <p className="mt-2 text-xs text-faint">{metric.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.section
          variants={fadeUp}
          className="card-gradient rounded-xl border border-border p-6"
        >
          <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
            <Icon name="check" className="h-4 w-4 text-success" />
            Strengths
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {mockEvaluationResult.strengths.map((strength) => (
              <li key={strength} className="flex items-start gap-2.5 text-sm text-muted">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {strength}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          variants={fadeUp}
          className="card-gradient rounded-xl border border-border p-6"
        >
          <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
            <Icon name="alert" className="h-4 w-4 text-warning" />
            Improve these
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {mockEvaluationResult.improvements.map((improvement) => (
              <li key={improvement} className="flex items-start gap-2.5 text-sm text-muted">
                <Icon name="arrow-right" className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                {improvement}
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      <motion.section
        variants={fadeUp}
        className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 text-center sm:flex-row sm:justify-between sm:text-left"
      >
        <div>
          <p className="text-sm font-medium text-foreground">
            Evidence record created
          </p>
          <p className="mt-1 text-sm text-muted">
            This assessment is now part of your verified Python profile.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link to="/app/evidence">
            <Button>View Evidence</Button>
          </Link>
          <Button variant="outline" onClick={() => navigate('/app')}>
            Back to dashboard
          </Button>
        </div>
      </motion.section>
    </motion.div>
  )
}