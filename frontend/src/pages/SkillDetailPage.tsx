import type { ReactElement } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'

import { Icon, type IconName } from '@/components/common/Icon'
import { LevelBadge, StatusBadge } from '@/components/common/SkillBadges'
import { ScoreRing } from '@/components/common/ScoreRing'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { getEvidenceForSkill } from '@/data/mockEvidence'
import { getSkillById } from '@/data/mockSkills'
import type { EvidenceItem, EvidenceType } from '@/types'

const typeIcon: Record<EvidenceType, IconName> = {
  Assessment: 'assessment',
  Project: 'briefcase',
  Interview: 'users',
  GitHub: 'github',
  Challenge: 'sparkles',
}

const resultTone: Record<string, BadgeTone> = {
  Passed: 'success',
  Strong: 'success',
  Merged: 'success',
  'Evidence detected': 'primary',
  Analyzed: 'primary',
}

export function SkillDetailPage(): ReactElement {
  const { skillId = 'python' } = useParams()
  const navigate = useNavigate()
  const skill = getSkillById(skillId)

  if (!skill) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-lg font-medium text-foreground">Skill not found</p>
        <p className="text-sm text-muted">
          We couldn't find a verified skill under that name.
        </p>
        <Link to="/app/skills">
          <Button variant="outline">Back to skills</Button>
        </Link>
      </div>
    )
  }

  const evidence = getEvidenceForSkill(skill.id)

  return (
    <div className="flex flex-col gap-8">
      <Link
        to="/app/skills"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <Icon name="chevron-right" className="h-4 w-4 rotate-180" />
        All skills
      </Link>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="card-gradient relative overflow-hidden rounded-xl border border-border p-6"
      >
        <span
          className="absolute left-0 top-0 h-full w-1"
          style={{ background: skill.color }}
          aria-hidden="true"
        />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-semibold"
              style={{ background: `${skill.color}22`, color: skill.color }}
            >
              {skill.name.slice(0, 2)}
            </span>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  {skill.name}
                </h1>
                <LevelBadge level={skill.level} />
              </div>
              <p className="mt-1 text-sm text-muted">
                {skill.category} · Verified {skill.lastVerified}
              </p>
            </div>
          </div>
          <Button
            variant="violet"
            onClick={() => navigate('/app/assessments')}
          >
            <Icon name="assessment" className="h-4 w-4" />
            Prove again
          </Button>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[0.55fr_1fr_0.55fr]">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="card-gradient flex flex-col items-center gap-3 rounded-xl border border-border p-6"
        >
          <ScoreRing
            value={skill.confidence}
            size={160}
            strokeWidth={10}
            sublabel="Confidence"
          />
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <Icon name="evidence" className="h-4 w-4" />
            {skill.evidenceCount} evidence records
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="card-gradient rounded-xl border border-border p-6"
        >
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Competency profile
          </h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={skill.competencies.map((c) => ({
                  subject: c.label,
                  score: c.score,
                }))}
                outerRadius="72%"
              >
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }}
                />
                <PolarRadiusAxis domain={[0, 100]} tickCount={5} tick={false} axisLine={false} />
                <Radar
                  dataKey="score"
                  stroke={skill.color}
                  fill={skill.color}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="card-gradient flex flex-col gap-4 rounded-xl border border-border p-6"
        >
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Breakdown
          </h2>
          <ul className="flex flex-col gap-3">
            {skill.competencies.map((competency) => (
              <li key={competency.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted">{competency.label}</span>
                  <span className="font-medium text-foreground">
                    {competency.score}
                  </span>
                </div>
                <ProgressBar
                  value={competency.score}
                  gradient={skill.color}
                  trackClassName="bg-white/5"
                />
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-border/60 pt-4">
            <StatusBadge
              status={skill.status === 'verified' ? 'verified' : 'pending'}
            >
              {skill.status === 'verified'
                ? 'Fully verified'
                : skill.status === 'learning'
                  ? 'Verification in progress'
                  : 'Needs more evidence'}
            </StatusBadge>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {skill.summary}
            </p>
          </div>
        </motion.section>
      </div>

      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Evidence timeline
          </h2>
          <Link
            to="/app/evidence"
            className="text-sm text-primary transition-colors hover:text-primary/80"
          >
            View all evidence
          </Link>
        </div>

        <motion.ol variants={fadeUp} className="flex flex-col gap-4">
          {evidence.map((item) => (
            <EvidenceRow key={item.id} item={item} color={skill.color} />
          ))}
        </motion.ol>
      </motion.section>
    </div>
  )
}

function EvidenceRow({
  item,
  color,
}: {
  item: EvidenceItem
  color: string
}): ReactElement {
  return (
    <motion.li
      variants={fadeUp}
      className="card-gradient flex flex-col gap-3 rounded-xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
          style={{ borderColor: `${color}40`, background: `${color}14`, color }}
          aria-hidden="true"
        >
          <Icon name={typeIcon[item.type]} className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">
            {item.title}
          </p>
          <p className="mt-0.5 text-xs text-faint">
            {item.date} · {item.type}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {item.summary}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end">
        <Badge tone={resultTone[item.result] ?? 'neutral'}>{item.result}</Badge>
        <span className="text-sm font-medium text-foreground">
          Score <span className="text-muted">{item.score}</span>
        </span>
      </div>
    </motion.li>
  )
}