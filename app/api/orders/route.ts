import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export const runtime = "nodejs"

// Mock data
const orders = [
  {
    id: "1",
    userId: "1",
    userName: "Nguyễn Văn A",
    asset: "EUR/USD",
    type: "call",
    amount: 100000,
    openPrice: 1.085,
    closePrice: 1.0875,
    result: "win",
    profit: 85000,
    openTime: "2024-01-21T10:00:00Z",
    closeTime: "2024-01-21T10:05:00Z",
    duration: "5m",
  },
  {
    id: "2",
    userId: "2",
    userName: "Trần Thị B",
    asset: "GBP/USD",
    type: "put",
    amount: 200000,
    openPrice: 1.265,
    closePrice: 1.263,
    result: "win",
    profit: 170000,
    openTime: "2024-01-21T11:15:00Z",
    closeTime: "2024-01-21T11:30:00Z",
    duration: "15m",
  },
  {
    id: "3",
    userId: "1",
    userName: "Nguyễn Văn A",
    asset: "USD/JPY",
    type: "call",
    amount: 150000,
    openPrice: 148.5,
    closePrice: 148.2,
    result: "loss",
    profit: -150000,
    openTime: "2024-01-21T14:30:00Z",
    closeTime: "2024-01-21T14:35:00Z",
    duration: "5m",
  },
]

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ orders })
}
