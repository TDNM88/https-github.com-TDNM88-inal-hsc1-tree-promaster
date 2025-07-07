import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Simple in-memory user store (replace with database in production)
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
]

export async function login(username: string, password: string) {
  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    const cookieStore = cookies()
    cookieStore.set("auth-token", JSON.stringify({ username: user.username, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, user: { username: user.username, role: user.role } }
  }

  return { success: false, error: "Tên đăng nhập hoặc mật khẩu không đúng" }
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
  redirect("/login")
}

export async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return null
  }

  try {
    return JSON.parse(token.value)
  } catch {
    return null
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const user = await getUser()
  if (!user) {
    return { success: false, error: "Không tìm thấy người dùng" }
  }

  const userRecord = users.find((u) => u.username === user.username)
  if (!userRecord || userRecord.password !== currentPassword) {
    return { success: false, error: "Mật khẩu hiện tại không đúng" }
  }

  // Update password (in production, hash the password)
  userRecord.password = newPassword

  return { success: true }
}
