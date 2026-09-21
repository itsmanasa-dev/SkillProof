import type { ReactElement } from 'react'
import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export interface ScoreRingProps {
  value: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
}

export function ScoreRing({
  value,
  size = 180,
  strokeWidth = 10,
  label,
  sublabel,
}: ScoreRingProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number | null>(null)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 900
    const tick = (now: number): void => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [inView, value])

  const dashoffset = circumference - (display / 100) * circumference

  return (
    <div
      ref={ref}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ? `${label}: ${value}%` : `${value}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#score-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-semibold tracking-tight text-foreground">
          {display}
          <span className="text-lg text-muted">%</span>
        </span>
        {sublabel && (
          <span className="mt-1 text-sm text-muted">{sublabel}</span>
        )}
      </div>
    </div>
  )
}