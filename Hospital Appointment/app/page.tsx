import AppointmentBooking from "@/components/appointment-booking"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">CHS Appointment System</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container py-8">
        <div className="mx-auto max-w-3xl">
          <AppointmentBooking />
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Community Health Services. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

