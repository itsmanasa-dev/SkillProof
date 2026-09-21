import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { MarketingFooter } from './MarketingFooter'
import { MarketingHeader } from './MarketingHeader'

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