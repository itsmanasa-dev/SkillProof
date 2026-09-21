import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'

export function MarketingLayout(): ReactElement {
  return (
    <div className="min-h-dvh bg-background">
      <MarketingHeader />
      <main>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  )
}