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
}
