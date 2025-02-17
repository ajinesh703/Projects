import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance System</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto p-4">
        <div className="grid gap-4">
          <Link href="/manage-sections">
            <Button className="w-full">Manage Class Sections</Button>
          </Link>
          <Link href="/take-attendance">
            <Button className="w-full">Take Attendance</Button>
          </Link>
          <Link href="/view-attendance">
            <Button className="w-full">View Attendance History</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

