import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Mock data for withdrawals
const mockWithdrawals = [
  {
    id: "1",
    userId: "1",
    userName: "Nguyễn Văn An",
    amount: 800000,
    method: "Bank Transfer",
    status: "pending",
    createdAt: "2024-01-21T14:30:00Z",
    bankInfo: "Vietcombank - 1234567890 - Nguyễn Văn An",
  },
  {
    id: "2",
    userId: "2",
    userName: "Trần Thị Bình",
    amount: 300000,
    method: "E-wallet",
    status: "approved",
    createdAt: "2024-01-20T09:15:00Z",
    bankInfo: "MoMo - 0912345678",
    approvedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "3",
    userId: "3",
    userName: "Lê Văn Cường",
    amount: 1500000,
    method: "Bank Transfer",
    status: "rejected",
    createdAt: "2024-01-19T16:45:00Z",
    bankInfo: "ACB - 5555666677",
    rejectedAt: "2024-01-19T17:30:00Z",
    rejectionReason: "Số dư không đủ",
  },
]

export async function GET() {
  try {
    return NextResponse.json({ withdrawals: mockWithdrawals })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch withdrawals" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, rejectionReason } = await request.json()
    // In real app, update database
    return NextResponse.json({ message: "Withdrawal status updated" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update withdrawal" }, { status: 500 })
  }
}
