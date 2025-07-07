import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // Mock order data
    const orders = [
      {
        id: "1",
        customerId: "1",
        customerName: "John Doe",
        asset: "EUR/USD",
        type: "call",
        amount: 100.0,
        payout: 85.0,
        status: "won",
        openTime: "2024-01-25T10:00:00Z",
        closeTime: "2024-01-25T10:05:00Z",
      },
      {
        id: "2",
        customerId: "2",
        customerName: "Jane Smith",
        asset: "BTC/USD",
        type: "put",
        amount: 250.0,
        payout: 0.0,
        status: "lost",
        openTime: "2024-01-25T11:30:00Z",
        closeTime: "2024-01-25T11:35:00Z",
      },
      {
        id: "3",
        customerId: "1",
        customerName: "John Doe",
        asset: "GBP/USD",
        type: "call",
        amount: 50.0,
        payout: 42.5,
        status: "won",
        openTime: "2024-01-25T14:15:00Z",
        closeTime: "2024-01-25T14:20:00Z",
      },
    ]

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Orders API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
