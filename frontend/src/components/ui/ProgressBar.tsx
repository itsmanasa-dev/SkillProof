import type { ReactElement } from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/cn'

export interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  trackClassName?: string
  color?: 'primary' | 'violet' | 'success' | 'warning'
  gradient?: string
}

const colorClasses = {
  primary: 'bg-primary',
  violet: 'bg-violet',
  success: 'bg-success',
  warning: 'bg-warning',
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  trackClassName,
  color = 'primary',
  gradient,
}: ProgressBarProps): ReactElement {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100)
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'h-1.5 w-full overflow-hidden rounded-full bg-white/8',
        trackClassName,
        className,
      )}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={gradient ? { background: gradient } : undefined}
        className={cn(
          'h-full rounded-full',
          gradient ? undefined : colorClasses[color],
          barClassName,
        )}
      />
    </div>
  )
}