import type { ReactElement } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

import { Icon } from '@/components/common/Icon'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/lib/motion'
import { mockAnalytics } from '@/data/mockAnalytics'
import { mockChallenges } from '@/data/mockChallenges'
import { mockProfile } from '@/data/mockProfile'

function greeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function DashboardPage(): ReactElement {
  const navigate = useNavigate()
  const summary = mockProfile.summary
  const nextChallenge = mockChallenges[0]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Overview"
        title={`${greeting()}, ${mockProfile.firstName}.`}
        description={`Today marks ${summary.verifiedSkills} verified skills and ${summary.overallConfidence}% average confidence. Keep proving.`}
        actions={
          <Link to="/app/assessments">
            <Button>
              <Icon name="assessment" className="h-4 w-4" />
              Prove a Skill
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Verified skills"
          value={summary.verifiedSkills}
          icon={<Icon name="skills" className="h-5 w-5" />}
          accent="primary"
          trend="+1 this month"
        />
        <StatCard
          label="Assessments taken"
          value={summary.assessments}
          icon={<Icon name="code" className="h-5 w-5" />}
          accent="violet"
          trend="+2 this month"
        />
        <StatCard
          label="Evidence records"
          value={summary.evidence}
          icon={<Icon name="evidence" className="h-5 w-5" />}
          accent="success"
          trend="3 added recently"
        />
        <StatCard
          label="Average confidence"
          value={summary.overallConfidence}
          suffix="%"
          icon={<Icon name="trend" className="h-5 w-5" />}
          accent="warning"
          trend="+6% MoM"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="card-gradient flex flex-col gap-6 rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Recommended next step
            </h2>
            <Badge tone="primary">In progress</Badge>
          </div>

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                aria-hidden="true"
              >
                <Icon name="code" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-base font-medium tracking-tight text-foreground">
                  {nextChallenge.title}
                </p>
<p className="text-sm text-muted">
                  {nextChallenge.skillName} · {nextChallenge.difficulty} · five
                  test cases
                </p>
              </div>
            </div>
            <Link to={`/app/assessments/${nextChallenge.id}`}>
              <Button onClick={() => navigate(`/app/assessments/${nextChallenge.id}`)}>
                Continue
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-border pt-5 md:grid-cols-4">
            <MiniStat label="Score goal" value="80+" />
            <MiniStat label="Test cases" value="5" />
            <MiniStat label="Time limit" value="30m" />
            <MiniStat label="Reward" value="Python" />
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="card-gradient flex flex-col gap-4 rounded-xl border border-border p-6"
        >
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Trending skills
          </h2>
          <ul className="flex flex-col gap-3">
            {mockAnalytics.trending.map((item) => (
              <li
                key={item.skillId}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-sm font-medium text-foreground">
                  {item.skillName}
                </span>
                <span className="flex items-center gap-1 text-xs text-success">
                  <Icon name="trend" className="h-3.5 w-3.5" />
                  +{item.delta}%
                </span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  )
}

function MiniStat({
  label,
  value,
}: {
  label: string
  value: string
}): ReactElement {
  return (
    <div>
      <p className="text-xl font-semibold text-foreground">{value}</p>
      <p className="text-xs text-faint">{label}</p>
    </div>
  )
}