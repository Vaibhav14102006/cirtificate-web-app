import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const department = searchParams.get("department") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let students = mockUsers.filter((user) => user.role === "student")

    if (search) {
      students = students.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase()) ||
          (student as any).studentId?.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (department) {
      students = students.filter((student) => student.department === department)
    }

    const total = students.length
    const startIndex = (page - 1) * limit
    const paginatedStudents = students.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      students: paginatedStudents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Students API error:", error)
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
    const role = parts[3]

    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { email, name, studentId, department, phone } = body

    const newStudent = {
      id: mockUsers.length + 1,
      email,
      password: "password123",
      role: "student" as const,
      name,
      department,
      studentId,
      phone,
      avatar: "/student-avatar.png",
    }

    mockUsers.push(newStudent)

    return NextResponse.json({ message: "Student created successfully" })
  } catch (error) {
    console.error("Create student error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
