<<<<<<< HEAD
import { useQuery } from "@tanstack/react-query"

export interface Customer {
  _id: string
  username: string
  fullName?: string
  email: string
  phone?: string
  balance: {
    available: number
    frozen: number
  }
  status: "active" | "inactive" | "banned"
  role?: string
  createdAt: string
  updatedAt?: string
  lastLoginIp?: string
  verification?: {
    status: "pending" | "verified" | "rejected"
    cccdFront?: string
    cccdBack?: string
  }
  bank?: {
    name: string
    accountNumber: string
    accountHolder: string
  }
}

export function useCustomers() {
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/admin/customers")
        if (!res.ok) {
          throw new Error("Không thể tải danh sách khách hàng")
        }
        const data = await res.json()
        return data
      } catch (error) {
        console.error("Lỗi khi tải khách hàng:", error)
        throw error
      }
    },
    refetchInterval: 60000,
    retry: 2,
  })
=======
"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types"

export function useCustomers() {
  const [customers, setCustomers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/customers", {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch customers")
      }

      const data = await response.json()
      setCustomers(data.customers || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setCustomers([])
    } finally {
      setIsLoading(false)
    }
  }

  const updateCustomer = async (customerId: string, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/admin/customers/${customerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error("Failed to update customer")
      }

      const updatedCustomer = await response.json()
      setCustomers((prev) => prev.map((customer) => (customer.id === customerId ? updatedCustomer : customer)))

      return updatedCustomer
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update customer")
    }
  }

  const deleteCustomer = async (customerId: string) => {
    try {
      const response = await fetch(`/api/admin/customers/${customerId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete customer")
      }

      setCustomers((prev) => prev.filter((customer) => customer.id !== customerId))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete customer")
    }
  }

  return {
    customers,
    isLoading,
    error,
    fetchCustomers,
    updateCustomer,
    deleteCustomer,
  }
>>>>>>> 45475aa807b74683eec393af01d071e54b7296cd
}
