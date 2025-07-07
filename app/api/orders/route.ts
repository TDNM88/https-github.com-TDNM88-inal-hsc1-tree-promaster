import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { getOrders } from "@/lib/database"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const orders = await getOrders()
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Orders API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
