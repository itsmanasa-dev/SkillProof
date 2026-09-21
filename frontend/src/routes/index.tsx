import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactElement } from 'react'

import { AppLayout } from '@/components/layout/AppLayout'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { AssessmentPage } from '@/pages/AssessmentPage'
import { AssessmentSetupPage } from '@/pages/AssessmentSetupPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { EvidencePage } from '@/pages/EvidencePage'
import { LandingPage } from '@/pages/LandingPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ResultsPage } from '@/pages/ResultsPage'
import { SkillDetailPage } from '@/pages/SkillDetailPage'
import { SkillGraphPage } from '@/pages/SkillGraphPage'
import { SkillPassportPage } from '@/pages/SkillPassportPage'
import { SkillsPage } from '@/pages/SkillsPage'

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/app/assessments/:challengeId" element={<AssessmentPage />} />
      <Route path="/app/results/:challengeId" element={<ResultsPage />} />

      <Route element={<AppLayout />}>
        <Route path="/app" element={<DashboardPage />} />
        <Route path="/app/skills" element={<SkillsPage />} />
        <Route path="/app/skills/:skillId" element={<SkillDetailPage />} />
        <Route path="/app/assessments" element={<AssessmentSetupPage />} />
        <Route path="/app/evidence" element={<EvidencePage />} />
        <Route path="/app/graph" element={<SkillGraphPage />} />
        <Route path="/app/passport" element={<SkillPassportPage />} />
      </Route>

      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  )
}