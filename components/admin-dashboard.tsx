"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { UserMenu } from "./user-menu"

interface Customer {
  id: string
  name: string
  email: string
  balance: number
  status: string
  joinDate: string
}

interface Deposit {
  id: string
  customerId: string
  customerName: string
  amount: number
  status: string
  method: string
  date: string
}

interface Withdrawal {
  id: string
  customerId: string
  customerName: string
  amount: number
  status: string
  method: string
  date: string
}

interface Order {
  id: string
  customerId: string
  customerName: string
  asset: string
  type: string
  amount: number
  payout: number
  status: string
  openTime: string
  closeTime: string
}

export function AdminDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [customersRes, depositsRes, withdrawalsRes, ordersRes] = await Promise.all([
        fetch("/api/customers"),
        fetch("/api/deposits"),
        fetch("/api/withdrawals"),
        fetch("/api/orders"),
      ])

      if (customersRes.ok) setCustomers(await customersRes.json())
      if (depositsRes.ok) setDeposits(await depositsRes.json())
      if (withdrawalsRes.ok) setWithdrawals(await withdrawalsRes.json())
      if (ordersRes.ok) setOrders(await ordersRes.json())
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateDepositStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/deposits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setDeposits((prev) => prev.map((deposit) => (deposit.id === id ? { ...deposit, status } : deposit)))
        toast({
          title: "Success",
          description: "Deposit status updated",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update deposit status",
        variant: "destructive",
      })
    }
  }

  const updateWithdrawalStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/withdrawals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setWithdrawals((prev) =>
          prev.map((withdrawal) => (withdrawal.id === id ? { ...withdrawal, status } : withdrawal)),
        )
        toast({
          title: "Success",
          description: "Withdrawal status updated",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update withdrawal status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{deposits.filter((d) => d.status === "pending").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{withdrawals.filter((w) => w.status === "pending").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="customers" className="space-y-4">
            <TabsList>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
            </TabsList>

            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>Manage customer accounts and view their information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>${customer.balance.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={customer.status === "active" ? "default" : "destructive"}>
                              {customer.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deposits">
              <Card>
                <CardHeader>
                  <CardTitle>Deposit Requests</CardTitle>
                  <CardDescription>Review and approve customer deposit requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deposits.map((deposit) => (
                        <TableRow key={deposit.id}>
                          <TableCell className="font-medium">{deposit.customerName}</TableCell>
                          <TableCell>${deposit.amount.toFixed(2)}</TableCell>
                          <TableCell>{deposit.method}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                deposit.status === "completed"
                                  ? "default"
                                  : deposit.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {deposit.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(deposit.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {deposit.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateDepositStatus(deposit.id, "completed")}>
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateDepositStatus(deposit.id, "rejected")}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="withdrawals">
              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal Requests</CardTitle>
                  <CardDescription>Review and process customer withdrawal requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawals.map((withdrawal) => (
                        <TableRow key={withdrawal.id}>
                          <TableCell className="font-medium">{withdrawal.customerName}</TableCell>
                          <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                          <TableCell>{withdrawal.method}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                withdrawal.status === "completed"
                                  ? "default"
                                  : withdrawal.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {withdrawal.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(withdrawal.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {withdrawal.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateWithdrawalStatus(withdrawal.id, "completed")}>
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateWithdrawalStatus(withdrawal.id, "rejected")}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Orders</CardTitle>
                  <CardDescription>View all customer trading orders and their outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payout</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Open Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.customerName}</TableCell>
                          <TableCell>{order.asset}</TableCell>
                          <TableCell>
                            <Badge variant={order.type === "call" ? "default" : "secondary"}>
                              {order.type.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>${order.amount.toFixed(2)}</TableCell>
                          <TableCell>${order.payout.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === "won" ? "default" : "destructive"}>
                              {order.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(order.openTime).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
