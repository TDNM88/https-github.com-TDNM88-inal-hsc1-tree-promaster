import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Mock data for withdrawals - no authentication required
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
  {
    id: "4",
    userId: "4",
    userName: "Phạm Thị Dung",
    amount: 2000000,
    method: "Bank Transfer",
    status: "pending",
    createdAt: "2024-01-22T08:45:00Z",
    bankInfo: "Techcombank - 9999888877 - Phạm Thị Dung",
  },
  {
    id: "5",
    userId: "5",
    userName: "Hoàng Văn Em",
    amount: 600000,
    method: "E-wallet",
    status: "approved",
    createdAt: "2024-01-18T12:20:00Z",
    bankInfo: "ZaloPay - 0945678901",
    approvedAt: "2024-01-18T13:00:00Z",
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
    console.log(`Updating withdrawal ${id} status to ${status}`, rejectionReason ? `Reason: ${rejectionReason}` : "")
    return NextResponse.json({ message: "Withdrawal status updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update withdrawal" }, { status: 500 })
  }
}
