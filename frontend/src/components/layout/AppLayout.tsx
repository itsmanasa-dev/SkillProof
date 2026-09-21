import { Outlet } from 'react-router-dom'
import type { ReactElement } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

export function AppLayout(): ReactElement {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
