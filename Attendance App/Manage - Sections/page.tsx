"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"

interface Section {
  id: string
  name: string
  students: string[]
}

export default function ManageSections() {
  const [sections, setSections] = useState<Section[]>([])
  const [newSectionName, setNewSectionName] = useState("")
  const [newStudentName, setNewStudentName] = useState("")
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)

  useEffect(() => {
    const savedSections = localStorage.getItem("sections")
    if (savedSections) {
      setSections(JSON.parse(savedSections))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections))
  }, [sections])

  const addSection = () => {
    if (newSectionName.trim()) {
      const newSection: Section = {
        id: Date.now().toString(),
        name: newSectionName.trim(),
        students: [],
      }
      setSections([...sections, newSection])
      setNewSectionName("")
    }
  }

  const addStudent = () => {
    if (selectedSection && newStudentName.trim()) {
      const updatedSections = sections.map((section) =>
        section.id === selectedSection.id
          ? {
              ...section,
              students: [...section.students, newStudentName.trim()],
            }
          : section,
      )
      setSections(updatedSections)
      setSelectedSection(updatedSections.find((s) => s.id === selectedSection.id) || null)
      setNewStudentName("")
    }
  }

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId))
    if (selectedSection?.id === sectionId) {
      setSelectedSection(null)
    }
  }

  const deleteStudent = (sectionId: string, studentName: string) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            students: section.students.filter((student) => student !== studentName),
          }
        : section,
    )
    setSections(updatedSections)
    setSelectedSection(updatedSections.find((s) => s.id === sectionId) || null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Class Sections</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto p-4">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="new-section">Add New Section</Label>
            <div className="flex gap-2">
              <Input
                id="new-section"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="Enter section name"
              />
              <Button onClick={addSection}>Add Section</Button>
            </div>
          </div>
          <div>
            <Label htmlFor="section-select">Select Section</Label>
            <select
              id="section-select"
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedSection(sections.find((s) => s.id === e.target.value) || null)}
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
              <h2 className="text-xl font-semibold mb-2">{selectedSection.name} - Students</h2>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Enter student name"
                />
                <Button onClick={addStudent}>Add Student</Button>
              </div>
              <ul className="space-y-2">
                {selectedSection.students.map((student) => (
                  <li key={student} className="flex justify-between items-center">
                    {student}
                    <Button variant="destructive" size="sm" onClick={() => deleteStudent(selectedSection.id, student)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
              <Button variant="destructive" className="mt-4" onClick={() => deleteSection(selectedSection.id)}>
                Delete Section
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

