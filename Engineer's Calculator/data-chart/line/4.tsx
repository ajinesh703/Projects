"use client"

import { useEffect, useRef } from "react"

export default function Chart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Generate data
    const data = Array.from({ length: 30 }, (_, i) => {
      return {
        x: i,
        y: Math.floor(Math.random() * 50) + 50 + Math.sin(i / 2) * 20,
      }
    })

    // Chart dimensions
    const padding = 20
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2

    // Scale functions
    const xScale = (value: number) => (value / (data.length - 1)) * chartWidth + padding
    const yScale = (value: number) => chartHeight - ((value - 0) / 100) * chartHeight + padding

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, chartHeight + padding)
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)")
    gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

    // Draw line
    ctx.beginPath()
    ctx.moveTo(xScale(data[0].x), yScale(data[0].y))
    for (let i = 1; i < data.length; i++) {
      const prev = data[i - 1]
      const curr = data[i]
      const midX = (xScale(prev.x) + xScale(curr.x)) / 2
      const midY = (yScale(prev.y) + yScale(curr.y)) / 2
      ctx.quadraticCurveTo(xScale(prev.x), yScale(prev.y), midX, midY)
    }
    ctx.lineTo(xScale(data[data.length - 1].x), yScale(data[data.length - 1].y))
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw area
    ctx.lineTo(xScale(data[data.length - 1].x), yScale(0))
    ctx.lineTo(xScale(0), yScale(0))
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw points
    data.forEach((point) => {
      ctx.beginPath()
      ctx.arc(xScale(point.x), yScale(point.y), 3, 0, Math.PI * 2)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, chartHeight + padding)
    ctx.lineTo(chartWidth + padding, chartHeight + padding)
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw grid lines
    for (let i = 1; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(chartWidth + padding, y)
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    for (let i = 1; i <= 6; i++) {
      const x = padding + (chartWidth / 6) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, chartHeight + padding)
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

