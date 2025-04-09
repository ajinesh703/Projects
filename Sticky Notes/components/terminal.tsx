"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TerminalProps {
  history: Array<{ command: string; result: string }>
  onExecute: (command: string) => void
  onClear: () => void
}

export function Terminal({ history, onExecute, onClear }: TerminalProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Scroll to the bottom when history changes
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onExecute(input)
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-2 bg-gray-100 border-b">
        <span className="font-medium">Command Window</span>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2 font-mono text-sm" ref={scrollAreaRef}>
        <div className="whitespace-pre-wrap">
          {/* Welcome message */}
          <div className="text-blue-600 mb-4">
            Welcome to Ajinesh ka Matlab
            <br />
            Type help for more information
          </div>

          {/* Command history */}
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              <div>
                <span className="text-green-600">&gt;&gt; </span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4">{item.result}</div>
            </div>
          ))}

          {/* Current command prompt */}
          <div className="flex items-center">
            <span className="text-green-600">&gt;&gt; </span>
            <form onSubmit={handleSubmit} className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent outline-none border-none"
                autoFocus
              />
            </form>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
