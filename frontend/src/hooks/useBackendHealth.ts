import { useEffect, useState } from 'react'

import { api } from '@/lib/api'

export type HealthStatus = 'checking' | 'ok' | 'unreachable'

export type BackendHealth = {
  status: HealthStatus
}

export function useBackendHealth(): BackendHealth {
  const [status, setStatus] = useState<HealthStatus>('checking')

  useEffect(() => {
    let cancelled = false

    api
      .get<{ status: string }>('/health')
      .then((res) => {
        if (!cancelled) {
          setStatus(res.status === 'ok' ? 'ok' : 'unreachable')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('unreachable')
        }
      })

    return () => {
      cancelled = true
    }
  }, [])
  return { status }
}
