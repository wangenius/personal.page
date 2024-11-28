import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
} as const

type CalloutType = keyof typeof icons

interface CalloutProps {
  type?: CalloutType
  title?: string
  children?: React.ReactNode
}

export function Callout({
  type = "default",
  title,
  children,
}: CalloutProps) {
  const Icon = icons[type]

  return (
    <div
      className={cn(
        "my-6 flex gap-4 rounded-lg border border-l-4 p-4",
        {
          "border-blue-100 border-l-blue-600 bg-blue-50/50 dark:border-blue-950 dark:border-l-blue-500 dark:bg-blue-950/30": type === "info",
          "border-emerald-100 border-l-emerald-600 bg-emerald-50/50 dark:border-emerald-950 dark:border-l-emerald-500 dark:bg-emerald-950/30": type === "success",
          "border-amber-100 border-l-amber-600 bg-amber-50/50 dark:border-amber-950 dark:border-l-amber-500 dark:bg-amber-950/30": type === "warning",
          "border-rose-100 border-l-rose-600 bg-rose-50/50 dark:border-rose-950 dark:border-l-rose-500 dark:bg-rose-950/30": type === "error",
          "border-slate-100 border-l-slate-600 bg-slate-50/50 dark:border-slate-800 dark:border-l-slate-600 dark:bg-slate-950/30": type === "default",
        }
      )}
    >
      <div className="select-none">
        <Icon className={cn(
          "h-5 w-5",
          {
            "text-blue-700 dark:text-blue-400": type === "info",
            "text-emerald-700 dark:text-emerald-400": type === "success",
            "text-amber-700 dark:text-amber-400": type === "warning",
            "text-rose-700 dark:text-rose-400": type === "error",
            "text-slate-700 dark:text-slate-400": type === "default",
          }
        )} />
      </div>
      <div className="w-full">
        {title && (
          <h5 className={cn(
            "mb-1 font-medium leading-none tracking-tight",
            {
              "text-blue-900 dark:text-blue-300": type === "info",
              "text-emerald-900 dark:text-emerald-300": type === "success",
              "text-amber-900 dark:text-amber-300": type === "warning",
              "text-rose-900 dark:text-rose-300": type === "error",
              "text-slate-900 dark:text-slate-300": type === "default",
            }
          )}>
            {title}
          </h5>
        )}
        <div className={cn(
          "text-sm [&>:first-child]:mt-0 [&>:last-child]:mb-0",
          {
            "text-blue-800 dark:text-blue-200": type === "info",
            "text-emerald-800 dark:text-emerald-200": type === "success",
            "text-amber-800 dark:text-amber-200": type === "warning",
            "text-rose-800 dark:text-rose-200": type === "error",
            "text-slate-800 dark:text-slate-200": type === "default",
          }
        )}>
          {children}
        </div>
      </div>
    </div>
  )
} 