import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Mock data for customers - no authentication required
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
  {
    id: "4",
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0934567890",
    balance: 7500000,
    status: "active",
    joinDate: "2024-01-25T16:20:00Z",
    totalDeposits: 15000000,
    totalWithdrawals: 7500000,
  },
  {
    id: "5",
    name: "Hoàng Văn Em",
    email: "hoangvanem@email.com",
    phone: "0945678901",
    balance: 2200000,
    status: "active",
    joinDate: "2024-03-05T11:45:00Z",
    totalDeposits: 5000000,
    totalWithdrawals: 2800000,
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
    console.log(`Updating customer ${id} status to ${status}`)
    return NextResponse.json({ message: "Customer status updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}
