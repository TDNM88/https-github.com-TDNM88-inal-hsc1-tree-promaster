import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Auth me error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
