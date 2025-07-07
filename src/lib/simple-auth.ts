import { cookies } from "next/headers"

export function clearAuthSession() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}

export function setAuthSession(token: string) {
  const cookieStore = cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function getAuthSession() {
  const cookieStore = cookies()
  return cookieStore.get("auth-token")?.value
}
