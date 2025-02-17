"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"

interface Section {
  id: string
  name: string
  students: string[]
}

interface AttendanceRecord {
  date: string
  sectionId: string
  presentStudents: string[]
}

export default function TakeAttendance() {
  const [sections, setSections] = useState<Section[]>([])
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [presentStudents, setPresentStudents] = useState<string[]>([])
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    const savedSections = localStorage.getItem("sections")
    if (savedSections) {
      setSections(JSON.parse(savedSections))
    }
    const savedAttendance = localStorage.getItem("attendance")
    if (savedAttendance) {
      setAttendanceRecords(JSON.parse(savedAttendance))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendanceRecords))
  }, [attendanceRecords])

  const handleSectionChange = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    setSelectedSection(section || null)
    setPresentStudents([])
  }

  const handleStudentToggle = (student: string) => {
    setPresentStudents((prev) => (prev.includes(student) ? prev.filter((s) => s !== student) : [...prev, student]))
  }

  const saveAttendance = () => {
    if (selectedSection) {
      const newRecord: AttendanceRecord = {
        date,
        sectionId: selectedSection.id,
        presentStudents,
      }
      setAttendanceRecords((prev) => [...prev, newRecord])
      alert("Attendance saved successfully!")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Take Attendance</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto p-4">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <Label htmlFor="section-select">Select Section</Label>
            <select
              id="section-select"
              className="w-full p-2 border rounded"
              onChange={(e) => handleSectionChange(e.target.value)}
              value={selectedSection?.id || ""}
            >
              <option value="">Select a section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
          {selectedSection && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{selectedSection.name} - Attendance</h2>
              <ul className="space-y-2">
                {selectedSection.students.map((student) => (
                  <li key={student} className="flex items-center space-x-2">
                    <Checkbox
                      id={student}
                      checked={presentStudents.includes(student)}
                      onCheckedChange={() => handleStudentToggle(student)}
                    />
                    <Label htmlFor={student}>{student}</Label>
                  </li>
                ))}
              </ul>
              <Button className="mt-4" onClick={saveAttendance}>
                Save Attendance
              </Button>
            </div>
          )}
        </div>
        <Link href="/">
          <Button className="mt-4">Back to Home</Button>
        </Link>
      </main>
    </div>
  )
}

