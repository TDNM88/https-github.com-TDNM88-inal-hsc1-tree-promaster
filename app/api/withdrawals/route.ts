import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export const runtime = "nodejs"

// Mock data
const withdrawals = [
  {
    id: "1",
    userId: "1",
    userName: "Nguyễn Văn A",
    amount: 800000,
    method: "bank_transfer",
    status: "pending",
    createdAt: "2024-01-21T11:20:00Z",
    bankInfo: "Vietcombank - 1234567890 - Nguyễn Văn A",
  },
  {
    id: "2",
    userId: "2",
    userName: "Trần Thị B",
    amount: 1500000,
    method: "momo",
    status: "approved",
    createdAt: "2024-01-20T16:45:00Z",
    approvedAt: "2024-01-21T09:30:00Z",
  },
  {
    id: "3",
    userId: "3",
    userName: "Lê Văn C",
    amount: 300000,
    method: "bank_transfer",
    status: "rejected",
    createdAt: "2024-01-19T13:15:00Z",
    rejectedAt: "2024-01-19T18:00:00Z",
    rejectionReason: "Số dư không đủ",
  },
]

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ withdrawals })
}

export async function PUT(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id, status, rejectionReason } = await request.json()

  const withdrawalIndex = withdrawals.findIndex((w) => w.id === id)
  if (withdrawalIndex !== -1) {
    withdrawals[withdrawalIndex].status = status
    if (status === "approved") {
      withdrawals[withdrawalIndex].approvedAt = new Date().toISOString()
    } else if (status === "rejected") {
      withdrawals[withdrawalIndex].rejectedAt = new Date().toISOString()
      withdrawals[withdrawalIndex].rejectionReason = rejectionReason
    }
    return NextResponse.json({ message: "Cập nhật thành công", withdrawal: withdrawals[withdrawalIndex] })
  }

  return NextResponse.json({ message: "Không tìm thấy yêu cầu rút tiền" }, { status: 404 })
}
