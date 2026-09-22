import type { ReactElement, ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'

import { cn } from '@/lib/cn'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'error'
  | 'destructive'
  | 'violet'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#B7D63D] text-[#11120F] font-semibold hover:bg-[#D0E84B] border border-transparent shadow-none',
  secondary:
    'bg-transparent text-[#F1EDE2] border border-[#34352E] hover:border-[#F1EDE2] hover:bg-[#1B1C18]',
  outline:
    'bg-transparent text-[#F1EDE2] border border-[#34352E] hover:border-[#F1EDE2] hover:bg-[#1B1C18]',
  ghost:
    'group bg-transparent text-[#96968C] hover:text-[#F1EDE2] border border-transparent',
  success:
    'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/40 hover:bg-[#22C55E]/25',
  error:
    'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/40 hover:bg-[#EF4444]/25',
  destructive:
    'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/40 hover:bg-[#EF4444]/25',
  violet:
    'bg-transparent text-[#B7D63D] border border-[#B7D63D]/40 hover:bg-[#B7D63D]/10 hover:border-[#B7D63D]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs tracking-wide uppercase font-mono',
  md: 'h-10 px-4 text-sm font-medium',
  lg: 'h-12 px-6 text-sm md:text-base font-medium',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  type = 'button',
  children,
  disabled,
  ...props
}: ButtonProps): ReactElement {
  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { y: -1 }}
      whileTap={disabled || loading ? undefined : { y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-none transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B7D63D] focus-visible:ring-offset-1 focus-visible:ring-offset-[#11120F]',
        'disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="inline-flex items-center gap-1" aria-label="Loading">
          <span className="h-1.5 w-1.5 animate-pulse bg-current" />
          <span className="h-1.5 w-1.5 animate-pulse bg-current [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse bg-current [animation-delay:300ms]" />
        </span>
      )}
      {children}
    </motion.button>
  )
}