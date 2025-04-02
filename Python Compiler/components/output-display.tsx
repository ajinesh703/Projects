"use client"

import { useTheme } from "next-themes"

interface OutputDisplayProps {
  output: string
}

export default function OutputDisplay({ output }: OutputDisplayProps) {
  const { theme } = useTheme()

  return (
    <div
      className={`border rounded-md h-[500px] overflow-y-auto p-4 font-mono text-sm ${
        theme === "dark" ? "bg-zinc-900" : "bg-gray-50"
      }`}
    >
      {output ? (
        <pre className="whitespace-pre-wrap">{output}</pre>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Run your code to see output here
        </div>
      )}
    </div>
  )
}

