"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  username: string
  role: "admin" | "user"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Mock admin user - bypass authentication
    setUser({
      id: "1",
      username: "admin",
      role: "admin",
    })
    setToken("mock-admin-token")
    setLoading(false)
  }, [])

  const logout = () => {
    setUser(null)
    setToken(null)
    // In a real app, this would redirect to login
    console.log("Logout called")
  }

  return {
    user,
    token,
    loading,
    logout,
  }
}
