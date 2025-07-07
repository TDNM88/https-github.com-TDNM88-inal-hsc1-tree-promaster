import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const client = await clientPromise
    const db = client.db("binary_trading")
    const usersCollection = db.collection("users")

    // Build search query
    const searchQuery: any = {}

    if (search) {
      searchQuery.$or = [
        { username: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ]
    }

    // Add status filter
    if (status !== "all") {
      if (status === "active") {
        searchQuery["status.active"] = true
      } else if (status === "inactive") {
        searchQuery["status.active"] = false
      } else if (status === "verified") {
        searchQuery["verification.verified"] = true
      } else if (status === "unverified") {
        searchQuery["verification.verified"] = false
      }
    }

    // Exclude admin users from the list
    searchQuery.role = { $ne: "admin" }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build sort object
    const sortObject: any = {}
    sortObject[sortBy] = sortOrder === "desc" ? -1 : 1

    // Get total count for pagination
    const totalUsers = await usersCollection.countDocuments(searchQuery)
    const totalPages = Math.ceil(totalUsers / limit)

    // Fetch users with pagination and sorting
    const users = await usersCollection
      .find(searchQuery)
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
      .project({
        password: 0, // Exclude password from response
        __v: 0,
      })
      .toArray()

    // Transform data for frontend
    const transformedUsers = users.map((user) => ({
      _id: user._id.toString(),
      username: user.username,
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      balance: {
        available: user.balance?.available || 0,
        frozen: user.balance?.frozen || 0,
      },
      status: {
        active: user.status?.active ?? true,
        suspended: user.status?.suspended ?? false,
        emailVerified: user.status?.emailVerified ?? false,
      },
      verification: {
        verified: user.verification?.verified ?? false,
        cccdFront: user.verification?.cccdFront || "",
        cccdBack: user.verification?.cccdBack || "",
      },
      bank: {
        name: user.bank?.name || "",
        accountNumber: user.bank?.accountNumber || "",
        accountHolder: user.bank?.accountHolder || "",
      },
      createdAt: user.createdAt || new Date(),
      lastLoginAt: user.lastLoginAt || null,
      lastLoginIp: user.lastLoginIp || "",
      role: user.role || "user",
    }))

    return NextResponse.json({
      success: true,
      users: transformedUsers,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải danh sách người dùng",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, field, value } = await request.json()

    if (!userId || !field) {
      return NextResponse.json({ success: false, message: "Thiếu thông tin cần thiết" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("binary_trading")
    const usersCollection = db.collection("users")

    // Build update object based on field
    const updateObject: any = {}

    if (field.includes(".")) {
      // Handle nested fields like "balance.available" or "status.active"
      updateObject[field] = value
    } else {
      updateObject[field] = value
    }

    // Special handling for password updates
    if (field === "password" && value) {
      // In a real application, you should hash the password
      // For now, we'll store it as plain text (NOT RECOMMENDED for production)
      updateObject.password = value
      updateObject.updatedAt = new Date()
    } else {
      updateObject.updatedAt = new Date()
    }

    const result = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: updateObject })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Không tìm thấy người dùng" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật thông tin thành công",
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể cập nhật thông tin người dùng",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, message: "Thiếu ID người dùng" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("binary_trading")
    const usersCollection = db.collection("users")

    // Check if user exists and is not an admin
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return NextResponse.json({ success: false, message: "Không tìm thấy người dùng" }, { status: 404 })
    }

    if (user.role === "admin") {
      return NextResponse.json({ success: false, message: "Không thể xóa tài khoản quản trị" }, { status: 403 })
    }

    const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Không thể xóa người dùng" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Đã xóa người dùng thành công",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể xóa người dùng",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password, fullName, email, phone, balance } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, message: "Tên đăng nhập và mật khẩu là bắt buộc" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("binary_trading")
    const usersCollection = db.collection("users")

    // Check if username already exists
    const existingUser = await usersCollection.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Tên đăng nhập đã tồn tại" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      username,
      password, // In production, hash this password
      fullName: fullName || "",
      email: email || "",
      phone: phone || "",
      balance: {
        available: balance || 0,
        frozen: 0,
      },
      status: {
        active: true,
        suspended: false,
        emailVerified: false,
      },
      verification: {
        verified: false,
        cccdFront: "",
        cccdBack: "",
      },
      bank: {
        name: "",
        accountNumber: "",
        accountHolder: "",
      },
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: null,
      lastLoginIp: "",
    }

    const result = await usersCollection.insertOne(newUser)

    return NextResponse.json({
      success: true,
      message: "Tạo tài khoản thành công",
      userId: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tạo tài khoản mới",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
