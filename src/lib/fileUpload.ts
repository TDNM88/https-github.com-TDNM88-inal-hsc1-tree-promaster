import { put } from "@vercel/blob"

export async function uploadFile(file: File): Promise<string> {
  try {
    const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`

    const { url } = await put(uniqueFilename, file, {
      access: "public",
      contentType: file.type || "application/octet-stream",
      cacheControlMaxAge: 31536000,
      token: process.env.tdnm9988_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
    })

    return url
  } catch (error) {
    console.error("Error uploading file to Vercel Blob:", error)
    throw new Error("Không thể upload file")
  }
}
