import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { useState } from 'react'

import { Modal } from '@/components/ui/Modal'

export function SettingsModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}): ReactElement {
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [publicPassport, setPublicPassport] = useState(true)

  return (
    <Modal open={open} onClose={onClose} title="Preferences">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted">
          Control how SkillProof communicates and who can view your profile.
        </p>
        <ToggleRow
          label="Email alerts"
          description="Notify me when an evaluation completes."
          checked={emailAlerts}
          onChange={setEmailAlerts}
        />
        <ToggleRow
          label="Public passport"
          description="Allow recruiters to view my Skill Passport."
          checked={publicPassport}
          onChange={setPublicPassport}
        />
      </div>
    </Modal>
  )
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}): ReactElement {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-white/10'
        }`}
      >
        <motion.span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white"
          animate={{ left: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  )
}