import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  id: string
  username: string
  role: "admin" | "user"
}

// Mock users database
const users: User[] = [
  { id: "1", username: "admin", role: "admin" },
  { id: "2", username: "user", role: "user" },
]

export async function authenticate(username: string, password: string): Promise<User | null> {
  // Simple authentication - in production, hash passwords
  const validCredentials = [
    { username: "admin", password: "admin123" },
    { username: "user", password: "user123" },
  ]

  const credential = validCredentials.find((c) => c.username === username && c.password === password)
  if (!credential) return null

  const user = users.find((u) => u.username === username)
  return user || null
}

export function generateToken(user: User): string {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "24h" })
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User
    return decoded
  } catch {
    return null
  }
}

export function getUserFromRequest(request: NextRequest): User | null {
  const token = request.cookies.get("auth-token")?.value
  if (!token) return null
  return verifyToken(token)
}

export async function getUser(): Promise<User | null> {
  // This would typically check server-side session/cookie
  return null
}
