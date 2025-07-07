"use client"

import { useState, useEffect, createContext, useContext } from "react"

type User = {
  id: string
  username: string
  role: string
  balance: {
    available: number
    frozen: number
  }
  bank?: {
    name: string
    accountNumber: string
    accountHolder: string
  }
  verification?: {
    verified: boolean
    cccdFront: string
    cccdBack: string
  }
  status?: {
    active: boolean
    betLocked: boolean
    withdrawLocked: boolean
  }
  createdAt?: string
  lastLogin?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  isAuthenticated: () => boolean
  isAdmin: () => boolean
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false, message: "Not implemented" }),
  logout: async () => {},
  isAuthenticated: () => false,
  isAdmin: () => false,
  refreshUser: async () => {}
})

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    } catch (error) {
      console.error("Logout error:", error)
      setUser(null)
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

  useEffect(() => {
    checkAuth()
  }, [])

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
