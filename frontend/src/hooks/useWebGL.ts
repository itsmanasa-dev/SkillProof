import { useState } from 'react'

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
  const [status] = useState<WebGLStatus>(() => {
    if (typeof window === 'undefined') return 'checking'
    return detectWebGL() ? 'available' : 'unavailable'
  })

  return status
}