"use client"

import { useState } from "react"
import FlappyBird from "@/components/flappy-bird"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-300 to-sky-100">
      {!gameStarted ? (
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-orange-600">Flappy Bird</h1>

          {/* Use a styled div instead of direct image */}
          <div className="w-24 h-24 mx-auto mb-6 animate-bounce relative">
            <div className="w-full h-full rounded-full bg-orange-500 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-orange-400 rounded-full"></div>
                <div className="absolute left-1/4 top-1/3 w-4 h-4 bg-white rounded-full">
                  <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute right-0 w-6 h-6 bg-yellow-400 transform rotate-45 translate-x-1/2"></div>
                <div className="absolute bottom-0 w-16 h-8 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <p className="mb-8 text-gray-700">
            Help the bird navigate through pipes by tapping or pressing spacebar to flap!
          </p>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => setGameStarted(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-lg py-6"
            >
              Start Game
            </Button>
            <Button onClick={() => setShowInstructions(!showInstructions)} variant="outline" className="rounded-full">
              {showInstructions ? "Hide Instructions" : "How to Play"}
            </Button>
          </div>

          {showInstructions && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-left">
              <h2 className="text-xl font-bold mb-2 text-orange-600">How to Play:</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Tap the screen or press <strong>spacebar</strong> to make the bird flap
                </li>
                <li>Navigate through the pipes without hitting them</li>
                <li>Each pipe you pass gives you 1 point</li>
                <li>
                  Reach <strong>500 points</strong> to unlock night mode!
                </li>
                <li>The game has been made easier for a more enjoyable experience</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" size="sm" onClick={() => setGameStarted(false)} className="text-sm">
              Back to Menu
            </Button>
          </div>
          <FlappyBird />
        </div>
      )}
    </main>
  )
}

