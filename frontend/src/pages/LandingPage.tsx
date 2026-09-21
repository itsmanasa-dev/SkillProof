import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { EvidenceTimelineSection } from '@/components/marketing/EvidenceTimelineSection'
import { FinalCtaSection } from '@/components/marketing/FinalCtaSection'
import { GraphSection } from '@/components/marketing/GraphSection'
import { Hero } from '@/components/marketing/Hero'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { PassportPreviewSection } from '@/components/marketing/PassportPreviewSection'
import { ProblemSection } from '@/components/marketing/ProblemSection'

export function LandingPage(): ReactElement {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
    }
  }, [location.hash])

  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <GraphSection />
      <EvidenceTimelineSection />
      <PassportPreviewSection />
      <FinalCtaSection />
    </div>
  )
}