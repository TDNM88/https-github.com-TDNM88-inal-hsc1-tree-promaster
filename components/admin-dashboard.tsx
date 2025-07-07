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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Search,
  Plus,
  Edit,
  Eye,
  UserCheck,
  UserX,
  Lock,
  Unlock,
} from "lucide-react"

// Mock data with the provided customer information
const mockUsers = [
  {
    _id: "1",
    username: "amen123",
    fullName: "Amen 123",
    role: "user",
    balance: { available: 1250000, frozen: 50000 },
    loginInfo: "192.168.1.1",
    verification: { cccdFront: true, cccdBack: true, verified: true },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "Vietcombank", accountNumber: "1234567890", accountHolder: "Amen 123" },
    phone: "0901234567",
    email: "amen123@example.com",
    createdAt: "2024-01-15T08:30:00Z",
    lastLogin: "2024-01-20T14:22:00Z",
  },
  {
    _id: "2",
    username: "tramanh2025",
    fullName: "Tra Manh 2025",
    role: "user",
    balance: { available: 850000, frozen: 25000 },
    loginInfo: "192.168.1.2",
    verification: { cccdFront: true, cccdBack: false, verified: false },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "Techcombank", accountNumber: "2345678901", accountHolder: "Tra Manh 2025" },
    phone: "0902345678",
    email: "tramanh2025@example.com",
    createdAt: "2024-01-16T09:15:00Z",
    lastLogin: "2024-01-20T16:45:00Z",
  },
  {
    _id: "3",
    username: "phattai68",
    fullName: "Phat Tai 68",
    role: "user",
    balance: { available: 2100000, frozen: 100000 },
    loginInfo: "192.168.1.3",
    verification: { cccdFront: true, cccdBack: true, verified: true },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "BIDV", accountNumber: "3456789012", accountHolder: "Phat Tai 68" },
    phone: "0903456789",
    email: "phattai68@example.com",
    createdAt: "2024-01-17T10:00:00Z",
    lastLogin: "2024-01-20T18:30:00Z",
  },
  {
    _id: "4",
    username: "okbaby",
    fullName: "Ok Baby",
    role: "user",
    balance: { available: 450000, frozen: 15000 },
    loginInfo: "192.168.1.4",
    verification: { cccdFront: false, cccdBack: false, verified: false },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "", accountNumber: "", accountHolder: "" },
    phone: "0904567890",
    email: "okbaby@example.com",
    createdAt: "2024-01-18T11:30:00Z",
    lastLogin: "2024-01-20T12:15:00Z",
  },
  {
    _id: "5",
    username: "mami123",
    fullName: "Mami 123",
    role: "user",
    balance: { available: 750000, frozen: 35000 },
    loginInfo: "192.168.1.5",
    verification: { cccdFront: true, cccdBack: true, verified: true },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "ACB", accountNumber: "4567890123", accountHolder: "Mami 123" },
    phone: "0905678901",
    email: "mami123@example.com",
    createdAt: "2024-01-19T13:45:00Z",
    lastLogin: "2024-01-20T20:00:00Z",
  },
  {
    _id: "6",
    username: "choichochan",
    fullName: "Choi Cho Chan",
    role: "user",
    balance: { available: 320000, frozen: 8000 },
    loginInfo: "192.168.1.6",
    verification: { cccdFront: true, cccdBack: false, verified: false },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "VPBank", accountNumber: "5678901234", accountHolder: "Choi Cho Chan" },
    phone: "0906789012",
    email: "choichochan@example.com",
    createdAt: "2024-01-20T07:20:00Z",
    lastLogin: "2024-01-20T19:30:00Z",
  },
  {
    _id: "7",
    username: "choichochan123",
    fullName: "Choi Cho Chan 123",
    role: "user",
    balance: { available: 1800000, frozen: 75000 },
    loginInfo: "192.168.1.7",
    verification: { cccdFront: true, cccdBack: true, verified: true },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "MB Bank", accountNumber: "6789012345", accountHolder: "Choi Cho Chan 123" },
    phone: "0907890123",
    email: "choichochan123@example.com",
    createdAt: "2024-01-21T08:00:00Z",
    lastLogin: "2024-01-20T21:45:00Z",
  },
  {
    _id: "8",
    username: "admin",
    fullName: "Admin User",
    role: "admin",
    balance: { available: 10000000, frozen: 0 },
    loginInfo: "192.168.1.8",
    verification: { cccdFront: true, cccdBack: true, verified: true },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "Vietcombank", accountNumber: "7890123456", accountHolder: "Admin User" },
    phone: "0908901234",
    email: "admin@example.com",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-20T22:00:00Z",
  },
  {
    _id: "9",
    username: "user1",
    fullName: "User One",
    role: "user",
    balance: { available: 650000, frozen: 20000 },
    loginInfo: "192.168.1.9",
    verification: { cccdFront: false, cccdBack: false, verified: false },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "", accountNumber: "", accountHolder: "" },
    phone: "0909012345",
    email: "user1@example.com",
    createdAt: "2024-01-22T09:30:00Z",
    lastLogin: "2024-01-20T15:20:00Z",
  },
  {
    _id: "10",
    username: "tdnm",
    fullName: "TDNM",
    role: "user",
    balance: { available: 1450000, frozen: 60000 },
    loginInfo: "192.168.1.10",
    verification: { cccdFront: true, cccdBack: true, verified: true },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "Sacombank", accountNumber: "8901234567", accountHolder: "TDNM" },
    phone: "0910123456",
    email: "tdnm@example.com",
    createdAt: "2024-01-23T10:15:00Z",
    lastLogin: "2024-01-20T17:10:00Z",
  },
  {
    _id: "11",
    username: "abc1234",
    fullName: "ABC 1234",
    role: "user",
    balance: { available: 280000, frozen: 12000 },
    loginInfo: "192.168.1.11",
    verification: { cccdFront: true, cccdBack: false, verified: false },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "Eximbank", accountNumber: "9012345678", accountHolder: "ABC 1234" },
    phone: "0911234567",
    email: "abc1234@example.com",
    createdAt: "2024-01-24T11:00:00Z",
    lastLogin: "2024-01-20T13:45:00Z",
  },
  {
    _id: "12",
    username: "vancong1052002",
    fullName: "Van Cong 1052002",
    role: "user",
    balance: { available: 3200000, frozen: 150000 },
    loginInfo: "192.168.1.12",
    verification: { cccdFront: true, cccdBack: true, verified: true },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "HDBank", accountNumber: "0123456789", accountHolder: "Van Cong 1052002" },
    phone: "0912345678",
    email: "vancong1052002@example.com",
    createdAt: "2024-01-25T12:30:00Z",
    lastLogin: "2024-01-20T11:20:00Z",
  },
  {
    _id: "13",
    username: "bolaoi23",
    fullName: "Bolao I23",
    role: "user",
    balance: { available: 920000, frozen: 40000 },
    loginInfo: "192.168.1.13",
    verification: { cccdFront: true, cccdBack: true, verified: true },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "TPBank", accountNumber: "1234567890", accountHolder: "Bolao I23" },
    phone: "0913456789",
    email: "bolaoi23@example.com",
    createdAt: "2024-01-26T14:00:00Z",
    lastLogin: "2024-01-20T09:30:00Z",
  },
  {
    _id: "14",
    username: "Nguyenvana",
    fullName: "Nguyen Van A",
    role: "user",
    balance: { available: 1650000, frozen: 80000 },
    loginInfo: "192.168.1.14",
    verification: { cccdFront: true, cccdBack: false, verified: false },
    status: { active: true, betLocked: false, withdrawLocked: false },
    bank: { name: "VIB", accountNumber: "2345678901", accountHolder: "Nguyen Van A" },
    phone: "0914567890",
    email: "nguyenvana@example.com",
    createdAt: "2024-01-27T15:45:00Z",
    lastLogin: "2024-01-20T08:15:00Z",
  },
]

const mockDeposits = [
  { id: "1", userId: "amen123", amount: 500000, status: "completed", date: "2024-01-20", method: "Bank Transfer" },
  { id: "2", userId: "tramanh2025", amount: 300000, status: "pending", date: "2024-01-20", method: "E-wallet" },
  { id: "3", userId: "phattai68", amount: 1000000, status: "completed", date: "2024-01-19", method: "Bank Transfer" },
  { id: "4", userId: "mami123", amount: 250000, status: "completed", date: "2024-01-19", method: "Bank Transfer" },
  { id: "5", userId: "choichochan123", amount: 750000, status: "pending", date: "2024-01-18", method: "E-wallet" },
]

const mockWithdrawals = [
  { id: "1", userId: "amen123", amount: 200000, status: "completed", date: "2024-01-20", method: "Bank Transfer" },
  { id: "2", userId: "phattai68", amount: 500000, status: "pending", date: "2024-01-20", method: "Bank Transfer" },
  {
    id: "3",
    userId: "vancong1052002",
    amount: 800000,
    status: "completed",
    date: "2024-01-19",
    method: "Bank Transfer",
  },
  { id: "4", userId: "tdnm", amount: 300000, status: "rejected", date: "2024-01-19", method: "Bank Transfer" },
  { id: "5", userId: "bolaoi23", amount: 150000, status: "pending", date: "2024-01-18", method: "E-wallet" },
]

const mockOrders = [
  {
    id: "1",
    userId: "amen123",
    symbol: "EUR/USD",
    type: "CALL",
    amount: 100000,
    result: "win",
    profit: 85000,
    date: "2024-01-20",
  },
  {
    id: "2",
    userId: "tramanh2025",
    symbol: "GBP/USD",
    type: "PUT",
    amount: 50000,
    result: "loss",
    profit: -50000,
    date: "2024-01-20",
  },
  {
    id: "3",
    userId: "phattai68",
    symbol: "USD/JPY",
    type: "CALL",
    amount: 200000,
    result: "win",
    profit: 170000,
    date: "2024-01-19",
  },
  {
    id: "4",
    userId: "mami123",
    symbol: "AUD/USD",
    type: "PUT",
    amount: 75000,
    result: "win",
    profit: 63750,
    date: "2024-01-19",
  },
  {
    id: "5",
    userId: "choichochan123",
    symbol: "EUR/GBP",
    type: "CALL",
    amount: 150000,
    result: "loss",
    profit: -150000,
    date: "2024-01-18",
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("vi-VN")
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("vi-VN")
}

// Overview Page Component
function OverviewPage() {
  const totalUsers = mockUsers.length
  const totalBalance = mockUsers.reduce((sum, user) => sum + user.balance.available + user.balance.frozen, 0)
  const totalDeposits = mockDeposits.reduce((sum, deposit) => sum + deposit.amount, 0)
  const totalWithdrawals = mockWithdrawals.reduce((sum, withdrawal) => sum + withdrawal.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số dư</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            <p className="text-xs text-muted-foreground">+15% từ tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng nạp tiền</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDeposits)}</div>
            <p className="text-xs text-muted-foreground">+8% từ tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng rút tiền</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalWithdrawals)}</div>
            <p className="text-xs text-muted-foreground">+3% từ tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">amen123 đã nạp 500,000 VND</p>
                  <p className="text-sm text-muted-foreground">2 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">phattai68 đã rút 500,000 VND</p>
                  <p className="text-sm text-muted-foreground">4 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">tramanh2025 đã đăng ký tài khoản</p>
                  <p className="text-sm text-muted-foreground">6 giờ trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Thống kê nhanh</CardTitle>
            <CardDescription>Tổng quan hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Người dùng đã xác minh</span>
                <span className="text-sm font-medium">{mockUsers.filter((u) => u.verification.verified).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Người dùng hoạt động</span>
                <span className="text-sm font-medium">{mockUsers.filter((u) => u.status.active).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Giao dịch hôm nay</span>
                <span className="text-sm font-medium">{mockOrders.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Customers Page Component
function CustomersPage() {
  const [customers, setCustomers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.status.active) ||
      (statusFilter === "inactive" && !customer.status.active) ||
      (statusFilter === "verified" && customer.verification.verified) ||
      (statusFilter === "pending" && !customer.verification.verified)

    return matchesSearch && matchesStatus
  })

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsEditDialogOpen(true)
  }

  const handleSaveCustomer = () => {
    if (selectedCustomer) {
      setCustomers(customers.map((c) => (c._id === selectedCustomer._id ? selectedCustomer : c)))
      setIsEditDialogOpen(false)
      setSelectedCustomer(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Khách hàng</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm khách hàng
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Hoạt động</SelectItem>
            <SelectItem value="inactive">Không hoạt động</SelectItem>
            <SelectItem value="verified">Đã xác minh</SelectItem>
            <SelectItem value="pending">Chờ xác minh</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên đăng nhập</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số dư</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Xác minh</TableHead>
              <TableHead>Đăng nhập cuối</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell className="font-medium">{customer.username}</TableCell>
                <TableCell>{customer.fullName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{formatCurrency(customer.balance.available)}</TableCell>
                <TableCell>
                  <Badge variant={customer.status.active ? "default" : "secondary"}>
                    {customer.status.active ? "Hoạt động" : "Không hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={customer.verification.verified ? "default" : "outline"}>
                    {customer.verification.verified ? "Đã xác minh" : "Chờ xác minh"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDateTime(customer.lastLogin)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {customer.status.active ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Vô hiệu hóa
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Kích hoạt
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {customer.status.betLocked ? (
                          <>
                            <Unlock className="mr-2 h-4 w-4" />
                            Mở khóa giao dịch
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Khóa giao dịch
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa khách hàng</DialogTitle>
            <DialogDescription>Thay đổi thông tin khách hàng. Nhấn lưu khi hoàn tất.</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Họ tên
                </Label>
                <Input
                  id="fullName"
                  value={selectedCustomer.fullName}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, fullName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={selectedCustomer.email}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  value={selectedCustomer.phone}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleSaveCustomer}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Deposits Page Component
function DepositsPage() {
  const [deposits, setDeposits] = useState(mockDeposits)

  const handleStatusChange = (id: string, newStatus: string) => {
    setDeposits(deposits.map((deposit) => (deposit.id === id ? { ...deposit, status: newStatus } : deposit)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Nạp tiền</h2>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Phương thức</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deposits.map((deposit) => (
              <TableRow key={deposit.id}>
                <TableCell className="font-medium">{deposit.id}</TableCell>
                <TableCell>{deposit.userId}</TableCell>
                <TableCell>{formatCurrency(deposit.amount)}</TableCell>
                <TableCell>{deposit.method}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      deposit.status === "completed"
                        ? "default"
                        : deposit.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {deposit.status === "completed"
                      ? "Hoàn thành"
                      : deposit.status === "pending"
                        ? "Chờ xử lý"
                        : "Từ chối"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(deposit.date)}</TableCell>
                <TableCell className="text-right">
                  {deposit.status === "pending" && (
                    <div className="space-x-2">
                      <Button size="sm" onClick={() => handleStatusChange(deposit.id, "completed")}>
                        Duyệt
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(deposit.id, "rejected")}
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
      </Card>
    </div>
  )
}

// Withdrawals Page Component
function WithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals)

  const handleStatusChange = (id: string, newStatus: string) => {
    setWithdrawals(
      withdrawals.map((withdrawal) => (withdrawal.id === id ? { ...withdrawal, status: newStatus } : withdrawal)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Rút tiền</h2>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Phương thức</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.map((withdrawal) => (
              <TableRow key={withdrawal.id}>
                <TableCell className="font-medium">{withdrawal.id}</TableCell>
                <TableCell>{withdrawal.userId}</TableCell>
                <TableCell>{formatCurrency(withdrawal.amount)}</TableCell>
                <TableCell>{withdrawal.method}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      withdrawal.status === "completed"
                        ? "default"
                        : withdrawal.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {withdrawal.status === "completed"
                      ? "Hoàn thành"
                      : withdrawal.status === "pending"
                        ? "Chờ xử lý"
                        : "Từ chối"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(withdrawal.date)}</TableCell>
                <TableCell className="text-right">
                  {withdrawal.status === "pending" && (
                    <div className="space-x-2">
                      <Button size="sm" onClick={() => handleStatusChange(withdrawal.id, "completed")}>
                        Duyệt
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(withdrawal.id, "rejected")}
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
      </Card>
    </div>
  )
}

// Orders Page Component
function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Lệnh giao dịch</h2>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Cặp tiền</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Kết quả</TableHead>
              <TableHead>Lãi/Lỗ</TableHead>
              <TableHead>Ngày</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{order.symbol}</TableCell>
                <TableCell>
                  <Badge variant={order.type === "CALL" ? "default" : "secondary"}>{order.type}</Badge>
                </TableCell>
                <TableCell>{formatCurrency(order.amount)}</TableCell>
                <TableCell>
                  <Badge variant={order.result === "win" ? "default" : "destructive"}>
                    {order.result === "win" ? "Thắng" : "Thua"}
                  </Badge>
                </TableCell>
                <TableCell className={order.profit > 0 ? "text-green-600" : "text-red-600"}>
                  {formatCurrency(order.profit)}
                </TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

// Main Admin Dashboard Component
export function AdminDashboard() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-semibold">Bảng điều khiển quản trị</h1>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="customers">Khách hàng</TabsTrigger>
            <TabsTrigger value="deposits">Nạp tiền</TabsTrigger>
            <TabsTrigger value="withdrawals">Rút tiền</TabsTrigger>
            <TabsTrigger value="orders">Lệnh giao dịch</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <OverviewPage />
          </TabsContent>
          <TabsContent value="customers" className="space-y-4">
            <CustomersPage />
          </TabsContent>
          <TabsContent value="deposits" className="space-y-4">
            <DepositsPage />
          </TabsContent>
          <TabsContent value="withdrawals" className="space-y-4">
            <WithdrawalsPage />
          </TabsContent>
          <TabsContent value="orders" className="space-y-4">
            <OrdersPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
