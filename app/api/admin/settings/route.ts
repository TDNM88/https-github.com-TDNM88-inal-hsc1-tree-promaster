import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

// Mock settings data
const mockSettings = {
  bankName: "Vietcombank",
  accountNumber: "1234567890",
  accountHolder: "CONG TY TNHH ABC",
  minDeposit: 100000,
  minWithdrawal: 50000,
  maxWithdrawal: 10000000,
  cskh: "https://t.me/support_admin",
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      ...mockSettings,
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải cài đặt",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json()

    // In a real application, you would save these settings to the database
    console.log("Updating settings:", settings)

    return NextResponse.json({
      success: true,
      message: "Cài đặt đã được cập nhật thành công",
    })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể cập nhật cài đặt",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
