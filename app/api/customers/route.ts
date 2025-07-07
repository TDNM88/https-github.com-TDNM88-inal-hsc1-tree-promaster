import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Mock data for customers
const mockCustomers = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0901234567",
    balance: 5000000,
    status: "active",
    joinDate: "2024-01-15T10:30:00Z",
    totalDeposits: 10000000,
    totalWithdrawals: 5000000,
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "tranthibinh@email.com",
    phone: "0912345678",
    balance: 3500000,
    status: "active",
    joinDate: "2024-02-20T14:15:00Z",
    totalDeposits: 7000000,
    totalWithdrawals: 3500000,
  },
  {
    id: "3",
    name: "Lê Văn Cường",
    email: "levancuong@email.com",
    phone: "0923456789",
    balance: 0,
    status: "suspended",
    joinDate: "2024-03-10T09:45:00Z",
    totalDeposits: 2000000,
    totalWithdrawals: 2000000,
  },
]

export async function GET() {
  try {
    return NextResponse.json({ customers: mockCustomers })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json()
    // In real app, update database
    return NextResponse.json({ message: "Customer status updated" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}
