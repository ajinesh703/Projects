"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "next-themes"

interface FallbackEditorProps {
  code: string
  setCode: (code: string) => void
}

export default function FallbackEditor({ code, setCode }: FallbackEditorProps) {
  const { theme } = useTheme()
  const [localCode, setLocalCode] = useState(code)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalCode(e.target.value)
    setCode(e.target.value)
  }

  return (
    <div className="h-full w-full relative">
      <textarea
        value={localCode}
        onChange={handleChange}
        className={`w-full h-full p-4 font-mono text-sm resize-none focus:outline-none ${
          theme === "dark" ? "bg-zinc-900 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-gray-200"
        } border`}
        placeholder="Write your Python code here..."
        spellCheck="false"
      />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">Python Editor</div>
    </div>
  )
}

