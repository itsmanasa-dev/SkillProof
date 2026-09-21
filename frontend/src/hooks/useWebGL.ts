import { useEffect, useState } from 'react'

type WebGLStatus = 'checking' | 'available' | 'unavailable'

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return false
    return true
  } catch {
    return false
  }
}

export function useWebGL(): WebGLStatus {
  const [status, setStatus] = useState<WebGLStatus>('checking')

  useEffect(() => {
    const available = detectWebGL()
    setStatus(available ? 'available' : 'unavailable')
  }, [])

  return status
}