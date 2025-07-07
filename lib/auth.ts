import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  id: string
  username: string
  role: "admin" | "user"
}

export function generateToken(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "24h" })
}

export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, JWT_SECRET) as User
  } catch {
    return null
  }
}

export function getUserFromRequest(request: NextRequest): User | null {
  const token = request.cookies.get("auth-token")?.value
  if (!token) return null
  return verifyToken(token)
}

export async function authenticate(username: string, password: string): Promise<User | null> {
  // Mock authentication - replace with real database lookup
  const users = [
    { id: "1", username: "admin", password: "admin123", role: "admin" as const },
    { id: "2", username: "user", password: "user123", role: "user" as const },
  ]

  const user = users.find((u) => u.username === username && u.password === password)
  if (!user) return null

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  }
}
