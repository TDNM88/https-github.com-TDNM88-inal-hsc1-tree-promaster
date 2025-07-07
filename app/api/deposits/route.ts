import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // Mock deposit data
    const deposits = [
      {
        id: "1",
        customerId: "1",
        customerName: "John Doe",
        amount: 500.0,
        status: "completed",
        method: "bank_transfer",
        date: "2024-01-20T10:30:00Z",
      },
      {
        id: "2",
        customerId: "2",
        customerName: "Jane Smith",
        amount: 1000.0,
        status: "pending",
        method: "credit_card",
        date: "2024-01-21T14:15:00Z",
      },
      {
        id: "3",
        customerId: "1",
        customerName: "John Doe",
        amount: 250.0,
        status: "completed",
        method: "crypto",
        date: "2024-01-22T09:45:00Z",
      },
    ]

    return NextResponse.json(deposits)
  } catch (error) {
    console.error("Deposits API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
