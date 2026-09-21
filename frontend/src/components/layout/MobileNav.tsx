import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'

import { Icon } from '@/components/common/Icon'
import { mobileNavItems } from './nav'

export function MobileNav(): ReactElement {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/90 backdrop-blur lg:hidden"
      aria-label="Primary"
    >
      <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${
                isActive ? 'text-primary' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
                <Icon name={item.icon} className="h-5 w-5" />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}