import { Suspense } from "react"
import { QuizAppWrapper } from "@/components/quiz-app-wrapper"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="container mx-auto py-10 px-4">
        <Suspense fallback={<div className="text-center p-8">Loading quiz...</div>}>
          <QuizAppWrapper />
        </Suspense>
      </main>
    </ThemeProvider>
  )
}
