"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { Moon, Sun, Play, Download, Copy, Trash } from "lucide-react"
import FallbackEditor from "@/components/fallback-editor"
import OutputDisplay from "@/components/output-display"

export default function PythonCompiler() {
  const [code, setCode] = useState('print("Hello, World!")\n\n# Write your Python code here\n')
  const [output, setOutput] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [savedCodes, setSavedCodes] = useState<{ name: string; code: string }[]>([])
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Load saved codes from localStorage
    try {
      const saved = localStorage.getItem("savedPythonCodes")
      if (saved) {
        setSavedCodes(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Failed to load saved codes:", error)
    }
  }, [])

  const executeCode = async () => {
    setIsExecuting(true)
    setOutput("Executing...")

    try {
      // In a real implementation, this would send the code to a Python execution service
      // For now, we'll simulate execution with a delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Parse the code and generate output
      // This is a simplified simulation - in reality you'd send this to a backend
      let simulatedOutput = ""

      const lines = code.split("\n")
      for (const line of lines) {
        const trimmedLine = line.trim()

        if (trimmedLine.startsWith("print(")) {
          try {
            // Extract content between parentheses
            const printContent = trimmedLine.substring(6, trimmedLine.lastIndexOf(")"))

            // Handle string literals
            if (
              (printContent.startsWith('"') && printContent.endsWith('"')) ||
              (printContent.startsWith("'") && printContent.endsWith("'"))
            ) {
              simulatedOutput += printContent.substring(1, printContent.length - 1) + "\n"
            } else {
              // Very basic evaluation - only for demo purposes
              try {
                const result = eval(printContent)
                simulatedOutput += result + "\n"
              } catch {
                simulatedOutput += printContent + "\n"
              }
            }
          } catch (e) {
            simulatedOutput += "Error in print statement\n"
          }
        } else if (trimmedLine.startsWith("#")) {
          // Skip comments
          continue
        } else if (trimmedLine) {
          // For other Python statements, we'd need a real Python interpreter
          // Just acknowledge them in our simulation
          if (
            !trimmedLine.includes("import") &&
            !trimmedLine.includes("def") &&
            !trimmedLine.includes("class") &&
            trimmedLine.length > 3
          ) {
            simulatedOutput += `Executed: ${trimmedLine}\n`
          }
        }
      }

      if (simulatedOutput) {
        setOutput(simulatedOutput)
      } else {
        setOutput("Code executed successfully with no output.")
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsExecuting(false)
    }
  }

  const saveCurrentCode = () => {
    const name = prompt("Enter a name for this code snippet:")
    if (name) {
      const newSavedCodes = [...savedCodes, { name, code }]
      setSavedCodes(newSavedCodes)
      try {
        localStorage.setItem("savedPythonCodes", JSON.stringify(newSavedCodes))
      } catch (error) {
        console.error("Failed to save code:", error)
      }
    }
  }

  const loadSavedCode = (savedCode: string) => {
    setCode(savedCode)
  }

  const clearCode = () => {
    if (confirm("Are you sure you want to clear the editor?")) {
      setCode("")
      setOutput("")
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Python Compiler</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Code Editor</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={copyCode}>
                <Copy className="h-4 w-4 mr-1" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={clearCode}>
                <Trash className="h-4 w-4 mr-1" /> Clear
              </Button>
              <Button variant="outline" size="sm" onClick={saveCurrentCode}>
                <Download className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button
                onClick={executeCode}
                disabled={isExecuting}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Play className="h-4 w-4 mr-1" /> Run
              </Button>
            </div>
          </div>

          <div className="border rounded-md h-[500px] overflow-hidden">
            <FallbackEditor code={code} setCode={setCode} />
          </div>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="output">
            <TabsList className="w-full">
              <TabsTrigger value="output" className="flex-1">
                Output
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex-1">
                Saved Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="output" className="mt-2">
              <OutputDisplay output={output} />
            </TabsContent>

            <TabsContent value="saved" className="mt-2">
              <div className="border rounded-md h-[500px] overflow-y-auto p-4 bg-muted/30">
                {savedCodes.length > 0 ? (
                  <ul className="space-y-2">
                    {savedCodes.map((saved, index) => (
                      <li
                        key={index}
                        className="p-2 border rounded hover:bg-muted cursor-pointer"
                        onClick={() => loadSavedCode(saved.code)}
                      >
                        <p className="font-medium">{saved.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{saved.code.substring(0, 50)}...</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No saved code snippets yet
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

