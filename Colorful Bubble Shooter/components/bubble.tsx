"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

// Game constants
const BUBBLE_RADIUS = 20
const GRID_ROWS = 8
const GRID_COLS = 11
const SHOOTER_HEIGHT = 60
const BUBBLE_COLORS = ["#FF5252", "#FFEB3B", "#4CAF50", "#2196F3", "#9C27B0", "#FF9800"]
const GAME_WIDTH = GRID_COLS * BUBBLE_RADIUS * 2
const GAME_HEIGHT = 600

interface Bubble {
  x: number
  y: number
  color: string
  row: number
  col: number
  visible: boolean
}

interface MovingBubble {
  x: number
  y: number
  color: string
  dx: number
  dy: number
  active: boolean
}

export default function BubbleShooterGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [paused, setPaused] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const { toast } = useToast()

  // Game state refs to avoid dependency issues in animation loop
  const bubblesRef = useRef<Bubble[]>([])
  const movingBubbleRef = useRef<MovingBubble | null>(null)
  const shooterAngleRef = useRef(0)
  const scoreRef = useRef(0)
  const levelRef = useRef(1)
  const gameOverRef = useRef(false)
  const pausedRef = useRef(false)

  // Update refs when state changes
  useEffect(() => {
    scoreRef.current = score
    levelRef.current = level
    gameOverRef.current = gameOver
    pausedRef.current = paused
  }, [score, level, gameOver, paused])

  // Initialize game
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHighScore = localStorage.getItem("bubbleShooterHighScore")
      if (savedHighScore) {
        setHighScore(Number.parseInt(savedHighScore))
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !gameStarted || gameOver || paused) return

      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const shooterX = GAME_WIDTH / 2
      const shooterY = GAME_HEIGHT - SHOOTER_HEIGHT / 2

      // Calculate angle between shooter and mouse position
      const angle = Math.atan2(mouseX - shooterX, shooterY - 0) // Invert Y for correct angle
      shooterAngleRef.current = angle
    }

    const handleClick = () => {
      if (!gameStarted || gameOver || paused || movingBubbleRef.current?.active) return
      shootBubble()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [gameStarted, gameOver, paused])

  // Initialize bubbles grid
  const initializeBubbles = () => {
    const bubbles: Bubble[] = []
    const rowsToFill = Math.min(GRID_ROWS, 3 + Math.floor(levelRef.current / 2))

    for (let row = 0; row < rowsToFill; row++) {
      const cols = row % 2 === 0 ? GRID_COLS : GRID_COLS - 1
      for (let col = 0; col < cols; col++) {
        const x = col * BUBBLE_RADIUS * 2 + (row % 2 === 1 ? BUBBLE_RADIUS : 0)
        const y = row * BUBBLE_RADIUS * 1.8
        bubbles.push({
          x,
          y,
          color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
          row,
          col,
          visible: true,
        })
      }
    }

    bubblesRef.current = bubbles
  }

  // Start game
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setLevel(1)
    initializeBubbles()
    movingBubbleRef.current = null
    gameOverRef.current = false
    requestAnimationFrame(gameLoop)
  }

  // Shoot a bubble
  const shootBubble = () => {
    if (movingBubbleRef.current?.active) return

    const angle = shooterAngleRef.current
    const speed = 8
    const color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]

    movingBubbleRef.current = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - SHOOTER_HEIGHT,
      color,
      dx: Math.sin(angle) * speed,
      dy: -Math.cos(angle) * speed,
      active: true,
    }
  }

  // Check collision between moving bubble and grid bubbles
  const checkCollision = () => {
    if (!movingBubbleRef.current || !movingBubbleRef.current.active) return false

    const movingBubble = movingBubbleRef.current

    // Check collision with walls
    if (movingBubble.x < BUBBLE_RADIUS || movingBubble.x > GAME_WIDTH - BUBBLE_RADIUS) {
      movingBubble.dx = -movingBubble.dx
      return false
    }

    // Check if bubble reached top
    if (movingBubble.y <= BUBBLE_RADIUS) {
      snapBubbleToGrid(movingBubble, 0, Math.floor(movingBubble.x / (BUBBLE_RADIUS * 2)))
      return true
    }

    // Check collision with other bubbles
    for (const bubble of bubblesRef.current) {
      if (!bubble.visible) continue

      const dx = bubble.x - movingBubble.x
      const dy = bubble.y - movingBubble.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < BUBBLE_RADIUS * 2) {
        // Find the closest grid position to snap to
        const row = Math.round(movingBubble.y / (BUBBLE_RADIUS * 1.8))
        const col = Math.round((movingBubble.x - (row % 2 === 1 ? BUBBLE_RADIUS : 0)) / (BUBBLE_RADIUS * 2))

        snapBubbleToGrid(movingBubble, row, col)
        return true
      }
    }

    return false
  }

  // Snap a bubble to the grid
  const snapBubbleToGrid = (movingBubble: MovingBubble, row: number, col: number) => {
    // Adjust for odd rows
    const adjustedCol = row % 2 === 1 && col >= GRID_COLS - 1 ? GRID_COLS - 2 : col

    // Calculate the actual position
    const x = adjustedCol * BUBBLE_RADIUS * 2 + (row % 2 === 1 ? BUBBLE_RADIUS : 0)
    const y = row * BUBBLE_RADIUS * 1.8

    // Add the new bubble to the grid
    bubblesRef.current.push({
      x,
      y,
      color: movingBubble.color,
      row,
      col: adjustedCol,
      visible: true,
    })

    // Reset the moving bubble
    movingBubble.active = false

    // Check for matches
    const matches = findMatches(bubblesRef.current.length - 1)
    if (matches.length >= 3) {
      // Remove matched bubbles
      for (const index of matches) {
        bubblesRef.current[index].visible = false
      }

      // Update score
      setScore((prev) => prev + matches.length * 10)
      scoreRef.current += matches.length * 10

      // Show confetti for good matches
      if (matches.length >= 5) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }

      // Check for floating bubbles
      removeFloatingBubbles()
    }

    // Check if level is complete
    checkLevelComplete()

    // Check if game over (bubbles reached bottom)
    checkGameOver()
  }

  // Find matching bubbles of the same color
  const findMatches = (startIndex: number) => {
    const visited = new Set<number>()
    const matches: number[] = []
    const startBubble = bubblesRef.current[startIndex]

    if (!startBubble.visible) return matches

    const queue: number[] = [startIndex]
    visited.add(startIndex)
    matches.push(startIndex)

    while (queue.length > 0) {
      const currentIndex = queue.shift()!
      const currentBubble = bubblesRef.current[currentIndex]

      // Check neighbors
      for (let i = 0; i < bubblesRef.current.length; i++) {
        if (visited.has(i)) continue

        const bubble = bubblesRef.current[i]
        if (!bubble.visible) continue
        if (bubble.color !== currentBubble.color) continue

        // Check if they're neighbors
        const dx = bubble.x - currentBubble.x
        const dy = bubble.y - currentBubble.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < BUBBLE_RADIUS * 2.5) {
          visited.add(i)
          matches.push(i)
          queue.push(i)
        }
      }
    }

    return matches
  }

  // Remove bubbles that are not connected to the top
  const removeFloatingBubbles = () => {
    // Mark all bubbles as potentially floating
    const connected = new Set<number>()

    // Start from bubbles at the top row
    for (let i = 0; i < bubblesRef.current.length; i++) {
      const bubble = bubblesRef.current[i]
      if (bubble.visible && bubble.row === 0) {
        markConnected(i, connected)
      }
    }

    // Remove bubbles that are not connected
    let floatingCount = 0
    for (let i = 0; i < bubblesRef.current.length; i++) {
      if (bubblesRef.current[i].visible && !connected.has(i)) {
        bubblesRef.current[i].visible = false
        floatingCount++
      }
    }

    // Update score for floating bubbles
    if (floatingCount > 0) {
      setScore((prev) => prev + floatingCount * 15)
      scoreRef.current += floatingCount * 15
    }
  }

  // Mark connected bubbles recursively
  const markConnected = (index: number, connected: Set<number>) => {
    if (connected.has(index)) return

    connected.add(index)
    const currentBubble = bubblesRef.current[index]

    // Check neighbors
    for (let i = 0; i < bubblesRef.current.length; i++) {
      if (connected.has(i)) continue

      const bubble = bubblesRef.current[i]
      if (!bubble.visible) continue

      // Check if they're neighbors
      const dx = bubble.x - currentBubble.x
      const dy = bubble.y - currentBubble.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < BUBBLE_RADIUS * 2.5) {
        markConnected(i, connected)
      }
    }
  }

  // Check if level is complete
  const checkLevelComplete = () => {
    const visibleBubbles = bubblesRef.current.filter((bubble) => bubble.visible)

    if (visibleBubbles.length === 0) {
      // Level complete!
      setLevel((prev) => prev + 1)
      levelRef.current += 1

      toast({
        title: "Level Complete!",
        description: `Moving to level ${levelRef.current}`,
      })

      // Add confetti celebration
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.5 },
      })

      // Initialize new level with more bubbles
      initializeBubbles()
    }
  }

  // Check if game over
  const checkGameOver = () => {
    const visibleBubbles = bubblesRef.current.filter((bubble) => bubble.visible)

    // Game over if any bubble reaches the bottom
    for (const bubble of visibleBubbles) {
      if (bubble.y + BUBBLE_RADIUS > GAME_HEIGHT - SHOOTER_HEIGHT - BUBBLE_RADIUS) {
        setGameOver(true)
        gameOverRef.current = true

        // Update high score
        if (scoreRef.current > highScore) {
          setHighScore(scoreRef.current)
          if (typeof window !== "undefined") {
            localStorage.setItem("bubbleShooterHighScore", scoreRef.current.toString())
          }
        }

        return
      }
    }
  }

  // Game loop
  const gameLoop = () => {
    if (!canvasRef.current) return
    if (gameOverRef.current) return
    if (pausedRef.current) {
      requestAnimationFrame(gameLoop)
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid bubbles
    for (const bubble of bubblesRef.current) {
      if (!bubble.visible) continue

      ctx.beginPath()
      ctx.arc(bubble.x, bubble.y, BUBBLE_RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = bubble.color
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Add shine effect
      ctx.beginPath()
      ctx.arc(bubble.x - BUBBLE_RADIUS / 3, bubble.y - BUBBLE_RADIUS / 3, BUBBLE_RADIUS / 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fill()
    }

    // Draw shooter
    const shooterX = GAME_WIDTH / 2
    const shooterY = GAME_HEIGHT - SHOOTER_HEIGHT / 2

    // Draw shooter base
    ctx.beginPath()
    ctx.arc(shooterX, shooterY, BUBBLE_RADIUS * 1.2, 0, Math.PI * 2)
    ctx.fillStyle = "#333"
    ctx.fill()
    ctx.strokeStyle = "#555"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw shooter cannon
    ctx.save()
    ctx.translate(shooterX, shooterY)
    ctx.rotate(shooterAngleRef.current)
    ctx.fillStyle = "#555"
    ctx.fillRect(-5, -SHOOTER_HEIGHT / 2, 10, -SHOOTER_HEIGHT / 2)
    ctx.restore()

    // Draw next bubble in shooter
    if (!movingBubbleRef.current?.active) {
      const nextColor = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]
      ctx.beginPath()
      ctx.arc(shooterX, shooterY, BUBBLE_RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = nextColor
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Add shine effect
      ctx.beginPath()
      ctx.arc(shooterX - BUBBLE_RADIUS / 3, shooterY - BUBBLE_RADIUS / 3, BUBBLE_RADIUS / 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fill()
    }

    // Update and draw moving bubble
    if (movingBubbleRef.current?.active) {
      const movingBubble = movingBubbleRef.current

      // Update position
      movingBubble.x += movingBubble.dx
      movingBubble.y += movingBubble.dy

      // Draw bubble
      ctx.beginPath()
      ctx.arc(movingBubble.x, movingBubble.y, BUBBLE_RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = movingBubble.color
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Add shine effect
      ctx.beginPath()
      ctx.arc(movingBubble.x - BUBBLE_RADIUS / 3, movingBubble.y - BUBBLE_RADIUS / 3, BUBBLE_RADIUS / 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fill()

      // Check for collisions
      checkCollision()
    }

    // Continue game loop
    requestAnimationFrame(gameLoop)
  }

  // Toggle pause
  const togglePause = () => {
    setPaused(!paused)
  }

  return (
    <Card className="w-full max-w-lg overflow-hidden">
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white">
          <div className="font-bold">Score: {score}</div>
          <div>Level: {level}</div>
        </div>
        {gameStarted && !gameOver && (
          <Button variant="outline" onClick={togglePause}>
            {paused ? "Resume" : "Pause"}
          </Button>
        )}
        <div className="text-white text-right">
          <div className="font-bold">High Score</div>
          <div>{highScore}</div>
        </div>
      </div>

      <div className={cn("relative", { "opacity-50": paused })}>
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="bg-gradient-to-b from-blue-900 to-purple-900"
        />

        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
            <h2 className="text-3xl font-bold mb-4">Bubble Shooter</h2>
            <p className="mb-6 text-center px-4">
              Shoot bubbles to match 3 or more of the same color. Clear all bubbles to advance to the next level!
            </p>
            <Button
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Start Game
            </Button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
            <h2 className="text-3xl font-bold mb-4">Game Over</h2>
            <p className="text-xl mb-2">Score: {score}</p>
            <p className="text-lg mb-6">High Score: {highScore}</p>
            <Button
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Play Again
            </Button>
          </div>
        )}

        {paused && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
            <h2 className="text-3xl font-bold mb-4">Game Paused</h2>
            <Button
              onClick={togglePause}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Resume Game
            </Button>
          </div>
        )}
      </div>

      <div className="bg-gray-800 p-4 text-white text-center">
        <p className="text-sm">Click to shoot • Match 3+ bubbles of the same color • Clear all bubbles to advance</p>
      </div>
    </Card>
  )
}
