"use client"

import type React from "react"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [isValidUrl, setIsValidUrl] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Basic URL validation
      new URL(url)
      setIsValidUrl(true)
      setQrCodeUrl(url)
    } catch (error) {
      setIsValidUrl(false)
    }
  }

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = "qrcode.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
    img.crossOrigin = "anonymous"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">QR Code Generator</CardTitle>
          <CardDescription>Convert any link into a scannable QR code</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Enter URL</Label>
              <Input
                id="url"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={!isValidUrl ? "border-red-500" : ""}
              />
              {!isValidUrl && <p className="text-sm text-red-500">Please enter a valid URL</p>}
            </div>
            <Button type="submit" className="w-full">
              Generate QR Code
            </Button>
          </form>

          {qrCodeUrl && (
            <div className="mt-6 flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCodeSVG id="qr-code" value={qrCodeUrl} size={200} level="H" includeMargin />
              </div>
            </div>
          )}
        </CardContent>
        {qrCodeUrl && (
          <CardFooter>
            <Button onClick={downloadQRCode} variant="outline" className="w-full flex items-center gap-2">
              <Download size={16} />
              Download QR Code
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
