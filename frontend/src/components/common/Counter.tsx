import type { ReactElement } from 'react'
import { useInView } from 'motion/react'

import { useCountUp } from '@/hooks/useCountUp'
import { useRef } from 'react'

export interface CounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 900,
  className,
}: CounterProps): ReactElement {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(value, duration, inView)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}