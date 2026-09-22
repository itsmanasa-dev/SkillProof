import type { ReactElement, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone =
  | 'default'
  | 'verified'
  | 'primary'
  | 'in-progress'
  | 'expert'
  | 'new'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'neutral'
  | 'violet'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  pip?: boolean
  className?: string
}

const toneClasses: Record<BadgeTone, { container: string; pip?: string }> = {
  verified: {
    container: 'bg-[#161713] text-[#F1EDE2] border-[#B7D63D]/40',
    pip: 'bg-[#B7D63D]',
  },
  primary: {
    container: 'bg-[#161713] text-[#F1EDE2] border-[#B7D63D]/40',
    pip: 'bg-[#B7D63D]',
  },
  'in-progress': {
    container: 'bg-[#161713] text-[#96968C] border-[#34352E]',
    pip: 'bg-[#96968C]',
  },
  expert: {
    container: 'bg-[#161713] text-[#D0E84B] border-[#D0E84B]/40',
    pip: 'bg-[#D0E84B]',
  },
  new: {
    container: 'bg-[#1B1C18] text-[#F1EDE2] border-[#34352E]',
    pip: 'bg-[#F1EDE2]',
  },
  default: {
    container: 'bg-[#161713] text-[#96968C] border-[#34352E]',
    pip: 'bg-[#96968C]',
  },
  neutral: {
    container: 'bg-[#1B1C18] text-[#96968C] border-[#34352E]',
  },
  success: {
    container: 'bg-[#161713] text-[#22C55E] border-[#22C55E]/40',
    pip: 'bg-[#22C55E]',
  },
  warning: {
    container: 'bg-[#161713] text-[#D6A84F] border-[#D6A84F]/40',
    pip: 'bg-[#D6A84F]',
  },
  destructive: {
    container: 'bg-[#161713] text-[#EF4444] border-[#EF4444]/40',
    pip: 'bg-[#EF4444]',
  },
  violet: {
    container: 'bg-[#161713] text-[#96968C] border-[#34352E]',
    pip: 'bg-[#96968C]',
  },
}

export function Badge({
  children,
  tone = 'default',
  pip = false,
  className,
}: BadgeProps): ReactElement {
  const config = toneClasses[tone] || toneClasses.default
  const showPip = pip || tone === 'verified' || tone === 'primary' || tone === 'in-progress'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2 py-0.5 text-[11px] font-mono font-medium uppercase tracking-wider',
        config.container,
        className,
      )}
    >
      {showPip && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full shrink-0', config.pip || 'bg-current')}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}