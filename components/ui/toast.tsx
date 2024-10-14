"use client"

import * as React from "react"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 right-0 p-4 space-y-4 z-50">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4"
        >
          <h3 className="font-semibold">{toast.title}</h3>
          {toast.description && <p className="text-sm text-gray-500">{toast.description}</p>}
        </div>
      ))}
    </div>
  )
}