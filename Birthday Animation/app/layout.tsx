"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BirthdayCakeProps {
  blown: boolean
}

export default function BirthdayCake({ blown = false }: BirthdayCakeProps) {
  const [candleFlames, setCandleFlames] = useState<boolean[]>(Array(5).fill(true))

  useEffect(() => {
    if (blown) {
      const blowOutCandles = async () => {
        for (let i = 0; i < 5; i++) {
          await new Promise((resolve) => setTimeout(resolve, 200))
          setCandleFlames((prev) => {
            const newFlames = [...prev]
            newFlames[i] = false
            return newFlames
          })
        }
      }

      blowOutCandles()
    } else {
      setCandleFlames(Array(5).fill(true))
    }
  }, [blown])

  return (
    <div className="relative mx-auto w-full max-w-xs">
      {/* Cake plate */}
      <div className="mx-auto h-4 w-64 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md"></div>

      {/* Cake base - now more circular */}
      <div className="relative mx-auto h-40 w-48 rounded-full bg-gradient-to-b from-pink-200 to-pink-300 dark:from-pink-700 dark:to-pink-800 shadow-lg">
        {/* Cake frosting */}
        <div className="absolute -top-4 left-0 right-0 h-8 rounded-full bg-white dark:bg-pink-100"></div>

        {/* Cake decorations - circular patterns */}
        <div className="absolute top-10 left-0 right-0 flex justify-center space-x-4">
          <div className="h-4 w-4 rounded-full bg-pink-400 dark:bg-pink-300"></div>
          <div className="h-4 w-4 rounded-full bg-purple-400 dark:bg-purple-300"></div>
          <div className="h-4 w-4 rounded-full bg-pink-400 dark:bg-pink-300"></div>
        </div>

        <div className="absolute top-20 left-0 right-0 flex justify-center space-x-4">
          <div className="h-4 w-4 rounded-full bg-purple-400 dark:bg-purple-300"></div>
          <div className="h-4 w-4 rounded-full bg-pink-400 dark:bg-pink-300"></div>
          <div className="h-4 w-4 rounded-full bg-purple-400 dark:bg-purple-300"></div>
        </div>

        {/* Cake border decoration */}
        <div className="absolute bottom-4 left-4 right-4 h-6 rounded-full border-b-4 border-dashed border-pink-400 dark:border-pink-300"></div>

        {/* Candles - more attractive and colorful */}
        {Array.from({ length: 5 }).map((_, i) => {
          // Calculate position in a circular arrangement
          const angle = i * (Math.PI / 2.5) - Math.PI / 5
          const radius = 40
          const x = 50 + radius * Math.cos(angle)
          const y = 50 - radius * Math.sin(angle)

          // Alternate candle colors
          const candleColors = [
            "bg-gradient-to-b from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600",
            "bg-gradient-to-b from-purple-400 to-purple-500 dark:from-purple-500 dark:to-purple-600",
            "bg-gradient-to-b from-pink-400 to-pink-500 dark:from-pink-500 dark:to-pink-600",
            "bg-gradient-to-b from-green-400 to-green-500 dark:from-green-500 dark:to-green-600",
            "bg-gradient-to-b from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600",
          ]

          return (
            <div
              key={i}
              className={`absolute -top-12 h-12 w-3 rounded-full ${candleColors[i]} shadow-md`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              {/* Candle stripes */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute inset-x-0 top-2 h-1 bg-white opacity-30"></div>
                <div className="absolute inset-x-0 top-6 h-1 bg-white opacity-30"></div>
              </div>

              {/* Candle holder */}
              <div className="absolute bottom-0 left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-full bg-yellow-200 dark:bg-yellow-300"></div>

              <AnimatePresence>
                {candleFlames[i] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [-5, 5, -5],
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      scale: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
                      rotate: { repeat: Number.POSITIVE_INFINITY, duration: 0.3 },
                    }}
                    className="absolute -top-5 left-1/2 h-6 w-4 -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 dark:from-orange-500 dark:to-yellow-300"
                    style={{
                      transformOrigin: "center bottom",
                      boxShadow: "0 0 15px #FCD34D, 0 0 25px #FCD34D",
                    }}
                  >
                    <div className="absolute bottom-0 left-1/2 h-4 w-2 -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-600 to-orange-400"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Cherry on top */}
      <div className="absolute left-1/2 top-1/4 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 dark:bg-red-600 shadow-md"></div>
    </div>
  )
}

