"use client"

// This is a simplified version of the use-toast hook
import { useState, useCallback } from 'react'

export interface Toast {
  title: string
  description?: string
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description }: Toast) => {
    setToasts((prevToasts) => [...prevToasts, { title, description }])
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1))
    }, 3000)
  }, [])

  return { toast, toasts }
}