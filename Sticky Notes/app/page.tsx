"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StickyNote } from "@/components/sticky-note"
import { AddNoteModal } from "@/components/add-note-modal"
import type { Note } from "@/types/note"
import { generateId } from "@/lib/utils"

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem("stickyNotes")
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (error) {
        console.error("Failed to parse saved notes:", error)
      }
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes))
  }, [notes])

  const addNote = (content: string, color: string) => {
    const newNote: Note = {
      id: generateId(),
      content,
      color,
      position: {
        x: Math.random() * (window.innerWidth - 220) + 10,
        y: Math.random() * (window.innerHeight - 220) + 80,
      },
      createdAt: new Date().toISOString(),
    }
    setNotes((prevNotes) => [...prevNotes, newNote])
    setIsAddModalOpen(false)
  }

  const updateNote = (updatedNote: Note) => {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    setEditingNote(null)
  }

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
  }

  const updateNotePosition = (id: string, position: { x: number; y: number }) => {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? { ...note, position } : note)))
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 relative overflow-hidden">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sticky Notes Dashboard</h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600"
        >
          <Plus size={16} />
          Add Note
        </Button>
      </header>

      <div className="relative w-full h-[calc(100vh-120px)]">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onUpdate={(content) => updateNote({ ...note, content })}
            onDelete={() => deleteNote(note.id)}
            onDragEnd={(position) => updateNotePosition(note.id, position)}
            onEdit={() => setEditingNote(note)}
          />
        ))}
      </div>

      <AddNoteModal
        isOpen={isAddModalOpen || !!editingNote}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingNote(null)
        }}
        onSave={editingNote ? updateNote : addNote}
        note={editingNote}
      />

      <footer className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500">
        Sticky Notes Dashboard - Your notes are saved locally in this browser
      </footer>
    </main>
  )
}
