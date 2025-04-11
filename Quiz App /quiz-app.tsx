"use client"

import { ErrorBoundary } from "react-error-boundary"
import { QuizApp } from "@/components/quiz-app"
import { Button } from "@/components/ui/button"

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message || "An error occurred while loading the quiz"}</p>
      <Button onClick={resetErrorBoundary}>Try Again</Button>
    </div>
  )
}

export function QuizAppWrapper() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QuizApp />
    </ErrorBoundary>
  )
}
