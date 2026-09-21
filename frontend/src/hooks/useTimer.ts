import { useEffect, useRef, useState } from 'react'

export function useTimer(initialSeconds: number, running: boolean): number {
  const [seconds, setSeconds] = useState(initialSeconds)
  const intervalRef = useRef<number | null>(null)
  const doneRef = useRef(false)

  useEffect(() => {
    doneRef.current = false
    queueMicrotask(() => setSeconds(initialSeconds))
  }, [initialSeconds])

  useEffect(() => {
    if (!running || doneRef.current) return

    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          doneRef.current = true
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
    }
  }, [running])

  return seconds
}

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}