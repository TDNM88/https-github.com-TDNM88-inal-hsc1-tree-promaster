"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/auth/protected-route"
import Header from "@/components/Header"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
