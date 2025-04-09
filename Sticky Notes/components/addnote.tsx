"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Note } from "@/types/note"

interface AddNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (content: string, color: string) => void
  note?: Note | null
}

export function AddNoteModal({ isOpen, onClose, onSave, note }: AddNoteModalProps) {
  const [content, setContent] = useState("")
  const [color, setColor] = useState("yellow")

  useEffect(() => {
    if (note) {
      setContent(note.content)
      setColor(note.color)
    } else {
      setContent("")
      setColor("yellow")
    }
  }, [note, isOpen])

  const handleSave = () => {
    if (content.trim()) {
      onSave(content, color)
      setContent("")
      setColor("yellow")
    }
  }

  if (!isOpen) return null

  const colors = [
    { name: "yellow", class: "bg-yellow-200 hover:bg-yellow-300" },
    { name: "blue", class: "bg-blue-200 hover:bg-blue-300" },
    { name: "green", class: "bg-green-200 hover:bg-green-300" },
    { name: "pink", class: "bg-pink-200 hover:bg-pink-300" },
    { name: "purple", class: "bg-purple-200 hover:bg-purple-300" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{note ? "Edit Note" : "Add New Note"}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="note-content" className="block text-sm font-medium text-gray-700 mb-1">
            Note Content
          </label>
          <Textarea
            id="note-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="min-h-[150px]"
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Note Color</label>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`w-8 h-8 rounded-full ${c.class} ${
                  color === c.name ? "ring-2 ring-offset-2 ring-gray-500" : ""
                }`}
                aria-label={`${c.name} color`}
                aria-pressed={color === c.name}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>{note ? "Update" : "Add"} Note</Button>
        </div>
      </div>
    </div>
  )
}
