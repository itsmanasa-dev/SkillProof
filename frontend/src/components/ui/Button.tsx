import type { ReactElement, ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'

import { cn } from '@/lib/cn'

export type ButtonVariant =
  | 'primary'
  | 'violet'
  | 'outline'
  | 'ghost'
  | 'destructive'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-[0_0_0_1px_rgba(78,124,255,0.35),0_8px_24px_-10px_var(--sp-glow-blue)]',
  violet:
    'bg-violet text-white hover:bg-violet-hover shadow-[0_8px_24px_-10px_var(--sp-glow-violet)]',
  outline:
    'border border-border-strong bg-surface-2/60 text-foreground hover:bg-surface-3 hover:border-faint',
  ghost:
    'bg-transparent text-muted hover:text-foreground hover:bg-white/5',
  destructive:
    'bg-destructive/15 text-destructive hover:bg-destructive/25',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps): ReactElement {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-tight',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}