"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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

export default function ViewAttendance() {
  const [sections, setSections] = useState<Section[]>([])
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [selectedDate, setSelectedDate] = useState("")

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

  const handleSectionChange = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    setSelectedSection(section || null)
    setSelectedDate("")
  }

  const getAttendanceForDate = () => {
    if (selectedSection && selectedDate) {
      return attendanceRecords.find((record) => record.sectionId === selectedSection.id && record.date === selectedDate)
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">View Attendance History</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto p-4">
        <div className="grid gap-4">
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
              <Label htmlFor="date-select">Select Date</Label>
              <select
                id="date-select"
                className="w-full p-2 border rounded"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              >
                <option value="">Select a date</option>
                {attendanceRecords
                  .filter((record) => record.sectionId === selectedSection.id)
                  .map((record) => (
                    <option key={record.date} value={record.date}>
                      {record.date}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {selectedSection && selectedDate && (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Attendance for {selectedSection.name} on {selectedDate}
              </h2>
              <ul className="space-y-2">
                {selectedSection.students.map((student) => {
                  const attendanceRecord = getAttendanceForDate()
                  const isPresent = attendanceRecord?.presentStudents.includes(student)
                  return (
                    <li
                      key={student}
                      className={`p-2 rounded ${
                        isPresent ? "bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
                      }`}
                    >
                      {student}: {isPresent ? "Present" : "Absent"}
                    </li>
                  )
                })}
              </ul>
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

