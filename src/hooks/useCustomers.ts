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
}
