import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/database"
import { ObjectId } from "mongodb"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { db } = await connectToDatabase()

    const result = await db
      .collection("withdrawals")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: { status: body.status, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Withdrawal not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update withdrawal" }, { status: 500 })
  }
}
