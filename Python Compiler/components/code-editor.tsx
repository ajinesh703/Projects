"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
}

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window === "undefined" || !editorRef.current) return

    const initEditor = async () => {
      // Import CodeMirror 6 modules
      const { EditorState } = await import("@codemirror/state")
      const { EditorView, keymap, lineNumbers, highlightActiveLine } = await import("@codemirror/view")
      const { defaultKeymap, history, historyKeymap } = await import("@codemirror/commands")
      const { indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching } = await import(
        "@codemirror/language"
      )
      const { python } = await import("@codemirror/lang-python")
      const { oneDark } = await import("@codemirror/theme-one-dark")

      // Clear previous instances
      if (editorRef.current) {
        editorRef.current.innerHTML = ""
      }

      // Create the editor state
      const startState = EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          history(),
          indentOnInput(),
          bracketMatching(),
          syntaxHighlighting(defaultHighlightStyle),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          python(),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setCode(update.state.doc.toString())
            }
          }),
          EditorView.theme({
            "&": {
              height: "100%",
              fontSize: "14px",
            },
            ".cm-content": {
              fontFamily: "monospace",
            },
          }),
          theme === "dark" ? oneDark : [],
          EditorState.tabSize.of(4),
          EditorView.lineWrapping,
        ],
      })

      // Create the editor view
      const view = new EditorView({
        state: startState,
        parent: editorRef.current,
      })

      // Return cleanup function
      return () => {
        view.destroy()
      }
    }

    const cleanup = initEditor()

    return () => {
      cleanup.then((cleanupFn) => cleanupFn && cleanupFn())
    }
  }, [code, setCode, theme])

  return <div ref={editorRef} className="h-full w-full" />
}

