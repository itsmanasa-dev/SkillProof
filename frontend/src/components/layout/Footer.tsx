import type { ReactElement } from 'react'

export function Footer(): ReactElement {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 text-sm text-muted-foreground">
        <span>SkillProof</span>
        <span>Practical skill verification</span>
      </div>
    </footer>
  )
}
