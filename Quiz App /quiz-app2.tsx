"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { getRandomQuestions } from "@/lib/quiz-data"
import { ResultsScreen } from "@/components/results-screen"
import { WelcomeScreen } from "@/components/welcome-screen"
import { ThemeToggle } from "@/components/theme-toggle"
import { AlertCircle, DollarSign } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Question } from "@/lib/quiz-data"

const QUESTION_TIME = 15 // seconds per question
const TOTAL_QUESTIONS = 10 // number of questions in the quiz

export function QuizApp() {
  // Quiz state
  const [isLoaded, setIsLoaded] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [userName, setUserName] = useState("")
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [earnedMoney, setEarnedMoney] = useState(0)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize quiz with random questions
  useEffect(() => {
    try {
      const randomQuestions = getRandomQuestions(TOTAL_QUESTIONS)
      setQuizQuestions(randomQuestions)
      setSelectedAnswers(Array(TOTAL_QUESTIONS).fill(""))
      setIsLoaded(true)
    } catch (error) {
      console.error("Error initializing quiz state:", error)
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isTimerActive && timeLeft === 0) {
      // Auto-submit when time runs out
      handleNext()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timeLeft, isTimerActive])

  // Start timer when question changes
  useEffect(() => {
    if (quizStarted && !quizCompleted) {
      setTimeLeft(QUESTION_TIME)
      setIsTimerActive(true)
    }
  }, [currentQuestionIndex, quizStarted, quizCompleted])

  const startQuiz = (name: string) => {
    setUserName(name)
    setQuizStarted(true)
    setIsTimerActive(true)
  }

  const handleAnswerSelect = (value: string) => {
    try {
      const newAnswers = [...selectedAnswers]
      newAnswers[currentQuestionIndex] = value
      setSelectedAnswers(newAnswers)
    } catch (error) {
      console.error("Error selecting answer:", error)
    }
  }

  const handleNext = () => {
    try {
      // Stop the timer
      setIsTimerActive(false)

      // Calculate money earned for current question if answered correctly
      const currentQuestion = quizQuestions[currentQuestionIndex]
      if (selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer) {
        const moneyForQuestion = calculateMoneyForQuestion(currentQuestion.difficulty)
        setEarnedMoney((prev) => prev + moneyForQuestion)
      }

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        calculateScore()
        setQuizCompleted(true)
      }
    } catch (error) {
      console.error("Error navigating to next question:", error)
    }
  }

  const calculateMoneyForQuestion = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return 100
      case "medium":
        return 300
      case "hard":
        return 500
      default:
        return 100
    }
  }

  const calculateScore = () => {
    try {
      let totalScore = 0
      quizQuestions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          totalScore += 1
        }
      })
      setScore(totalScore)
    } catch (error) {
      console.error("Error calculating score:", error)
      setScore(0) // Fallback to 0 if calculation fails
    }
  }

  // Guard against accessing questions before state is initialized
  if (!isLoaded) {
    return <div className="text-center p-4">Preparing quiz...</div>
  }

  // Show welcome screen if quiz hasn't started
  if (!quizStarted) {
    return <WelcomeScreen onStart={startQuiz} />
  }

  // Show results screen if quiz is completed
  if (quizCompleted) {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={quizQuestions.length}
        userName={userName}
        earnedMoney={earnedMoney}
      />
    )
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100
  const timeProgress = (timeLeft / QUESTION_TIME) * 100

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 z-10">
        <ThemeToggle />
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </CardTitle>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="font-bold">{earnedMoney}</span>
            </div>
          </div>
          <CardDescription>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="flex justify-between text-sm mt-2">
                <span>Time Left</span>
                <span className={timeLeft <= 5 ? "text-red-500 font-bold" : ""}>{timeLeft}s</span>
              </div>
              <Progress
                value={timeProgress}
                className={`h-2 ${timeLeft <= 5 ? "bg-red-200" : ""}`}
                indicatorClassName={timeLeft <= 5 ? "bg-red-500" : undefined}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  currentQuestion.difficulty === "easy"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : currentQuestion.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {currentQuestion.difficulty.toUpperCase()} (${calculateMoneyForQuestion(currentQuestion.difficulty)})
              </span>
              <h2 className="text-xl font-medium">{currentQuestion.question}</h2>
            </div>

            {timeLeft <= 5 && (
              <Alert variant="destructive" className="animate-pulse">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Hurry up! Time is running out!</AlertDescription>
              </Alert>
            )}

            <RadioGroup
              value={selectedAnswers[currentQuestionIndex]}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={`option-${currentQuestionIndex}-${index}`}
                  className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all duration-200 
                    ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? "border-primary bg-primary/5 dark:bg-primary/20"
                        : "hover:bg-accent"
                    }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <RadioGroupItem value={option} id={`option-${currentQuestionIndex}-${index}`} />
                  <Label htmlFor={`option-${currentQuestionIndex}-${index}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Difficulty:</span> {currentQuestion.difficulty}
          </div>
          <Button onClick={handleNext} className="transition-all duration-300 hover:scale-105">
            {currentQuestionIndex === quizQuestions.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
