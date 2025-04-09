"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Save, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface PlotProps {
  data: { x: number[]; y: number[] } | null
}

export function Plot({ data }: PlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!data || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // Find min/max values for scaling
    const xMin = Math.min(...data.x)
    const xMax = Math.max(...data.x)
    const yMin = Math.min(...data.y)
    const yMax = Math.max(...data.y)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1

    // X-axis
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)

    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.stroke()

    // Draw grid
    ctx.beginPath()
    ctx.strokeStyle = "#ddd"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let i = 1; i < 10; i++) {
      const y = padding + (i * (height - 2 * padding)) / 10
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }

    // Vertical grid lines
    for (let i = 1; i < 10; i++) {
      const x = padding + (i * (width - 2 * padding)) / 10
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
    }
    ctx.stroke()

    // Draw data points
    ctx.beginPath()
    ctx.strokeStyle = "#0000ff"
    ctx.lineWidth = 2

    for (let i = 0; i < data.x.length; i++) {
      // Scale x and y to fit the canvas
      const x = padding + ((data.x[i] - xMin) / (xMax - xMin)) * (width - 2 * padding)
      const y = height - padding - ((data.y[i] - yMin) / (yMax - yMin)) * (height - 2 * padding)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw axis labels
    ctx.fillStyle = "#000"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"

    // X-axis labels
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i * (width - 2 * padding)) / 10
      const value = xMin + (i * (xMax - xMin)) / 10
      ctx.fillText(value.toFixed(1), x, height - padding + 15)
    }

    // Y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 10; i++) {
      const y = height - padding - (i * (height - 2 * padding)) / 10
      const value = yMin + (i * (yMax - yMin)) / 10
      ctx.fillText(value.toFixed(1), padding - 5, y + 4)
    }
  }, [data])

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-2 bg-gray-100 border-b">
        <span className="font-medium">Figure</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        {data ? (
          <canvas ref={canvasRef} width={600} height={400} className="border" />
        ) : (
          <div className="text-gray-500">No plot data. Use the plot() function to create a plot.</div>
        )}
      </div>
    </div>
  )
}
