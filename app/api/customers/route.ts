import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { getCustomers } from "@/lib/database"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const customers = await getCustomers()
    return NextResponse.json(customers)
  } catch (error) {
    console.error("Customers API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
