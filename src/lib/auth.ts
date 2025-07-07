import bcrypt from "bcryptjs"
import type { NextRequest } from "next/server"
import { connectToDatabase } from "./db"
import UserModel from "@/models/User"

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return `user_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function parseToken(token: string): { userId: string; timestamp: number } | null {
  const parts = token.split("_")
  if (parts.length >= 3 && parts[0] === "user") {
    return {
      userId: parts[1],
      timestamp: Number.parseInt(parts[2]),
    }
  }
  return null
}

export async function verifyToken(token: string) {
  try {
    const parsed = parseToken(token)
    if (!parsed) return null

    await connectToDatabase()
    const user = await UserModel.findById(parsed.userId).select("-password")
    return user
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export async function getUserFromRequest(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return null

    return await verifyToken(token)
  } catch (error) {
    console.error("Get user from request failed:", error)
    return null
  }
}
