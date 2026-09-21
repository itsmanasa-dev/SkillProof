import type { ReactElement, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

export interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export function SpotlightCard({
  children,
  className,
}: SpotlightCardProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const springX = useSpring(mx, { stiffness: 120, damping: 25 })
  const springY = useSpring(my, { stiffness: 120, damping: 25 })
  const glowX = useTransform(springX, (v) => `${v}px`)
  const glowY = useTransform(springY, (v) => `${v}px`)
  const opacity = useTransform(springX, (v) => (v === -200 ? 0 : 1))

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(event.clientX - rect.left)
    my.set(event.clientY - rect.top)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`relative overflow-hidden rounded-xl border border-border card-gradient ${className ?? ''}`}
      style={{ borderColor: 'var(--sp-border)' }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-40 w-40 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(78,124,255,0.18), transparent 70%)',
          left: glowX,
          top: glowY,
          opacity,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}