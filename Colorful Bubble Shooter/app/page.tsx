import BubbleShooterGame from "@/components/bubble-shooter-game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-500 to-blue-700">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Bubble Shooter</h1>
      <BubbleShooterGame />
    </main>
  )
}
