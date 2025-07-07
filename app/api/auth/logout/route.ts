import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST() {
  const response = NextResponse.json({ message: "Đăng xuất thành công" })

  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  })

  return response
}
