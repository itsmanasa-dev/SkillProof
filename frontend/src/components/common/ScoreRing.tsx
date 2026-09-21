import type { ReactElement } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

export interface ScoreRingProps {
  value: number
  size?: number
  strokeWidth?: number
  label?: string
  color?: string
  sublabel?: string
}

export function ScoreRing({
  value,
  size = 180,
  strokeWidth = 10,
  label,
  color = 'url(#score-gradient)',
  sublabel,
}: ScoreRingProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const progress = useSpring(inView ? value : 0, {
    stiffness: 60,
    damping: 20,
  })
  const display = useTransform(progress, (v) => Math.round(v))
  const dashoffset = useTransform(
    progress,
    (v) => circumference - (v / 100) * circumference,
  )

  return (
    <div
      ref={ref}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ? `${label}: ${value}%` : `${value}%`}
    >
      <motion.svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e7cff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashoffset }}
        />
      </motion.svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span className="text-4xl font-semibold tracking-tight text-foreground">
          {display}
          <span className="text-lg text-muted">%</span>
        </motion.span>
        {sublabel && (
          <span className="mt-1 text-sm text-muted">{sublabel}</span>
        )}
      </div>
    </div>
  )
}