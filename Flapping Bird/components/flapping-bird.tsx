"use client"

import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Game constants - adjusted for easier gameplay
const GRAVITY = 0.3 // Reduced from 0.5
const JUMP_FORCE = -8 // Reduced from -10
const PIPE_SPEED = 2 // Reduced from 3
const PIPE_WIDTH = 80
const PIPE_GAP = 250 // Increased from 200
const PIPE_SPACING = 300
const GROUND_HEIGHT = 100

// Bird image URL
const BIRD_IMAGE_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%205%2C%202025%2C%2006_43_51%20PM-YTiWCV6IRhXuliISF1UY4e81tge4fv.png"

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isNightMode, setIsNightMode] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { toast } = useToast()

  // Preload the bird image
  const birdImageRef = useRef<HTMLImageElement | null>(null)

  // Load the bird image
  useEffect(() => {
    try {
      // Create and load the bird image
      const img = new Image()
      img.crossOrigin = "anonymous"

      // Handle image load success
      img.onload = () => {
        console.log("Bird image loaded successfully")
        birdImageRef.current = img
        setImageLoaded(true)
      }

      // Handle image load error
      img.onerror = () => {
        console.error("Error loading bird image")
        setImageLoaded(false)
      }

      // Set the source after attaching event handlers
      img.src = BIRD_IMAGE_URL

      return () => {
        // Clean up
        img.onload = null
        img.onerror = null
      }
    } catch (error) {
      console.error("Error in image loading effect:", error)
      setImageLoaded(false)
    }
  }, [])

  // Game state
  const gameStateRef = useRef({
    bird: {
      x: 100,
      y: 200,
      width: 50,
      height: 40,
      velocity: 0,
      flap: false,
      flapAnimation: 0,
    },
    pipes: [] as {
      x: number
      topHeight: number
      passed: boolean
    }[],
    score: 0,
    gameOver: false,
    isNightMode: false,
    lastPipeTime: 0,
  })

  // Initialize game
  useEffect(() => {
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas size
      canvas.width = 480
      canvas.height = 640

      let animationFrameId: number

      // Show a helpful toast when the game starts
      toast({
        title: "Game Ready!",
        description: "Tap or press spacebar to flap. Try to reach 500 points for night mode!",
      })

      // Handle key/touch events
      const handleJump = () => {
        if (gameStateRef.current.gameOver) {
          resetGame()
          return
        }

        gameStateRef.current.bird.velocity = JUMP_FORCE
        gameStateRef.current.bird.flap = true
      }

      const handleKeyDown = (event) => {
        if (event && event.code === "Space") {
          event.preventDefault()
          handleJump()
        }
      }

      const handleClick = () => {
        handleJump()
      }

      const handleTouch = (event) => {
        if (event) {
          event.preventDefault()
        }
        handleJump()
      }

      window.addEventListener("keydown", handleKeyDown)
      canvas.addEventListener("click", handleClick)
      canvas.addEventListener("touchstart", handleTouch)

      // Game loop
      const gameLoop = (timestamp) => {
        const gameState = gameStateRef.current

        // Update bird
        gameState.bird.velocity += GRAVITY
        gameState.bird.y += gameState.bird.velocity

        // Flap animation
        if (gameState.bird.flap) {
          gameState.bird.flapAnimation = 5
          gameState.bird.flap = false
        } else if (gameState.bird.flapAnimation > 0) {
          gameState.bird.flapAnimation--
        }

        // Generate pipes - less frequently for easier gameplay
        if (timestamp - gameState.lastPipeTime > 2000) {
          // Increased from 1500
          const minHeight = 50
          const maxHeight = canvas.height - PIPE_GAP - minHeight - GROUND_HEIGHT
          const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight

          // Make sure pipes aren't too extreme
          const safeTopHeight = Math.max(100, Math.min(topHeight, canvas.height - PIPE_GAP - 100 - GROUND_HEIGHT))

          gameState.pipes.push({
            x: canvas.width,
            topHeight: safeTopHeight,
            passed: false,
          })

          gameState.lastPipeTime = timestamp
        }

        // Update pipes
        for (let i = 0; i < gameState.pipes.length; i++) {
          const pipe = gameState.pipes[i]
          pipe.x -= PIPE_SPEED

          // Check if pipe is passed
          if (!pipe.passed && pipe.x + PIPE_WIDTH < gameState.bird.x) {
            pipe.passed = true
            gameState.score++
            setScore(gameState.score)

            // Check for night mode transition
            if (gameState.score === 15 && !gameState.isNightMode) {
              gameState.isNightMode = true
              setIsNightMode(true)
              toast({
                title: "Night Mode Activated!",
                description: "You've reached 15 points!",
              })
            }

            // Show encouraging messages at certain milestones
            if (gameState.score === 10) {
              toast({
                title: "Great start!",
                description: "You're doing well!",
              })
            } else if (gameState.score === 50) {
              toast({
                title: "Amazing!",
                description: "You're getting the hang of it!",
              })
            } else if (gameState.score === 100) {
              toast({
                title: "Incredible!",
                description: "You're a natural at this!",
              })
            }
          }

          // Check collision with pipes - with a slightly more forgiving hitbox
          const hitboxReduction = 5 // Make hitbox slightly smaller than visual for forgiveness
          if (
            gameState.bird.x + gameState.bird.width - hitboxReduction > pipe.x &&
            gameState.bird.x + hitboxReduction < pipe.x + PIPE_WIDTH &&
            (gameState.bird.y + hitboxReduction < pipe.topHeight ||
              gameState.bird.y + gameState.bird.height - hitboxReduction > pipe.topHeight + PIPE_GAP)
          ) {
            gameOver()
          }
        }

        // Remove off-screen pipes
        gameState.pipes = gameState.pipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0)

        // Check collision with ground or ceiling - with ceiling forgiveness
        if (
          gameState.bird.y + gameState.bird.height > canvas.height - GROUND_HEIGHT ||
          gameState.bird.y < -20 // Allow slightly going off-screen at the top
        ) {
          gameOver()
        }

        // Draw game
        drawGame(ctx, gameState)

        if (!gameState.gameOver) {
          animationFrameId = requestAnimationFrame(gameLoop)
        }
      }

      // Draw game function
      const drawGame = (ctx, gameState) => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw background
        if (gameState.isNightMode) {
          // Night sky gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "#0a1128")
          gradient.addColorStop(1, "#1c3f60")
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Stars
          ctx.fillStyle = "white"
          for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * (canvas.height - GROUND_HEIGHT)
            const size = Math.random() * 2 + 1
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fill()
          }

          // Moon
          ctx.fillStyle = "#f5f5f5"
          ctx.beginPath()
          ctx.arc(canvas.width - 60, 60, 40, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Day sky gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "#87CEEB")
          gradient.addColorStop(1, "#E0F7FA")
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Sun
          ctx.fillStyle = "#FDB813"
          ctx.beginPath()
          ctx.arc(canvas.width - 60, 60, 40, 0, Math.PI * 2)
          ctx.fill()

          // Clouds
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          drawCloud(ctx, 100, 80, 60)
          drawCloud(ctx, 300, 120, 40)
        }

        // Draw pipes
        ctx.fillStyle = gameState.isNightMode ? "#2E7D32" : "#4CAF50"
        for (const pipe of gameState.pipes) {
          // Top pipe
          ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)

          // Bottom pipe
          ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, canvas.height - pipe.topHeight - PIPE_GAP)

          // Pipe caps
          ctx.fillStyle = gameState.isNightMode ? "#1B5E20" : "#388E3C"

          // Top pipe cap
          ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20)

          // Bottom pipe cap
          ctx.fillRect(pipe.x - 5, pipe.topHeight + PIPE_GAP, PIPE_WIDTH + 10, 20)

          ctx.fillStyle = gameState.isNightMode ? "#2E7D32" : "#4CAF50"
        }

        // Draw ground
        ctx.fillStyle = gameState.isNightMode ? "#5D4037" : "#8D6E63"
        ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT)

        // Draw grass
        ctx.fillStyle = gameState.isNightMode ? "#33691E" : "#689F38"
        ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, 20)

        // Draw bird
        ctx.save()
        ctx.translate(gameState.bird.x + gameState.bird.width / 2, gameState.bird.y + gameState.bird.height / 2)

        // Rotate bird based on velocity - less extreme rotation for easier visual tracking
        const rotation = Math.min(Math.max(gameState.bird.velocity * 1.5, -25), 70) * (Math.PI / 180)
        ctx.rotate(rotation)

        // Draw the bird - either the image if loaded or a fallback colored bird
        if (imageLoaded && birdImageRef.current) {
          try {
            ctx.drawImage(
              birdImageRef.current,
              -gameState.bird.width / 2,
              -gameState.bird.height / 2,
              gameState.bird.width,
              gameState.bird.height,
            )
          } catch (error) {
            console.error("Error drawing bird image:", error)
            // Fallback to a colored bird
            drawFallbackBird(ctx, gameState.bird.width, gameState.bird.height)
          }
        } else {
          // Fallback to a colored bird if image isn't loaded
          drawFallbackBird(ctx, gameState.bird.width, gameState.bird.height)
        }

        ctx.restore()

        // Draw score
        ctx.fillStyle = gameState.isNightMode ? "white" : "black"
        ctx.font = "bold 40px Arial"
        ctx.textAlign = "center"
        ctx.fillText(gameState.score.toString(), canvas.width / 2, 60)

        // Draw game over message
        if (gameState.gameOver) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
          ctx.fillRect(0, canvas.height / 2 - 80, canvas.width, 160)

          ctx.fillStyle = "white"
          ctx.font = "bold 40px Arial"
          ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 30)

          ctx.font = "30px Arial"
          ctx.fillText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 10)
          ctx.fillText(`High Score: ${Math.max(gameState.score, highScore)}`, canvas.width / 2, canvas.height / 2 + 50)

          ctx.font = "20px Arial"
          ctx.fillText("Tap or press Space to restart", canvas.width / 2, canvas.height / 2 + 90)
        }
      }

      // Draw cloud helper function
      const drawCloud = (ctx, x, y, size) => {
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.arc(x + size, y, size * 0.8, 0, Math.PI * 2)
        ctx.arc(x - size * 0.5, y, size * 0.7, 0, Math.PI * 2)
        ctx.arc(x + size * 0.5, y - size * 0.5, size * 0.7, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw fallback bird helper function
      const drawFallbackBird = (ctx, width, height) => {
        // Bird body (orange)
        ctx.fillStyle = "#FF6D00"
        ctx.beginPath()
        ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2)
        ctx.fill()

        // Bird belly (yellow)
        ctx.fillStyle = "#FFD600"
        ctx.beginPath()
        ctx.ellipse(width / 10, height / 10, width / 3, height / 3, 0, 0, Math.PI * 2)
        ctx.fill()

        // Bird eye (white)
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(-width / 6, -height / 8, width / 10, 0, Math.PI * 2)
        ctx.fill()

        // Bird pupil (black)
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.arc(-width / 6, -height / 8, width / 20, 0, Math.PI * 2)
        ctx.fill()

        // Bird beak (yellow)
        ctx.fillStyle = "#FFD600"
        ctx.beginPath()
        ctx.moveTo(-width / 2, 0)
        ctx.lineTo(-width / 2 - width / 4, -height / 10)
        ctx.lineTo(-width / 2 - width / 4, height / 10)
        ctx.closePath()
        ctx.fill()
      }

      // Game over function
      const gameOver = () => {
        const gameState = gameStateRef.current
        if (gameState.gameOver) return

        gameState.gameOver = true
        setGameOver(true)

        // Update high score
        if (gameState.score > highScore) {
          setHighScore(gameState.score)
          localStorage.setItem("flappyHighScore", gameState.score.toString())

          // Congratulate on new high score
          toast({
            title: "New High Score!",
            description: `Amazing! You scored ${gameState.score} points!`,
          })
        }
      }

      // Reset game function
      const resetGame = () => {
        const gameState = gameStateRef.current

        gameState.bird = {
          x: 100,
          y: 200,
          width: 50,
          height: 40,
          velocity: 0,
          flap: false,
          flapAnimation: 0,
        }
        gameState.pipes = []
        gameState.score = 0
        gameState.gameOver = false
        gameState.lastPipeTime = 0
        // Keep night mode if it was activated

        setScore(0)
        setGameOver(false)

        // Start game loop again
        animationFrameId = requestAnimationFrame(gameLoop)

        // Show restart message
        toast({
          title: "Game Restarted",
          description: "Good luck this time!",
        })
      }

      // Load high score from localStorage
      const savedHighScore = localStorage.getItem("flappyHighScore")
      if (savedHighScore) {
        const parsedHighScore = Number.parseInt(savedHighScore)
        setHighScore(parsedHighScore)
      }

      // Start the game loop
      animationFrameId = requestAnimationFrame(gameLoop)

      // Cleanup
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
        canvas.removeEventListener("click", handleClick)
        canvas.removeEventListener("touchstart", handleTouch)
        cancelAnimationFrame(animationFrameId)
      }
    } catch (error) {
      console.error("Error in game initialization:", error)
    }
  }, [toast, imageLoaded, highScore])

  // Update game state refs when state changes
  useEffect(() => {
    gameStateRef.current.score = score
    gameStateRef.current.gameOver = gameOver
    gameStateRef.current.isNightMode = isNightMode
  }, [score, gameOver, isNightMode])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full max-w-md">
        <div className="text-lg font-bold">Score: {score}</div>
        <div className="text-lg font-bold">High Score: {highScore}</div>
      </div>
      <canvas
        ref={canvasRef}
        className="border-4 border-orange-600 rounded-lg shadow-lg"
        style={{ touchAction: "none" }}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">Tap the screen or press spacebar to flap!</p>
        <p className="text-xs text-gray-500">Reach 500 points to unlock night mode!</p>
      </div>
    </div>
  )
}

