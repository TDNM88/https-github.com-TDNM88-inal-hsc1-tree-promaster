import { type NextRequest, NextResponse } from "next/server"
import { authenticate, generateToken } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const user = await authenticate(username, password)
    if (!user) {
      return NextResponse.json({ message: "Thông tin đăng nhập không đúng" }, { status: 401 })
    }

    const token = generateToken(user)

    const response = NextResponse.json({
      message: "Đăng nhập thành công",
      user: { id: user.id, username: user.username, role: user.role },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Lỗi hệ thống" }, { status: 500 })
  }
}
