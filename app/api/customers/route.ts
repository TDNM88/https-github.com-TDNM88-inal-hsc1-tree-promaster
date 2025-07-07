import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // Mock data for now
    const customers = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        balance: 1500.0,
        status: "active",
        joinDate: "2024-01-15",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        balance: 2300.5,
        status: "active",
        joinDate: "2024-02-20",
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        balance: 750.25,
        status: "suspended",
        joinDate: "2024-03-10",
      },
    ]

    return NextResponse.json(customers)
  } catch (error) {
    console.error("Customers API error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
