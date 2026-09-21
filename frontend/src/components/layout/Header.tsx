import type { ReactElement } from 'react'

export function Header(): ReactElement {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <span className="text-lg font-semibold tracking-tight">SkillProof</span>
      </div>
    </header>
  )
}
