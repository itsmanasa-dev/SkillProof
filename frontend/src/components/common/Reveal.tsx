import type { ReactElement, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { fadeUp } from '@/lib/motion'

export interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'span' | 'li' | 'article'
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: RevealProps): ReactElement {
  const reduced = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={
        reduced ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }
      }
      className={className}
    >
      {children}
    </Comp>
  )
}