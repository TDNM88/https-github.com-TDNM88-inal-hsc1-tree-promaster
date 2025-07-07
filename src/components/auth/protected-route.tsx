"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/useAuth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user"
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole = "user", redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated()) {
      router.push(redirectTo)
      return
    }

    if (requiredRole === "admin" && !isAdmin()) {
      router.push(redirectTo)
    }
  }, [isLoading, isAuthenticated, isAdmin, requiredRole, router, redirectTo])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if ((requiredRole === "user" && isAuthenticated()) || (requiredRole === "admin" && isAdmin())) {
    return <>{children}</>
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
