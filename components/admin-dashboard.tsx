"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Users, TrendingUp, TrendingDown, Activity, Settings, BarChart3 } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  balance: number
  status: string
  joinDate: string
  totalDeposits: number
  totalWithdrawals: number
}

interface Deposit {
  id: string
  userId: string
  userName: string
  amount: number
  method: string
  status: string
  createdAt: string
  bankInfo?: string
  approvedAt?: string
  rejectedAt?: string
  rejectionReason?: string
}

interface Withdrawal {
  id: string
  userId: string
  userName: string
  amount: number
  method: string
  status: string
  createdAt: string
  bankInfo?: string
  approvedAt?: string
  rejectedAt?: string
  rejectionReason?: string
}

interface Order {
  id: string
  userId: string
  userName: string
  asset: string
  type: string
  amount: number
  openPrice: number
  closePrice: number
  result: string
  profit: number
  openTime: string
  closeTime: string
  duration: string
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

      const [customersData, depositsData, withdrawalsData, ordersData] = await Promise.all([
        customersRes.json(),
        depositsRes.json(),
        withdrawalsRes.json(),
        ordersRes.json(),
      ])

      setCustomers(customersData.customers || [])
      setDeposits(depositsData.deposits || [])
      setWithdrawals(withdrawalsData.withdrawals || [])
      setOrders(ordersData.orders || [])
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateCustomerStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        setCustomers(customers.map((c) => (c.id === id ? { ...c, status } : c)))
        toast({
          title: "Thành công",
          description: "Cập nhật trạng thái khách hàng thành công",
        })
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái",
        variant: "destructive",
      })
    }
  }

  const updateDepositStatus = async (id: string, status: string, rejectionReason?: string) => {
    try {
      const response = await fetch("/api/deposits", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, rejectionReason }),
      })

      if (response.ok) {
        setDeposits(deposits.map((d) => (d.id === id ? { ...d, status } : d)))
        toast({
          title: "Thành công",
          description: "Cập nhật yêu cầu nạp tiền thành công",
        })
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật yêu cầu",
        variant: "destructive",
      })
    }
  }

  const updateWithdrawalStatus = async (id: string, status: string, rejectionReason?: string) => {
    try {
      const response = await fetch("/api/withdrawals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, rejectionReason }),
      })

      if (response.ok) {
        setWithdrawals(withdrawals.map((w) => (w.id === id ? { ...w, status } : w)))
        toast({
          title: "Thành công",
          description: "Cập nhật yêu cầu rút tiền thành công",
        })
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật yêu cầu",
        variant: "destructive",
      })
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN")
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      suspended: "destructive",
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
      win: "default",
      loss: "destructive",
    }

    const labels: Record<string, string> = {
      active: "Hoạt động",
      suspended: "Tạm khóa",
      pending: "Chờ duyệt",
      approved: "Đã duyệt",
      rejected: "Từ chối",
      win: "Thắng",
      loss: "Thua",
    }

    return <Badge variant={variants[status] || "outline"}>{labels[status] || status}</Badge>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Đang tải dữ liệu...</h2>
          <p className="text-gray-600 mt-2">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    )
  }

  // Calculate statistics
  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalDeposits = deposits.reduce((sum, d) => sum + d.amount, 0)
  const totalWithdrawals = withdrawals.reduce((sum, w) => sum + w.amount, 0)
  const pendingDeposits = deposits.filter((d) => d.status === "pending").length
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending").length
  const totalTrades = orders.length
  const winningTrades = orders.filter((o) => o.result === "win").length
  const totalProfit = orders.reduce((sum, o) => sum + o.profit, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Binary Trading Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">Quản trị hệ thống</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <p className="text-xs text-muted-foreground">{activeCustomers} đang hoạt động</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng nạp tiền</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalDeposits)}</div>
                <p className="text-xs text-muted-foreground">{pendingDeposits} yêu cầu chờ duyệt</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng rút tiền</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalWithdrawals)}</div>
                <p className="text-xs text-muted-foreground">{pendingWithdrawals} yêu cầu chờ duyệt</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Giao dịch</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTrades}</div>
                <p className="text-xs text-muted-foreground">
                  {winningTrades}/{totalTrades} thắng (
                  {totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0}%)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Profit/Loss Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tổng quan lợi nhuận</CardTitle>
              <CardDescription>Thống kê tổng lợi nhuận/lỗ từ tất cả giao dịch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <span className={totalProfit >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatCurrency(totalProfit)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {totalProfit >= 0 ? "Lợi nhuận tích lũy" : "Lỗ tích lũy"} từ {totalTrades} giao dịch
              </p>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="customers" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="customers">Khách hàng ({totalCustomers})</TabsTrigger>
              <TabsTrigger value="deposits">Nạp tiền ({pendingDeposits})</TabsTrigger>
              <TabsTrigger value="withdrawals">Rút tiền ({pendingWithdrawals})</TabsTrigger>
              <TabsTrigger value="orders">Giao dịch ({totalTrades})</TabsTrigger>
            </TabsList>

            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Quản lý khách hàng</CardTitle>
                  <CardDescription>Danh sách tất cả khách hàng và trạng thái tài khoản</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Số điện thoại</TableHead>
                        <TableHead>Số dư</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ngày tham gia</TableHead>
                        <TableHead>Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{formatCurrency(customer.balance)}</TableCell>
                          <TableCell>{getStatusBadge(customer.status)}</TableCell>
                          <TableCell>{formatDate(customer.joinDate)}</TableCell>
                          <TableCell>
                            <Select
                              value={customer.status}
                              onValueChange={(value) => updateCustomerStatus(customer.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Hoạt động</SelectItem>
                                <SelectItem value="suspended">Tạm khóa</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
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
                  <CardTitle>Yêu cầu nạp tiền</CardTitle>
                  <CardDescription>Quản lý và duyệt các yêu cầu nạp tiền từ khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Phương thức</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Thông tin ngân hàng</TableHead>
                        <TableHead>Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deposits.map((deposit) => (
                        <TableRow key={deposit.id}>
                          <TableCell className="font-medium">{deposit.userName}</TableCell>
                          <TableCell>{formatCurrency(deposit.amount)}</TableCell>
                          <TableCell>{deposit.method}</TableCell>
                          <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                          <TableCell>{formatDate(deposit.createdAt)}</TableCell>
                          <TableCell>{deposit.bankInfo}</TableCell>
                          <TableCell>
                            {deposit.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateDepositStatus(deposit.id, "approved")}>
                                  Duyệt
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateDepositStatus(deposit.id, "rejected", "Thông tin không hợp lệ")}
                                >
                                  Từ chối
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
                  <CardTitle>Yêu cầu rút tiền</CardTitle>
                  <CardDescription>Quản lý và duyệt các yêu cầu rút tiền từ khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Phương thức</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Thông tin ngân hàng</TableHead>
                        <TableHead>Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawals.map((withdrawal) => (
                        <TableRow key={withdrawal.id}>
                          <TableCell className="font-medium">{withdrawal.userName}</TableCell>
                          <TableCell>{formatCurrency(withdrawal.amount)}</TableCell>
                          <TableCell>{withdrawal.method}</TableCell>
                          <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                          <TableCell>{formatDate(withdrawal.createdAt)}</TableCell>
                          <TableCell>{withdrawal.bankInfo}</TableCell>
                          <TableCell>
                            {withdrawal.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateWithdrawalStatus(withdrawal.id, "approved")}>
                                  Duyệt
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateWithdrawalStatus(withdrawal.id, "rejected", "Số dư không đủ")}
                                >
                                  Từ chối
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
                  <CardTitle>Lịch sử giao dịch</CardTitle>
                  <CardDescription>Theo dõi tất cả các giao dịch binary options của khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Tài sản</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Giá mở</TableHead>
                        <TableHead>Giá đóng</TableHead>
                        <TableHead>Kết quả</TableHead>
                        <TableHead>Lợi nhuận</TableHead>
                        <TableHead>Thời gian</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.userName}</TableCell>
                          <TableCell>{order.asset}</TableCell>
                          <TableCell>
                            <Badge variant={order.type === "call" ? "default" : "secondary"}>
                              {order.type.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatCurrency(order.amount)}</TableCell>
                          <TableCell>{order.openPrice}</TableCell>
                          <TableCell>{order.closePrice}</TableCell>
                          <TableCell>{getStatusBadge(order.result)}</TableCell>
                          <TableCell className={order.profit > 0 ? "text-green-600" : "text-red-600"}>
                            {formatCurrency(order.profit)}
                          </TableCell>
                          <TableCell>{formatDate(order.openTime)}</TableCell>
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
