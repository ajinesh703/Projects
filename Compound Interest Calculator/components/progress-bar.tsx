"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface ProgressWheelProps {
  initialValue: number
  finalValue: number
  duration: number
}

export function ProgressWheel({ initialValue, finalValue, duration }: ProgressWheelProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const increment = (finalValue - initialValue) / (duration / 16)
    let currentValue = initialValue

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= finalValue) {
        clearInterval(timer)
        setProgress(100)
      } else {
        setProgress((currentValue / finalValue) * 100)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [initialValue, finalValue, duration])

  return (
    <div className="w-full mt-4">
      <Progress value={progress} className="w-full h-4" />
      <p className="text-sm text-center mt-2">Growth: {progress.toFixed(2)}%</p>
    </div>
  )
}

