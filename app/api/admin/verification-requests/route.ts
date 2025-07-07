import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("binary_trading")
    const usersCollection = db.collection("users")

    // Find users with verification requests (either pending or with images uploaded)
    const verificationRequests = await usersCollection
      .find({
        role: { $ne: "admin" },
        $or: [
          { "verification.verified": false },
          { "verification.cccdFront": { $ne: "" } },
          { "verification.cccdBack": { $ne: "" } },
        ],
      })
      .project({
        username: 1,
        fullName: 1,
        "verification.verified": 1,
        "verification.cccdFront": 1,
        "verification.cccdBack": 1,
        updatedAt: 1,
      })
      .sort({ updatedAt: -1 })
      .toArray()

    const transformedRequests = verificationRequests.map((user) => ({
      _id: user._id.toString(),
      username: user.username,
      fullName: user.fullName || "",
      verified: user.verification?.verified || false,
      verification: {
        cccdFront: user.verification?.cccdFront || "",
        cccdBack: user.verification?.cccdBack || "",
        verified: user.verification?.verified || false,
      },
      updatedAt: user.updatedAt || new Date(),
    }))

    return NextResponse.json({
      success: true,
      requests: transformedRequests,
    })
  } catch (error) {
    console.error("Error fetching verification requests:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải danh sách yêu cầu xác minh",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, status } = await request.json()

    if (!userId || typeof status !== "boolean") {
      return NextResponse.json({ success: false, message: "Thiếu thông tin cần thiết" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("binary_trading")
    const usersCollection = db.collection("users")

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          "verification.verified": status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Không tìm thấy người dùng" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `Đã ${status ? "chấp nhận" : "từ chối"} yêu cầu xác minh`,
    })
  } catch (error) {
    console.error("Error updating verification status:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể cập nhật trạng thái xác minh",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
