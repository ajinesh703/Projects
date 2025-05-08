"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { FileText, Upload, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { mergePdfs } from "./actions"

export default function PDFMerger() {
  const [files, setFiles] = useState<File[]>([])
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
      setError(null)
      setMergedPdfUrl(null)
    },
  })

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setMergedPdfUrl(null)
  }

  const handleMergePdfs = async () => {
    if (files.length < 2) {
      setError("Please upload at least 2 PDF files to merge")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const formData = new FormData()
      files.forEach((file, index) => {
        formData.append(`pdf-${index}`, file)
      })

      const response = await mergePdfs(formData)

      if (response.error) {
        setError(response.error)
        return
      }

      if (response.url) {
        setMergedPdfUrl(response.url)
      }
    } catch (err) {
      setError("An error occurred while merging PDFs. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">PDF Merger</CardTitle>
          <CardDescription>Upload multiple PDF files and merge them into a single document</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">
              {isDragActive ? "Drop the PDF files here" : "Drag & drop PDF files here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">or click to select files</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Selected Files ({files.length})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-3 bg-muted rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div className="truncate max-w-[200px] sm:max-w-[400px]">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <Button onClick={handleMergePdfs} disabled={files.length < 2 || isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Merging PDFs...
              </>
            ) : (
              "Merge PDFs"
            )}
          </Button>

          {mergedPdfUrl && (
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.open(mergedPdfUrl, "_blank")}>
              Download Merged PDF
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
