import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export const runtime = "nodejs"

// Mock data
const customers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0901234567",
    balance: 1500000,
    status: "active",
    joinDate: "2024-01-15",
    totalDeposits: 5000000,
    totalWithdrawals: 3500000,
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0907654321",
    balance: 2300000,
    status: "active",
    joinDate: "2024-02-20",
    totalDeposits: 8000000,
    totalWithdrawals: 5700000,
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0912345678",
    balance: 500000,
    status: "suspended",
    joinDate: "2024-03-10",
    totalDeposits: 2000000,
    totalWithdrawals: 1500000,
  },
]

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ customers })
}

export async function PUT(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id, status } = await request.json()

  const customerIndex = customers.findIndex((c) => c.id === id)
  if (customerIndex !== -1) {
    customers[customerIndex].status = status
    return NextResponse.json({ message: "Cập nhật thành công", customer: customers[customerIndex] })
  }

  return NextResponse.json({ message: "Không tìm thấy khách hàng" }, { status: 404 })
}
