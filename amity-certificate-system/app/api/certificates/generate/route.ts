import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

interface CertificateData {
  studentName: string
  studentEmail: string
  certificateTitle: string
  certificateType: string
  dateIssued: string
  uniqueId: string
  qrCode: string
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

    if (!["admin", "faculty"].includes(decoded.role)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { requestId, studentId, certificateTitle, certificateType, templateId } = await request.json()

    // Generate unique certificate ID
    const uniqueId = `AMITY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Generate QR code data for verification
    const qrData = {
      certificateId: uniqueId,
      studentId,
      verificationUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/verify/${uniqueId}`,
    }

    // Mock certificate generation - in real implementation, this would generate PDF
    const certificateData: CertificateData = {
      studentName: "Student Name", // Would fetch from database
      studentEmail: "student@amity.edu",
      certificateTitle,
      certificateType,
      dateIssued: new Date().toISOString().split("T")[0],
      uniqueId,
      qrCode: JSON.stringify(qrData),
    }

    // In real implementation, save to database and generate PDF
    console.log("Generated certificate:", certificateData)

    return NextResponse.json({
      success: true,
      certificate: certificateData,
      downloadUrl: `/api/certificates/download/${uniqueId}`,
    })
  } catch (error) {
    console.error("Certificate generation error:", error)
    return NextResponse.json({ error: "Failed to generate certificate" }, { status: 500 })
  }
}
