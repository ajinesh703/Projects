"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { Cake, Gift, Heart } from "lucide-react"
import Balloons from "@/components/balloons"
import BirthdayCake from "@/components/birthday-cake"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BirthdayPage() {
  const [name, setName] = useState("Someone Special")
  const [showForm, setShowForm] = useState(true)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    setShowForm(false)
    setTimeout(() => {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }, 500)
  }

  const handleBlowCandles = () => {
    setCandlesBlown(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />
      )}

      <Balloons />

      <AnimatePresence>
        {showForm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container flex min-h-screen flex-col items-center justify-center"
          >
            <div className="mb-8 flex items-center justify-center space-x-2">
              <Cake className="h-8 w-8 text-pink-500" />
              <h1 className="text-center font-birthday text-4xl font-bold text-pink-600 dark:text-pink-400">
                Birthday Surprise!
              </h1>
              <Cake className="h-8 w-8 text-pink-500" />
            </div>
            <form onSubmit={handleStart} className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Who is this birthday wish for?
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter their name"
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-pink-500 text-white hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700"
              >
                Create Birthday Surprise
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container flex min-h-screen flex-col items-center justify-center py-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="font-birthday text-5xl font-bold text-pink-600 dark:text-pink-400 sm:text-6xl md:text-7xl">
                Happy Birthday!
              </h1>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 mb-12 font-birthday text-3xl font-bold text-purple-600 dark:text-purple-400 sm:text-4xl"
              >
                {name}
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-16 w-full max-w-xl pt-8"
            >
              <BirthdayCake blown={candlesBlown} />
              {!candlesBlown && (
                <div className="mt-4 text-center">
                  <Button
                    onClick={handleBlowCandles}
                    className="bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
                  >
                    Blow Out the Candles
                  </Button>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="max-w-md text-center"
            >
              <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
                Wishing you a day filled with happiness and a year filled with joy. May all your dreams come true!
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <Gift className="h-5 w-5 text-purple-500" />
                <Heart className="h-5 w-5 text-red-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

