"use client"

import { useState, useEffect } from "react"
import { Heart, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function LoveMeter() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [calculating, setCalculating] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [advice, setAdvice] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const relationshipAdvice = [
    "Communication is the heartbeat of your relationship. Keep talking, even when it's hard.",
    "Small gestures of love each day build a lifetime of happiness together.",
    "Always remember why you fell in love in the first place.",
    "The strongest relationships are built on trust, respect, and genuine friendship.",
    "Make time for each other, no matter how busy life gets.",
    "Love isn't just a feeling - it's a choice you make every day.",
    "Celebrate each other's victories and support each other through challenges.",
    "Never stop dating each other, even after years together.",
    "The best relationships aren't perfect - they're perfectly imperfect.",
    "Grow together by supporting each other's dreams and aspirations.",
  ]

  const calculateLove = () => {
    if (name1.trim() === "" || name2.trim() === "") return

    setCalculating(true)
    setResult(null)

    // Show calculation animation for 5-7 seconds
    const calculationTime = Math.floor(Math.random() * 2000) + 5000 // 5-7 seconds

    setTimeout(() => {
      // Generate a random percentage between 95 and 100
      const lovePercentage = Math.floor(Math.random() * 6) + 95
      setResult(lovePercentage)

      // Select random advice
      const randomAdvice = relationshipAdvice[Math.floor(Math.random() * relationshipAdvice.length)]
      setAdvice(randomAdvice)

      setCalculating(false)
    }, calculationTime)
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-pink-100 to-purple-100"}`}
    >
      <Card
        className={`w-full max-w-md shadow-xl transition-all duration-500 ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white"}`}
      >
        <CardHeader className="text-center">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-full ${darkMode ? "text-white hover:text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          <CardTitle className={`text-3xl font-bold ${darkMode ? "text-pink-300" : "text-pink-600"} font-serif`}>
            Love Meter
          </CardTitle>
          <CardDescription className={darkMode ? "text-gray-300" : "text-gray-500"}>
            Discover the love compatibility between you and your partner
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!calculating && result === null ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Your Name
                </label>
                <Input
                  placeholder="Enter your name"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                />
              </div>
              <div className="space-y-2">
                <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Partner's Name
                </label>
                <Input
                  placeholder="Enter your partner's name"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                />
              </div>
            </div>
          ) : calculating ? (
            <div className="flex flex-col items-center py-6 space-y-4">
              <div className="relative w-48 h-48">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6143-wtdxMcc34jjiO0CeRTrtzO8RZQQOXw.gif"
                  alt="Calculating love compatibility"
                  fill
                  className="object-contain"
                />
              </div>
              <p className={`text-lg animate-pulse ${darkMode ? "text-pink-300" : "text-pink-600"}`}>
                Analyzing your compatibility...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 space-y-6 animate-fadeIn">
              <div className="relative">
                <div className={`text-7xl font-bold ${darkMode ? "text-pink-300" : "text-pink-600"} animate-heartbeat`}>
                  {result}%
                </div>
                <div className="absolute -top-4 -right-4">
                  <Heart
                    className={`h-8 w-8 fill-current ${darkMode ? "text-pink-400" : "text-pink-500"} animate-float`}
                  />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className={`text-xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                  {name1} & {name2}
                </h3>
                <p className={`text-sm italic ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{advice}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!calculating && result === null ? (
            <Button
              onClick={calculateLove}
              className={`w-full ${darkMode ? "bg-pink-600 hover:bg-pink-700" : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"} text-white transition-all duration-300`}
              disabled={name1.trim() === "" || name2.trim() === ""}
            >
              Calculate Love
            </Button>
          ) : result !== null ? (
            <Button
              onClick={() => {
                setResult(null)
                setCalculating(false)
              }}
              className={`w-full ${darkMode ? "bg-pink-600 hover:bg-pink-700" : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"} text-white transition-all duration-300`}
            >
              Try Again
            </Button>
          ) : (
            <Button disabled className="w-full bg-gray-400 text-white cursor-not-allowed">
              Calculating...
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

