import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { getDeposits } from "@/lib/database"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const deposits = await getDeposits()
    return NextResponse.json(deposits)
  } catch (error) {
    console.error("Deposits API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
