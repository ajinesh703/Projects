"use client"
import { useTheme } from "next-themes"

interface SimpleEditorProps {
  code: string
  setCode: (code: string) => void
}

// This is a fallback editor in case CodeMirror fails to load
export default function SimpleEditor({ code, setCode }: SimpleEditorProps) {
  const { theme } = useTheme()

  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className={`w-full h-full p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        theme === "dark" ? "bg-zinc-900 text-gray-100" : "bg-white text-gray-800"
      }`}
      placeholder="Write your Python code here..."
    />
  )
}

