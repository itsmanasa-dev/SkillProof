import type { ReactElement } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useBackendHealth } from '@/hooks/useBackendHealth'
import { api } from '@/lib/api'

export function HomePage(): ReactElement {
  const { status } = useBackendHealth()

  const statusLabel =
    status === 'checking'
      ? 'Checking...'
      : status === 'ok'
        ? 'Connected'
        : 'Unreachable'

  const statusColor =
    status === 'ok'
      ? 'text-primary'
      : status === 'unreachable'
        ? 'text-destructive'
        : 'text-muted-foreground'

  return (
    <div className="flex flex-col items-center gap-8 pt-16 text-center">
      <img
        src="/favicon.svg"
        alt=""
        width="56"
        height="56"
        className="h-14 w-14"
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">SkillProof</h1>
        <p className="text-muted-foreground">
          The SkillProof frontend is running.
        </p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>API Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm" data-testid="backend-status">
            Backend:{' '}
            <span className={`font-medium ${statusColor}`}>{statusLabel}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            GET {api.baseUrl}/health
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
