// import { type NextRequest, NextResponse } from "next/server"
// import { writeFile, mkdir } from "fs/promises"
// import { join } from "path"
// import { existsSync } from "fs"

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData()
//     const file = formData.get("file") as File

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 })
//     }

//     // Validate file type
//     const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
//     if (!validTypes.includes(file.type)) {
//       return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." }, { status: 400 })
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       return NextResponse.json({ error: "File too large. Max size is 5MB." }, { status: 400 })
//     }

//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     // Create unique filename
//     const timestamp = Date.now()
//     const extension = file.name.split(".").pop()
//     const filename = `tire-${timestamp}.${extension}`

//     // Ensure directory exists
//     const uploadDir = join(process.cwd(), "public", "images", "tires")
//     if (!existsSync(uploadDir)) {
//       await mkdir(uploadDir, { recursive: true })
//     }

//     // Save file
//     const filepath = join(uploadDir, filename)
//     await writeFile(filepath, buffer)

//     // Return the URL path
//     const imageUrl = `/images/tires/${filename}`

//     return NextResponse.json({ url: imageUrl, success: true })
//   } catch (error) {
//     console.error("[v0] Error uploading file:", error)
//     return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Validate file size max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary (stream)
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_UPLOAD_FOLDER,
          resource_type: "image",
        },
        (err, result) => {
          if (err) reject(err)
          else resolve(result)
        }
      )

      stream.end(buffer)
    })

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      success: true,
    })
  } catch (error) {
    console.error("[v0] File upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

