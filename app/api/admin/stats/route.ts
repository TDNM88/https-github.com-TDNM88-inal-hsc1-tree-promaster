import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const client = await clientPromise
    const db = client.db("binary_trading")

    // Build date filter
    const dateFilter: any = {}
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate + "T23:59:59.999Z"),
      }
    }

    // Get user statistics
    const totalUsers = await db.collection("users").countDocuments({ role: { $ne: "admin" } })
    const newUsers = await db.collection("users").countDocuments({
      role: { $ne: "admin" },
      ...dateFilter,
    })

    // Mock deposit/withdrawal data for now
    const totalDeposits = 15420000
    const totalWithdrawals = 8750000

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        newUsers,
        totalDeposits,
        totalWithdrawals,
        activeOrders: 89, // Mock data
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải thống kê",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
