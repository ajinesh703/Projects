import { Calculator } from "@/components/calculator"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <h1 className="mb-8 text-4xl font-bold">Compound Interest Calculator</h1>
      <Calculator />
    </main>
  )
}

