"use server"

import { PDFDocument } from "pdf-lib"
import { writeFile } from "fs/promises"
import { join } from "path"
import { mkdir } from "fs/promises"
import { v4 as uuidv4 } from "uuid"

export async function mergePdfs(formData: FormData) {
  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create()

    // Get all PDF files from the form data
    const pdfFiles: Uint8Array[] = []

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("pdf-") && value instanceof File) {
        const buffer = await value.arrayBuffer()
        pdfFiles.push(new Uint8Array(buffer))
      }
    }

    if (pdfFiles.length < 2) {
      return { error: "Please upload at least 2 PDF files to merge" }
    }

    // Merge all PDFs
    for (const pdfBytes of pdfFiles) {
      try {
        const pdf = await PDFDocument.load(pdfBytes)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
      } catch (err) {
        console.error("Error processing PDF:", err)
        return { error: "One of the uploaded files is not a valid PDF. Please check your files and try again." }
      }
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save()

    // Create a unique filename
    const filename = `merged-${uuidv4()}.pdf`

    // Ensure the uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })

    // Write the file to the uploads directory
    const filePath = join(uploadsDir, filename)
    await writeFile(filePath, Buffer.from(mergedPdfBytes))

    // Return the URL to the merged PDF
    return { url: `/uploads/${filename}` }
  } catch (error) {
    console.error("Error merging PDFs:", error)
    return { error: "An error occurred while merging PDFs. Please try again." }
  }
}
