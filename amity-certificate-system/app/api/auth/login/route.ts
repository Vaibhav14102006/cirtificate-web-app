import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/mock-data"

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    console.log("[v0] Login attempt:", { email, role })

    // Find user in mock data
    const user = mockUsers.find((u) => u.email === email && u.password === password && u.role === role)

    if (!user) {
      console.log("[v0] Invalid credentials for:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = `demo_token_${user.id}_${user.role}_${Date.now()}`

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({
      token,
      user: userWithoutPassword,
    })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/", // Ensure cookie is available for all paths
    })

    console.log("[v0] Login successful for:", user.email, "token:", token)
    return response
  } catch (error) {
    console.log("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
