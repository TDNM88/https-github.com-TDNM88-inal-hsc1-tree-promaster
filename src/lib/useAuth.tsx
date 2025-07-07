"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
  email?: string
  fullName?: string
  role: "admin" | "user"
  balance?: {
    available: number
    frozen: number
  }
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  isLoading: boolean
  isAuthenticated: () => boolean
  isAdmin: () => boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        setUser(data.user)
        return { success: true }
      } else {
        return {
          success: false,
          message: data.message || "Đăng nhập thất bại",
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        message: "Lỗi kết nối. Vui lòng thử lại sau.",
      }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      setUser(null)
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error)
      setUser(null)
      window.location.href = "/login"
    }
  }

  const isAuthenticated = () => {
    return !!user
  }

  const isAdmin = () => {
    return user?.role === "admin"
  }

  const refreshUser = async () => {
    await checkAuth()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
