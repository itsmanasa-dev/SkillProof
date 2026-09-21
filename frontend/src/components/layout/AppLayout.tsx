import type { ReactElement } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Modal } from '@/components/ui/Modal'

import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { SettingsModal } from './SettingsModal'

const notifications = [
  {
    id: 'n1',
    title: 'Assessment ready',
    body: 'Your Python assessment results are ready to review.',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Skill update',
    body: 'Machine Learning confidence increased to 83%.',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 'n3',
    title: 'New evidence',
    body: 'GitHub activity was analyzed and added to your Git profile.',
    time: 'Yesterday',
    unread: true,
  },
]

function NotificationsModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}): ReactElement {
  return (
    <Modal open={open} onClose={onClose} title="Notifications">
      <ul className="flex flex-col gap-2">
        {notifications.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-border bg-surface-2 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">
                {item.title}
              </p>
              {item.unread && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </div>
            <p className="mt-1 text-sm text-muted">{item.body}</p>
            <p className="mt-1 text-xs text-faint">{item.time}</p>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

export function AppLayout(): ReactElement {
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-dvh bg-background">
      <Sidebar onSettingsOpen={() => setSettingsOpen(true)} />
      <div className="pb-16 lg:pl-60 lg:pb-0">
        <TopBar
          query={search}
          onQueryChange={setSearch}
          notificationCount={notifications.length}
          onNotificationsOpen={() => setNotificationsOpen(true)}
          initials="MT"
        />
        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <MobileNav />

      <NotificationsModal
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  )
}