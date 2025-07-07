import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST() {
  const response = NextResponse.json({ message: "Đăng xuất thành công" })
  response.cookies.delete("auth-token")
  return response
}
