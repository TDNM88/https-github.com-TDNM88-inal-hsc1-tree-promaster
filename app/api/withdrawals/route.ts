import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // Mock withdrawal data
    const withdrawals = [
      {
        id: "1",
        customerId: "1",
        customerName: "John Doe",
        amount: 200.0,
        status: "pending",
        method: "bank_transfer",
        date: "2024-01-23T11:20:00Z",
      },
      {
        id: "2",
        customerId: "2",
        customerName: "Jane Smith",
        amount: 500.0,
        status: "completed",
        method: "crypto",
        date: "2024-01-24T16:30:00Z",
      },
    ]

    return NextResponse.json(withdrawals)
  } catch (error) {
    console.error("Withdrawals API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
