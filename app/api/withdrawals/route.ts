import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { getWithdrawals } from "@/lib/database"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const withdrawals = await getWithdrawals()
    return NextResponse.json(withdrawals)
  } catch (error) {
    console.error("Withdrawals API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
