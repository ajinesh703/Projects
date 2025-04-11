"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateIQ, getFunnyReply } from "@/lib/quiz-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, DollarSign, Trophy, Share2 } from "lucide-react"
import confetti from "canvas-confetti"

interface ResultsScreenProps {
  score: number
  totalQuestions: number
  userName: string
  earnedMoney: number
}

export function ResultsScreen({ score, totalQuestions, userName, earnedMoney }: ResultsScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [iqScore, setIqScore] = useState(0)
  const [iqCategory, setIqCategory] = useState("")
  const [percentage, setPercentage] = useState(0)
  const [funnyReply, setFunnyReply] = useState("")
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    try {
      // Calculate values after component mounts to avoid hydration issues
      setPercentage(Math.round((score / totalQuestions) * 100))
      const calculatedIq = calculateIQ(score, totalQuestions)
      setIqScore(calculatedIq)
      setIqCategory(getIQCategory(calculatedIq))
      setFunnyReply(getFunnyReply(calculatedIq, userName))
      setIsLoaded(true)

      // Trigger animations after a short delay
      setTimeout(() => {
        setShowAnimation(true)
        if (score > totalQuestions / 2) {
          triggerConfetti()
        }
      }, 500)
    } catch (error) {
      console.error("Error calculating results:", error)
      // Set fallback values
      setPercentage(0)
      setIqScore(100)
      setIqCategory("Average")
      setFunnyReply("Well, that was interesting...")
      setIsLoaded(true)
    }
  }, [score, totalQuestions, userName])

  function getIQCategory(iq: number) {
    if (iq < 70) return "Below Average"
    if (iq < 90) return "Low Average"
    if (iq < 110) return "Average"
    if (iq < 130) return "High Average"
    if (iq < 145) return "Superior"
    return "Very Superior"
  }

  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  function handleRetakeQuiz() {
    try {
      window.location.reload()
    } catch (error) {
      console.error("Error reloading page:", error)
      // Fallback navigation
      window.location.href = "/"
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Brain className="h-16 w-16 text-primary animate-pulse mb-4" />
        <p className="text-lg">Calculating your genius level...</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 z-10">
        <ThemeToggle />
      </div>

      <Card className="max-w-2xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

        <CardHeader className="text-center pb-2">
          <div className="flex justify-center">
            <Trophy className={`h-16 w-16 text-yellow-500 ${showAnimation ? "animate-bounce" : ""}`} />
          </div>
          <CardTitle className="text-3xl font-bold mt-2">Results for {userName}</CardTitle>
          <CardDescription className="text-lg">
            You answered {score} out of {totalQuestions} questions correctly ({percentage}%)
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={`flex flex-col items-center justify-center space-y-2 p-6 rounded-lg bg-primary/10 transition-all duration-1000 ${
                showAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <div className="text-6xl font-bold">{iqScore}</div>
              <p className="text-xl font-medium">Your IQ Score</p>
            </div>

            <div
              className={`flex flex-col items-center justify-center space-y-2 p-6 rounded-lg bg-green-100 dark:bg-green-900/30 transition-all duration-1000 delay-300 ${
                showAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div className="text-6xl font-bold text-green-600 dark:text-green-400">{earnedMoney}</div>
              </div>
              <p className="text-xl font-medium">Money Earned</p>
            </div>
          </div>

          <div
            className={`bg-muted p-6 rounded-lg text-center transition-all duration-1000 delay-600 ${
              showAnimation ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-xl font-medium mb-2">Your IQ Category</h3>
            <p className="text-2xl font-bold">{iqCategory}</p>
            <p className="mt-4 text-muted-foreground">{getIQDescription(iqCategory)}</p>
          </div>

          <div
            className={`bg-primary/5 p-6 rounded-lg text-center border-l-4 border-primary transition-all duration-1000 delay-900 ${
              showAnimation ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-xl font-medium mb-2">Personal Note</h3>
            <p className="text-lg italic">{funnyReply}</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleRetakeQuiz} className="flex-1 transition-all duration-300 hover:scale-105">
            Take the Test Again
          </Button>
          <Button
            variant="outline"
            className="flex-1 transition-all duration-300 hover:scale-105"
            onClick={() => {
              try {
                navigator
                  .share({
                    title: "My IQ Test Results",
                    text: `I just took an IQ test and scored ${iqScore}! My IQ category is: ${iqCategory}. I also earned $${earnedMoney}!`,
                  })
                  .catch(() => {
                    alert("Share feature not supported on this browser. Try copying your score manually!")
                  })
              } catch (error) {
                alert("Share feature not supported on this browser. Try copying your score manually!")
              }
            }}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function getIQDescription(category: string) {
  switch (category) {
    case "Below Average":
      return "You have potential to develop your cognitive abilities with practice and learning."
    case "Low Average":
      return "You have a functional intelligence level that can be improved with continued learning."
    case "Average":
      return "You have a typical intelligence level, on par with most of the population."
    case "High Average":
      return "You demonstrate good problem-solving abilities and logical thinking."
    case "Superior":
      return "You show excellent analytical skills and advanced cognitive abilities."
    case "Very Superior":
      return "You demonstrate exceptional intellectual capabilities and advanced reasoning."
    default:
      return "Your results show your unique cognitive profile."
  }
}
