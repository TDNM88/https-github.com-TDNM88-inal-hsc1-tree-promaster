import { NextResponse } from "next/server"
import { getDeposits } from "@/lib/database"

export async function GET() {
  try {
    const deposits = await getDeposits()
    return NextResponse.json(deposits)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch deposits" }, { status: 500 })
  }
}
