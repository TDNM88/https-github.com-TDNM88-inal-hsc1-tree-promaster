import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export const runtime = "nodejs"

// Mock data
const deposits = [
  {
    id: "1",
    userId: "1",
    userName: "Nguyễn Văn A",
    amount: 1000000,
    method: "bank_transfer",
    status: "pending",
    createdAt: "2024-01-20T10:30:00Z",
    bankInfo: "Vietcombank - 1234567890",
  },
  {
    id: "2",
    userId: "2",
    userName: "Trần Thị B",
    amount: 2000000,
    method: "momo",
    status: "approved",
    createdAt: "2024-01-19T14:15:00Z",
    approvedAt: "2024-01-19T15:00:00Z",
  },
  {
    id: "3",
    userId: "3",
    userName: "Lê Văn C",
    amount: 500000,
    method: "bank_transfer",
    status: "rejected",
    createdAt: "2024-01-18T09:45:00Z",
    rejectedAt: "2024-01-18T16:30:00Z",
    rejectionReason: "Thông tin không chính xác",
  },
]

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ deposits })
}

export async function PUT(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id, status, rejectionReason } = await request.json()

  const depositIndex = deposits.findIndex((d) => d.id === id)
  if (depositIndex !== -1) {
    deposits[depositIndex].status = status
    if (status === "approved") {
      deposits[depositIndex].approvedAt = new Date().toISOString()
    } else if (status === "rejected") {
      deposits[depositIndex].rejectedAt = new Date().toISOString()
      deposits[depositIndex].rejectionReason = rejectionReason
    }
    return NextResponse.json({ message: "Cập nhật thành công", deposit: deposits[depositIndex] })
  }

  return NextResponse.json({ message: "Không tìm thấy yêu cầu nạp tiền" }, { status: 404 })
}
