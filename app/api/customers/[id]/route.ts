import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // Mock customer data
    const customer = {
      id: params.id,
      name: "John Doe",
      email: "john@example.com",
      balance: 1500.0,
      status: "active",
      joinDate: "2024-01-15",
    }

    return NextResponse.json(customer)
  } catch (error) {
    console.error("Customer API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const updates = await request.json()

    // Mock update
    const updatedCustomer = {
      id: params.id,
      ...updates,
    }

    return NextResponse.json(updatedCustomer)
  } catch (error) {
    console.error("Customer update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
