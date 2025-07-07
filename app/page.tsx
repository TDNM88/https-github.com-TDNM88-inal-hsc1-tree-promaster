"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token="))
      ?.split("=")[1]

    if (token) {
      // Fetch user info to determine redirect
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((user) => {
          if (user.role === "admin") {
            router.push("/admin")
          } else {
            router.push("/trade")
          }
        })
        .catch(() => {
          router.push("/login")
        })
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Binary Trading Dashboard</h1>
        <p>Redirecting...</p>
      </div>
    </div>
  )
}
