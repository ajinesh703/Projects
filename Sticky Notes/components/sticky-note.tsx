"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Trash2, Edit } from "lucide-react"
import type { Note } from "@/types/note"
import { cn } from "@/lib/utils"

interface StickyNoteProps {
  note: Note
  onUpdate: (content: string) => void
  onDelete: () => void
  onDragEnd: (position: { x: number; y: number }) => void
  onEdit: () => void
}

export function StickyNote({ note, onUpdate, onDelete, onDragEnd, onEdit }: StickyNoteProps) {
  const [position, setPosition] = useState(note.position)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const noteRef = useRef<HTMLDivElement>(null)

  // Update position when note.position changes (e.g., from parent)
  useEffect(() => {
    setPosition(note.position)
  }, [note.position])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (noteRef.current) {
      const rect = noteRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Ensure note stays within viewport
      const maxX = window.innerWidth - (noteRef.current?.offsetWidth || 200)
      const maxY = window.innerHeight - (noteRef.current?.offsetHeight || 200)

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      onDragEnd(position)
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  // Color classes mapping
  const colorClasses = {
    yellow: "bg-yellow-200 hover:bg-yellow-300",
    blue: "bg-blue-200 hover:bg-blue-300",
    green: "bg-green-200 hover:bg-green-300",
    pink: "bg-pink-200 hover:bg-pink-300",
    purple: "bg-purple-200 hover:bg-purple-300",
  }

  return (
    <div
      ref={noteRef}
      className={cn(
        "absolute w-60 min-h-[200px] p-4 rounded-md shadow-md cursor-move transition-shadow duration-200",
        "hover:shadow-lg flex flex-col",
        colorClasses[note.color as keyof typeof colorClasses] || colorClasses.yellow,
        isDragging && "shadow-xl z-50",
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex justify-end gap-1 mb-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          className="p-1 rounded-full hover:bg-white/50 transition-colors"
          aria-label="Edit note"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-1 rounded-full hover:bg-white/50 transition-colors"
          aria-label="Delete note"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-1 whitespace-pre-wrap break-words text-gray-800">{note.content}</div>

      <div className="text-xs text-gray-600 mt-2">{new Date(note.createdAt).toLocaleDateString()}</div>
    </div>
  )
}
