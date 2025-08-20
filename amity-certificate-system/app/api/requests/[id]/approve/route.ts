import { type NextRequest, NextResponse } from "next/server"
import { mockRequests, mockCertificates } from "@/lib/mock-data"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value
    if (!token || !token.startsWith("demo_token_")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const parts = token.split("_")
    const role = parts[3]

    if (role !== "admin" && role !== "faculty") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { action, comments } = body // action: 'approve' or 'reject'

    const requestId = Number.parseInt(params.id)
    const requestIndex = mockRequests.findIndex((req) => req.id === requestId)

    if (requestIndex === -1) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    const status = action === "approve" ? "approved" : "rejected"
    mockRequests[requestIndex].status = status
    mockRequests[requestIndex].comments = comments

    // If approved, generate certificate
    if (action === "approve") {
      const request = mockRequests[requestIndex]
      const certificateId = `AMITY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      const newCertificate = {
        id: certificateId,
        studentId: request.studentId,
        studentName: request.studentName,
        type: request.type,
        courseName: request.courseName,
        issueDate: new Date().toISOString().split("T")[0],
        status: "issued" as const,
        verificationCode: certificateId,
        department: request.department,
      }

      mockCertificates.push(newCertificate)
      mockRequests[requestIndex].status = "issued"
    }

    return NextResponse.json({ message: `Request ${action}d successfully` })
  } catch (error) {
    console.error("Approve request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
