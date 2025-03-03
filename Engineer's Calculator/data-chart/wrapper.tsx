import type React from "react"
interface ChartWrapperProps {
  content: React.ComponentType
  className?: string
  title?: string
}

export function ChartWrapper({ content: Chart, className = "aspect-video", title }: ChartWrapperProps) {
  return (
    <div className={className}>
      {title && <span className="sr-only">{title}</span>}
      <Chart />
    </div>
  )
}

