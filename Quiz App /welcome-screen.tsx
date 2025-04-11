"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, DollarSign } from "lucide-react"

interface WelcomeScreenProps {
  onStart: (name: string) => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleStart = () => {
    if (!name.trim()) {
      setError("Please enter your name to continue")
      return
    }
    onStart(name)
  }

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 z-10">
        <ThemeToggle />
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold">IQ Challenge Quiz</CardTitle>
          <CardDescription className="text-lg mt-2">Test your intelligence and earn virtual money!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Enter Your Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
              className="text-lg"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-lg">Quiz Rules:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You'll have 15 seconds to answer each question</li>
              <li>Questions are randomly selected from our database</li>
              <li>
                Earn money based on question difficulty:
                <ul className="list-disc pl-5 mt-1">
                  <li className="flex items-center gap-1">
                    <span className="text-green-600 font-medium">Easy:</span>
                    <DollarSign className="h-3 w-3" /> 100
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-yellow-600 font-medium">Medium:</span>
                    <DollarSign className="h-3 w-3" /> 300
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-red-600 font-medium">Hard:</span>
                    <DollarSign className="h-3 w-3" /> 500
                  </li>
                </ul>
              </li>
              <li>Your IQ score will be calculated based on your performance</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStart} className="w-full text-lg py-6 transition-all duration-300 hover:scale-105">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
