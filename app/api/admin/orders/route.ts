import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

// Mock orders data
const mockOrders = [
  {
    id: "1",
    user: "user001",
    session: "2401201030",
    type: "Lên",
    amount: 100000,
    result: "+85,000đ",
    time: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    user: "user002",
    session: "2401201031",
    type: "Xuống",
    amount: 200000,
    result: "+170,000đ",
    time: "2024-01-20T10:31:00Z",
  },
  {
    id: "3",
    user: "user003",
    session: "2401201032",
    type: "Lên",
    amount: 150000,
    result: "-150,000đ",
    time: "2024-01-20T10:32:00Z",
  },
  {
    id: "4",
    user: "user004",
    session: "2401201033",
    type: "Xuống",
    amount: 300000,
    result: "+255,000đ",
    time: "2024-01-20T10:33:00Z",
  },
  {
    id: "5",
    user: "user005",
    session: "2401201034",
    type: "Lên",
    amount: 250000,
    result: "-250,000đ",
    time: "2024-01-20T10:34:00Z",
  },
  {
    id: "6",
    user: "user001",
    session: "2401201035",
    type: "Xuống",
    amount: 180000,
    result: "+153,000đ",
    time: "2024-01-20T10:35:00Z",
  },
  {
    id: "7",
    user: "user002",
    session: "2401201036",
    type: "Lên",
    amount: 120000,
    result: "+102,000đ",
    time: "2024-01-20T10:36:00Z",
  },
  {
    id: "8",
    user: "user003",
    session: "2401201037",
    type: "Xuống",
    amount: 400000,
    result: "-400,000đ",
    time: "2024-01-20T10:37:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customer = searchParams.get("customer") || ""
    const status = searchParams.get("status") || "all"
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Filter orders based on parameters
    let filteredOrders = mockOrders

    if (customer) {
      filteredOrders = filteredOrders.filter((order) => order.user.toLowerCase().includes(customer.toLowerCase()))
    }

    if (status !== "all") {
      filteredOrders = filteredOrders.filter((order) => order.type.toLowerCase() === status.toLowerCase())
    }

    // Apply date filter if provided
    if (startDate && endDate) {
      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = new Date(order.time)
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate + "T23:59:59.999Z")
      })
    }

    // Apply limit
    const limitedOrders = filteredOrders.slice(0, limit)

    return NextResponse.json({
      success: true,
      orders: limitedOrders,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải danh sách lệnh",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
