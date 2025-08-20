import { type NextRequest, NextResponse } from "next/server"
import { mockRequests, mockUsers } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value
    if (!token || !token.startsWith("demo_token_")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const parts = token.split("_")
    const userId = Number.parseInt(parts[2])
    const role = parts[3]

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || ""
    const category = searchParams.get("category") || ""

    let requests = [...mockRequests]

    if (role === "student") {
      requests = requests.filter((request) => request.studentId === userId)
    }

    if (status && status !== "all") {
      requests = requests.filter((request) => request.status === status)
    }

    if (category && category !== "all") {
      requests = requests.filter((request) => request.type === category)
    }

    return NextResponse.json({ requests })
  } catch (error) {
    console.error("Requests API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("token")?.value
    if (!token || !token.startsWith("demo_token_")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const parts = token.split("_")
    const userId = Number.parseInt(parts[2])
    const user = mockUsers.find((u) => u.id === userId)

    const body = await request.json()

    const newRequest = {
      id: mockRequests.length + 1,
      studentId: userId,
      studentName: user?.name || "Unknown",
      type: body.category,
      courseName: body.courseName || body.title,
      requestDate: new Date().toISOString().split("T")[0],
      status: "pending" as const,
      department: user?.department || "Unknown",
      comments: "",
    }

    mockRequests.push(newRequest)

    return NextResponse.json({ message: "Certificate request submitted successfully" })
  } catch (error) {
    console.error("Create request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
