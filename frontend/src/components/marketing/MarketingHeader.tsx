import { useState, useEffect, type ReactElement } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

import { Button } from '@/components/ui/Button'

interface NavItem {
  label: string
  to: string
  isExternal?: boolean
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Challenges', to: '/app/assessments' },
  { label: 'Roadmap', to: '/app/graph' },
  { label: 'Leaderboard', to: '/app' },
  { label: 'About', to: '/#how-it-works' },
]

export function MarketingHeader(): ReactElement {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
          scrolled
            ? 'h-14 border-[#34352E] bg-[#11120F]/95 backdrop-blur-sm'
            : 'h-16 border-[#34352E]/60 bg-[#11120F]'
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo / Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 text-base font-semibold tracking-tight text-[#F1EDE2] hover:opacity-90 transition-opacity"
            aria-label="SkillProof home"
          >
            <div className="flex h-7 w-7 items-center justify-center border border-[#34352E] bg-[#161713]">
              <span className="h-2 w-2 bg-[#B7D63D]" />
            </div>
            <span className="font-display tracking-tight text-lg">
              Skill<span className="text-[#96968C]">Proof</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-[#96968C] border border-[#34352E] px-1.5 py-0.5 uppercase tracking-wider">
              v1.0
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors ${
                    isActive && item.to === location.pathname
                      ? 'text-[#F1EDE2] border-b border-[#B7D63D]'
                      : 'text-[#96968C] hover:text-[#F1EDE2]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/app/skills"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#96968C] hover:text-[#F1EDE2] transition-colors"
              title="Quick Search Skills"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </Link>

            <Link to="/app">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>

            <Link to="/app/assessments">
              <Button variant="primary" size="sm">
                Get Started →
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center p-2 text-[#96968C] hover:text-[#F1EDE2] border border-[#34352E] bg-[#161713]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Clean Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-14 z-30 border-b border-[#34352E] bg-[#11120F]/98 px-6 py-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center justify-between border-b border-[#242520] pb-2 text-[#96968C] hover:text-[#F1EDE2]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#5A5A52]">→</span>
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-2 pt-2">
                <Link to="/app/assessments" className="w-full">
                  <Button variant="primary" size="md" className="w-full">
                    Start a Challenge →
                  </Button>
                </Link>
                <Link to="/app" className="w-full">
                  <Button variant="secondary" size="md" className="w-full">
                    Open Dashboard
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}