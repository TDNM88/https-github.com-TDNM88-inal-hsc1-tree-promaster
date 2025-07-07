import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Mock data for deposits
const mockDeposits = [
  {
    id: "1",
    userId: "1",
    userName: "Nguyễn Văn An",
    amount: 1000000,
    method: "Bank Transfer",
    status: "pending",
    createdAt: "2024-01-20T10:30:00Z",
    bankInfo: "Vietcombank - 1234567890",
  },
  {
    id: "2",
    userId: "2",
    userName: "Trần Thị Bình",
    amount: 500000,
    method: "E-wallet",
    status: "approved",
    createdAt: "2024-01-19T15:45:00Z",
    bankInfo: "MoMo - 0912345678",
    approvedAt: "2024-01-19T16:00:00Z",
  },
  {
    id: "3",
    userId: "1",
    userName: "Nguyễn Văn An",
    amount: 2000000,
    method: "Bank Transfer",
    status: "rejected",
    createdAt: "2024-01-18T11:20:00Z",
    bankInfo: "BIDV - 9876543210",
    rejectedAt: "2024-01-18T12:00:00Z",
    rejectionReason: "Thông tin không khớp",
  },
]

export async function GET() {
  try {
    return NextResponse.json({ deposits: mockDeposits })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch deposits" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, rejectionReason } = await request.json()
    // In real app, update database
    return NextResponse.json({ message: "Deposit status updated" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update deposit" }, { status: 500 })
  }
}
