import type { ReactElement, ReactNode } from 'react'
import { motion } from 'motion/react'

import { Counter } from './Counter'

export interface StatCardProps {
  label: string
  value: number
  suffix?: string
  icon: ReactNode
  accent?: 'primary' | 'violet' | 'success' | 'warning'
  trend?: string
  subtitle?: string
  delay?: number
  className?: string
}

const accentColors = {
  primary: 'text-primary bg-primary/10 border-primary/20',
  violet: 'text-violet bg-violet/10 border-violet/20',
  success: 'text-success bg-success/10 border-success/20',
  warning: 'text-warning bg-warning/10 border-warning/20',
}

export function StatCard({
  label,
  value,
  suffix = '',
  icon,
  accent = 'primary',
  trend,
  subtitle,
  delay = 0,
  className,
}: StatCardProps): ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      className="card-gradient card-hover relative overflow-hidden rounded-xl border border-border p-6"
     style={{ borderColor: 'var(--sp-border)' }}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
            <Counter value={value} suffix={suffix} />
          </p>
          {trend && <p className="mt-2 text-xs text-success">{trend}</p>}
          {subtitle && <p className="mt-1 text-xs text-faint">{subtitle}</p>}
        </div>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg border ${accentColors[accent]}`}
        >
          {icon}
        </span>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-[0.07] blur-2xl"
        style={{ background: accent === 'violet' ? '#8b5cf6' : accent === 'success' ? '#34d399' : accent === 'warning' ? '#fbbf24' : '#4e7cff' }}
      />
    </motion.div>
  )
}