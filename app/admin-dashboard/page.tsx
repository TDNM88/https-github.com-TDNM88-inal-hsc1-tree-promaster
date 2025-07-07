"use client"

import { useState } from "react"
import { useAuth } from "@/lib/useAuth"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Search,
  Download,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Fetch data using SWR
  const { data: statsData, isLoading: statsLoading } = useSWR("/api/admin/stats", fetcher)
  const { data: usersData, isLoading: usersLoading, mutate: mutateUsers } = useSWR("/api/admin/users", fetcher)
  const { data: depositsData, isLoading: depositsLoading } = useSWR("/api/deposits", fetcher)
  const { data: withdrawalsData, isLoading: withdrawalsLoading } = useSWR("/api/withdrawals", fetcher)
  const { data: ordersData, isLoading: ordersLoading } = useSWR("/api/admin/orders", fetcher)

  const stats = statsData?.stats || {
    totalUsers: 0,
    newUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    activeOrders: 0,
  }

  const users = usersData?.users || []
  const deposits = depositsData?.deposits || []
  const withdrawals = withdrawalsData?.withdrawals || []
  const orders = ordersData?.orders || []

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: vi,
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Hoạt động", variant: "default" as const },
      inactive: { label: "Không hoạt động", variant: "secondary" as const },
      pending: { label: "Chờ duyệt", variant: "outline" as const },
      approved: { label: "Đã duyệt", variant: "default" as const },
      rejected: { label: "Từ chối", variant: "destructive" as const },
      processing: { label: "Đang xử lý", variant: "outline" as const },
      completed: { label: "Hoàn thành", variant: "default" as const },
      verified: { label: "Đã xác minh", variant: "default" as const },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      variant: "secondary" as const,
    }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleUserAction = async (action: string, userId: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Thành công",
        description: `Đã ${action} người dùng thành công`,
      })
      mutateUsers()
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDepositAction = async (action: string, depositId: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Thành công",
        description: `Đã ${action} yêu cầu nạp tiền`,
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Xin chào, {user?.username}</span>
                <Button variant="outline" onClick={logout}>
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="users">Khách hàng</TabsTrigger>
              <TabsTrigger value="deposits">Nạp tiền</TabsTrigger>
              <TabsTrigger value="withdrawals">Rút tiền</TabsTrigger>
              <TabsTrigger value="orders">Lệnh giao dịch</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.totalUsers.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">+{stats.newUsers} người dùng mới</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng nạp tiền</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statsLoading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        formatCurrency(stats.totalDeposits)
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">+8% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng rút tiền</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statsLoading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        formatCurrency(stats.totalWithdrawals)
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">+5% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lệnh đang hoạt động</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.activeOrders}
                    </div>
                    <p className="text-xs text-muted-foreground">-3% so với hôm qua</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lệnh giao dịch gần đây</CardTitle>
                    <CardDescription>Các lệnh giao dịch mới nhất</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {ordersLoading ? (
                      <div className="flex justify-center">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order: any, index: number) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                order.result.startsWith("+") ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {order.user} - {order.type} {formatCurrency(order.amount)}
                              </p>
                              <p className="text-xs text-muted-foreground">Phiên: {order.session}</p>
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                order.result.startsWith("+") ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {order.result}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Thống kê hôm nay</CardTitle>
                    <CardDescription>Dữ liệu trong ngày</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Đăng ký mới</span>
                        <span className="font-medium">{stats.newUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Nạp tiền</span>
                        <span className="font-medium">{deposits.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Rút tiền</span>
                        <span className="font-medium">{withdrawals.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Lệnh giao dịch</span>
                        <span className="font-medium">{orders.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quản lý khách hàng</CardTitle>
                  <CardDescription>Danh sách và quản lý tài khoản khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Lọc trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Không hoạt động</SelectItem>
                        <SelectItem value="verified">Đã xác minh</SelectItem>
                        <SelectItem value="pending">Chờ xác minh</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Xuất Excel
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    {usersLoading ? (
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Người dùng</TableHead>
                            <TableHead>Liên hệ</TableHead>
                            <TableHead>Số dư</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Xác minh</TableHead>
                            <TableHead>Đăng ký</TableHead>
                            <TableHead>Hoạt động cuối</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user: any) => (
                            <TableRow key={user._id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{user.fullName || "Chưa có"}</div>
                                  <div className="text-sm text-muted-foreground">@{user.username}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="text-sm">{user.email || "Chưa có"}</div>
                                  <div className="text-sm text-muted-foreground">{user.phone || "Chưa có"}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{formatCurrency(user.balance?.available || 0)}</div>
                                  {user.balance?.frozen > 0 && (
                                    <div className="text-sm text-orange-600">
                                      Đóng băng: {formatCurrency(user.balance.frozen)}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  {getStatusBadge(user.status?.active ? "active" : "inactive")}
                                  {user.status?.suspended && (
                                    <Badge variant="destructive" className="text-xs">
                                      Tạm khóa
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(user.verification?.verified ? "verified" : "pending")}
                              </TableCell>
                              <TableCell>
                                <span className="text-sm">{formatDate(user.createdAt)}</span>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm">
                                  {user.lastLoginAt ? formatDate(user.lastLoginAt) : "Chưa đăng nhập"}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setIsEditModalOpen(true)
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUserAction("xem chi tiết", user._id)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Deposits Tab */}
            <TabsContent value="deposits" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Yêu cầu nạp tiền</CardTitle>
                  <CardDescription>Quản lý các yêu cầu nạp tiền từ khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    {depositsLoading ? (
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Khách hàng</TableHead>
                            <TableHead>Số tiền</TableHead>
                            <TableHead>Ngân hàng</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Thời gian</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {deposits.map((deposit: any) => (
                            <TableRow key={deposit.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{deposit.userName}</div>
                                  <div className="text-sm text-muted-foreground">@{deposit.userId}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="font-medium text-green-600">{formatCurrency(deposit.amount)}</span>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="text-sm font-medium">{deposit.method}</div>
                                  <div className="text-sm text-muted-foreground">{deposit.bankInfo}</div>
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="text-sm">{formatDate(deposit.createdAt)}</div>
                                  {deposit.approvedAt && (
                                    <div className="text-xs text-muted-foreground">
                                      Duyệt: {formatDate(deposit.approvedAt)}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                {deposit.status === "pending" && (
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDepositAction("duyệt", deposit.id)}
                                      disabled={isLoading}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Duyệt
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDepositAction("từ chối", deposit.id)}
                                      disabled={isLoading}
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Từ chối
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Withdrawals Tab */}
            <TabsContent value="withdrawals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Yêu cầu rút tiền</CardTitle>
                  <CardDescription>Quản lý các yêu cầu rút tiền từ khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    {withdrawalsLoading ? (
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Khách hàng</TableHead>
                            <TableHead>Số tiền</TableHead>
                            <TableHead>Ngân hàng</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Thời gian</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {withdrawals.map((withdrawal: any) => (
                            <TableRow key={withdrawal.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{withdrawal.userName}</div>
                                  <div className="text-sm text-muted-foreground">@{withdrawal.userId}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="font-medium text-red-600">-{formatCurrency(withdrawal.amount)}</span>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="text-sm font-medium">{withdrawal.method}</div>
                                  <div className="text-sm text-muted-foreground">{withdrawal.bankInfo}</div>
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                              <TableCell>
                                <span className="text-sm">{formatDate(withdrawal.createdAt)}</span>
                              </TableCell>
                              <TableCell className="text-right">
                                {withdrawal.status === "pending" && (
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDepositAction("hoàn thành", withdrawal.id)}
                                      disabled={isLoading}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Hoàn thành
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDepositAction("từ chối", withdrawal.id)}
                                      disabled={isLoading}
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Từ chối
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lệnh giao dịch</CardTitle>
                  <CardDescription>Theo dõi các lệnh giao dịch của khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    {ordersLoading ? (
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Người dùng</TableHead>
                            <TableHead>Phiên</TableHead>
                            <TableHead>Loại</TableHead>
                            <TableHead>Số tiền</TableHead>
                            <TableHead>Kết quả</TableHead>
                            <TableHead>Thời gian</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order: any) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.user}</TableCell>
                              <TableCell>{order.session}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={order.type === "Lên" ? "default" : "destructive"}
                                  className={
                                    order.type === "Lên"
                                      ? "bg-green-500 hover:bg-green-500"
                                      : "bg-red-500 hover:bg-red-500"
                                  }
                                >
                                  {order.type}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatCurrency(order.amount)}</TableCell>
                              <TableCell
                                className={`font-semibold ${
                                  order.result.startsWith("+") ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {order.result}
                              </TableCell>
                              <TableCell>{formatDate(order.time)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Edit User Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin khách hàng</DialogTitle>
              <DialogDescription>Cập nhật thông tin và trạng thái của khách hàng</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Họ tên
                  </Label>
                  <Input id="fullName" defaultValue={selectedUser.fullName} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" defaultValue={selectedUser.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Số điện thoại
                  </Label>
                  <Input id="phone" defaultValue={selectedUser.phone} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Trạng thái
                  </Label>
                  <Select defaultValue={selectedUser.status?.active ? "active" : "inactive"}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Không hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" onClick={() => setIsEditModalOpen(false)}>
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}
