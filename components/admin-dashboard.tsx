"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
} from "lucide-react"

// Mock data with the provided customer information
const mockUsers = [
  {
    id: "1",
    username: "amen123",
    fullName: "Amen 123",
    email: "amen123@example.com",
    phone: "0901234567",
    balance: { available: 1250000, frozen: 50000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "verified" },
    createdAt: "2024-01-15T08:30:00Z",
    lastLogin: "2024-01-20T14:22:00Z",
  },
  {
    id: "2",
    username: "tramanh2025",
    fullName: "Tra Manh 2025",
    email: "tramanh2025@example.com",
    phone: "0902345678",
    balance: { available: 850000, frozen: 25000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "pending" },
    createdAt: "2024-01-16T09:15:00Z",
    lastLogin: "2024-01-20T16:45:00Z",
  },
  {
    id: "3",
    username: "phattai68",
    fullName: "Phat Tai 68",
    email: "phattai68@example.com",
    phone: "0903456789",
    balance: { available: 2100000, frozen: 100000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "verified" },
    createdAt: "2024-01-17T10:00:00Z",
    lastLogin: "2024-01-20T18:30:00Z",
  },
  {
    id: "4",
    username: "okbaby",
    fullName: "Ok Baby",
    email: "okbaby@example.com",
    phone: "0904567890",
    balance: { available: 450000, frozen: 15000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "pending" },
    createdAt: "2024-01-18T11:30:00Z",
    lastLogin: "2024-01-20T12:15:00Z",
  },
  {
    id: "5",
    username: "mami123",
    fullName: "Mami 123",
    email: "mami123@example.com",
    phone: "0905678901",
    balance: { available: 750000, frozen: 35000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "verified" },
    createdAt: "2024-01-19T13:45:00Z",
    lastLogin: "2024-01-20T20:00:00Z",
  },
  {
    id: "6",
    username: "choichochan",
    fullName: "Choi Cho Chan",
    email: "choichochan@example.com",
    phone: "0906789012",
    balance: { available: 320000, frozen: 8000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "pending" },
    createdAt: "2024-01-20T07:20:00Z",
    lastLogin: "2024-01-20T19:30:00Z",
  },
  {
    id: "7",
    username: "choichochan123",
    fullName: "Choi Cho Chan 123",
    email: "choichochan123@example.com",
    phone: "0907890123",
    balance: { available: 1800000, frozen: 75000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "verified" },
    createdAt: "2024-01-21T08:00:00Z",
    lastLogin: "2024-01-20T21:45:00Z",
  },
  {
    id: "8",
    username: "admin",
    fullName: "Admin User",
    email: "admin@example.com",
    phone: "0908901234",
    balance: { available: 10000000, frozen: 0 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "verified" },
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-20T22:00:00Z",
  },
  {
    id: "9",
    username: "user1",
    fullName: "User One",
    email: "user1@example.com",
    phone: "0909012345",
    balance: { available: 650000, frozen: 20000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "pending" },
    createdAt: "2024-01-22T09:30:00Z",
    lastLogin: "2024-01-20T15:20:00Z",
  },
  {
    id: "10",
    username: "tdnm",
    fullName: "TDNM",
    email: "tdnm@example.com",
    phone: "0910123456",
    balance: { available: 1450000, frozen: 60000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "verified" },
    createdAt: "2024-01-23T10:15:00Z",
    lastLogin: "2024-01-20T17:10:00Z",
  },
  {
    id: "11",
    username: "abc1234",
    fullName: "ABC 1234",
    email: "abc1234@example.com",
    phone: "0911234567",
    balance: { available: 280000, frozen: 12000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "pending" },
    createdAt: "2024-01-24T11:00:00Z",
    lastLogin: "2024-01-20T13:45:00Z",
  },
  {
    id: "12",
    username: "vancong1052002",
    fullName: "Van Cong 1052002",
    email: "vancong1052002@example.com",
    phone: "0912345678",
    balance: { available: 3200000, frozen: 150000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "verified" },
    createdAt: "2024-01-25T12:30:00Z",
    lastLogin: "2024-01-20T11:20:00Z",
  },
  {
    id: "13",
    username: "bolaoi23",
    fullName: "Bolao I23",
    email: "bolaoi23@example.com",
    phone: "0913456789",
    balance: { available: 920000, frozen: 40000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "verified" },
    createdAt: "2024-01-26T14:00:00Z",
    lastLogin: "2024-01-20T09:30:00Z",
  },
  {
    id: "14",
    username: "Nguyenvana",
    fullName: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phone: "0914567890",
    balance: { available: 1650000, frozen: 80000 },
    status: { active: true, betLocked: false, withdrawLocked: false },
    verification: { status: "pending" },
    createdAt: "2024-01-27T15:45:00Z",
    lastLogin: "2024-01-20T08:15:00Z",
  },
]

const mockDeposits = [
  {
    id: "1",
    user: { fullName: "Amen 123", username: "amen123" },
    amount: 500000,
    bankInfo: { bankName: "Vietcombank", accountNumber: "1234567890", accountName: "Amen 123" },
    status: "pending",
    createdAt: "2024-01-20T10:30:00Z",
    approvedAt: null,
  },
  {
    id: "2",
    user: { fullName: "Tra Manh 2025", username: "tramanh2025" },
    amount: 300000,
    bankInfo: { bankName: "Techcombank", accountNumber: "2345678901", accountName: "Tra Manh 2025" },
    status: "approved",
    createdAt: "2024-01-20T09:15:00Z",
    approvedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "3",
    user: { fullName: "Phat Tai 68", username: "phattai68" },
    amount: 1000000,
    bankInfo: { bankName: "BIDV", accountNumber: "3456789012", accountName: "Phat Tai 68" },
    status: "pending",
    createdAt: "2024-01-19T14:20:00Z",
    approvedAt: null,
  },
  {
    id: "4",
    user: { fullName: "Mami 123", username: "mami123" },
    amount: 250000,
    bankInfo: { bankName: "ACB", accountNumber: "4567890123", accountName: "Mami 123" },
    status: "approved",
    createdAt: "2024-01-19T11:45:00Z",
    approvedAt: "2024-01-19T12:30:00Z",
  },
  {
    id: "5",
    user: { fullName: "Choi Cho Chan 123", username: "choichochan123" },
    amount: 750000,
    bankInfo: { bankName: "MB Bank", accountNumber: "6789012345", accountName: "Choi Cho Chan 123" },
    status: "rejected",
    createdAt: "2024-01-18T16:00:00Z",
    approvedAt: null,
  },
]

const mockWithdrawals = [
  {
    id: "1",
    user: { fullName: "Amen 123", username: "amen123" },
    amount: 200000,
    bank: { bankName: "Vietcombank", accountNumber: "1234567890", accountName: "Amen 123" },
    status: "completed",
    createdAt: "2024-01-20T08:30:00Z",
  },
  {
    id: "2",
    user: { fullName: "Phat Tai 68", username: "phattai68" },
    amount: 500000,
    bank: { bankName: "BIDV", accountNumber: "3456789012", accountName: "Phat Tai 68" },
    status: "processing",
    createdAt: "2024-01-20T07:15:00Z",
  },
  {
    id: "3",
    user: { fullName: "Van Cong 1052002", username: "vancong1052002" },
    amount: 800000,
    bank: { bankName: "HDBank", accountNumber: "0123456789", accountName: "Van Cong 1052002" },
    status: "completed",
    createdAt: "2024-01-19T13:20:00Z",
  },
  {
    id: "4",
    user: { fullName: "TDNM", username: "tdnm" },
    amount: 300000,
    bank: { bankName: "Sacombank", accountNumber: "8901234567", accountName: "TDNM" },
    status: "rejected",
    createdAt: "2024-01-19T10:45:00Z",
  },
  {
    id: "5",
    user: { fullName: "Bolao I23", username: "bolaoi23" },
    amount: 150000,
    bank: { bankName: "TPBank", accountNumber: "1234567890", accountName: "Bolao I23" },
    status: "processing",
    createdAt: "2024-01-18T15:30:00Z",
  },
]

const mockStats = {
  totalUsers: 14,
  totalDeposits: 2800000,
  totalWithdrawals: 1950000,
  activeOrders: 45,
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getStatusBadge(status: string) {
  const statusConfig = {
    active: { variant: "default" as const, label: "Hoạt động" },
    inactive: { variant: "secondary" as const, label: "Không hoạt động" },
    verified: { variant: "default" as const, label: "Đã xác minh" },
    pending: { variant: "outline" as const, label: "Chờ xác minh" },
    approved: { variant: "default" as const, label: "Đã duyệt" },
    rejected: { variant: "destructive" as const, label: "Từ chối" },
    completed: { variant: "default" as const, label: "Hoàn thành" },
    processing: { variant: "outline" as const, label: "Đang xử lý" },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || {
    variant: "secondary" as const,
    label: status,
  }

  return (
    <Badge variant={config.variant} className="text-xs">
      {config.label}
    </Badge>
  )
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock user for header
  const user = { username: "admin" }

  const logout = () => {
    // Handle logout logic
    console.log("Logging out...")
  }

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} for user ${userId}`)
  }

  const handleDepositAction = (action: string, depositId: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log(`${action} deposit ${depositId}`)
      setIsLoading(false)
    }, 1000)
  }

  return (
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
                  <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng nạp tiền</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockStats.totalDeposits)}</div>
                  <p className="text-xs text-muted-foreground">+8% so với tháng trước</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng rút tiền</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockStats.totalWithdrawals)}</div>
                  <p className="text-xs text-muted-foreground">+5% so với tháng trước</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lệnh đang hoạt động</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.activeOrders}</div>
                  <p className="text-xs text-muted-foreground">-3% so với hôm qua</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hoạt động gần đây</CardTitle>
                  <CardDescription>Các giao dịch và hoạt động mới nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Nạp tiền thành công</p>
                        <p className="text-xs text-muted-foreground">amen123 - 500,000 VND</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2 phút trước</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Đăng ký mới</p>
                        <p className="text-xs text-muted-foreground">tramanh2025 đã tạo tài khoản</p>
                      </div>
                      <span className="text-xs text-muted-foreground">5 phút trước</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Yêu cầu rút tiền</p>
                        <p className="text-xs text-muted-foreground">phattai68 - 500,000 VND</p>
                      </div>
                      <span className="text-xs text-muted-foreground">10 phút trước</span>
                    </div>
                  </div>
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
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nạp tiền</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rút tiền</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lệnh giao dịch</span>
                      <span className="font-medium">156</span>
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
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.fullName}</div>
                              <div className="text-sm text-muted-foreground">@{user.username}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{user.email}</div>
                              <div className="text-sm text-muted-foreground">{user.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{formatCurrency(user.balance.available)}</div>
                              {user.balance.frozen > 0 && (
                                <div className="text-sm text-orange-600">
                                  Đóng băng: {formatCurrency(user.balance.frozen)}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getStatusBadge(user.status.active ? "active" : "inactive")}
                              {user.status.betLocked && (
                                <Badge variant="destructive" className="text-xs">
                                  Khóa cược
                                </Badge>
                              )}
                              {user.status.withdrawLocked && (
                                <Badge variant="destructive" className="text-xs">
                                  Khóa rút
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.verification.status)}</TableCell>
                          <TableCell>
                            <span className="text-sm">{formatDate(user.createdAt)}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{formatDate(user.lastLogin)}</span>
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
                                onClick={() => handleUserAction("xem chi tiết", user.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                      {mockDeposits.map((deposit) => (
                        <TableRow key={deposit.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{deposit.user.fullName}</div>
                              <div className="text-sm text-muted-foreground">@{deposit.user.username}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-green-600">{formatCurrency(deposit.amount)}</span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm font-medium">{deposit.bankInfo.bankName}</div>
                              <div className="text-sm text-muted-foreground">{deposit.bankInfo.accountNumber}</div>
                              <div className="text-sm text-muted-foreground">{deposit.bankInfo.accountName}</div>
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
                      {mockWithdrawals.map((withdrawal) => (
                        <TableRow key={withdrawal.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{withdrawal.user.fullName}</div>
                              <div className="text-sm text-muted-foreground">@{withdrawal.user.username}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-red-600">-{formatCurrency(withdrawal.amount)}</span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm font-medium">{withdrawal.bank.bankName}</div>
                              <div className="text-sm text-muted-foreground">{withdrawal.bank.accountNumber}</div>
                              <div className="text-sm text-muted-foreground">{withdrawal.bank.accountName}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                          <TableCell>
                            <span className="text-sm">{formatDate(withdrawal.createdAt)}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            {withdrawal.status === "processing" && (
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
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Chức năng đang được phát triển</p>
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
                <Select defaultValue={selectedUser.status.active ? "active" : "inactive"}>
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
  )
}
