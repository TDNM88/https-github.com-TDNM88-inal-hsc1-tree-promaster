import { type NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const { status } = await request.json()

    // Mock update
    const updatedDeposit = {
      id: params.id,
      status,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedDeposit)
  } catch (error) {
    console.error("Deposit update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
